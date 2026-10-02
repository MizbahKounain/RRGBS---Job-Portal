import React from 'react';
import { CORPORATE_SERVICES } from '../data/servicesData';
import { RecruitmentService } from '../types';
import { ArrowRight, Check, Sparkles, Building2 } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: RecruitmentService) => void;
  onViewAllCorporateServices?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewAllCorporateServices,
}) => {
  return (
    <section id="services" className="py-16 sm:py-20 bg-white border-b border-gray-200">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="text-xs uppercase font-extrabold tracking-wider text-[#d71920] mb-1">
            Enterprise &amp; Staffing Solutions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Complete Business &amp; Workforce Solutions
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            RRGBS provides integrated Staffing, Recruitment, HR, Payroll, Manpower, Facility Management, BPO, RPO, Outsourcing and Consulting solutions for businesses across India.
          </p>
        </div>

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORPORATE_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 hover:border-[#d71920]/40 rounded-xl p-6 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
              id={`service-card-${service.id}`}
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#d71920] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-lg bg-red-50 text-2xl flex items-center justify-center">
                    {service.icon}
                  </div>
                  <span className="text-xs font-black text-gray-400">
                    {service.number}
                  </span>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2 group-hover:text-[#d71920] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Key feature bullets */}
                <div className="space-y-1.5 pt-3 border-t border-gray-100">
                  {service.items.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Check className="w-3.5 h-3.5 text-[#d71920] shrink-0 stroke-[2.5]" />
                      <span className="truncate">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() =>
                    onSelectService({
                      id: service.id,
                      title: service.title,
                      icon: service.icon,
                      description: service.description,
                      features: service.items,
                    })
                  }
                  className="w-full text-xs font-bold text-gray-700 hover:text-[#d71920] flex items-center justify-between group/btn cursor-pointer py-1.5 px-2 rounded-md hover:bg-red-50/50 transition-colors"
                >
                  <span>Inquire for Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-[#d71920]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Corporate Services Action Banner */}
        {onViewAllCorporateServices && (
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-gray-900 to-[#181818] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d71920] flex items-center justify-center text-white shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-white">
                  Looking for Full Enterprise &amp; Workforce Solutions?
                </h4>
                <p className="text-xs text-gray-400">
                  Explore our dedicated corporate services suite covering staffing, compliance, BPO, RPO, and industry sectors.
                </p>
              </div>
            </div>
            <button
              onClick={onViewAllCorporateServices}
              className="bg-[#d71920] hover:bg-[#b01319] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Open Services Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

