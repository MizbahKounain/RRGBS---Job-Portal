import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Briefcase, Tag, X } from 'lucide-react';
import { Job } from '../types';

export interface AutocompleteItem {
  id: string;
  type: 'title' | 'skill';
  value: string;
  count: number;
}

interface JobSearchAutocompleteProps {
  value: string;
  onChange: (val: string) => void;
  onSelectSuggestion: (val: string, type: 'title' | 'skill') => void;
  jobs: Job[];
  placeholder?: string;
  id?: string;
}

export const JobSearchAutocomplete: React.FC<JobSearchAutocompleteProps> = ({
  value,
  onChange,
  onSelectSuggestion,
  jobs,
  placeholder = 'Job title, skills or company',
  id = 'jobSearch',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Precompute unique titles and skills with occurrence counts
  const { allTitles, allSkills } = useMemo(() => {
    const titleMap = new Map<string, number>();
    const skillMap = new Map<string, number>();

    jobs.forEach((job) => {
      if (job.title) {
        const cleanTitle = job.title.trim();
        if (cleanTitle) {
          titleMap.set(cleanTitle, (titleMap.get(cleanTitle) || 0) + 1);
        }
      }
      if (Array.isArray(job.skills)) {
        job.skills.forEach((skill) => {
          const cleanSkill = skill.trim();
          if (cleanSkill) {
            skillMap.set(cleanSkill, (skillMap.get(cleanSkill) || 0) + 1);
          }
        });
      }
    });

    const titles: AutocompleteItem[] = Array.from(titleMap.entries()).map(([val, count]) => ({
      id: `title-${val}`,
      type: 'title',
      value: val,
      count,
    }));

    const skills: AutocompleteItem[] = Array.from(skillMap.entries()).map(([val, count]) => ({
      id: `skill-${val}`,
      type: 'skill',
      value: val,
      count,
    }));

    return { allTitles: titles, allSkills: skills };
  }, [jobs]);

  // Compute matched suggestions based on user query
  const matchingSuggestions = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) {
      return { titles: [], skills: [], totalList: [] };
    }

    const sortFn = (a: AutocompleteItem, b: AutocompleteItem) => {
      const aLower = a.value.toLowerCase();
      const bLower = b.value.toLowerCase();
      const aStarts = aLower.startsWith(query);
      const bStarts = bLower.startsWith(query);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      // Secondary: higher job count first
      if (b.count !== a.count) return b.count - a.count;

      return aLower.localeCompare(bLower);
    };

    const matchedTitles = allTitles
      .filter((t) => t.value.toLowerCase().includes(query))
      .sort(sortFn)
      .slice(0, 5);

    const matchedSkills = allSkills
      .filter((s) => s.value.toLowerCase().includes(query))
      .sort(sortFn)
      .slice(0, 5);

    const totalList = [...matchedTitles, ...matchedSkills];

    return {
      titles: matchedTitles,
      skills: matchedSkills,
      totalList,
    };
  }, [value, allTitles, allSkills]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(-1);
    if (value.trim().length > 0) {
      setIsOpen(true);
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { totalList } = matchingSuggestions;

    if (!isOpen || totalList.length === 0) {
      if (e.key === 'ArrowDown' && value.trim().length > 0) {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalList.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalList.length - 1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < totalList.length) {
        e.preventDefault();
        const selected = totalList[selectedIndex];
        handleSelect(selected);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleSelect = (item: AutocompleteItem) => {
    onChange(item.value);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSelectSuggestion(item.value, item.type);
  };

  const handleClear = () => {
    onChange('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Helper to highlight matching text
  const renderHighlighted = (text: string, query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return text;

    const regex = new RegExp(`(${trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === trimmed.toLowerCase() ? (
        <span key={i} className="text-[#d71920] font-extrabold underline decoration-[#d71920]/40">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const hasSuggestions =
    isOpen &&
    value.trim().length > 0 &&
    (matchingSuggestions.titles.length > 0 || matchingSuggestions.skills.length > 0);

  return (
    <div ref={containerRef} className="relative flex-1 flex items-center">
      <div className="w-full flex items-center gap-3 px-3 py-1 bg-gray-50/80 md:bg-transparent rounded-lg md:rounded-none md:border-r md:border-gray-200">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          id={id}
          role="combobox"
          aria-expanded={hasSuggestions}
          aria-autocomplete="list"
          aria-controls="hero-search-autocomplete-list"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (value.trim().length > 0) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="w-full py-2.5 outline-none text-sm text-gray-900 placeholder:text-gray-400 bg-transparent"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {hasSuggestions && (
        <div
          id="hero-search-autocomplete-list"
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 text-left max-h-80 overflow-y-auto animate-in fade-in-50 duration-150"
        >
          {/* Section: Job Titles */}
          {matchingSuggestions.titles.length > 0 && (
            <div className="p-1.5 border-b border-gray-100">
              <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#d71920]" />
                <span>Job Titles</span>
              </div>
              {matchingSuggestions.titles.map((item) => {
                const globalIndex = matchingSuggestions.totalList.findIndex((t) => t.id === item.id);
                const isSelected = selectedIndex === globalIndex;

                return (
                  <div
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(item);
                    }}
                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-red-50 text-[#d71920]'
                        : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-6 h-6 rounded bg-red-100/60 text-[#d71920] flex items-center justify-center shrink-0">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate font-medium">
                        {renderHighlighted(item.value, value)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-semibold">
                        {item.count} {item.count === 1 ? 'opening' : 'openings'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Section: Skills & Technologies */}
          {matchingSuggestions.skills.length > 0 && (
            <div className="p-1.5">
              <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#ff3b42]" />
                <span>Skills &amp; Technologies</span>
              </div>
              {matchingSuggestions.skills.map((item) => {
                const globalIndex = matchingSuggestions.totalList.findIndex((t) => t.id === item.id);
                const isSelected = selectedIndex === globalIndex;

                return (
                  <div
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(item);
                    }}
                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-red-50 text-[#d71920]'
                        : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-6 h-6 rounded bg-neutral-100 text-gray-700 flex items-center justify-center shrink-0">
                        <Tag className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <span className="truncate font-medium">
                        {renderHighlighted(item.value, value)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider">
                        Skill
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {item.count} {item.count === 1 ? 'job' : 'jobs'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
