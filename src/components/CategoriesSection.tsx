import React from 'react';
import { CATEGORIES } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  selectedCategory: string;
  onSelectCategory: (categoryTitle: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categories" className="py-16 bg-white border-b border-gray-100">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            Explore Job Categories
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto">
            Find opportunities matching your skills, aspirations, and career goals across premier industries.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.title;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? '' : cat.title)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer group flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#d71920] bg-red-50/50 shadow-md ring-2 ring-red-100'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1'
                }`}
                id={`cat-card-${cat.id}`}
              >
                <div>
                  <div className="text-3xl sm:text-4xl mb-3 transform transition-transform group-hover:scale-110">
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-base text-gray-900 mb-1 group-hover:text-[#d71920] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className={`font-semibold ${isSelected ? 'text-[#d71920]' : 'text-gray-400'}`}>
                    {cat.count} Jobs
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 font-bold ${
                      isSelected ? 'text-[#d71920]' : 'text-gray-400 group-hover:text-[#d71920]'
                    } transition-colors`}
                  >
                    View <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
