import React from 'react';
import { Job } from '../types';
import { 
  X, 
  MapPin, 
  Briefcase, 
  Clock, 
  IndianRupee, 
  Building2, 
  CheckCircle2, 
  Bookmark, 
  Share2,
  Calendar
} from 'lucide-react';

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
  onApply: (job: Job) => void;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onApply,
  isSaved,
  onToggleSave,
}) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 relative my-8">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-extrabold text-sm text-gray-700">
              {job.companyLogoText || job.company.slice(0, 3).toUpperCase()}
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-gray-900 leading-tight">
                {job.title}
              </h2>
              <div className="text-xs text-gray-500 font-medium">
                {job.company} • {job.location}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(job.id)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSaved 
                  ? 'border-red-200 bg-red-50 text-[#d71920]' 
                  : 'border-gray-200 text-gray-500 hover:text-[#d71920]'
              }`}
              title={isSaved ? 'Saved' : 'Save job'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Key Meta Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 block mb-0.5">Salary Package</span>
              <span className="font-bold text-gray-900 text-sm">{job.salary}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">Experience</span>
              <span className="font-bold text-gray-900 text-sm">{job.experience}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">Job Type</span>
              <span className="font-bold text-gray-900 text-sm">{job.type}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-0.5">Location</span>
              <span className="font-bold text-gray-900 text-sm">{job.location}</span>
            </div>
          </div>

          {/* Job Overview */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
              Role Overview
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Key Skills */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2.5">
              Required Skills &amp; Proficiencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-50 text-[#d71920] font-semibold text-xs rounded-md border border-red-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2.5">
                Key Responsibilities
              </h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#d71920] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2.5">
                Candidate Requirements
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2.5">
                Perks &amp; Benefits
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.benefits.map((benefit, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"
                  >
                    ✓ {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Hiring Notice */}
          <div className="p-3.5 bg-neutral-900 text-white rounded-xl text-xs flex items-center justify-between">
            <div>
              <span className="font-bold block text-white">Direct RRGBS Staffing Mandate</span>
              <span className="text-gray-300">No recruitment fees are ever charged to candidates.</span>
            </div>
            <span className="text-[11px] bg-red-600 text-white px-2 py-0.5 rounded font-bold">
              VERIFIED
            </span>
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-gray-500 block">Salary Package</span>
            <span className="font-extrabold text-base text-gray-900">{job.salary}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(job);
              }}
              className="bg-[#d71920] hover:bg-[#b8141a] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer"
            >
              Apply for this Position
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
