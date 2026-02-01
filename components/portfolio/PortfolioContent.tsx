'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import PortfolioHeader from './PortfolioHeader';
import PortfolioAbout from './PortfolioAbout';
import PortfolioExperience from './PortfolioExperience';
import PortfolioEducation from './PortfolioEducation';
import PortfolioFooter from './PortfolioFooter';

export default function PortfolioContent() {
  return (
    // <motion.div
    //   initial={{ opacity: 0, y: -30 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{
    //     duration: 1.4,
    //     ease: [0.16, 1, 0.3, 1],
    //   }}
    //   className="min-h-screen bg-black text-white"
    //   style={{
    //     fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    //   }}
    // >
    //   <div className="flex min-h-screen overflow-x-hidden">
    //     {/* Black spacers - only at 950px+ (after wall + content fit) */}
    //     <div
    //       className="hidden min-[950px]:block flex-1 min-w-0 min-h-screen"
    //       aria-hidden
    //     />
    //     {/* Left wall-pattern - 828px+ (content 700 + walls 128) so content never shrinks */}
    //     <div
    //       className="hidden min-[828px]:block wall-pattern min-h-screen w-16 flex-shrink-0"
    //       aria-hidden
    //     />

    //     {/* Main content - full width below 700px, max 700px when viewport > 700px */}
    //     <div className="flex-1 min-w-0 w-full min-[701px]:max-w-[700px] min-[828px]:flex-shrink-0">
    //       <div className="relative w-full h-48 sm:h-64 md:h-80 overflow-hidden min-[828px]:rounded-t-lg">
    //         <Image
    //           src="/banner1.jpg"
    //           alt=""
    //           fill
    //           priority
    //           className="object-cover object-center"
    //           sizes="100vw"
    //         />
    //       </div>
    <div className="flex w-full min-h-screen justify-center">
      {/* Left wall - only when > 750px, grows 0–50px */}
      <div
        className="hidden min-[751px]:block wall-pattern flex-1 min-w-0 max-w-[50px] min-h-screen flex-shrink-0"
        aria-hidden
      />
      <main className="w-full max-w-[750px] flex-shrink-0 px-4 min-[828px]:px-6 pb-16 pt-6">
        <PortfolioHeader />
        <Separator className="my-8 h-0 border-t border-dashed border-neutral-800 bg-transparent" />
        <PortfolioAbout />
        <Separator className="my-8 h-0 border-t border-dashed border-neutral-800 bg-transparent" />
        <PortfolioExperience />
        <Separator className="my-8 h-0 border-t border-dashed border-neutral-800 bg-transparent" />
        <PortfolioEducation />
        <Separator className="my-8 h-0 border-t border-dashed border-neutral-800 bg-transparent" />
        <PortfolioFooter />
      </main>
      {/* Right wall - only when > 750px, grows 0–50px */}
      <div
        className="hidden min-[751px]:block wall-pattern flex-1 min-w-0 max-w-[50px] min-h-screen flex-shrink-0"
        aria-hidden
      />
    </div>
    //     </div>

    //     {/* Right wall-pattern - 828px+ */}
    //     <div
    //       className="hidden min-[828px]:block wall-pattern min-h-screen w-16 flex-shrink-0"
    //       aria-hidden
    //     />
    //     {/* Right black spacer - only at 900px+ */}
    //     <div
    //       className="hidden min-[950px]:block flex-1 min-w-0 min-h-screen"
    //       aria-hidden
    //     />
    //   </div>
    // </motion.div>
  );
}
