import React from 'react';
import { PROCESS_STEPS } from '../../data/homeServicesData';

export const HomeProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 bg-[#111111] text-white rrgbs-reveal">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        {/* Section Head */}
        <div className="text-center max-w-[750px] mx-auto mb-14">
          <div className="text-[#ff3b42] uppercase text-xs sm:text-sm font-extrabold tracking-[1.5px] mb-2">
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            How RRGBS Home Services Works
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            A simple, transparent process from your first enquiry to doorstep service completion.
          </p>
        </div>

        {/* 4 Process Boxes matching template */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="text-center p-7 sm:p-8 border border-neutral-800 rounded-[10px] bg-neutral-900/60 hover:border-neutral-700 transition-colors relative flex flex-col items-center"
            >
              <div className="w-[50px] h-[50px] rounded-full bg-[#d71920] flex items-center justify-center font-black text-lg text-white mb-4 shadow-sm">
                {step.step}
              </div>
              <h3 className="text-lg font-bold text-gray-100 mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
