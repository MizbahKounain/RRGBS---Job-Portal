import React from 'react';
import { RRGBSLogo } from '../common/RRGBSLogo';

interface HomeFooterProps {
  onSwitchToJobs?: () => void;
  onSelectService?: (serviceName: string) => void;
}

export const HomeFooter: React.FC<HomeFooterProps> = ({
  onSwitchToJobs,
  onSelectService,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="home-footer" className="bg-[#0d0d0d] text-white pt-12 pb-6 border-t border-neutral-800">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <RRGBSLogo size={46} />
              <div>
                <h3 className="font-black text-2xl tracking-tight text-white leading-none">
                  RR<span className="text-[#d71920]">GBS</span>
                </h3>
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-gray-400 mt-1 block">
                  RR GROUP OF BUSINESS SOLUTIONS
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3">
              RR Group of Business Solutions is an HR Business Services Provider and Integrated Solutions Company.
            </p>
            <p className="text-xs">
              <strong className="text-white tracking-wide">People. Process. Performance.</strong>
            </p>
          </div>

          {/* Home Services Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-sm text-gray-100 mb-3 uppercase tracking-wider">
              Home Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Cleaning &amp; Housekeeping
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Elderly Care &amp; Attendants
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Nursing Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Maintenance, Electrician &amp; Plumbing
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Security &amp; Caretaker Services
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate RRGBS Services (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-sm text-gray-100 mb-3 uppercase tracking-wider">
              RRGBS Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              {onSwitchToJobs ? (
                <li>
                  <button
                    onClick={onSwitchToJobs}
                    className="text-[#ff3b42] hover:underline font-semibold cursor-pointer"
                  >
                    💼 Jobs &amp; Staffing Portal →
                  </button>
                </li>
              ) : null}
              <li>Recruitment</li>
              <li>Permanent Hiring</li>
              <li>Contract Staffing</li>
              <li>Payroll Outsourcing</li>
              <li>HR Outsourcing</li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-sm text-gray-100 mb-3 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="tel:+916363565865" className="hover:text-white transition-colors">
                  +91 63635 65865
                </a>
              </li>
              <li>
                <a href="tel:+917795362779" className="hover:text-white transition-colors">
                  +91 77953 62779
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@rrgroupofbusinesssolutions.in"
                  className="hover:text-white transition-colors break-all"
                >
                  info@rrgroupofbusinesssolutions.in
                </a>
              </li>
              <li className="pt-1 text-gray-400">
                Bharani Complex, Durgigudi, Shivamogga, Karnataka – 577201
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 border-t border-neutral-800 text-center text-xs text-gray-500">
          © 2019–2026 RR Group of Business Solutions. All Rights Reserved. | RRGBS Home Services
        </div>
      </div>
    </footer>
  );
};
