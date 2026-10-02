import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Shield, Clock } from 'lucide-react';

interface EstimatorPreset {
  serviceId: string;
  serviceName: string;
  options: {
    label: string;
    description: string;
    priceRange: string;
    frequency: string;
    inclusions: string[];
  }[];
}

const PRESETS: EstimatorPreset[] = [
  {
    serviceId: 'cleaning',
    serviceName: 'Home Cleaning',
    options: [
      {
        label: '1 BHK Deep Cleaning',
        description: 'Thorough scrub of hall, bedroom, kitchen & 1 bathroom',
        priceRange: '₹1,499 – ₹1,999',
        frequency: 'One-time (~4 hours)',
        inclusions: ['Floor machine scrubbing', 'Bathroom sanitization', 'Kitchen oil degreasing', 'Cobweb removal']
      },
      {
        label: '2 BHK Deep Cleaning',
        description: 'Complete top-to-bottom cleaning of 2 bedrooms, hall, kitchen & 2 bathrooms',
        priceRange: '₹2,499 – ₹3,299',
        frequency: 'One-time (~6 hours)',
        inclusions: ['2 Bathrooms deep scrub', 'Balcony cleaning', 'Cupboard exterior wipe', 'Chemical-safe disinfectants']
      },
      {
        label: '3 BHK / Duplex Cleaning',
        description: 'Comprehensive heavy-duty cleaning for spacious apartments and duplexes',
        priceRange: '₹3,799 – ₹4,999',
        frequency: 'One-time (~8 hours)',
        inclusions: ['3 Bathrooms + Balconies', 'Window glass polish', 'Fan & fixture dusting', 'Kitchen chimney outer scrub']
      }
    ]
  },
  {
    serviceId: 'elderly-care',
    serviceName: 'Elderly Care',
    options: [
      {
        label: 'Day Support (8 Hours)',
        description: 'Daily living assistance, feeding, medication reminders & companion walking',
        priceRange: '₹14,000 – ₹18,000',
        frequency: 'Per Month (Mon-Sat)',
        inclusions: ['Mobility assistance', 'Personal hygiene care', 'Friendly companion', 'Daily vital checks']
      },
      {
        label: 'Full Day Care (12 Hours)',
        description: 'Extended supervision for seniors needing continuous daytime care',
        priceRange: '₹18,000 – ₹24,000',
        frequency: 'Per Month',
        inclusions: ['Bed-to-wheelchair transfers', 'Meal assistance', 'Post-hospital monitoring', 'Doctor visit accompaniment']
      },
      {
        label: '24-Hour Live-In Care',
        description: 'Dedicated residential attendant staying with the senior 24/7',
        priceRange: '₹26,000 – ₹34,000',
        frequency: 'Per Month',
        inclusions: ['Round-the-clock presence', 'Night-time emergency watch', 'Complete daily assistance', 'Verified police background']
      }
    ]
  },
  {
    serviceId: 'nursing',
    serviceName: 'Home Nursing',
    options: [
      {
        label: 'Post-Operative Attendant (12h)',
        description: 'Specialized support for patients recovering from surgery or procedures',
        priceRange: '₹800 – ₹1,200',
        frequency: 'Per Day / Shift',
        inclusions: ['Wound dressing assistance', 'IV/Catheter support', 'Vitals recording', 'Physiotherapy mobility aid']
      },
      {
        label: 'Bedridden Patient Care (24h)',
        description: 'Comprehensive bed-care, diaper change, sponge bath & position changes',
        priceRange: '₹1,200 – ₹1,800',
        frequency: 'Per Day / Shift',
        inclusions: ['Bedsore prevention & care', 'Ryle’s tube feeding support', 'Hygiene maintenance', 'Emergency alert protocol']
      }
    ]
  },
  {
    serviceId: 'maintenance',
    serviceName: 'Maintenance & Repairs',
    options: [
      {
        label: 'Electrician Visit',
        description: 'Switch replacement, wiring repair, fan installation, MCB trip fix',
        priceRange: '₹299 + parts',
        frequency: 'Standard inspection',
        inclusions: ['Certified technician', '30-day service warranty', 'Safety tested tools']
      },
      {
        label: 'Plumbing Visit',
        description: 'Tap leak, pipe blockage, flush tank repair, sanitary fitting',
        priceRange: '₹299 + parts',
        frequency: 'Standard inspection',
        inclusions: ['Immediate leak diagnostics', 'Quality spare parts guidance', 'Clean cleanup post-work']
      }
    ]
  }
];

interface HomeEstimatorSectionProps {
  onSelectOption: (serviceName: string, optionLabel: string) => void;
}

export const HomeEstimatorSection: React.FC<HomeEstimatorSectionProps> = ({
  onSelectOption,
}) => {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activeOptionIdx, setActiveOptionIdx] = useState(0);

  const currentPreset = PRESETS[activeServiceIdx];
  const currentOption = currentPreset.options[activeOptionIdx] || currentPreset.options[0];

  const handleWhatsAppBooking = () => {
    const text = `Hello RRGBS, I am interested in the ${currentPreset.serviceName} plan (${currentOption.label}) priced around ${currentOption.priceRange}. Please share details and coordinator availability.`;
    window.open(`https://wa.me/916363565865?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="estimator" className="py-20 bg-white border-y border-gray-100 rrgbs-reveal">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="text-center max-w-[750px] mx-auto mb-10">
          <div className="text-[#d71920] uppercase text-xs sm:text-sm font-extrabold tracking-[1.5px] mb-2 flex items-center justify-center gap-1.5">
            <Calculator className="w-4 h-4" />
            <span>Transparent Pricing &amp; Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Estimate Your Service Requirement
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Select your preferred home service to preview realistic rates, inclusions, and scheduling options.
          </p>
        </div>

        <div className="bg-[#fcfcfc] border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Service Category Tabs */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-gray-200">
            {PRESETS.map((preset, idx) => (
              <button
                key={preset.serviceId}
                onClick={() => {
                  setActiveServiceIdx(idx);
                  setActiveOptionIdx(0);
                }}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeServiceIdx === idx
                    ? 'bg-[#d71920] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {preset.serviceName}
              </button>
            ))}
          </div>

          {/* Sub-options and Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Options list */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Select Scope / Duration:
              </span>
              {currentPreset.options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveOptionIdx(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeOptionIdx === idx
                      ? 'border-[#d71920] bg-red-50/40 shadow-xs'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-gray-900">{opt.label}</span>
                    <span className="font-extrabold text-xs text-[#d71920]">{opt.priceRange}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{opt.description}</p>
                </div>
              ))}
            </div>

            {/* Estimated Plan Breakdown */}
            <div className="lg:col-span-7 bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase">Selected Plan</span>
                    <h3 className="text-xl font-extrabold text-gray-900">{currentOption.label}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block font-medium">Estimated Range</span>
                    <span className="text-2xl font-black text-[#d71920]">{currentOption.priceRange}</span>
                    <span className="text-[11px] text-gray-500 block font-semibold">({currentOption.frequency})</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {currentOption.description}
                </p>

                <div className="mb-6">
                  <span className="text-xs font-bold text-gray-800 uppercase block mb-2.5">
                    What is Included:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentOption.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleWhatsAppBooking}
                  className="bg-[#25d366] hover:bg-[#1faa4e] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <span>Inquire on WhatsApp</span>
                </button>

                <button
                  onClick={() => onSelectOption(currentPreset.serviceName, currentOption.label)}
                  className="bg-[#d71920] hover:bg-[#a90000] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <span>Book This Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-[11px] text-gray-400 ml-auto hidden sm:inline">
                  * Final rates confirmed based on location &amp; specifics.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
