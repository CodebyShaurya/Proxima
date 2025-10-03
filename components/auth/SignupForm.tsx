'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
// import { useAuth } from '@/hooks/useAuth';
import { toast } from 'react-hot-toast';
import { db } from '@/utils/firebaseConfig';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';


const signupSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  location: z.string().min(1, 'Location is required'),
  experience: z.string().min(1, 'Experience level is required'),
  expectedSalary: z.string().min(1, 'Expected salary is required'),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onToggleMode: () => void;
}

const jobTypes = [
  'Software Development', 'Data Science', 'Marketing', 'Sales', 'Design',
  'Finance', 'Human Resources', 'Operations', 'Customer Service', 'Engineering'
];

const skills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker',
  'MongoDB', 'TypeScript', 'Java', 'C++', 'Machine Learning', 'UI/UX',
  'Project Management', 'Digital Marketing', 'Sales', 'Communication'
];

export function SignupForm({ onToggleMode }: SignupFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { signup } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  // Updated onSubmit to check for unique email before signup
  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    try {
      // Check if email already exists in Firestore
      const emailQuery = query(collection(db, 'signupSubmissions'), where('email', '==', data.email));
      const emailSnapshot = await getDocs(emailQuery);

      if (!emailSnapshot.empty) {
        toast.error('Email is already in use. Please use a different email.');
        setLoading(false);
        return;
      }

      const created = await signup({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        location: data.location,
        experience: data.experience,
        expectedSalary: data.expectedSalary,
        preferredJobTypes: selectedJobTypes,
        skills: selectedSkills,
      });

      // Save email to localStorage
      localStorage.setItem('userEmail', data.email);

      await addDoc(collection(db, 'signupSubmissions'), {
        userId: created.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        location: data.location,
        experience: data.experience,
        expectedSalary: data.expectedSalary,
        preferredJobTypes: selectedJobTypes,
        skills: selectedSkills,
        createdAt: serverTimestamp(),
      });

      router.push('/dashboard');
    } catch (err: any) {
      console.error('Failed to write signup submission to Firestore', err);
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    if (checked) {
      setSelectedJobTypes([...selectedJobTypes, jobType]);
    } else {
      setSelectedJobTypes(selectedJobTypes.filter(type => type !== jobType));
    }
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    }
  };

  return (
    <Card className="w-full max-w-2xl  overflow-y-auto my-4 ">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <CardDescription>Join our platform and find your dream job</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                {...register('firstName')}
                placeholder="Enter your first name"
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                {...register('lastName')}
                placeholder="Enter your last name"
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register('password')}
              type="password"
              placeholder="Create a password"
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                {...register('phone')}
                placeholder="Enter your phone number"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                {...register('location')}
                placeholder="Enter your location"
                className={errors.location ? 'border-red-500' : ''}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select onValueChange={(value) => setValue('experience', value)}>
                <SelectTrigger className={errors.experience ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                  <SelectItem value="lead">Lead/Manager (8+ years)</SelectItem>
                </SelectContent>
              </Select>
              {errors.experience && (
                <p className="text-sm text-red-500">{errors.experience.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedSalary">Expected Salary</Label>
              <Input
                {...register('expectedSalary')}
                placeholder="e.g., $50,000 - $70,000"
                className={errors.expectedSalary ? 'border-red-500' : ''}
              />
              {errors.expectedSalary && (
                <p className="text-sm text-red-500">{errors.expectedSalary.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Preferred Job Types</Label>
            <div className="grid grid-cols-2 gap-2">
              {jobTypes.map((jobType) => (
                <div key={jobType} className="flex items-center space-x-2">
                  <Checkbox
                    id={`job-${jobType}`}
                    checked={selectedJobTypes.includes(jobType)}
                    onCheckedChange={(checked) => handleJobTypeChange(jobType, checked as boolean)}
                  />
                  <Label htmlFor={`job-${jobType}`} className="text-sm">{jobType}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="grid grid-cols-3 gap-2">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={selectedSkills.includes(skill)}
                    onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                  />
                  <Label htmlFor={`skill-${skill}`} className="text-sm">{skill}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={onToggleMode}
              className="text-sm"
            >
              Already have an account? Sign in
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}