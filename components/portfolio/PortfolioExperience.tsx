'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getInitials } from './utils';

const experience = [
  {
    company: 'Buffindia',
    role: 'full-stack developer | internship',
    period: 'mar 2025 - jun 2025',
    links: ['https://buffindia.com'],
  },
  {
    company: 'Shuttle',
    role: 'full-stack developer | freelance',
    period: 'jul 2025 - present',
    links: ['https://shuttle.com'],
  },
  {
    company: 'Delfa Innovators',
    role: 'full-stack developer | internship',
    period: '2025',
    links: [],
  },
  {
    company: 'Visualize N Build',
    role: 'developer | freelance',
    period: '2025',
    links: [],
  },
  {
    company: 'Helpbharat',
    role: 'full-stack developer | freelance',
    period: '2025',
    links: [],
  },
  {
    company: 'Pattern Generator',
    role: 'frontend developer | internship',
    period: '2025',
    links: [],
  },
];

export default function PortfolioExperience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mb-16">
      <h2 className="text-lg font-semibold mb-6">cool places i worked at</h2>
      <ul className="space-y-0">
        {experience.map((job, i) => {
          const hasLinks = job.links && job.links.length > 0;
          const isOpen = openIndex === i;

          return (
            <li
              key={i}
              className="border-b border-neutral-800/50 last:border-0"
            >
              <div
                className={
                  hasLinks
                    ? 'flex items-center gap-4 py-3 cursor-pointer'
                    : 'flex items-center gap-4 py-2'
                }
                onClick={() => hasLinks && setOpenIndex(isOpen ? null : i)}
                role={hasLinks ? 'button' : undefined}
                aria-expanded={hasLinks ? isOpen : undefined}
                aria-label={hasLinks ? 'Toggle links' : undefined}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-medium text-neutral-400">
                  {getInitials(job.company)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white">{job.company}</div>
                  <div className="text-sm text-neutral-400">{job.role}</div>
                </div>
                <span className="flex-shrink-0 text-sm text-neutral-500">
                  {job.period}
                </span>
                {hasLinks && (
                  <span
                    className="flex-shrink-0 p-1.5 text-neutral-500 transition-transform duration-200"
                    aria-hidden
                  >
                    <ChevronDown
                      className={`h-4 w-4 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </span>
                )}
              </div>
              {hasLinks && isOpen && (
                <div className="pb-4 pl-14 pr-4 pt-0">
                  <ul className="list-disc list-inside space-y-1.5 py-1 text-sm text-neutral-400 [&_li]:marker:text-pink-400">
                    {job.links!.map((href, j) => (
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
        })}
      </ul>
    </section>
  );
}
