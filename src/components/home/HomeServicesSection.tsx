import React from 'react';
import { HomeServiceItem } from '../../types';
import { HOME_SERVICES } from '../../data/homeServicesData';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

interface HomeServicesSectionProps {
  onSelectService: (service: HomeServiceItem) => void;
}

export const HomeServicesSection: React.FC<HomeServicesSectionProps> = ({
  onSelectService,
}) => {
  return (
    <section id="services" className="py-20 bg-[#f7f7f7] rrgbs-reveal">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        {/* Section Head */}
        <div className="text-center max-w-[750px] mx-auto mb-12">
          <div className="text-[#d71920] uppercase text-xs sm:text-sm font-extrabold tracking-[1.5px] mb-2">
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Complete Home Service Solutions
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Flexible home-support services designed for individuals,
            families, senior citizens, and residential requirements.
          </p>
        </div>

        {/* 6 Services Grid matching template */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOME_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-[#e6e6e6] rounded-[10px] p-7 transition-all duration-300 relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
            >
              {/* Top Red Hover Line */}
              <div className="absolute top-0 left-0 h-1 w-0 bg-[#d71920] transition-all duration-300 group-hover:w-full" />

              <div>
                {/* Header with Icon & Optional Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-[58px] h-[58px] rounded-[12px] bg-[#fff0f0] text-3xl flex items-center justify-center select-none group-hover:scale-105 transition-transform">
                    {service.icon}
                  </div>
                  {service.badge && (
                    <span className="text-[11px] font-bold text-[#d71920] bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#d71920] transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Checklist with red checkmarks */}
                <ul className="space-y-2 mb-6 text-sm text-gray-700">
                  {service.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#d71920] font-black text-sm shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action Area */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                {service.startingPrice && (
                  <span className="text-xs font-semibold text-gray-500">
                    {service.startingPrice}
                  </span>
                )}
                <button
                  onClick={() => onSelectService(service)}
                  className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#d71920] hover:text-[#a90000] p-1.5 rounded transition-all cursor-pointer group-hover:translate-x-0.5"
                >
                  <span>Request Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
