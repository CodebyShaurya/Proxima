'use client';

import { useState, useEffect } from 'react';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { JobManagement } from '@/components/admin/JobManagement';
import { UserManagement } from '@/components/admin/UserManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, ChartBar as BarChart3 } from 'lucide-react';
import { doc, updateDoc, collection, addDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { Job, User } from '@/lib/types';
import { toast } from 'react-hot-toast';
import { db } from '@/utils/firebaseConfig';

// Hardcoded admin credentials - In production, use proper authentication
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsSnapshot = await getDocs(collection(db, 'Jobs'));
        const jobsData = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to fetch jobs.');
      }
    };

    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'signupSubmissions'));
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users.');
      }
    };

    fetchJobs();
    fetchUsers();
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleAddJob = async (jobData: Omit<Job, 'id' | 'applications' | 'postedDate'>) => {
    const newJob: Job = {
      ...jobData,
      id: Date.now().toString(),
      applications: 0,
      postedDate: new Date(),
      applyLink: jobData.applyLink || '',
    };

    try {
      const jobRef = await addDoc(collection(db, 'Jobs'), newJob);
      setJobs([...jobs, { ...newJob, id: jobRef.id }]);
      toast.success('Job added successfully!');
    } catch (error) {
      console.error('Error adding job:', error);
      toast.error('Failed to add job. Please try again.');
    }
  };

  const handleUpdateJob = async (id: string, jobData: Partial<Job>) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, ...jobData } : job));
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'Jobs', id));
      setJobs(jobs.filter(job => job.id !== id));
      toast.success('Job deleted successfully!');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job. Please try again.');
    }
  };

  const handleBlockUser = async (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isBlocked: true } : user
    ));
  };

  const handleUnblockUser = async (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isBlocked: false } : user
    ));
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(job => job.isActive).length,
    totalUsers: users.length,
    blockedUsers: users.filter(user => user.isBlocked).length,
    totalApplications: jobs.reduce((sum, job) => sum + job.applications, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-2">Manage jobs, users, and platform settings</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalJobs}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeJobs}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blocked Users</CardTitle>
              <div className="h-4 w-4 rounded-full bg-red-500"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.blockedUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobs">Job Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs">
            <JobManagement
              jobs={jobs}
              onAddJob={handleAddJob}
              onUpdateJob={handleUpdateJob}
              onDeleteJob={handleDeleteJob}
            />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement
              users={users}
              onBlockUser={handleBlockUser}
              onUnblockUser={handleUnblockUser}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}