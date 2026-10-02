import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingActionButtons: React.FC = () => {
  return (
    <>
      {/* Floating Call Button */}
      <a
        href="tel:+916363565865"
        className="fixed right-5 bottom-[88px] z-50 w-[56px] h-[56px] rounded-full bg-[#d71920] hover:bg-[#a90000] text-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 group"
        title="Call RRGBS (+91 63635 65865)"
        aria-label="Call RRGBS"
      >
        <Phone className="w-6 h-6 animate-bounce" />
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Call +91 63635 65865
        </span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/916363565865?text=Hello%20RRGBS,%20I%20need%20a%20Home%20Service."
        target="_blank"
        rel="noreferrer"
        className="fixed right-5 bottom-5 z-50 w-[56px] h-[56px] rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 group"
        title="WhatsApp RRGBS"
        aria-label="WhatsApp RRGBS"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-2.5 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Chat on WhatsApp
        </span>
      </a>
    </>
  );
};
