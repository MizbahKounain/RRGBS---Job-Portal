import React, { useState, useEffect } from 'react';
import { Job, FilterState, ApplicationSubmission, RecruitmentService, HomeServiceItem } from './types';
import { INITIAL_JOBS } from './data/mockData';
import { api, getToken, setToken } from './api';

// Jobs Portal Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { JobListingsSection } from './components/JobListingsSection';
import { EmployersSection } from './components/EmployersSection';
import { WhySection } from './components/WhySection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { JobDetailModal } from './components/JobDetailModal';
import { ApplyModal } from './components/ApplyModal';
import { PostJobModal } from './components/PostJobModal';
import { ResumeUploadModal } from './components/ResumeUploadModal';
import { AuthModal } from './components/AuthModal';
import { ContactModal } from './components/ContactModal';
import { RecruiterVerificationModal } from './components/RecruiterVerificationModal';
import { RecruiterPortalModal } from './components/RecruiterPortalModal';
import { ToastContainer, ToastMessage } from './components/Toast';

// Home Services Portal Components
import { HomeTopBar } from './components/home/HomeTopBar';
import { HomeNavbar } from './components/home/HomeNavbar';
import { HomeHero } from './components/home/HomeHero';
import { HomeServicesSection } from './components/home/HomeServicesSection';
import { HomeEstimatorSection } from './components/home/HomeEstimatorSection';
import { HomeWhySection } from './components/home/HomeWhySection';
import { HomeProcessSection } from './components/home/HomeProcessSection';
import { HomeCtaSection } from './components/home/HomeCtaSection';
import { HomeContactSection } from './components/home/HomeContactSection';
import { HomeFooter } from './components/home/HomeFooter';
import { FloatingActionButtons } from './components/home/FloatingActionButtons';

// Corporate Services Portal
import { JobPortalServicesView } from './components/services/JobPortalServicesView';

// Business Store Portal
import { RRGBSStoreView } from './components/store/RRGBSStoreView';

export default function App() {
  // Current active portal: 'store' (Online Business Store), 'services', 'jobs', or 'home'
  const [portal, setPortalState] = useState<'home' | 'jobs' | 'services' | 'store'>(() => {
    try {
      const savedPortal = sessionStorage.getItem('rrgbs_active_portal');
      if (savedPortal === 'jobs' || savedPortal === 'services' || savedPortal === 'store' || savedPortal === 'home') {
        return savedPortal;
      }
    } catch {}
    return 'home';
  });

  // Centralized portal switch. Persisting the active portal prevents a browser
  // form/re-render from unexpectedly dropping the user back on Home.
  const setPortal = (next: 'home' | 'jobs' | 'services' | 'store') => {
    try { sessionStorage.setItem('rrgbs_active_portal', next); } catch {}
    setPortalState(next);
  };

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('.rrgbs-reveal'));
    const sectionElements = Array.from(document.querySelectorAll<HTMLElement>('main section'));
    const autoRevealElements = sectionElements.filter((element) => !element.classList.contains('rrgbs-reveal'));
    autoRevealElements.forEach((element) => element.classList.add('rrgbs-section-reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('rrgbs-visible', 'rrgbs-section-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    [...revealElements, ...autoRevealElements].forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      autoRevealElements.forEach((element) => element.classList.remove('rrgbs-section-reveal', 'rrgbs-section-visible'));
    };
  }, [portal]);

  // Home service prefill state for contact section
  const [prefilledService, setPrefilledService] = useState<string>('Home Cleaning & Housekeeping');
  const [prefilledNote, setPrefilledNote] = useState<string>('');

  // -------------------- JOBS PORTAL STATE --------------------
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [isBackendReady, setIsBackendReady] = useState(false);

  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('rrgbs_saved_job_ids_v1');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  const [user, setUser] = useState<{
    name: string;
    role: 'candidate' | 'employer';
    email: string;
    phone?: string;
    companyName?: string;
  } | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    keyword: '',
    location: '',
    jobType: '',
    category: '',
    experience: '',
  });

  const [showingSavedOnly, setShowingSavedOnly] = useState(false);

  // Modals for Jobs Portal
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<Job | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [postJobModalOpen, setPostJobModalOpenState] = useState<boolean>(() => {
    try { return sessionStorage.getItem('rrgbs_post_job_modal') === '1'; } catch { return false; }
  });

  const setPostJobModalOpen = (open: boolean) => {
    try {
      if (open) sessionStorage.setItem('rrgbs_post_job_modal', '1');
      else sessionStorage.removeItem('rrgbs_post_job_modal');
    } catch {}
    setPostJobModalOpenState(open);
  };
  const [recruiterVerificationOpen, setRecruiterVerificationOpen] = useState(false);
  const [recruiterPortalOpen, setRecruiterPortalOpen] = useState(false);
  const [resumeUploadModalOpen, setResumeUploadModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<RecruitmentService | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const jobsScrollPositionRef = React.useRef(0);

  const preserveJobsScroll = () => {
    jobsScrollPositionRef.current = window.scrollY;
  };

  const restoreJobsScroll = () => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: jobsScrollPositionRef.current, behavior: 'auto' });
    });
  };

  const openPostJob = () => {
  // NEVER leave the Jobs portal.
  setPortal('jobs');

  // Save current Jobs page position.
  jobsScrollPositionRef.current = window.scrollY;

  // Close anything that may already be open.
  setPostJobModalOpen(false);
  setRecruiterVerificationOpen(false);

  // User is not logged in.
  if (!user) {
    setPostJobModalOpen(false);
    setAuthMode('login');
    setAuthModalOpen(true);

    addToast(
      'Please sign in as a Job Seeker or Recruiter first.',
      'info'
    );

    return;
  }

  // Job seeker cannot post jobs.
  if (user.role === 'candidate') {
    addToast(
      'Only recruiters can post a job.',
      'info'
    );

    return;
  }

  // Recruiter → verification.
  setRecruiterVerificationOpen(true);
};
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Restore the real backend session and job list.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const result = await api.jobs();
        if (active) setJobs(result.jobs);
        const token = getToken();
        if (token) {
          try {
            const me = await api.me();
            if (active) setUser(me.user);
            const saved = await api.savedJobs();
            if (active) setSavedJobIds(saved.jobIds);
          } catch {
            setToken(null);
            if (active) setUser(null);
          }
        }
      } catch {
        // Keep the built-in jobs if the API is not running yet.
      } finally {
        if (active) setIsBackendReady(true);
      }
    })();
    return () => { active = false; };
  }, []);

  // Keep guest bookmarks locally; signed-in bookmarks are persisted by the API.
  useEffect(() => {
    if (!user) {
      try { localStorage.setItem('rrgbs_saved_job_ids_v1', JSON.stringify(savedJobIds)); } catch {}
    }
  }, [savedJobIds, user]);

  // Refresh saved jobs whenever a real backend session is established.
  useEffect(() => {
    if (!user || !getToken()) return;
    api.savedJobs().then(result => setSavedJobIds(result.jobIds)).catch(() => {});
  }, [user]);

  // Handle Home Service selection
  const handleSelectHomeService = (service: HomeServiceItem) => {
    setPrefilledService(service.title);
    setPrefilledNote(`I am looking for ${service.title} services. Please coordinate available staff and pricing.`);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    addToast(`Selected "${service.title}". Complete your contact details below.`, 'info');
  };

  // Handle Home Estimator Plan selection
  const handleSelectEstimatorPlan = (serviceName: string, optionLabel: string) => {
    setPrefilledService(serviceName);
    setPrefilledNote(`Interested in booking plan: ${optionLabel}. Please confirm slot and personnel.`);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    addToast(`Selected "${optionLabel}". Form updated below.`, 'info');
  };

  const scrollToContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // -------------------- JOBS HANDLERS --------------------
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      jobType: '',
      category: '',
      experience: '',
    });
    setShowingSavedOnly(false);
  };

  const handleToggleSaveJob = async (jobId: string) => {
    const exists = savedJobIds.includes(jobId);
    if (user) {
      try {
        if (exists) await api.unsaveJob(jobId);
        else await api.saveJob(jobId);
        setSavedJobIds(prev => exists ? prev.filter(id => id !== jobId) : [...prev, jobId]);
        addToast(exists ? 'Removed job from your saved list.' : 'Job saved to your bookmarks!', exists ? 'info' : 'success');
      } catch (error) {
        addToast(error instanceof Error ? error.message : 'Could not update saved jobs.', 'error');
      }
      return;
    }
    setSavedJobIds(prev => exists ? prev.filter(id => id !== jobId) : [...prev, jobId]);
    addToast(exists ? 'Removed job from your saved list.' : 'Job saved to your bookmarks!', exists ? 'info' : 'success');
  };

  const handleJobCreated = (newJob: Job) => {
    setJobs(prev => [newJob, ...prev.filter(job => job.id !== newJob.id)]);
    addToast(`"${newJob.title}" has been published!`, 'success');
    handleResetFilters();
    // Publishing a job must not move the recruiter to another section/page.
    restoreJobsScroll();
  };

  const handleApplicationSubmitted = (submission: ApplicationSubmission) => {
    try {
      const stored = localStorage.getItem('rrgbs_applications_v1');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('rrgbs_applications_v1', JSON.stringify([submission, ...existing]));
    } catch {
      // ignore
    }
    addToast(`Application for ${submission.jobTitle} submitted!`, 'success');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      {/* Common Top Bar for ALL Portals */}
<HomeTopBar
  currentPortal={portal}
  onSwitchPortal={(p) => {
    if (p === portal) return;
    setPortal(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
/>

      <div key={portal} className="flex-1 rrgbs-portal-transition">
      {portal === 'store' ? (
        /* ==================== RRGBS ONLINE BUSINESS STORE ==================== */
        <div className="flex-1 flex flex-col">
          <RRGBSStoreView
            onSwitchPortal={(p) => {
              // If the user clicks the already-active portal, stay exactly where they are.
              // Only reset scroll when actually switching to a different portal.
              if (p === portal) return;
              setPortal(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={(msg, type) => addToast(msg, type)}
          />
        </div>
      ) : portal === 'services' ? (
        /* ==================== RRGBS CORPORATE & STAFFING SERVICES PORTAL ==================== */
        <div className="flex-1 flex flex-col">
          <JobPortalServicesView
            onSwitchPortal={(p) => {
              setPortal(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenContact={(serv) => {
              setSelectedServiceForContact(serv || null);
              setContactModalOpen(true);
            }}
          />
        </div>
      ) : portal === 'home' ? (
        /* ==================== RRGBS HOME SERVICES PORTAL ==================== */
        <div className="flex-1 flex flex-col">
          {/* Main Navigation */}
          <HomeNavbar onRequestService={scrollToContact} />

          <main className="flex-1">
            {/* Hero Section */}
            <HomeHero onRequestService={scrollToContact} />

            {/* Complete Home Service Solutions Section */}
            <HomeServicesSection onSelectService={handleSelectHomeService} />

            {/* Interactive Pricing & Plan Estimator */}
            <HomeEstimatorSection onSelectOption={handleSelectEstimatorPlan} />

            {/* Why RRGBS Section */}
            <HomeWhySection />

            {/* How RRGBS Works 4-Step Process Section */}
            <HomeProcessSection />

            {/* Need a Home Service CTA Section */}
            <HomeCtaSection onRequestService={scrollToContact} />

            {/* Request a Home Service / Contact Section */}
            <HomeContactSection
              prefilledService={prefilledService}
              prefilledNote={prefilledNote}
            />
          </main>

          {/* Footer */}
          <HomeFooter
            onSwitchToJobs={() => {
              setPortal('jobs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Floating Action Buttons (Phone & WhatsApp) */}
          <FloatingActionButtons />
        </div>
      ) : (
        /* ==================== RRGBS JOBS & STAFFING PORTAL ==================== */
        <div className="flex-1 flex flex-col bg-[#f6f7f9]">
          <Navbar
            onOpenPostJob={openPostJob}
            onOpenRecruiterPortal={() => { preserveJobsScroll(); setRecruiterPortalOpen(true); restoreJobsScroll(); }}
            onOpenLogin={() => {
              setAuthMode('login');
              setAuthModalOpen(true);
            }}
            onOpenRegister={() => {
              setAuthMode('register');
              setAuthModalOpen(true);
            }}
            onOpenSavedJobs={() => {
              setShowingSavedOnly(true);
              setTimeout(() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
            }}
            user={user}
            onLogout={() => {
              setToken(null);
              setUser(null);
              addToast('You have been logged out.', 'info');
            }}
          />

          <main className="flex-1">
            <HeroSection
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearchSubmit={() => {
                const el = document.getElementById('jobs');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              totalJobsCount={jobs.length}
              jobs={jobs}
            />

            <CategoriesSection
              selectedCategory={filters.category}
              onSelectCategory={(cat) => {
                setFilters((prev) => ({
                  ...prev,
                  category: prev.category === cat ? '' : cat,
                }));
                setTimeout(() => {
                  const el = document.getElementById('jobs');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />

            <JobListingsSection
              jobs={jobs}
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              savedJobIds={savedJobIds}
              onToggleSaveJob={handleToggleSaveJob}
              onSelectJobForDetail={(job) => setSelectedJobForDetail(job)}
              onApplyForJob={(job) => setSelectedJobForApply(job)}
              showingSavedOnly={showingSavedOnly}
              onToggleShowingSavedOnly={() => setShowingSavedOnly(!showingSavedOnly)}
            />

            <EmployersSection
              onOpenPostJob={openPostJob}
              onOpenContact={() => {
                setSelectedServiceForContact(null);
                setContactModalOpen(true);
              }}
            />

            <WhySection />

            <CtaSection
              onOpenRegister={() => {
                setAuthMode('register');
                setAuthModalOpen(true);
              }}
              onOpenResumeUpload={() => setResumeUploadModalOpen(true)}
            />
          </main>

          <Footer
            onOpenPostJob={openPostJob}
            onOpenLogin={() => {
              setAuthMode('login');
              setAuthModalOpen(true);
            }}
            onOpenRegister={() => {
              setAuthMode('register');
              setAuthModalOpen(true);
            }}
            onOpenResumeUpload={() => setResumeUploadModalOpen(true)}
            onOpenContact={() => {
              setSelectedServiceForContact(null);
              setContactModalOpen(true);
            }}
            onSelectCategory={(cat) => {
              setFilters((prev) => ({ ...prev, category: cat }));
              const el = document.getElementById('jobs');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />


        </div>
      )}
      </div>

      {/* Job modals are intentionally rendered outside the animated portal wrapper.
          A CSS transform on an ancestor changes how position:fixed is laid out, which
          previously made Post a Job / Recruiter Portal appear at the page bottom. */}
      <JobDetailModal
        job={selectedJobForDetail}
        onClose={() => setSelectedJobForDetail(null)}
        onApply={(job) => setSelectedJobForApply(job)}
        isSaved={selectedJobForDetail ? savedJobIds.includes(selectedJobForDetail.id) : false}
        onToggleSave={handleToggleSaveJob}
      />

      <ApplyModal
        job={selectedJobForApply}
        onClose={() => setSelectedJobForApply(null)}
        onSubmitApplication={handleApplicationSubmitted}
      />

      <PostJobModal
        isOpen={postJobModalOpen}
        onClose={() => setPostJobModalOpen(false)}
        onJobCreated={handleJobCreated}
        defaultCompanyName={user?.role === 'employer' ? (user.companyName || '') : ''}
      />

      <RecruiterVerificationModal
  isOpen={recruiterVerificationOpen}
  user={user}
  onClose={() => {
    setRecruiterVerificationOpen(false);
  }}
  onVerified={(updatedUser) => {
  // 1. Stay in the Jobs portal.
  setPortal('jobs');

  // 2. Update the logged-in recruiter.
  setUser(updatedUser);

  // 3. Close recruiter verification.
  setRecruiterVerificationOpen(false);

  // 4. Open the REAL job posting form after React
  //    has completed the Jobs portal state update.
  // Open the real job form only after the Jobs portal has rendered.
  requestAnimationFrame(() => {
    setPortal('jobs');
    setPostJobModalOpen(true);
  });
}}
/>

      <RecruiterPortalModal
        isOpen={recruiterPortalOpen}
        onClose={() => setRecruiterPortalOpen(false)}
      />

      <ResumeUploadModal
        isOpen={resumeUploadModalOpen}
        onClose={() => setResumeUploadModalOpen(false)}
        onSuccess={(candidateName) => {
          addToast(`Resume registered for ${candidateName}!`, 'success');
        }}
      />

      {/* Authentication Modal is rendered outside portal transition wrappers so fixed positioning and z-index
          remain reliable on the Jobs page. */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(newUser) => {
  setUser(newUser);

  // IMPORTANT:
  // Login/register from Jobs must stay in Jobs.
  setPortal('jobs');

  addToast(
    `Welcome, ${newUser.name}! Signed in as ${newUser.role}.`,
    'success'
  );
}}
      />

      {/* Shared Contact Modal (accessible across all portals) */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        service={selectedServiceForContact}
      />

      {/* Shared Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
