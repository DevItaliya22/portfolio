import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const navLinkClass =
  'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full min-h-screen justify-center">
      <div
        className="hidden min-[751px]:block wall-pattern flex-1 min-w-0 max-w-[50px] min-h-screen flex-shrink-0"
        aria-hidden
      />
      <main className="w-full max-w-[750px] flex-shrink-0 flex flex-col min-h-screen">
        <div className="flex flex-col flex-1 min-h-0 px-4 min-[828px]:px-6 pb-16 pt-6">
          <nav className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className={navLinkClass}>
                home
              </Link>
              <span
                className="text-neutral-400 dark:text-neutral-600"
                aria-hidden
              >
                /
              </span>
              <Link href="/blog" className={navLinkClass}>
                writing
              </Link>
            </div>
            <ThemeToggle />
          </nav>
          {children}
        </div>
      </main>
      <div
        className="hidden min-[751px]:block wall-pattern flex-1 min-w-0 max-w-[50px] min-h-screen flex-shrink-0"
        aria-hidden
      />
    </div>
  );
}
