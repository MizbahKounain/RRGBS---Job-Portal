import React, { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { RRGBSLogo } from './common/RRGBSLogo';
import { api, fileToDataUrl } from '../api';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (candidateName: string) => void;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [targetCategory, setTargetCategory] = useState(CATEGORIES[0].title);
  const [experience, setExperience] = useState('0–1 Years (Fresher)');
  const [preferredCity, setPreferredCity] = useState('Bangalore');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setErrorMsg('');
    }
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
    if (!name.trim()) { setErrorMsg('Please enter your full name.'); return; }
    if (!email.trim() || !email.includes('@')) { setErrorMsg('Please enter a valid email address.'); return; }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) { setErrorMsg('Please enter a valid 10-digit mobile number.'); return; }
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      const resumeData = await fileToDataUrl(resumeFile);
      await api.resume({
        name: name.trim(), email: email.trim(), phone: phone.trim(),
        targetCategory, preferredCity,
        resumeFileName: resumeFile?.name || '',
        resumeData,
      });
      setIsSubmitted(true);
      onSuccess(name);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Could not save your profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setResumeFile(null);
    setErrorMsg('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 relative my-6 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RRGBSLogo size={36} />
            <div>
              <h2 className="font-extrabold text-lg text-gray-900 leading-tight">
                {isSubmitted ? 'Resume Received!' : 'Drop Your Resume with RRGBS'}
              </h2>
              <div className="text-xs text-gray-500 font-medium">
                Get matched directly by RRGBS recruitment specialists
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-red-50 text-[#d71920] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              <CheckCircle2 className="w-10 h-10 text-[#d71920]" />
            </div>

            <h3 className="text-xl font-extrabold text-gray-900">
              Profile &amp; Resume Saved!
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Thank you, <b>{name}</b>. Your profile has been registered in the RRGBS talent pool. When a suitable opening arises in <b>{targetCategory}</b> or <b>{preferredCity}</b>, our team will reach out.
            </p>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="bg-[#d71920] hover:bg-[#b8141a] text-white px-8 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Back to Jobs
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Rao"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="ananya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Target Domain / Category
                </label>
                <select
                  value={targetCategory}
                  onChange={(e) => setTargetCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all cursor-pointer"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Preferred City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bangalore, Shivamogga, Remote"
                  value={preferredCity}
                  onChange={(e) => setPreferredCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Resume Upload Box */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Upload Resume (PDF or DOC)
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
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
                    <Upload className="w-7 h-7 text-gray-400 mx-auto mb-1.5" />
                    <div className="text-xs font-semibold text-gray-700">
                      Drag &amp; drop your resume or <span className="text-[#d71920] underline">browse files</span>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-0.5">
                      PDF, DOCX up to 5MB
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#d71920] hover:bg-[#b8141a] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer"
              >
                {isSubmitting ? 'Submitting…' : 'Submit Candidate Profile'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
