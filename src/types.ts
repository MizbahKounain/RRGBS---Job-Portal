export type JobType = 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | 'Work From Home';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogoText: string;
  location: string;
  category: string;
  type: JobType;
  experience: string;
  salary: string;
  description: string;
  skills: string[];
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  postedDate: string;
  isFeatured?: boolean;
}

export interface JobCategory {
  id: string;
  title: string;
  icon: string;
  count: number;
  description: string;
}

export interface RecruitmentService {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
}

export interface ApplicationSubmission {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  applicantName: string;
  email: string;
  phone: string;
  experience: string;
  currentLocation: string;
  resumeFileName: string;
  notes?: string;
  appliedAt: string;
}

export interface FilterState {
  keyword: string;
  location: string;
  jobType: string;
  category: string;
  experience: string;
}

export interface HomeServiceItem {
  id: string;
  title: string;
  icon: string;
  tagline: string;
  description: string;
  checklist: string[];
  startingPrice?: string;
  badge?: string;
}

export interface ServiceEnquirySubmission {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  location: string;
  message?: string;
  createdAt: string;
}
