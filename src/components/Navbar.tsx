import React, { useEffect, useState } from 'react';
import { Menu, X, User, Bookmark } from 'lucide-react';
import { RRGBSLogo } from './common/RRGBSLogo';

interface NavbarProps {
  onOpenPostJob: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenSavedJobs: () => void;
  onOpenRecruiterPortal: () => void;
  user: { name: string; role: 'candidate' | 'employer' } | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPostJob,
  onOpenLogin,
  onOpenRegister,
  onOpenSavedJobs,
  onOpenRecruiterPortal,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('categories');

  useEffect(() => {
    const ids = ['categories', 'jobs', 'employer', 'about', 'contact'];
    const updateActive = () => {
      const marker = window.scrollY + 130;
      let current = 'categories';
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= marker) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) current = 'contact';
      setActiveSection(current);
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  const navClass = (id: string) =>
    `relative cursor-pointer transition-all duration-300 ${activeSection === id ? 'text-[#d71920]' : 'text-gray-700 hover:text-[#d71920]'}
      after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:bg-[#d71920] after:transition-all after:duration-300 ${activeSection === id ? 'after:w-full' : 'after:w-0'}`;

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      <div className="w-[92%] max-w-[1200px] mx-auto min-h-[72px] flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
          id="brand-logo"
        >
          <RRGBSLogo size={44} />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-black text-xl text-[#111] tracking-tight">
                RR<span className="text-[#d71920]">GBS</span>
              </span>
              <span className="text-[10px] font-bold text-white bg-[#d71920] px-1.5 py-0.5 rounded">
                JOBS
              </span>
            </div>
            <span className="text-[9.5px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">
              RR Group of Business Solutions
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-gray-700">
          <button
            onClick={() => scrollTo('categories')}
            className={navClass('categories')}
          >
            Categories
          </button>
          <button
            onClick={() => scrollTo('jobs')}
            className={navClass('jobs')}
          >
            Find Jobs
          </button>
          <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenPostJob();
  }}
  className={navClass('employer')}
>
  Post a Job
</button>
          <button
            onClick={() => scrollTo('about')}
            className={navClass('about')}
          >
            About
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className={navClass('contact')}
          >
            Contact
          </button>
          <button
            onClick={onOpenSavedJobs}
            className="p-1.5 rounded-md hover:bg-red-50 hover:text-[#d71920] transition-colors cursor-pointer"
            title="Saved Jobs"
            aria-label="Saved Jobs"
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </nav>

        {/* Action Buttons — Login and Register only */}
        <div className="hidden sm:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md text-xs font-semibold text-gray-800">
                <User className="w-3.5 h-3.5 text-[#d71920]" />
                <span className="max-w-[100px] truncate">{user.name}</span>
                <span className="text-[10px] bg-red-100 text-[#d71920] px-1 rounded uppercase">
                  {user.role}
                </span>
              </div>
              {user.role === 'employer' && (
                <button
                  type="button"
                  onClick={onOpenRecruiterPortal}
                  className="px-3 py-1.5 rounded-md bg-red-50 text-[#d71920] text-xs font-bold hover:bg-red-100 transition-colors"
                >
                  Recruiter Portal
                </button>
              )}
              <button
                onClick={onLogout}
                className="text-xs font-semibold text-gray-500 hover:text-red-600 underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onOpenLogin(); }}
                className="px-4 py-2 text-xs font-bold text-[#d71920] bg-white border border-[#d71920] rounded-md hover:bg-red-50 transition-colors"
                id="nav-login-btn"
              >
                Login
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onOpenRegister(); }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#d71920] rounded-md hover:bg-[#b8141a] shadow-xs transition-colors"
                id="nav-register-btn"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-[#d71920] focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-5 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2.5 text-sm font-semibold text-gray-800">
            <button onClick={() => scrollTo('categories')} className={`text-left py-1 ${activeSection === 'categories' ? 'text-[#d71920]' : 'text-gray-800 hover:text-[#d71920]'}`}>
              Categories
            </button>
            <button onClick={() => scrollTo('jobs')} className={`text-left py-1 ${activeSection === 'jobs' ? 'text-[#d71920]' : 'text-gray-800 hover:text-[#d71920]'}`}>
              Find Jobs
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenPostJob(); }}
              className={`text-left py-1 ${activeSection === 'employer' ? 'text-[#d71920]' : 'text-gray-800 hover:text-[#d71920]'}`}
            >
              Post a Job
            </button>
            <button onClick={() => scrollTo('about')} className={`text-left py-1 ${activeSection === 'about' ? 'text-[#d71920]' : 'text-gray-800 hover:text-[#d71920]'}`}>
              About
            </button>
            <button onClick={() => scrollTo('contact')} className={`text-left py-1 ${activeSection === 'contact' ? 'text-[#d71920]' : 'text-gray-800 hover:text-[#d71920]'}`}>
              Contact
            </button>
            <button onClick={() => { setMobileMenuOpen(false); onOpenSavedJobs(); }} className="text-left py-1 hover:text-[#d71920] flex items-center gap-2">
              <Bookmark className="w-4 h-4" /> Saved Jobs
            </button>
          </div>

          <div className="pt-3 border-t border-gray-100">
            {user ? (
              <div className="space-y-2 pt-1">
                <span className="block text-xs font-medium text-gray-700">Logged in as <b>{user.name}</b> ({user.role})</span>
                <div className="flex items-center gap-3">
                  {user.role === 'employer' && <button onClick={() => { setMobileMenuOpen(false); onOpenRecruiterPortal(); }} className="text-xs font-bold text-[#d71920]">Recruiter Portal</button>}
                  <button onClick={onLogout} className="text-xs font-bold text-red-600 underline">Logout</button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); onOpenLogin(); }}
                  className="py-2.5 text-center text-xs font-bold text-gray-800 border border-gray-300 rounded-md"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); onOpenRegister(); }}
                  className="py-2.5 text-center text-xs font-bold text-white bg-[#d71920] rounded-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
