import React, { useState, useEffect } from 'react';
import { MapPin, Briefcase, Sparkles } from 'lucide-react';
import { FilterState, Job } from '../types';
import { INITIAL_JOBS } from '../data/mockData';
import { JobSearchAutocomplete } from './JobSearchAutocomplete';

interface HeroSectionProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onSearchSubmit: () => void;
  totalJobsCount: number;
  jobs?: Job[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
  totalJobsCount,
  jobs = INITIAL_JOBS,
}) => {
  const [localKeyword, setLocalKeyword] = useState(filters.keyword);
  const [localLocation, setLocalLocation] = useState(filters.location);
  const [localType, setLocalType] = useState(filters.jobType);

  // Synchronize state when filters change externally
  useEffect(() => {
    setLocalKeyword(filters.keyword);
  }, [filters.keyword]);

  useEffect(() => {
    setLocalLocation(filters.location);
  }, [filters.location]);

  useEffect(() => {
    setLocalType(filters.jobType);
  }, [filters.jobType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      keyword: localKeyword,
      location: localLocation,
      jobType: localType,
    });
    onSearchSubmit();
  };

  const handleSelectAutocomplete = (selectedValue: string) => {
    setLocalKeyword(selectedValue);
    onFilterChange({
      keyword: selectedValue,
      location: localLocation,
      jobType: localType,
    });
    onSearchSubmit();
  };

  const handlePopularClick = (filterUpdate: Partial<FilterState>) => {
    if (filterUpdate.keyword !== undefined) setLocalKeyword(filterUpdate.keyword);
    if (filterUpdate.location !== undefined) setLocalLocation(filterUpdate.location);
    if (filterUpdate.jobType !== undefined) setLocalType(filterUpdate.jobType);
    if (filterUpdate.category !== undefined) onFilterChange({ category: filterUpdate.category });

    onFilterChange(filterUpdate);
    onSearchSubmit();
  };

  return (
    <section className="bg-gradient-to-br from-[#151515] to-[#2c2c2c] text-white py-16 md:py-20 relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d71920]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-600/5 rounded-full blur-2xl pointer-events-none" />

      <div className="w-[92%] max-w-[1200px] mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-gray-200 mb-6 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-[#ff3b42]" />
          <span>India’s Leading Recruitment &amp; Workforce Portal</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 max-w-4xl mx-auto">
          Find Your <span className="text-[#ff3b42]">Next Opportunity</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          Search jobs, discover opportunities and connect with top employers across India.
          Connecting talent with industry leaders in IT, BPO, Manufacturing, and Logistics.
        </p>

        {/* Search Box */}
        <form
          onSubmit={handleSearch}
          className="bg-white p-2.5 sm:p-3 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto text-gray-800 relative z-30"
          id="hero-search-form"
        >
          {/* Autocomplete Keyword Field */}
          <JobSearchAutocomplete
            value={localKeyword}
            onChange={(val) => setLocalKeyword(val)}
            onSelectSuggestion={handleSelectAutocomplete}
            jobs={jobs}
            placeholder="Job title, skills or company"
            id="jobSearch"
          />

          {/* Location Field */}
          <div className="flex-1 flex items-center gap-3 px-3 py-1 bg-gray-50/80 md:bg-transparent rounded-lg md:rounded-none md:border-r md:border-gray-200">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              type="text"
              id="locationSearch"
              placeholder="Location (e.g. Bangalore, Shivamogga)"
              value={localLocation}
              onChange={(e) => setLocalLocation(e.target.value)}
              className="w-full py-2.5 outline-none text-sm text-gray-900 placeholder:text-gray-400 bg-transparent"
            />
          </div>

          {/* Job Type Field */}
          <div className="flex-1 flex items-center gap-3 px-3 py-1 bg-gray-50/80 md:bg-transparent rounded-lg md:rounded-none">
            <Briefcase className="w-5 h-5 text-gray-400 shrink-0" />
            <select
              id="jobType"
              value={localType}
              onChange={(e) => setLocalType(e.target.value)}
              className="w-full py-2.5 outline-none text-sm text-gray-900 bg-transparent cursor-pointer"
            >
              <option value="">All Job Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Work From Home">Work From Home</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-[#d71920] hover:bg-[#b8141a] text-white px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 shrink-0 flex items-center justify-center gap-2"
            id="hero-search-btn"
          >
            <span>SEARCH</span>
          </button>
        </form>

        {/* Popular Tags */}
        <div className="mt-6 text-xs text-gray-400 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <span className="font-semibold text-gray-300">Popular:</span>
          <button
            type="button"
            onClick={() => handlePopularClick({ keyword: 'IT', category: 'IT & Software' })}
            className="text-white hover:text-[#ff3b42] bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
          >
            IT Jobs
          </button>
          <button
            type="button"
            onClick={() => handlePopularClick({ category: 'Freshers', keyword: '' })}
            className="text-white hover:text-[#ff3b42] bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
          >
            Freshers
          </button>
          <button
            type="button"
            onClick={() => handlePopularClick({ location: 'Bangalore' })}
            className="text-white hover:text-[#ff3b42] bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
          >
            Bangalore
          </button>
          <button
            type="button"
            onClick={() => handlePopularClick({ location: 'Shivamogga' })}
            className="text-white hover:text-[#ff3b42] bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
          >
            Shivamogga
          </button>
          <button
            type="button"
            onClick={() => handlePopularClick({ category: 'BPO & Customer Support' })}
            className="text-white hover:text-[#ff3b42] bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
          >
            BPO
          </button>
          <button
            type="button"
            onClick={() => handlePopularClick({ jobType: 'Work From Home' })}
            className="text-white hover:text-[#ff3b42] bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
          >
            Work From Home
          </button>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-extrabold text-white">{totalJobsCount}+</div>
            <div className="text-xs text-gray-400 mt-0.5">Active Job Openings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-[#ff3b42]">5,000+</div>
            <div className="text-xs text-gray-400 mt-0.5">Candidates Placed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-white">250+</div>
            <div className="text-xs text-gray-400 mt-0.5">Hiring Partners</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-extrabold text-[#ff3b42]">PAN India</div>
            <div className="text-xs text-gray-400 mt-0.5">Staffing Network</div>
          </div>
        </div>
      </div>
    </section>
  );
};
