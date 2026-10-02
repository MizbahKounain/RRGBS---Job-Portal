import React, { useEffect, useState } from 'react';
import { BriefcaseBusiness, Download, FileText, Users, X } from 'lucide-react';
import { api, downloadRecruiterResume } from '../api';

type RecruiterJob = { id: string; title: string; company: string; location: string; postedDate: string; applicationCount: number; applications: { id: string; applicantName: string; email: string; phone: string; resumeFileName: string; hasResume: boolean; appliedAt: string }[] };

export const RecruiterPortalModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [jobs, setJobs] = useState<RecruiterJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true); setError('');
    api.recruiterJobs().then((r) => setJobs(r.jobs)).catch((e) => setError(e instanceof Error ? e.message : 'Could not load your jobs.')).finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;
  const download = async (job: RecruiterJob, application: RecruiterJob['applications'][number]) => {
    try { setDownloading(application.id); await downloadRecruiterResume(job.id, application.id, application.resumeFileName || `${application.applicantName}-resume`); }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not download the resume.'); }
    finally { setDownloading(''); }
  };

  return <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
    <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between"><div><h2 className="text-xl font-extrabold">Recruiter Portal</h2><p className="text-xs text-gray-500">Only jobs posted from your recruiter account are shown here.</p></div><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X /></button></div>
      <div className="p-6">
        {loading && <div className="py-12 text-center text-gray-500">Loading your jobs…</div>}
        {!loading && error && <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
        {!loading && !error && jobs.length === 0 && <div className="py-16 text-center"><BriefcaseBusiness className="w-12 h-12 mx-auto text-gray-300" /><h3 className="mt-4 text-lg font-extrabold">No jobs posted by you</h3><p className="text-sm text-gray-500 mt-1">Post your first job to see it here.</p></div>}
        <div className="space-y-5">{jobs.map((job) => <div key={job.id} className="border border-gray-200 rounded-xl overflow-hidden"><div className="p-5 bg-gray-50 flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-extrabold text-lg">{job.title}</h3><p className="text-sm text-gray-500">{job.company} · {job.location}</p></div><div className="flex items-center gap-2 text-sm font-bold text-gray-700"><Users className="w-4 h-4 text-[#d71920]" /> {job.applicationCount} applied</div></div><div className="p-5">{job.applications.length === 0 ? <p className="text-sm text-gray-500">No applications received yet.</p> : <div className="space-y-2">{job.applications.map((a) => <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 border rounded-lg p-3"><div><p className="font-bold text-sm">{a.applicantName}</p><p className="text-xs text-gray-500">{a.email} · {a.phone}</p></div>{a.hasResume ? <button disabled={downloading === a.id} onClick={() => download(job, a)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#d71920] text-white text-xs font-bold hover:bg-[#b8141a]">{downloading === a.id ? 'Downloading…' : <><Download className="w-4 h-4" /> Download Resume</>}</button> : <span className="text-xs text-gray-400 inline-flex gap-1"><FileText className="w-4 h-4" /> No resume</span>}</div>)}</div>}</div></div>)}</div>
      </div>
    </div>
  </div>;
};
