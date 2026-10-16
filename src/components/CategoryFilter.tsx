import React from 'react';
import { CATEGORIES } from '../data/menuData';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  itemCounts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  itemCounts,
}) => {
  return (
    <div className="sticky top-18 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/70 py-3">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {CATEGORIES.map((cat) => {
            const count = itemCounts[cat.id] ?? 0;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-rose-800 text-white shadow-sm'
                    : 'bg-white border border-stone-200/90 text-stone-700 hover:text-stone-900 hover:border-stone-300 hover:bg-stone-50'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full tabular-nums font-bold ${
                    isSelected ? 'bg-rose-950/40 text-rose-100' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
