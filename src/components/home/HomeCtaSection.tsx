import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HomeCtaSectionProps {
  onRequestService: () => void;
}

export const HomeCtaSection: React.FC<HomeCtaSectionProps> = ({
  onRequestService,
}) => {
  return (
    <section className="bg-[#d71920] text-white py-14 rrgbs-reveal">
      <div className="w-[92%] max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 leading-tight">
            Need a Home Service?
          </h2>
          <p className="text-sm sm:text-base text-red-100 font-medium">
            Share your requirement with RRGBS and our experienced coordination team will assist you promptly.
          </p>
        </div>

        <div className="shrink-0">
          <button
            onClick={onRequestService}
            className="bg-white hover:bg-gray-100 text-[#111111] px-8 py-3.5 rounded font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-lg active:scale-98 cursor-pointer flex items-center gap-2"
          >
            <span>Request a Service</span>
            <ArrowRight className="w-4 h-4 text-[#d71920]" />
          </button>
        </div>
      </div>
    </section>
  );
};
