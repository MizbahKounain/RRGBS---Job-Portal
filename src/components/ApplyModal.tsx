import React, { useState, useRef } from 'react';
import { Job, ApplicationSubmission } from '../types';
import { X, Upload, CheckCircle2, FileText, ArrowRight, AlertCircle } from 'lucide-react';
import { api, fileToDataUrl } from '../api';

interface ApplyModalProps {
  job: Job | null;
  onClose: () => void;
  onSubmitApplication: (submission: ApplicationSubmission) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  onClose,
  onSubmitApplication,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('0–1 Years');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!job) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setErrorMsg('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
      setErrorMsg('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name.trim()) { setErrorMsg('Please enter your full name.'); return; }
    if (!email.trim() || !email.includes('@')) { setErrorMsg('Please enter a valid email address.'); return; }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) { setErrorMsg('Please enter a valid 10-digit mobile number.'); return; }

    setIsSubmitting(true);
    try {
      const submission: ApplicationSubmission = {
        id: `app-${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        applicantName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        experience,
        currentLocation: location.trim() || 'Bangalore',
        resumeFileName: resumeFile ? resumeFile.name : 'Resume_Profile.pdf',
        notes: notes.trim(),
        appliedAt: new Date().toISOString(),
      };
      const resumeData = await fileToDataUrl(resumeFile);
      await api.application({ ...submission, resumeData });
      onSubmitApplication(submission);
      setIsSubmitted(true);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Could not submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 relative my-8 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-lg text-gray-900 leading-tight">
              {isSubmitted ? 'Application Sent!' : `Apply for ${job.title}`}
            </h2>
            <div className="text-xs text-gray-500 font-medium">
              {job.company} • {job.location} ({job.salary})
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-red-50 text-[#d71920] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              <CheckCircle2 className="w-10 h-10 text-[#d71920]" />
            </div>

            <h3 className="text-xl font-extrabold text-gray-900">
              Application Submitted Successfully!
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Thank you, <b>{name}</b>. Your profile for <b>{job.title}</b> has been received by RRGBS recruitment desk. A recruiter will contact you via phone or email shortly.
            </p>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs text-left text-gray-600 space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-gray-400">Position:</span>
                <span className="font-semibold text-gray-800">{job.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Company:</span>
                <span className="font-semibold text-gray-800">{job.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Resume Attached:</span>
                <span className="font-semibold text-gray-800">
                  {resumeFile ? resumeFile.name : 'Candidate Profile.pdf'}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="bg-[#d71920] hover:bg-[#b8141a] text-white px-8 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Current City & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Current Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bangalore or Shivamogga"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Total Experience
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Fresher (0 Years)">Fresher (0 Years)</option>
                  <option value="0–1 Years">0–1 Years</option>
                  <option value="1–3 Years">1–3 Years</option>
                  <option value="3–5 Years">3–5 Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
              </div>
            </div>

            {/* Drag & Drop Resume Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Upload Resume / CV (PDF, DOC, DOCX)
              </label>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-[#d71920] bg-red-50/60'
                    : resumeFile
                    ? 'border-emerald-400 bg-emerald-50/30'
                    : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />

                {resumeFile ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-800 text-xs font-bold">
                    <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="truncate max-w-[220px]">{resumeFile.name}</span>
                    <span className="text-[10px] text-emerald-600 font-normal">
                      ({(resumeFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1.5" />
                    <div className="text-xs font-semibold text-gray-700">
                      Drag &amp; drop resume or <span className="text-[#d71920] underline">browse</span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      Max file size 5MB (PDF or Word)
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Note / Pitch */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Brief Note to Recruiter (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Share your current notice period, key skill highlights, or expectations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-[#d71920] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#d71920] hover:bg-[#b8141a] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer"
              >
                {isSubmitting ? 'Submitting…' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
