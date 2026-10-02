import React from 'react';
import { PlusCircle, CheckCircle2, PhoneCall, Building2 } from 'lucide-react';

interface EmployersSectionProps {
  onOpenPostJob: () => void;
  onOpenContact: () => void;
}

export const EmployersSection: React.FC<EmployersSectionProps> = ({
  onOpenPostJob,
  onOpenContact,
}) => {
  const capabilities = [
    'IT Recruitment',
    'Non-IT Recruitment',
    'Bulk Hiring',
    'Contract Staffing',
    'RPO Services',
    'Payroll Outsourcing',
    'Managed Workforce',
    'Executive Search',
  ];

  return (
    <section id="employer" className="bg-[#151515] text-white py-16 sm:py-20 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#d71920]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading and CTAs */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-900/30 text-[#ff4d53] text-xs font-bold uppercase tracking-wider mb-4 border border-red-800/40">
              <Building2 className="w-3.5 h-3.5" />
              For Enterprises &amp; Fast-Growing Startups
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
              Looking for <span className="text-[#ff3b42]">Talent?</span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              Post your requirements and connect directly with pre-screened candidates through RRGBS Jobs and our dedicated recruitment operations desk. From niche tech roles to high-volume manufacturing and logistics staffing, we ensure rapid turnaround and statutory compliance.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenPostJob}
                className="bg-[#d71920] hover:bg-[#b8141a] text-white px-6 py-3 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center gap-2"
                id="employer-post-job-cta"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Job</span>
              </button>

              <button
                onClick={onOpenContact}
                className="bg-transparent hover:bg-white/10 text-gray-200 border border-gray-600 hover:border-gray-400 px-5 py-3 rounded-lg font-bold text-sm transition-colors cursor-pointer flex items-center gap-2"
                id="employer-consult-cta"
              >
                <PhoneCall className="w-4 h-4 text-[#ff3b42]" />
                <span>Hire with RRGBS</span>
              </button>
            </div>
          </div>

          {/* Right Column: Service Highlights Checklist */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="employer-service-list">
              {capabilities.map((cap, index) => (
                <div
                  key={index}
                  className="bg-[#222222] hover:bg-[#282828] border border-white/5 rounded-lg p-3.5 text-xs sm:text-sm font-semibold text-gray-200 flex items-center gap-2.5 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#ff3b42] shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-red-950/40 to-neutral-900 border border-red-900/30 text-xs text-gray-300 flex items-center justify-between">
              <div>
                <span className="font-bold text-white block">Need urgent candidate deployment?</span>
                <span className="text-gray-400">Our staffing managers respond within 4 business hours.</span>
              </div>
              <button
                onClick={onOpenContact}
                className="shrink-0 ml-3 text-xs font-bold text-[#ff3b42] hover:underline"
              >
                Contact Desk →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
