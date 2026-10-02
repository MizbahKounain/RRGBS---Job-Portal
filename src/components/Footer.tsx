import React from 'react';
import { Mail, Globe, Phone, MapPin, ArrowUp } from 'lucide-react';
import { RRGBSLogo } from './common/RRGBSLogo';

interface FooterProps {
  onOpenPostJob: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenResumeUpload: () => void;
  onOpenContact: () => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPostJob,
  onOpenLogin,
  onOpenRegister,
  onOpenResumeUpload,
  onOpenContact,
  onSelectCategory,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#111111] text-white pt-14 pb-8 border-t border-neutral-800">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <RRGBSLogo size={46} />
              <div>
                <div className="flex items-center gap-1.5 leading-tight">
                  <h3 className="font-black text-xl text-white tracking-tight">
                    RR<span className="text-[#d71920]">GBS</span>
                  </h3>
                  <span className="text-[10px] font-bold text-white bg-[#d71920] px-1.5 py-0.5 rounded">
                    JOBS
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 block font-semibold uppercase tracking-wider mt-0.5">
                  RR Group of Business Solutions
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
              RRGBS Jobs is a premier recruitment and job platform powered by RR Group of Business Solutions. Connecting ambition with industry-leading opportunity across India.
            </p>

            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-semibold text-red-300">
              People. Process. Performance.
            </div>
          </div>

          {/* Column 2: For Candidates */}
          <div>
            <h4 className="font-bold text-sm sm:text-base text-white mb-4 tracking-wide uppercase">
              For Candidates
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <button
                  onClick={() => scrollTo('jobs')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Find Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenRegister}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Register Free
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenResumeUpload}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Upload Resume
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Freshers')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fresher Walk-ins
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Work From Home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Work From Home Jobs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: For Employers */}
          <div>
            <h4 className="font-bold text-sm sm:text-base text-white mb-4 tracking-wide uppercase">
              For Employers
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <button
                  onClick={onOpenPostJob}
                  className="hover:text-[#ff3b42] transition-colors cursor-pointer text-left font-semibold"
                >
                  + Post a Job
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Employer Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Recruitment Services
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contract Staffing Mandates
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Payroll Outsourcing Support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact RRGBS */}
          <div>
            <h4 className="font-bold text-sm sm:text-base text-white mb-4 tracking-wide uppercase">
              Contact RRGBS
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ff3b42] shrink-0 mt-0.5" />
                <span>RR Group of Business Solutions<br />Shivamogga, Karnataka, India</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ff3b42] shrink-0" />
                <a
                  href="mailto:info@rrgroupofbusinesssolutions.in"
                  className="hover:text-white transition-colors"
                >
                  info@rrgroupofbusinesssolutions.in
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#ff3b42] shrink-0" />
                <a
                  href="https://www.rrgroupofbusinesssolutions.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  www.rrgroupofbusinesssolutions.in
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ff3b42] shrink-0" />
                <a href="tel:+916363565865" className="hover:text-white transition-colors font-semibold text-gray-200">
                  +91 63635 65865
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © 2026 RRGBS Jobs. All Rights Reserved. Powered by RR Group of Business Solutions.
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-gray-200 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-200 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-gray-200 cursor-pointer">Sitemap</span>

            <button
              onClick={scrollToTop}
              className="ml-3 p-1.5 bg-neutral-800 hover:bg-[#d71920] text-gray-300 hover:text-white rounded transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
