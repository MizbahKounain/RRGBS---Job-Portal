import { ApplicationSubmission, Job } from './types';

const API_BASE = (import.meta as any).env?.VITE_API_URL || '/api';
const TOKEN_KEY = 'rrgbs_access_token_v1';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && options.body) headers.set('Content-Type', 'application/json');
  const token = getToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  let data: any = {};
  try { data = await response.json(); } catch {}
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
  return data as T;
}

export const api = {
  health: () => request<{ ok: boolean }>('/health'),
  register: (body: any) => request<{ token: string; user: any }>('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body: any) => request<{ token: string; user: any }>('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request<{ user: any }>('/auth/me'),
  jobs: () => request<{ jobs: Job[]; total: number }>('/jobs'),
  postJob: (body: any) => request<{ job: Job }>('/jobs', { method: 'POST', body: JSON.stringify(body) }),
  recruiterProfile: (body: any) => request<{ user: any }>('/recruiter/profile', { method: 'POST', body: JSON.stringify(body) }),
  recruiterJobs: () => request<{ jobs: any[] }>('/recruiter/jobs'),
  savedJobs: () => request<{ jobIds: string[] }>('/saved-jobs'),
  saveJob: (jobId: string) => request(`/saved-jobs/${encodeURIComponent(jobId)}`, { method: 'PUT' }),
  unsaveJob: (jobId: string) => request(`/saved-jobs/${encodeURIComponent(jobId)}`, { method: 'DELETE' }),
  application: (body: any) => request<{ application: ApplicationSubmission }>('/applications', { method: 'POST', body: JSON.stringify(body) }),
  resume: (body: any) => request('/resumes', { method: 'POST', body: JSON.stringify(body) }),
  contact: (body: any) => request('/contact', { method: 'POST', body: JSON.stringify(body) }),
  homeEnquiry: (body: any) => request<{ enquiry: any; emailSent: boolean; emailError?: string; whatsappUrl: string }>('/home-enquiries', { method: 'POST', body: JSON.stringify(body) }),
  storeOrder: (body: any) => request('/store/orders', { method: 'POST', body: JSON.stringify(body) }),
  bulkQuote: (body: any) => request('/store/bulk-quotes', { method: 'POST', body: JSON.stringify(body) }),
};

export async function fileToDataUrl(file: File | null): Promise<string | null> {
  if (!file) return null;
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function downloadRecruiterResume(jobId: string, applicationId: string, fileName = 'resume') {
  const token = getToken();
  const response = await fetch(`${API_BASE}/recruiter/jobs/${encodeURIComponent(jobId)}/applications/${encodeURIComponent(applicationId)}/resume`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (!response.ok) {
    let message = 'Could not download the resume.';
    try { message = (await response.json()).message || message; } catch {}
    throw new Error(message);
  }
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName || 'resume';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
