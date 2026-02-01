'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
// import { getInitials } from './utils';
import {
  experienceByCategory,
  categoryLabels,
  categoryOrder,
  type ExperienceItem,
} from '@/lib/experience';

function ExperienceRow({
  item,
  isOpen,
  onToggle,
}: {
  item: ExperienceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasLinks = item.links.length > 0;

  return (
    <li className="border-b border-neutral-800/50 last:border-0">
      <div
        className={
          hasLinks
            ? 'flex items-center gap-4 py-3 cursor-pointer'
            : 'flex items-center gap-4 py-2'
        }
        onClick={() => hasLinks && onToggle()}
        role={hasLinks ? 'button' : undefined}
        aria-expanded={hasLinks ? isOpen : undefined}
        aria-label={hasLinks ? 'Toggle links' : undefined}
      >
        {/* <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-medium text-neutral-400">
          {getInitials(item.name)}
        </div> */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-white">{item.name}</div>
          {(item.role || item.roleLink) && (
            <div className="text-sm text-neutral-400">
              {item.role}
              {item.roleLink && (
                <a
                  href={item.roleLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors underline decoration-neutral-600 underline-offset-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.roleLink.text}
                </a>
              )}
            </div>
          )}
        </div>
        <span className="flex-shrink-0 text-sm text-neutral-500">
          {item.date}
        </span>
        {hasLinks && (
          <span
            className="flex-shrink-0 p-1.5 text-neutral-500 transition-transform duration-200"
            aria-hidden
          >
            <ChevronDown className={`h-4 w-4 ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        )}
      </div>
      {hasLinks && isOpen && (
        <div className="pb-4 pr-4 pt-0">
          <ul className="list-disc list-inside space-y-1.5 py-1 text-sm text-neutral-400 [&_li]:marker:text-pink-400">
            {item.links.map((href, j) => (
              <li key={j}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors truncate inline-block align-top"
                  onClick={(e) => e.stopPropagation()}
                >
                  {href.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default function PortfolioExperience() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="mb-16">
      <h2 className="text-lg font-semibold mb-6 text-white">
        cool places i worked at
      </h2>

      <div className="space-y-10">
        {categoryOrder.map((category) => {
          const items = experienceByCategory[category];
          if (items.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-sm font-medium text-neutral-500 tracking-wider mb-4">
                {categoryLabels[category]}
              </h3>
              <ul className="space-y-0">
                {items.map((item, i) => {
                  const key = `${category}-${item.name}-${i}`;
                  const isOpen = openKey === key;

                  return (
                    <ExperienceRow
                      key={key}
                      item={item}
                      isOpen={isOpen}
                      onToggle={() => setOpenKey(isOpen ? null : key)}
                    />
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
