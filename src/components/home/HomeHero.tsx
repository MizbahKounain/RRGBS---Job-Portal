import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Award } from 'lucide-react';

interface HomeHeroProps {
  onRequestService: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onRequestService }) => {
  const firstLine = 'Reliable Services.';
  const secondLine = 'At Your Doorstep.';
  const [firstTyped, setFirstTyped] = useState('');
  const [secondTyped, setSecondTyped] = useState('');

  useEffect(() => {
    let index = 0;
    const firstTimer = window.setInterval(() => {
      index += 1;
      setFirstTyped(firstLine.slice(0, index));
      if (index >= firstLine.length) window.clearInterval(firstTimer);
    }, 72);

    return () => window.clearInterval(firstTimer);
  }, []);

  useEffect(() => {
    if (firstTyped.length !== firstLine.length) return;

    let index = 0;
    const secondTimer = window.setInterval(() => {
      index += 1;
      setSecondTyped(secondLine.slice(0, index));
      if (index >= secondLine.length) window.clearInterval(secondTimer);
    }, 72);

    return () => window.clearInterval(secondTimer);
  }, [firstTyped]);

  return (
    <section
      id="home"
      className="relative min-h-[570px] flex items-center overflow-hidden text-white py-16 sm:py-20"
      style={{
        background: `linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 65%, rgba(0,0,0,0.4) 100%), linear-gradient(135deg, #1b1b1b 0%, #3a3a3a 100%)`,
      }}
    >
      {/* Decorative Red Geometric Circle Accent matching template */}
      <div
        className="absolute -right-28 -bottom-40 w-[450px] sm:w-[500px] h-[450px] sm:h-[500px] rounded-full pointer-events-none opacity-80 rrgbs-float"
        style={{
          border: '70px solid rgba(215, 25, 32, 0.35)',
        }}
      />

      <div
        className="absolute right-[18%] top-[18%] w-40 h-40 rounded-full bg-[#d71920]/20 blur-3xl pointer-events-none rrgbs-glow-pulse"
      />

      <div className="w-[92%] max-w-[1200px] mx-auto relative z-10">
        <div className="max-w-[720px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#d71920] animate-in fade-in slide-in-from-bottom-2 duration-700 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <span>RRGBS HOME SERVICES</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight leading-[1.08] mb-5 min-h-[135px] sm:min-h-[150px] lg:min-h-[135px]" aria-label="Reliable Services. At Your Doorstep.">
            <span>{firstTyped}</span><span className="inline-block w-[3px] h-[0.9em] bg-white align-[-0.08em] ml-1 rrgbs-type-cursor" aria-hidden="true" />
            <br />
            <span className="text-[#ff3138]">{secondTyped}</span>{firstTyped.length === firstLine.length && <span className="inline-block w-[3px] h-[0.9em] bg-[#ff3138] align-[-0.08em] ml-1 rrgbs-type-cursor" aria-hidden="true" />}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-200 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 leading-relaxed mb-8 max-w-[650px]">
            RRGBS Home Services connects you with professional support for
            home cleaning, housekeeping, elderly care, nursing assistance,
            security, maintenance and other essential home services across Karnataka.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500">
            <button
  onClick={() => {
    const element = document.getElementById('request-service');

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }}
  className="bg-[#d71920] hover:bg-[#a90000] text-white px-7 py-3.5 rounded font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-lg active:scale-98 cursor-pointer flex items-center gap-2"
>
  <span>Request a Service</span>
  <ArrowRight className="w-4 h-4" />
</button>

            <a
              href="https://wa.me/916363565865?text=Hello%20RRGBS,%20I%20need%20a%20Home%20Service."
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-gray-100 text-[#111] px-7 py-3.5 rounded font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5 shadow-lg active:scale-98 inline-flex items-center gap-2"
            >
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Trust Highlights Row */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ff3b42] shrink-0" />
              <span>100% Verified Personnel</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ff3b42] shrink-0" />
              <span>Timely Coordination</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Award className="w-4 h-4 text-[#ff3b42] shrink-0" />
              <span>Shivamogga &amp; Karnataka</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
