import { Metadata } from 'next';
import AdmireContent from '@/components/portfolio/AdmireContent';

export const metadata: Metadata = {
  title: 'Things I Admire — Dev Italiya',
  description: 'Things I admire — people, ideas, and work that inspire me.',
};

export default function AdmirePage() {
  return (
    <div className="flex w-full min-h-screen justify-center">
      {/* Left wall - same as home page */}
      <div
        className="hidden min-[751px]:block wall-pattern flex-1 min-w-0 max-w-[50px] min-h-screen flex-shrink-0"
        aria-hidden
      />
      <main className="w-full max-w-[750px] flex-shrink-0 flex flex-col min-h-screen">
        <div className="flex flex-col flex-1 min-h-0 px-4 min-[828px]:px-6 pb-16 pt-6">
          <AdmireContent />
        </div>
      </main>
      {/* Right wall - same as home page */}
      <div
        className="hidden min-[751px]:block wall-pattern flex-1 min-w-0 max-w-[50px] min-h-screen flex-shrink-0"
        aria-hidden
      />
    </div>
  );
}
