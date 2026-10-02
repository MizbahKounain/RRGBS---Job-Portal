import React, { useState, useMemo } from 'react';
import { Job } from '../types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';
import { IndianRupee, TrendingUp, BarChart3, ChevronDown, ChevronUp, Sparkles, Filter } from 'lucide-react';

interface SalaryDistributionChartProps {
  jobs: Job[];
  onSelectSalaryBand?: (bandLabel: string) => void;
  selectedBand?: string | null;
}

export function parseSalaryToLPA(salaryStr: string): { minLPA: number; maxLPA: number; avgLPA: number } {
  if (!salaryStr) return { minLPA: 3, maxLPA: 5, avgLPA: 4 };

  const isLPA = /lpa|lakh/i.test(salaryStr);
  const cleanStr = salaryStr.replace(/,/g, '');
  const numbers = cleanStr.match(/\d+(?:\.\d+)?/g);

  if (!numbers || numbers.length === 0) {
    return { minLPA: 3, maxLPA: 6, avgLPA: 4.5 };
  }

  const parsedNums = numbers.map(Number);

  if (isLPA) {
    const min = parsedNums[0];
    const max = parsedNums.length > 1 ? parsedNums[1] : min;
    return { minLPA: min, maxLPA: max, avgLPA: parseFloat(((min + max) / 2).toFixed(2)) };
  } else {
    // Usually monthly salary format: ₹18,000 – ₹28,000
    const minMonth = parsedNums[0];
    const maxMonth = parsedNums.length > 1 ? parsedNums[1] : minMonth;
    const minLPA = parseFloat(((minMonth * 12) / 100000).toFixed(2));
    const maxLPA = parseFloat(((maxMonth * 12) / 100000).toFixed(2));
    return { minLPA, maxLPA, avgLPA: parseFloat(((minLPA + maxLPA) / 2).toFixed(2)) };
  }
}

export const SalaryDistributionChart: React.FC<SalaryDistributionChartProps> = ({
  jobs,
  onSelectSalaryBand,
  selectedBand,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState<'bands' | 'category'>('bands');

  // Compute distribution by Salary Bands
  const salaryBandsData = useMemo(() => {
    const bands = [
      { range: '< ₹3 LPA', label: 'Under ₹3 LPA', count: 0, jobsList: [] as string[], avgLPA: 2.4, color: '#f87171' },
      { range: '₹3–₹5 LPA', label: '₹3 – ₹5 LPA', count: 0, jobsList: [] as string[], avgLPA: 4.0, color: '#fb923c' },
      { range: '₹5–₹8 LPA', label: '₹5 – ₹8 LPA', count: 0, jobsList: [] as string[], avgLPA: 6.5, color: '#d71920' },
      { range: '₹8–₹12 LPA', label: '₹8 – ₹12 LPA', count: 0, jobsList: [] as string[], avgLPA: 10.0, color: '#b91c1c' },
      { range: '> ₹12 LPA', label: 'Above ₹12 LPA', count: 0, jobsList: [] as string[], avgLPA: 14.0, color: '#881337' },
    ];

    jobs.forEach((job) => {
      const { avgLPA } = parseSalaryToLPA(job.salary);

      if (avgLPA < 3) {
        bands[0].count++;
        bands[0].jobsList.push(job.title);
      } else if (avgLPA >= 3 && avgLPA < 5) {
        bands[1].count++;
        bands[1].jobsList.push(job.title);
      } else if (avgLPA >= 5 && avgLPA < 8) {
        bands[2].count++;
        bands[2].jobsList.push(job.title);
      } else if (avgLPA >= 8 && avgLPA < 12) {
        bands[3].count++;
        bands[3].jobsList.push(job.title);
      } else {
        bands[4].count++;
        bands[4].jobsList.push(job.title);
      }
    });

    return bands;
  }, [jobs]);

  // Compute average salary by Category
  const categorySalaryData = useMemo(() => {
    const catMap: Record<string, { totalAvgLPA: number; count: number }> = {};

    jobs.forEach((job) => {
      const { avgLPA } = parseSalaryToLPA(job.salary);
      const cat = job.category || 'Other';
      if (!catMap[cat]) {
        catMap[cat] = { totalAvgLPA: 0, count: 0 };
      }
      catMap[cat].totalAvgLPA += avgLPA;
      catMap[cat].count++;
    });

    return Object.entries(catMap).map(([category, info]) => ({
      category: category.replace('& Customer Support', '').replace('& Software', '').trim(),
      fullCategory: category,
      avgLPA: parseFloat((info.totalAvgLPA / info.count).toFixed(2)),
      count: info.count,
    })).sort((a, b) => b.avgLPA - a.avgLPA);
  }, [jobs]);

  // Key metrics
  const marketStats = useMemo(() => {
    if (jobs.length === 0) return { avgOverall: '0', maxSalary: 'N/A', topRole: 'N/A' };

    let totalLPA = 0;
    let highestLPA = 0;
    let highestJobTitle = '';

    jobs.forEach((job) => {
      const { maxLPA, avgLPA } = parseSalaryToLPA(job.salary);
      totalLPA += avgLPA;
      if (maxLPA > highestLPA) {
        highestLPA = maxLPA;
        highestJobTitle = job.title;
      }
    });

    return {
      avgOverall: (totalLPA / jobs.length).toFixed(1),
      maxSalary: `₹${highestLPA} LPA`,
      topRole: highestJobTitle,
    };
  }, [jobs]);

  // Custom tooltip for Salary Bands
  const CustomBandTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl border border-gray-700 text-xs max-w-xs">
          <div className="font-bold text-sm text-[#ff4d53] mb-1">{data.label}</div>
          <div className="text-gray-200 mb-1.5">
            <span className="font-extrabold text-white">{data.count}</span> available{' '}
            {data.count === 1 ? 'position' : 'positions'} ({((data.count / (jobs.length || 1)) * 100).toFixed(0)}% of current openings)
          </div>
          {data.jobsList && data.jobsList.length > 0 && (
            <div className="text-[11px] text-gray-400 border-t border-gray-800 pt-1.5 line-clamp-2">
              e.g. {data.jobsList.slice(0, 2).join(', ')}
              {data.jobsList.length > 2 && ` +${data.jobsList.length - 2} more`}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for Category Average
  const CustomCategoryTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl border border-gray-700 text-xs">
          <div className="font-bold text-sm text-gray-100 mb-1">{data.fullCategory}</div>
          <div className="text-amber-300 font-bold mb-0.5">
            Avg Package: ~₹{data.avgLPA} LPA
          </div>
          <div className="text-gray-400 text-[11px]">
            Based on {data.count} active {data.count === 1 ? 'opening' : 'openings'}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-5 mb-8">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#d71920] flex items-center justify-center font-bold">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <span>Salary Distribution &amp; Market Insights</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-red-50 text-[#d71920] px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" /> Real-time
              </span>
            </h3>
            <p className="text-xs text-gray-500">
              Compensation benchmarks across {jobs.length} current job openings in India
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setViewMode('bands')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'bands'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              By Salary Range
            </button>
            <button
              onClick={() => setViewMode('category')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'category'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              By Category Avg
            </button>
          </div>

          {/* Collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand chart' : 'Collapse chart'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <div className="pt-4">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span className="text-[11px] text-gray-500 block font-medium">
                Average Market Offer
              </span>
              <span className="font-extrabold text-base sm:text-lg text-gray-900">
                ₹{marketStats.avgOverall} LPA
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span className="text-[11px] text-gray-500 block font-medium">
                Peak Offered CTC
              </span>
              <span className="font-extrabold text-base sm:text-lg text-[#d71920]">
                {marketStats.maxSalary}
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 col-span-2 sm:col-span-1">
              <span className="text-[11px] text-gray-500 block font-medium">
                Top Value Role
              </span>
              <span className="font-bold text-xs sm:text-sm text-gray-900 truncate block">
                {marketStats.topRole}
              </span>
            </div>
          </div>

          {/* Recharts Chart */}
          <div className="h-64 sm:h-72 w-full pt-2" id="salary-recharts-container">
            <ResponsiveContainer width="100%" height="100%">
              {viewMode === 'bands' ? (
                <BarChart
                  data={salaryBandsData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis
                    dataKey="range"
                    tick={{ fontSize: 11, fill: '#666' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: '#666' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomBandTooltip />} />
                  <Bar
                    dataKey="count"
                    name="Open Positions"
                    radius={[6, 6, 0, 0]}
                    cursor="pointer"
                    onClick={(data: any) => {
                      const range = data?.range || data?.payload?.range;
                      if (onSelectSalaryBand && range) {
                        onSelectSalaryBand(range);
                      }
                    }}
                  >
                    {salaryBandsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={selectedBand === entry.range ? '#111' : entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <BarChart
                  data={categorySalaryData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 10, fill: '#666' }}
                    interval={0}
                    angle={-18}
                    textAnchor="end"
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={false}
                  />
                  <YAxis
                    unit="L"
                    tick={{ fontSize: 11, fill: '#666' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomCategoryTooltip />} />
                  <Bar
                    dataKey="avgLPA"
                    name="Avg Salary (LPA)"
                    fill="#d71920"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Interactive footer guidance */}
          <div className="mt-2 text-center text-[11px] text-gray-400">
            💡 Hover over bars to inspect detailed position breakdowns and salary bands.
          </div>
        </div>
      )}
    </div>
  );
};
