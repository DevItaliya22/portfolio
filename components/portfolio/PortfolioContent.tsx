'use client';

import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import PortfolioHeader from './PortfolioHeader';
import PortfolioAbout from './PortfolioAbout';
import PortfolioExperience from './PortfolioExperience';
import PortfolioEducation from './PortfolioEducation';
import PortfolioFooter from './PortfolioFooter';
import DinoGame from '@/components/DinoGame';

export default function PortfolioContent() {
  return (
    <div className="flex w-full min-h-screen justify-center">
      {/* Left wall - only when > 750px, grows 0–50px */}
      <div
        className="hidden min-[751px]:block wall-pattern flex-1 min-w-0 max-w-[50px] min-h-screen flex-shrink-0"
        aria-hidden
      />
      <main className="w-full max-w-[750px] flex-shrink-0">
        <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden min-[751px]:rounded-t-lg">
          {
            <Image
              src="/banner4.jpg"
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 750px) 100vw, 750px"
            />
          }
        </div>
        <div className="px-4 min-[828px]:px-6 pb-16 pt-6">
          <PortfolioHeader />
          <Separator className="my-8 h-0 border-t border-dashed border-neutral-300 dark:border-neutral-800 bg-transparent" />
          <PortfolioAbout />
          <Separator className="my-8 h-0 border-t border-dashed border-neutral-300 dark:border-neutral-800 bg-transparent" />
          <PortfolioExperience />
          <Separator className="my-8 h-0 border-t border-dashed border-neutral-300 dark:border-neutral-800 bg-transparent" />
          <PortfolioEducation />
          <Separator className="my-8 h-0 border-t border-dashed border-neutral-300 dark:border-neutral-800 bg-transparent" />
          <PortfolioFooter />
          <Separator className="my-8 h-0 border-t border-dashed border-neutral-300 dark:border-neutral-800 bg-transparent" />
          <DinoGame />
        </div>
      </main>
      {/* Right wall - only when > 750px, grows 0–50px */}
      <div
        className="hidden min-[751px]:block wall-pattern flex-1 min-w-0 max-w-[50px] min-h-screen flex-shrink-0"
        aria-hidden
      />
    </div>
  );
}
