'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigation } from '@/components/layout/Navigation';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { JobCard } from '@/components/dashboard/JobCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Sparkles } from 'lucide-react';
import { Job } from '@/lib/types';
import { doc, updateDoc, collection, addDoc, getDocs, query, where, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebaseConfig';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import nodemailer from 'nodemailer';

function DashboardPage() {
  const { user, loading, updateUserData } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all-jobs');

  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Jobs'));
        const jobsData: Job[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Job[];
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to fetch jobs. Please try again.');
      }
    };

    const fetchAppliedJobs = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'signupSubmissions', user.id));
          if (userDoc.exists()) {
            setAppliedJobs(userDoc.data().appliedJobs || []);
          }
        } catch (error) {
          console.error('Error fetching applied jobs:', error);
        }
      }
    };

    fetchJobs();
    fetchAppliedJobs();
  }, [user]);

  useEffect(() => {
    let cancelled = false;

    const checkAuthAndMaybeRedirect = async () => {
      // if the page was just navigated to from signup/login, allow a short
      // grace period for the auth provider to hydrate (session flag set by forms)
      const justSignedIn = (() => { try { return sessionStorage.getItem('jm_just_signed_in') === '1'; } catch { return false; } })();
      if (justSignedIn) {
        // wait up to 1500ms for loading to finish
        const start = Date.now();
        while (loading && Date.now() - start < 1500 && !cancelled) {
          // busy wait a tiny bit — could be improved with an event-based approach
          // but this keeps the logic simple in the client component
          // eslint-disable-next-line no-await-in-loop
          await new Promise(r => setTimeout(r, 100));
        }
      }

      if (!loading && !user && !cancelled) {
        // client navigation when not authenticated
        console.info('[Dashboard] No user, redirecting to home');
        router.replace('/');
      }

      // clear the flag so future navigations behave normally
      try { sessionStorage.removeItem('jm_just_signed_in'); } catch {}
    };

    checkAuthAndMaybeRedirect();

    return () => { cancelled = true; };
  }, [user, loading, router]);

  const handleApplyForJob = async (job: Job) => {
    if (!user) return;

    try {
      // Redirect to apply link
      window.open(job.applyLink, '_blank');

      // Update applied jobs in Firestore
      await updateDoc(doc(db, 'signupSubmissions', user.id), {
        appliedJobs: arrayUnion(job.id),
      });

      // Update local state
      setAppliedJobs((prev) => [...prev, job.id]);
      toast.success('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error('Failed to apply for job. Please try again.');
    }
  };

  const getRecommendedJobs = () => {
    if (!user) return [];

    const skillMatches = jobs.map((job) => {
      const matches = job.requirements.filter(req =>
        user.skills?.some(skill => skill.toLowerCase() === req.toLowerCase())
      );
      return { job, matches: matches.length };
    });

    return skillMatches
      .filter(({ matches }) => matches > 0)
      .sort((a, b) => b.matches - a.matches)
      .slice(0, 3)
      .map(({ job }) => job);
  };

  useEffect(() => {
    let filtered = jobs.filter(job => !appliedJobs.includes(job.id));

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedType, selectedCategory, jobs, appliedJobs]);

  const stats = {
    totalJobs: jobs.length,
    credits: user?.credits || 0,
    applications: appliedJobs.length, // Updated to show count of applied jobs
    recommendations: getRecommendedJobs().length,
  };

  const recommendedJobs = getRecommendedJobs();
  const categories = Array.from(new Set(jobs.map(job => job.category).filter(Boolean)));

  const formatPostedDate = (date: string | Date) => {
    try {
      return format(new Date(date), 'MMM dd');
    } catch (error) {
      console.error('Invalid date value:', date, error);
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-gray-600 mt-2">
            Discover your next career opportunity with AI-powered job matching.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <DashboardStats stats={stats} />
        </div>

        {/* AI Suggestions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">AI Suggestions</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="relative">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-lg animate-pulse"></div>
                <div className="absolute -top-2 left-[35%] bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                  AI Suggested
                </div>
                <JobCard
                  job={job}
                  onApply={() => handleApplyForJob(job)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tabs for All Jobs and Applied Jobs */}
        <Tabs defaultValue="all-jobs" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-jobs">All Jobs</TabsTrigger>
            <TabsTrigger value="applied-jobs">Applied Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="all-jobs">
            {/* All Jobs */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  All Jobs ({filteredJobs.length})
                </h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={() => handleApplyForJob(job)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applied-jobs">
            {/* Applied Jobs */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Applied Jobs</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobs.filter(job => appliedJobs.includes(job.id)).map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={async () => {}}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardPage />;
}