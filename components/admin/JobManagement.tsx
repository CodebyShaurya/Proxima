'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, CreditCard as Edit, Plus } from 'lucide-react';
import { Job } from '@/lib/types';
import { toast } from 'react-hot-toast';

interface JobManagementProps {
  jobs: Job[];
  onAddJob: (job: Omit<Job, 'id' | 'applications' | 'postedDate'>) => Promise<void>;
  onUpdateJob: (id: string, job: Partial<Job>) => Promise<void>;
  onDeleteJob: (id: string) => Promise<void>;
}

export function JobManagement({ jobs, onAddJob, onUpdateJob, onDeleteJob }: JobManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time' as Job['type'],
    category: '',
    description: '',
    requirements: '',
    salary: '',
    benefits: '',
    deadline: '',
    applyLink: '', // Add apply link field
  });

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      type: 'full-time',
      category: '',
      description: '',
      requirements: '',
      salary: '',
      benefits: '',
      deadline: '',
      applyLink: '', // Reset apply link field
    });
    setShowAddForm(false);
    setEditingJob(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      requirements: formData.requirements.split(',').map(r => r.trim()).filter(r => r),
      benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b),
      deadline: new Date(formData.deadline),
      isActive: true,
    };

    try {
      if (editingJob) {
        await onUpdateJob(editingJob.id, jobData);
        toast.success('Job updated successfully!');
      } else {
        await onAddJob(jobData);
        toast.success('Job added successfully!');

        // Fetch users with at least two matching skills
        const response = await fetch('/api/findUsersWithSkills', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requiredSkills: jobData.requirements }),
        });

        if (response.ok) {
          const users = await response.json();

          // Send email notifications to the users
          await Promise.all(users.map(async (user: any) => {
            await fetch('/api/sendJobNotification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user,
                job: {
                  title: jobData.title,
                  company: jobData.company,
                  location: jobData.location,
                  applyLink: jobData.applyLink,
                },
              }),
            });
          }));

          toast.success('Notifications sent to matching users!');
        } else {
          toast.error('Failed to find users with matching skills.');
        }
      }
      resetForm();
    } catch (error) {
      toast.error('Operation failed. Please try again.');
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      category: job.category,
      description: job.description,
      requirements: job.requirements.join(', '),
      salary: job.salary,
      benefits: job.benefits.join(', '),
      deadline: job.deadline.toISOString().split('T')[0],
      applyLink: job.applyLink, // Set apply link for editing
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await onDeleteJob(id);
        toast.success('Job deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete job.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Job Management</h2>
          <p className="text-gray-600">Manage job postings and applications</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Job
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingJob ? 'Edit Job' : 'Add New Job'}</CardTitle>
            <CardDescription>Fill in the job details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="e.g., Tech Corp"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g., San Francisco, CA"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Job Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as Job['type']})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="e.g., Software Development"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    placeholder="e.g., $80,000 - $120,000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the role, responsibilities, and company culture..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements (comma separated)</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  placeholder="e.g., React, Node.js, 3+ years experience, Bachelor's degree"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits (comma separated)</Label>
                <Textarea
                  id="benefits"
                  value={formData.benefits}
                  onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                  placeholder="e.g., Health insurance, 401k, Remote work, Flexible hours"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="applyLink">Apply Link</Label>
                <Input
                  id="applyLink"
                  value={formData.applyLink}
                  onChange={(e) => setFormData({...formData, applyLink: e.target.value})}
                  placeholder="e.g., https://company.com/apply"
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit">
                  {editingJob ? 'Update Job' : 'Add Job'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {job.title}
                    <Badge variant={job.isActive ? 'default' : 'secondary'}>
                      {job.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {job.company} • {job.location} • {job.applications} applications
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {/* <Button size="sm" variant="outline" onClick={() => handleEdit(job)}>
                    <Edit className="h-4 w-4" />
                  </Button> */}
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(job.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.slice(0, 3).map((req, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}