'use client';

import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import HumansSection from './admire/HumansSection';
import MoviesSection from './admire/MoviesSection';
import ProductsSection from './admire/ProductsSection';

const TABS = ['Humans', 'Movies', 'Tech'] as const;
type TabId = (typeof TABS)[number];

export default function AdmireContent() {
  const [activeTab, setActiveTab] = useState<TabId>('Humans');

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="sticky top-0 z-10 -mx-4 min-[828px]:-mx-6 px-4 min-[828px]:px-6 pt-6 pb-0 bg-white dark:bg-neutral-950">
        <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          things i admire
        </h1>
        <Separator className="my-8 h-0 border-t border-dashed border-neutral-300 dark:border-neutral-800 bg-transparent" />
        <div className="flex w-full border-b border-neutral-200 dark:border-neutral-800 mb-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                'flex-1 min-w-0 py-2 text-sm font-medium transition-colors -mb-px border-b-2 text-center',
                activeTab === tab
                  ? 'text-neutral-900 dark:text-white border-neutral-900 dark:border-white'
                  : 'text-neutral-500 dark:text-neutral-400 border-transparent hover:text-neutral-700 dark:hover:text-neutral-300'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto pt-4">
        {activeTab === 'Humans' && <HumansSection />}
        {activeTab === 'Movies' && <MoviesSection />}
        {activeTab === 'Tech' && <ProductsSection />}
      </div>
    </div>
  );
}
