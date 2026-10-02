import React from 'react';
import { Upload, UserCheck, ArrowRight } from 'lucide-react';

interface CtaSectionProps {
  onOpenRegister: () => void;
  onOpenResumeUpload: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onOpenRegister,
  onOpenResumeUpload,
}) => {
  return (
    <section className="bg-[#d71920] text-white text-center py-16 px-5 relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Ready for Your Next Career Move?
        </h2>
        <p className="text-base sm:text-lg text-red-100 max-w-xl mx-auto mb-8 leading-relaxed">
          Create your profile or upload your resume today. Our recruitment specialists actively match suitable candidates with India’s top employers.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenRegister}
            className="bg-[#111111] hover:bg-black text-white px-7 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98 cursor-pointer flex items-center gap-2"
            id="cta-create-profile-btn"
          >
            <UserCheck className="w-4 h-4 text-[#ff4d53]" />
            <span>Create Candidate Profile</span>
          </button>

          <button
            onClick={onOpenResumeUpload}
            className="bg-white hover:bg-red-50 text-[#d71920] px-6 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center gap-2"
            id="cta-upload-resume-btn"
          >
            <Upload className="w-4 h-4" />
            <span>Drop Your Resume</span>
          </button>
        </div>
      </div>
    </section>
  );
};
