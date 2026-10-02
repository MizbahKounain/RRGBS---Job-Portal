import React from 'react';
import {
  Phone,
  Mail,
  Sparkles,
  Briefcase,
  Home,
  ShoppingBag,
} from 'lucide-react';
import { RRGBSLogo } from '../common/RRGBSLogo';

interface HomeTopBarProps {
  currentPortal: 'home' | 'jobs' | 'services' | 'store';
  onSwitchPortal: (portal: 'home' | 'jobs' | 'services' | 'store') => void;
}

export const HomeTopBar: React.FC<HomeTopBarProps> = ({
  currentPortal,
  onSwitchPortal,
}) => {
  const navButtonClass = (portal: HomeTopBarProps['currentPortal']) =>
    `flex items-center justify-center gap-1.5
     px-3.5 py-1.5
     rounded-md
     text-sm font-semibold
     whitespace-nowrap
     transition-all duration-150
     cursor-pointer
     ${
       currentPortal === portal
         ? 'bg-[#d71920] text-white shadow-sm'
         : 'text-gray-400 hover:text-white hover:bg-gray-700/60'
     }`;

  return (
    <header className="w-full bg-[#111111] text-white border-b border-gray-800">

      {/* =========================================================
          DESKTOP HEADER
          ========================================================= */}
      <div className="hidden lg:grid w-[96%] max-w-[1600px] mx-auto h-[58px] grid-cols-[1fr_auto_1fr] items-center">

        {/* LEFT — BRAND */}
        <div className="flex items-center justify-start min-w-0">
          <div className="flex items-center gap-3 min-w-0">

            <RRGBSLogo
              size={28}
              className="shadow-none shrink-0"
            />

            <span className="text-sm font-semibold text-gray-200 whitespace-nowrap">
              RRGBS - Reliable People, Professional Services
            </span>

          </div>
        </div>

        {/* CENTER — PORTAL NAVIGATION */}
        <nav className="flex items-center justify-center">
          <div className="flex items-center bg-[#202532] rounded-lg p-1">

            <button
              type="button"
              onClick={() => onSwitchPortal('home')}
              className={navButtonClass('home')}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitchPortal('jobs')}
              className={navButtonClass('jobs')}
            >
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitchPortal('services')}
              className={navButtonClass('services')}
            >
              <Sparkles className="w-4 h-4" />
              <span>Services</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitchPortal('store')}
              className={navButtonClass('store')}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Store</span>
            </button>

          </div>
        </nav>

        {/* RIGHT — CONTACT */}
        <div className="flex items-center justify-end gap-3 text-xs text-gray-300">

          <a
            href="tel:+916363565865"
            className="flex items-center gap-1.5 whitespace-nowrap hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#ff3b42]" />
            <span className="font-semibold">
              +91 63635 65865
            </span>
          </a>

          <span className="text-gray-600">|</span>

          <a
            href="mailto:info@rrgroupofbusinesssolutions.in"
            className="flex items-center gap-1.5 whitespace-nowrap hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#ff3b42]" />
            <span>
              info@rrgroupofbusinesssolutions.in
            </span>
          </a>

        </div>

      </div>


      {/* =========================================================
          MOBILE / TABLET HEADER
          ========================================================= */}
      <div className="lg:hidden w-full">

        {/* MOBILE BRAND ROW */}
        <div className="h-[54px] px-4 flex items-center justify-center">

          <div className="flex items-center gap-2.5">

            <RRGBSLogo
              size={27}
              className="shadow-none shrink-0"
            />

            <span className="text-sm font-semibold text-gray-200 whitespace-nowrap">
              RRGBS — Reliable People. Professional Services.
            </span>

          </div>

        </div>


        {/* MOBILE NAVIGATION ROW */}
        <nav className="px-3 pb-2">

          <div className="w-full flex items-center justify-center bg-[#202532] rounded-lg p-1 overflow-x-auto">

            <button
              type="button"
              onClick={() => onSwitchPortal('home')}
              className={navButtonClass('home')}
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitchPortal('jobs')}
              className={navButtonClass('jobs')}
            >
              <Briefcase className="w-3.5 h-3.5 shrink-0" />
              <span>Jobs</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitchPortal('services')}
              className={navButtonClass('services')}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Services</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitchPortal('store')}
              className={navButtonClass('store')}
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>Store</span>
            </button>

          </div>

        </nav>

      </div>

    </header>
  );
};