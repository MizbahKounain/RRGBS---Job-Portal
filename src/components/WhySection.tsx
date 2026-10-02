import React from 'react';
import { WHY_POINTS, STATS } from '../data/mockData';
import { ShieldCheck, Award, Clock4, Users2 } from 'lucide-react';

export const WhySection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-[#f6f7f9]">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="text-xs uppercase font-extrabold tracking-wider text-[#d71920] mb-1">
            Proven Industry Trust
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Why RRGBS Jobs?
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            A high-efficiency recruitment and workforce platform powered by RR Group of Business Solutions.
          </p>
        </div>

        {/* 3 Why Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {WHY_POINTS.map((item, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-red-50 text-2xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-8 h-8 text-[#d71920] mb-2" />
              <div className="font-extrabold text-gray-900 text-lg sm:text-xl">100% Verified</div>
              <div className="text-xs text-gray-500">Genuine Job Listings</div>
            </div>

            <div className="flex flex-col items-center">
              <Clock4 className="w-8 h-8 text-[#d71920] mb-2" />
              <div className="font-extrabold text-gray-900 text-lg sm:text-xl">24 - 48 Hours</div>
              <div className="text-xs text-gray-500">Candidate Shortlisting</div>
            </div>

            <div className="flex flex-col items-center">
              <Users2 className="w-8 h-8 text-[#d71920] mb-2" />
              <div className="font-extrabold text-gray-900 text-lg sm:text-xl">5,000+ Placed</div>
              <div className="text-xs text-gray-500">Successful Careers</div>
            </div>

            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 text-[#d71920] mb-2" />
              <div className="font-extrabold text-gray-900 text-lg sm:text-xl">Zero Fee Policy</div>
              <div className="text-xs text-gray-500">For Job Seekers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
