import React from 'react';
import { WHY_RRGBS_HOME } from '../../data/homeServicesData';

export const HomeWhySection: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-white rrgbs-reveal">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* Left Visual Banner matching why-image */}
          <div
            className="min-h-[430px] rounded-[15px] p-10 flex items-center justify-center text-center text-white relative overflow-hidden shadow-xl"
            style={{
              background: `linear-gradient(135deg, rgba(215,25,32,.92) 0%, rgba(0,0,0,.82) 100%), linear-gradient(135deg, #444, #111)`
            }}
          >
            <div className="relative z-10 max-w-sm">
              <div className="text-7xl mb-4 select-none drop-shadow-md">🏡</div>
              <h3 className="text-3xl sm:text-4xl font-black mb-3 tracking-tight">
                Home. Care. Support.
              </h3>
              <p className="text-base text-gray-200 leading-relaxed font-medium">
                Professional service coordination from a trusted RRGBS team with proven manpower expertise.
              </p>
            </div>

            {/* Subtle background circles */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-black/20 pointer-events-none" />
          </div>

          {/* Right Why Pillars */}
          <div>
            <div className="text-[#d71920] uppercase text-xs sm:text-sm font-extrabold tracking-[1.5px] mb-2">
              WHY RRGBS
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-[1.2] mb-4">
              Service Support You Can Depend On
            </h2>

            <p className="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed">
              RRGBS combines manpower experience and service coordination capabilities
              to provide organized, reliable support for residential and domestic requirements.
            </p>

            <div className="space-y-5">
              {WHY_RRGBS_HOME.map((item) => (
                <div key={item.number} className="flex gap-4 items-start group">
                  <div className="w-[42px] h-[42px] min-w-[42px] rounded-full bg-[#d71920] text-white flex items-center justify-center font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                    {item.number}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-gray-900 mb-1 group-hover:text-[#d71920] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
