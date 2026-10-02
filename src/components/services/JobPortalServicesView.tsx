import React, { useState, useEffect } from 'react';
import {
  CORPORATE_SERVICES,
  DETAILED_CAPABILITIES,
  INDUSTRY_SECTORS,
  HOW_WE_WORK_STEPS,
  CORPORATE_STATS,
  CORPORATE_FAQS,
  CorporateService,
} from '../../data/servicesData';
import { RRGBSLogo } from '../common/RRGBSLogo';
import {
  Phone,
  Mail,
  ArrowRight,
  Check,
  Menu,
  X,
  ChevronDown,
  ArrowUp,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { RecruitmentService } from '../../types';

interface JobPortalServicesViewProps {
  onSwitchPortal: (portal: 'home' | 'jobs' | 'services' | 'store') => void;
  onOpenContact: (prefillService?: RecruitmentService | null) => void;
}

export const JobPortalServicesView: React.FC<JobPortalServicesViewProps> = ({
  onSwitchPortal,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeSection, setActiveSection] = useState('services');

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ids = ['services', 'capabilities', 'industries', 'process', 'faq'];
    const updateActive = () => {
      const marker = window.scrollY + 125;
      let current = 'services';
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= marker) current = id;
      }
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
    `relative py-1 cursor-pointer transition-all duration-300 ${activeSection === id ? 'text-[#c40000]' : 'text-[#333333] hover:text-[#c40000]'} after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:bg-[#c40000] after:transition-all after:duration-300 ${activeSection === id ? 'after:w-full' : 'after:w-0'}`;

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleInquireService = (serv: CorporateService) => {
    const adapted: RecruitmentService = {
      id: serv.id,
      title: serv.title,
      icon: serv.icon,
      description: serv.description,
      features: serv.items,
    };
    onOpenContact(adapted);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#c40000] selection:text-white">
     

      {/* -------------------- 2. STICKY HEADER -------------------- */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#e7e7e7] shadow-xs">
        <div className="w-[92%] max-w-[1400px] mx-auto min-h-[78px] grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group cursor-pointer"
            id="brand-logo-services"
          >
            <RRGBSLogo size={46} />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-2xl tracking-tight text-[#111111]">
                  RR<span className="text-[#c40000]">GBS</span>
                </span>
                <span className="text-[9.5px] font-extrabold text-[#c40000] bg-red-50 border border-red-200/80 px-2 py-0.5 rounded-full uppercase">
                  BUSINESS SOLUTIONS
                </span>
              </div>
              <span className="text-[8.5px] tracking-[1.5px] text-gray-500 font-bold uppercase mt-1">
                RR GROUP OF BUSINESS SOLUTIONS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center gap-7 text-[14px] font-bold text-[#333333]">
            <button
              onClick={() => scrollToSection('services')}
              className={navClass('services')}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className={navClass('capabilities')}
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollToSection('industries')}
              className={navClass('industries')}
            >
              Industries
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className={navClass('process')}
            >
              How We Work
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className={navClass('faq')}
            >
              FAQ
            </button>
            <button
              onClick={() => onOpenContact(null)}
              className="bg-[#c40000] hover:bg-[#8e0000] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow"
            >
              Contact Us
            </button>
          </nav>

          <div aria-hidden="true" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-800 hover:text-[#c40000] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-5 shadow-xl flex flex-col gap-4 text-sm font-bold text-gray-800">
            <button
              onClick={() => scrollToSection('services')}
              className={`text-left py-1 ${activeSection === 'services' ? 'text-[#c40000]' : 'text-gray-700 hover:text-[#c40000]'}`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('capabilities')}
              className={`text-left py-1 ${activeSection === 'capabilities' ? 'text-[#c40000]' : 'text-gray-700 hover:text-[#c40000]'}`}
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollToSection('industries')}
              className={`text-left py-1 ${activeSection === 'industries' ? 'text-[#c40000]' : 'text-gray-700 hover:text-[#c40000]'}`}
            >
              Industries
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className={`text-left py-1 ${activeSection === 'process' ? 'text-[#c40000]' : 'text-gray-700 hover:text-[#c40000]'}`}
            >
              How We Work
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className={`text-left py-1 ${activeSection === 'faq' ? 'text-[#c40000]' : 'text-gray-700 hover:text-[#c40000]'}`}
            >
              FAQ
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact(null);
              }}
              className="bg-[#c40000] text-white py-3 rounded-lg text-center mt-2 font-bold"
            >
              Contact Us
            </button>
          </div>
        )}
      </header>

      {/* -------------------- 3. HERO SECTION -------------------- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#141414] to-[#1e1e1e] text-white py-20 lg:py-28 border-b border-gray-900">
        {/* Decorative circle glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border-[60px] border-[#c40000]/15 pointer-events-none" />
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 h-80 rounded-full bg-[#c40000]/10 blur-3xl pointer-events-none" />

        <div className="w-[92%] max-w-[1200px] mx-auto relative z-10">
          <div className="max-w-[850px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 text-gray-200">
              <span className="w-2 h-2 rounded-full bg-[#ff3b3b] animate-pulse" />
              INTEGRATED BUSINESS &amp; WORKFORCE SOLUTIONS
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
              Business Solutions That{' '}
              <span className="text-[#ff3b3b]">Move Your Business Forward.</span>
            </h1>

            {/* Subparagraph */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-normal leading-relaxed mb-8 max-w-[760px]">
              RRGBS provides integrated Staffing, Recruitment, HR, Payroll, Manpower, Facility
              Management, BPO, RPO, Outsourcing and Consulting solutions for businesses across India.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('services')}
                className="bg-[#c40000] hover:bg-[#a90000] text-white px-7 py-3.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-red-600/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenContact(null)}
                className="bg-transparent hover:bg-white hover:text-[#111111] text-white border border-white px-7 py-3.5 rounded-lg font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer"
              >
                Talk to RRGBS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 4. SERVICES GRID (01 - 09) -------------------- */}
      <section id="services" className="py-20 bg-white border-b border-[#e7e7e7]">
        <div className="w-[92%] max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-[760px] mx-auto mb-14">
            <div className="text-[#c40000] uppercase tracking-[2px] text-xs font-black mb-2">
              Our Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mb-3">
              Complete Business &amp; Workforce Solutions
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              One partner for your people, processes, workforce and business operations.
            </p>
          </div>

          {/* 3x3 Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORPORATE_SERVICES.map((serv) => (
              <div
                key={serv.id}
                className="group relative bg-white border border-[#e7e7e7] rounded-2xl p-7 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-250 flex flex-col justify-between overflow-hidden"
              >
                {/* Red sliding bar on hover */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-[#c40000] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-250" />

                <div>
                  {/* Service Number */}
                  <div className="text-xs font-black text-gray-400 mb-3 tracking-wider">
                    {serv.number}
                  </div>

                  {/* Icon */}
                  <div className="w-13 h-13 rounded-xl bg-[#fff0f0] text-[#c40000] flex items-center justify-center text-2xl mb-4 shadow-xs">
                    {serv.icon}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#111111] mb-2 group-hover:text-[#c40000] transition-colors">
                    {serv.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5">
                    {serv.description}
                  </p>

                  {/* Bullet Checklist */}
                  <ul className="space-y-2 pt-4 border-t border-gray-100">
                    {serv.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-gray-700">
                        <Check className="w-3.5 h-3.5 text-[#c40000] shrink-0 mt-0.5 stroke-[3]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleInquireService(serv)}
                    className="w-full py-2 px-3 text-xs font-bold text-gray-700 hover:text-[#c40000] flex items-center justify-between group/btn cursor-pointer bg-gray-50 hover:bg-red-50/60 rounded-lg transition-colors"
                  >
                    <span>Inquire for Solution</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#c40000] group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 5. WHY RRGBS / FEATURE SECTION -------------------- */}
      <section className="py-20 bg-[#f7f7f7] border-b border-[#e7e7e7]">
        <div className="w-[92%] max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual card */}
            <div className="min-h-[420px] rounded-3xl p-10 flex flex-col justify-end text-white relative overflow-hidden bg-gradient-to-br from-[#111111] via-[#1a1a1a] to-[#252525] shadow-xl border border-gray-800">
              {/* Radial red glow accent */}
              <div className="absolute top-12 left-10 w-64 h-64 bg-[#c40000]/25 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="text-[#ff4b4b] uppercase tracking-[2px] text-xs font-black mb-3">
                  RRGBS Approach
                </div>
                <h3 className="text-3xl sm:text-4xl font-black leading-tight mb-3">
                  One partner.<br />
                  Multiple business solutions.
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  From hiring and workforce deployment to payroll, HR operations and business process outsourcing.
                </p>
              </div>
            </div>

            {/* Content card */}
            <div>
              <div className="text-[#c40000] uppercase tracking-[2px] text-xs font-black mb-2">
                Why RRGBS
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight leading-tight mb-4">
                Built around your business requirements.
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                RRGBS works with organizations to design flexible workforce and business support models based on manpower requirements, operational processes and business objectives.
              </p>

              {/* Check list */}
              <ul className="space-y-3">
                {[
                  'Flexible Staffing Models',
                  'Dedicated Recruitment Support',
                  'Integrated Payroll & HR Operations',
                  'Workforce & Facility Management',
                  'BPO, RPO & Business Process Outsourcing',
                  'Scalable Solutions for Growing Businesses',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 bg-white border border-[#e7e7e7] rounded-xl font-bold text-xs sm:text-sm text-gray-800 flex items-center shadow-xs"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#c40000] text-white flex items-center justify-center text-xs mr-3 shrink-0">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 6. DETAILED SERVICE CAPABILITIES -------------------- */}
      <section id="capabilities" className="py-20 bg-white border-b border-[#e7e7e7]">
        <div className="w-[92%] max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-[760px] mx-auto mb-14">
            <div className="text-[#c40000] uppercase tracking-[2px] text-xs font-black mb-2">
              Service Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mb-3">
              Solutions Designed Around Your Requirements
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Choose individual services or combine multiple solutions into an integrated workforce model.
            </p>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#e7e7e7]">
            {DETAILED_CAPABILITIES.map((cap, idx) => (
              <div
                key={idx}
                className="py-8 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-8 items-start group hover:bg-gray-50/50 px-4 rounded-xl transition-colors"
              >
                <div className="text-[#c40000] font-black text-sm tracking-wide">
                  {cap.no}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#c40000] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-[850px] mb-4">
                    {cap.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cap.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-[#f4f4f4] hover:bg-red-50 hover:text-[#c40000] text-gray-700 px-3 py-1 rounded-full text-xs font-bold transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 7. INDUSTRIES SECTION -------------------- */}
      <section id="industries" className="py-20 bg-[#111111] text-white border-b border-gray-800">
        <div className="w-[92%] max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-[760px] mx-auto mb-14">
            <div className="text-[#ff4b4b] uppercase tracking-[2px] text-xs font-black mb-2">
              Industries
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
              Supporting Multiple Business Sectors
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Workforce and business solutions can be structured according to sector-specific operational requirements.
            </p>
          </div>

          {/* 4x4 Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {INDUSTRY_SECTORS.map((sector) => (
              <div
                key={sector.id}
                className="border border-[#303030] hover:border-[#c40000] bg-[#181818] p-5 rounded-xl font-bold text-xs sm:text-sm text-gray-200 hover:-translate-y-1 transition-all duration-200 flex items-center cursor-default group"
              >
                <span className="text-[#ff4b4b] font-black mr-2.5 text-xs group-hover:scale-110 transition-transform">
                  {sector.number}
                </span>
                <span className="truncate">{sector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 8. HOW WE WORK (PROCESS) -------------------- */}
      <section id="process" className="py-20 bg-white border-b border-[#e7e7e7]">
        <div className="w-[92%] max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-[760px] mx-auto mb-14">
            <div className="text-[#c40000] uppercase tracking-[2px] text-xs font-black mb-2">
              How We Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mb-3">
              Simple, Structured &amp; Scalable
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Our engagement model can be adapted to recruitment, staffing, payroll, outsourcing and consulting requirements.
            </p>
          </div>

          {/* 5-step grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {HOW_WE_WORK_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-white border border-[#e7e7e7] rounded-2xl hover:border-[#c40000]/50 hover:shadow-md transition-all duration-250 flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#c40000] text-white flex items-center justify-center font-black text-sm mb-4 shadow-sm">
                  {step.number}
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-[13px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 9. STATS SECTION -------------------- */}
      <section className="py-16 bg-[#f7f7f7] border-b border-[#e7e7e7]">
        <div className="w-[92%] max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {CORPORATE_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-6 sm:p-8 bg-white border border-[#e7e7e7] rounded-2xl shadow-xs"
              >
                <strong className="block text-[#c40000] text-3xl sm:text-4xl lg:text-5xl font-black leading-none mb-2">
                  {stat.value}
                </strong>
                <span className="text-xs sm:text-sm text-gray-600 font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 10. CTA SECTION -------------------- */}
      <section className="py-16 bg-gradient-to-r from-[#c40000] via-[#a30000] to-[#8e0000] text-white">
        <div className="w-[92%] max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-[700px]">
              <div className="text-[#ffd0d0] uppercase tracking-[2px] text-xs font-black mb-2">
                Let's Work Together
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                Looking for a Staffing or Business Solutions Partner?
              </h2>
              <p className="text-red-100 text-sm sm:text-base leading-relaxed">
                Tell us your requirement and our team can discuss a suitable service model for your organization.
              </p>
            </div>

            <div className="shrink-0 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenContact(null)}
                className="bg-white hover:bg-gray-100 text-[#111111] px-7 py-3.5 rounded-lg font-bold text-sm shadow-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Send Business Enquiry
              </button>
              <a
                href="tel:+916363565865"
                className="bg-black/30 hover:bg-black/50 text-white border border-white/40 px-6 py-3.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 63635 65865</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 11. FAQ ACCORDION SECTION -------------------- */}
      <section id="faq" className="py-20 bg-white border-b border-[#e7e7e7]">
        <div className="w-[92%] max-w-[850px] mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-[#c40000] uppercase tracking-[2px] text-xs font-black mb-2">
              FAQ
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111111] tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Common questions about RRGBS business and workforce services.
            </p>
          </div>

          {/* Accordion list */}
          <div className="space-y-3">
            {CORPORATE_FAQS.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#e7e7e7] rounded-xl overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full bg-white hover:bg-gray-50/80 p-5 flex items-center justify-between text-left font-extrabold text-sm sm:text-base text-gray-900 cursor-pointer transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-[#c40000] text-xl font-black ml-4 shrink-0">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 bg-gray-50/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------- 12. CORPORATE FOOTER -------------------- */}
      <footer className="bg-[#0d0d0d] text-white pt-16 pb-8 border-t border-gray-900 mt-auto">
        <div className="w-[92%] max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2b2b2b]">
            {/* Column 1: Brand (4 cols) */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <RRGBSLogo size={46} />
                <div>
                  <h3 className="font-black text-2xl tracking-tight text-white leading-none">
                    RR<span className="text-[#c40000]">GBS</span>
                  </h3>
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-gray-400 mt-1 block">
                    RR GROUP OF BUSINESS SOLUTIONS
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 max-w-[350px]">
                Integrated Business Solutions, Staffing, Recruitment, HR, Payroll, Manpower, Facility Management, BPO, RPO, Outsourcing &amp; Consulting Services.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-[#c40000]" />
                <span>Pan-India Corporate Services</span>
              </div>
            </div>

            {/* Column 2: Services (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4">
                Services
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Recruitment &amp; Staffing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    HR Solutions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Payroll Outsourcing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Manpower Solutions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Facility Management
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Business Solutions (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4">
                Solutions
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    BPO Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    RPO Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Business Consulting
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('capabilities')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Compliance Support
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('process')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    How We Work
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-4">
                Contact
              </h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>
                  <a
                    href="mailto:info@rrgroupofbusinesssolutions.in"
                    className="hover:text-white transition-colors block truncate"
                  >
                    info@rrgroupofbusinesssolutions.in
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:raghu@rrgroupofbusinesssolutions.in"
                    className="hover:text-white transition-colors block truncate"
                  >
                    raghu@rrgroupofbusinesssolutions.in
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+916363565865"
                    className="hover:text-white transition-colors block font-semibold"
                  >
                    +91 63635 65865
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+917795362779"
                    className="hover:text-white transition-colors block font-semibold"
                  >
                    +91 77953 62779
                  </a>
                </li>
                <li className="text-gray-500 pt-1">
                  Shivamogga, Karnataka, India
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <div>
              © {new Date().getFullYear()} RR Group of Business Solutions. All Rights Reserved.
            </div>
            <div className="font-semibold text-gray-400">
              People. Process. Performance.
            </div>
          </div>
        </div>
      </footer>

      {/* -------------------- 13. FLOATING WHATSAPP & BACK TO TOP -------------------- */}
      <a
        href="https://wa.me/916363565865?text=Hello%20RRGBS%2C%20I%20would%20like%20to%20know%20more%20about%20your%20business%20solutions."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with RRGBS on WhatsApp"
        className="fixed right-5 bottom-5 w-14 h-14 rounded-full bg-[#20b954] text-white flex items-center justify-center text-2xl font-black shadow-xl hover:scale-110 transition-transform duration-200 z-50 group"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">WhatsApp</span>
      </a>

      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed right-5 bottom-22 w-10 h-10 rounded-lg bg-[#111111] hover:bg-[#c40000] text-white flex items-center justify-center shadow-lg transition-all duration-200 z-40 cursor-pointer"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
