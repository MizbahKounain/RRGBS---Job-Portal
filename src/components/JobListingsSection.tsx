import React, { useState, useMemo } from 'react';
import { Job, FilterState } from '../types';
import { SalaryDistributionChart, parseSalaryToLPA } from './SalaryDistributionChart';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Bookmark, 
  ExternalLink, 
  Filter, 
  X, 
  SlidersHorizontal,
  Sparkles,
  Building,
  Check
} from 'lucide-react';

interface JobListingsSectionProps {
  jobs: Job[];
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  savedJobIds: string[];
  onToggleSaveJob: (jobId: string) => void;
  onSelectJobForDetail: (job: Job) => void;
  onApplyForJob: (job: Job) => void;
  showingSavedOnly: boolean;
  onToggleShowingSavedOnly: () => void;
}

export const JobListingsSection: React.FC<JobListingsSectionProps> = ({
  jobs,
  filters,
  onFilterChange,
  onResetFilters,
  savedJobIds,
  onToggleSaveJob,
  onSelectJobForDetail,
  onApplyForJob,
  showingSavedOnly,
  onToggleShowingSavedOnly,
}) => {
  const [selectedSort, setSelectedSort] = useState<'newest' | 'salary'>('newest');
  const [selectedExperienceFilter, setSelectedExperienceFilter] = useState<string>('all');
  const [selectedSalaryBand, setSelectedSalaryBand] = useState<string | null>(null);

  // Filter jobs based on criteria
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Saved only toggle
      if (showingSavedOnly && !savedJobIds.includes(job.id)) {
        return false;
      }

      // Keyword match
      if (filters.keyword.trim()) {
        const kw = filters.keyword.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(kw);
        const matchesCompany = job.company.toLowerCase().includes(kw);
        const matchesSkills = job.skills.some((s) => s.toLowerCase().includes(kw));
        const matchesCategory = job.category.toLowerCase().includes(kw);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesCategory) {
          return false;
        }
      }

      // Location match
      if (filters.location.trim()) {
        const loc = filters.location.toLowerCase();
        if (!job.location.toLowerCase().includes(loc)) {
          return false;
        }
      }

      // Job Type match
      if (filters.jobType && job.type !== filters.jobType) {
        return false;
      }

      // Category match
      if (filters.category && job.category !== filters.category) {
        return false;
      }

      // Experience filter
      if (selectedExperienceFilter === 'fresher') {
        if (!job.experience.toLowerCase().includes('0') && !job.experience.toLowerCase().includes('fresher')) {
          return false;
        }
      } else if (selectedExperienceFilter === 'experienced') {
        if (job.experience.toLowerCase().includes('fresher')) {
          return false;
        }
      }

      // Salary Band interactive filter from chart
      if (selectedSalaryBand) {
        const { avgLPA } = parseSalaryToLPA(job.salary);
        if (selectedSalaryBand === '< ₹3 LPA' && !(avgLPA < 3)) return false;
        if (selectedSalaryBand === '₹3–₹5 LPA' && !(avgLPA >= 3 && avgLPA < 5)) return false;
        if (selectedSalaryBand === '₹5–₹8 LPA' && !(avgLPA >= 5 && avgLPA < 8)) return false;
        if (selectedSalaryBand === '₹8–₹12 LPA' && !(avgLPA >= 8 && avgLPA < 12)) return false;
        if (selectedSalaryBand === '> ₹12 LPA' && !(avgLPA >= 12)) return false;
      }

      return true;
    });
  }, [jobs, filters, showingSavedOnly, savedJobIds, selectedExperienceFilter, selectedSalaryBand]);

  const activeFilterCount = 
    (filters.keyword ? 1 : 0) +
    (filters.location ? 1 : 0) +
    (filters.jobType ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (selectedExperienceFilter !== 'all' ? 1 : 0) +
    (selectedSalaryBand ? 1 : 0) +
    (showingSavedOnly ? 1 : 0);

  return (
    <section id="jobs" className="py-16 bg-[#f6f7f9]">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Latest Job Opportunities
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Discover the latest opportunities from verified employers and RRGBS recruitment mandates.
          </p>
        </div>

        {/* Filter & Control Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left Controls: Categories & Quick Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-gray-700 flex items-center gap-1.5 mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#d71920]" />
                Filters:
              </span>

              {/* City quick buttons */}
              {['All Cities', 'Bangalore', 'Shivamogga', 'Remote'].map((city) => {
                const isAll = city === 'All Cities';
                const isSelected = isAll ? !filters.location : filters.location.toLowerCase() === city.toLowerCase();

                return (
                  <button
                    key={city}
                    onClick={() => onFilterChange({ location: isAll ? '' : city })}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#d71920] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {city}
                  </button>
                );
              })}

              {/* Job type quick selector */}
              <select
                value={filters.jobType}
                onChange={(e) => onFilterChange({ jobType: e.target.value })}
                className="bg-gray-100 text-gray-700 font-semibold px-2.5 py-1.5 rounded-md border-none outline-none cursor-pointer hover:bg-gray-200"
              >
                <option value="">Job Type: All</option>
                <option value="Full Time">Full Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Work From Home">Work From Home</option>
              </select>

              {/* Experience quick filter */}
              <select
                value={selectedExperienceFilter}
                onChange={(e) => setSelectedExperienceFilter(e.target.value)}
                className="bg-gray-100 text-gray-700 font-semibold px-2.5 py-1.5 rounded-md border-none outline-none cursor-pointer hover:bg-gray-200"
              >
                <option value="all">Experience: All</option>
                <option value="fresher">Freshers / 0 Yrs</option>
                <option value="experienced">Experienced (1+ Yrs)</option>
              </select>
            </div>

            {/* Right Controls: Saved Jobs & Reset */}
            <div className="flex items-center gap-3">
              <button
                onClick={onToggleShowingSavedOnly}
                id="saved"
                className={`text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showingSavedOnly
                    ? 'bg-[#d71920] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current" />
                <span>Saved Jobs ({savedJobIds.length})</span>
              </button>

              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedExperienceFilter('all');
                    setSelectedSalaryBand(null);
                    onResetFilters();
                  }}
                  className="text-xs font-semibold text-gray-500 hover:text-red-600 flex items-center gap-1 underline cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear Filters ({activeFilterCount})
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Tags Bar if any */}
          {(filters.category || filters.keyword || filters.location || filters.jobType || selectedSalaryBand) && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-gray-500 font-medium">Active criteria:</span>

              {filters.category && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-[#d71920] font-semibold rounded-md border border-red-200">
                  Category: {filters.category}
                  <button
                    onClick={() => onFilterChange({ category: '' })}
                    className="hover:text-red-900 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}

              {selectedSalaryBand && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-900 font-semibold rounded-md border border-amber-200">
                  Salary Band: {selectedSalaryBand}
                  <button
                    onClick={() => setSelectedSalaryBand(null)}
                    className="hover:text-black font-bold cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}

              {filters.keyword && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 font-semibold rounded-md">
                  Keyword: "{filters.keyword}"
                  <button
                    onClick={() => onFilterChange({ keyword: '' })}
                    className="hover:text-black cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}

              {filters.location && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 font-semibold rounded-md">
                  Location: {filters.location}
                  <button
                    onClick={() => onFilterChange({ location: '' })}
                    className="hover:text-black cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}

              {filters.jobType && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 font-semibold rounded-md">
                  Type: {filters.jobType}
                  <button
                    onClick={() => onFilterChange({ jobType: '' })}
                    className="hover:text-black cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Salary Distribution Chart using Recharts */}
        <SalaryDistributionChart
          jobs={jobs}
          onSelectSalaryBand={(band) => setSelectedSalaryBand((curr) => curr === band ? null : band)}
          selectedBand={selectedSalaryBand}
        />

        {/* Results Header count */}
        <div className="flex items-center justify-between mb-4 px-1 text-sm text-gray-600">
          <div>
            Showing <span className="font-extrabold text-gray-900">{filteredJobs.length}</span> open{' '}
            {filteredJobs.length === 1 ? 'position' : 'positions'}
            {filters.category && <span> in <b>{filters.category}</b></span>}
          </div>
          <div className="text-xs text-gray-500">
            Updated regularly by RRGBS Staffing Desk
          </div>
        </div>

        {/* Jobs Grid (2 columns on desktop matching template) */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="job-cards-container">
            {filteredJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);

              return (
                <div
                  key={job.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between group"
                  id={`job-card-${job.id}`}
                >
                  <div>
                    {/* Top Row: Logo, Title, Company */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        {/* Company Logo Avatar */}
                        <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-extrabold text-sm text-gray-700 shrink-0 group-hover:border-[#d71920] transition-colors">
                          {job.companyLogoText || job.company.slice(0, 3).toUpperCase()}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3
                              onClick={() => onSelectJobForDetail(job)}
                              className="font-bold text-base sm:text-lg text-gray-900 hover:text-[#d71920] cursor-pointer transition-colors leading-tight"
                            >
                              {job.title}
                            </h3>
                            {job.isFeatured && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                                HOT
                              </span>
                            )}
                          </div>

                          <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 mt-1 font-medium">
                            <span>{job.company}</span>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-gray-600">
                              <MapPin className="w-3 h-3 text-[#d71920]" />
                              {job.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bookmark Button */}
                      <button
                        onClick={() => onToggleSaveJob(job.id)}
                        className={`p-2 rounded-lg transition-colors cursor-pointer ${
                          isSaved
                            ? 'text-[#d71920] bg-red-50'
                            : 'text-gray-400 hover:text-[#d71920] hover:bg-gray-100'
                        }`}
                        title={isSaved ? 'Remove from saved' : 'Save job'}
                        aria-label="Save job"
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-gray-600 mt-3 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Tags: Type, Experience, City, Category */}
                    <div className="flex flex-wrap gap-2 my-4">
                      <span className="bg-[#f5f5f5] text-gray-700 text-xs px-2.5 py-1 rounded font-medium">
                        {job.type}
                      </span>
                      <span className="bg-[#f5f5f5] text-gray-700 text-xs px-2.5 py-1 rounded font-medium">
                        {job.experience}
                      </span>
                      <span className="bg-[#f5f5f5] text-gray-700 text-xs px-2.5 py-1 rounded font-medium">
                        {job.location}
                      </span>
                      <span className="bg-red-50 text-[#d71920] text-xs px-2.5 py-1 rounded font-medium">
                        {job.category}
                      </span>
                    </div>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="text-[11px] bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 4 && (
                        <span className="text-[11px] text-gray-400 self-center">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Salary and Action */}
                  <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <div className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                        Compensation
                      </div>
                      <div className="font-extrabold text-sm sm:text-base text-gray-900">
                        {job.salary}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectJobForDetail(job)}
                        className="px-3 py-2 rounded-md text-xs font-bold text-gray-700 hover:text-black border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onApplyForJob(job)}
                        className="bg-[#d71920] hover:bg-[#b8141a] text-white px-4 py-2 rounded-md text-xs font-bold transition-all shadow-xs active:scale-98 cursor-pointer flex items-center gap-1"
                        id={`apply-btn-${job.id}`}
                      >
                        <span>Apply Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-14 h-14 bg-red-50 text-[#d71920] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              🔍
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No matching jobs found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
              We couldn’t find any job postings matching your current criteria. Try loosening your filters or resetting your search.
            </p>
            <button
              onClick={() => {
                setSelectedExperienceFilter('all');
                onResetFilters();
              }}
              className="bg-[#d71920] text-white font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-[#b8141a] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
