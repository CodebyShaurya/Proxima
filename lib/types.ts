export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  location: string;
  experience: string;
  skills: string[];
  preferredJobTypes: string[];
  expectedSalary: string;
  resume?: string;
  isBlocked: boolean;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  category: string;
  description: string;
  requirements: string[];
  salary: string;
  benefits: string[];
  postedDate: Date;
  deadline: Date;
  isActive: boolean;
  applications: number;
  applyLink: string;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  appliedAt: Date;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  coverLetter?: string;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
}