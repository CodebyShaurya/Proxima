'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Building2, DollarSign, Users, Sparkles } from 'lucide-react';
import { Job } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

interface JobCardProps {
  job: Job;
  isRecommended?: boolean;
  onApply: (jobId: string) => Promise<void>;
}

export function JobCard({ job, isRecommended = false, onApply }: JobCardProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleApply = async () => {
    if (!user) {
      toast.error('Please sign in to apply for jobs');
      return;
    }

    if (user.credits <= 0) {
      toast.error('You need credits to apply for jobs. Please purchase a credit package.');
      return;
    }

    if (user.isBlocked) {
      toast.error('Your account has been blocked. Please contact support.');
      return;
    }

    setLoading(true);
    try {
      await onApply(job.id);
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string | Date) => {
    try {
      return format(new Date(date), 'MMM dd');
    } catch (error) {
      console.error('Invalid date value:', date, error);
      return 'Invalid date';
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${isRecommended ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
      {isRecommended && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          AI Recommended for You
        </div>
      )}
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {job.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-lg font-medium text-gray-700 mt-1">
              <Building2 className="h-4 w-4" />
              {job.company}
            </CardDescription>
          </div>
          <Badge 
            variant={job.type === 'full-time' ? 'default' : 'secondary'}
            className="ml-2"
          >
            {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {job.location}
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            {job.salary}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {job.applications} applications
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Posted {formatDate(job.postedDate)}
          </div>
        </div>

        <p className="text-gray-700 line-clamp-3">
          {job.description}
        </p>

        <div className="space-y-2">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
            <div className="flex flex-wrap gap-2">
              {job.requirements.slice(0, 3).map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
              {job.requirements.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{job.requirements.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Deadline: {formatDate(job.deadline)}
        </div>
        <Button 
          onClick={handleApply} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Applying...' : 'Apply Now '}
        </Button>
      </CardFooter>
    </Card>
  );
}