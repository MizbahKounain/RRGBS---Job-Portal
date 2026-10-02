import React, { useEffect, useState } from 'react';
import { Job, JobType } from '../types';
import { X, PlusCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { RRGBSLogo } from './common/RRGBSLogo';
import { api } from '../api';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (newJob: Job) => void;
  defaultCompanyName?: string;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onJobCreated,
  defaultCompanyName = '',
}) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState(CATEGORIES[0].title);
  const [type, setType] = useState<JobType>('Full Time');
  const [experience, setExperience] = useState('1–3 Years');
  const [salary, setSalary] = useState('₹3.5 – ₹6.5 LPA');
  const [skillsStr, setSkillsStr] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && defaultCompanyName) setCompany(defaultCompanyName);
  }, [isOpen, defaultCompanyName]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim() || !description.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      const skillsArray = skillsStr.trim()
        ? skillsStr.split(',').map((s) => s.trim()).filter(Boolean)
        : ['Communication', 'Teamwork', category];
      const result = await api.postJob({
        title: title.trim(), company: company.trim(), location: location.trim(),
        category, type, experience, salary: salary.trim() || 'Best in Industry',
        description: description.trim(), skills: skillsArray,
        responsibilities: [
          'Execute daily operational responsibilities and maintain high performance standards.',
          'Collaborate with team leads and cross-functional partners.',
          'Ensure compliance with internal quality and regulatory protocols.'
        ],
        requirements: [
          `Experience level: ${experience}.`,
          'Strong problem-solving capability and verbal communication.',
          'Relevant educational qualification or diploma.'
        ],
        benefits: ['Health Insurance', 'Performance Incentives', 'Professional Growth Opportunities'],
      });
      onJobCreated(result.job);
      setIsSuccess(true);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Could not publish this job.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setCompany('');
    setLocation('Bangalore');
    setCategory(CATEGORIES[0].title);
    setType('Full Time');
    setExperience('1–3 Years');
    setSalary('₹3.5 – ₹6.5 LPA');
    setSkillsStr('');
    setDescription('');
    setErrorMsg('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-200 relative my-6">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <RRGBSLogo size={36} />
            <div>
              <h2 className="font-extrabold text-lg text-gray-900 leading-tight">
                {isSuccess ? 'Job Published!' : 'Post a Job Requirement'}
              </h2>
              <div className="text-xs text-gray-500 font-medium">
                RRGBS Employer &amp; Staffing Portal
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

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-red-50 text-[#d71920] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
              <CheckCircle2 className="w-10 h-10 text-[#d71920]" />
            </div>

            <h3 className="text-xl font-extrabold text-gray-900">
              Job Posted Successfully!
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Your opening for <b>{title}</b> at <b>{company}</b> has been published on RRGBS Jobs. It is now live in the job listings section.
            </p>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="bg-[#d71920] hover:bg-[#b8141a] text-white px-8 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                View Live Job in Portal
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

            {/* Job Title & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Job Designation / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Engineer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Company / Hiring Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Tech Solutions"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  readOnly={Boolean(defaultCompanyName)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Category & Job Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Job Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  Employment Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as JobType)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Work From Home">Work From Home</option>
                </select>
              </div>
            </div>

            {/* Location & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Job Location (City)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bangalore, Shivamogga, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Experience Required
                </label>
                <input
                  type="text"
                  placeholder="e.g. 0–2 Years, 2–4 Years"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Salary & Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Salary Range / CTC
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹4 – ₹8 LPA or ₹25,000/mo"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Key Skills (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, SQL"
                  value={skillsStr}
                  onChange={(e) => setSkillsStr(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm outline-none focus:border-[#d71920] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Job Overview &amp; Duties <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe role objectives, key day-to-day deliverables, and candidate prerequisites..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-[#d71920] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Submit Buttons */}
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
                {isSubmitting ? 'Publishing…' : 'Publish Job'} Opening
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
