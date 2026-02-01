import { Separator } from '@/components/ui/separator';
import PortfolioHeader from './PortfolioHeader';
import PortfolioAbout from './PortfolioAbout';
import PortfolioExperience from './PortfolioExperience';
import PortfolioEducation from './PortfolioEducation';
import PortfolioFooter from './PortfolioFooter';

export default function PortfolioContent() {
  return (
    <div
      className="min-h-screen bg-black text-white grid grid-cols-[1fr_4rem_minmax(0,42rem)_4rem_1fr]"
      style={{
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <div className="min-h-screen" aria-hidden />
      <div className="wall-pattern min-h-screen" aria-hidden />
      <main className="px-6 py-16">
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
      <div className="wall-pattern min-h-screen" aria-hidden />
      <div className="min-h-screen" aria-hidden />
    </div>
  );
}
