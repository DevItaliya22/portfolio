import { Metadata } from 'next';
import Link from 'next/link';
import DinoGame from '@/components/DinoGame';

export const metadata: Metadata = {
  title: 'Dino Favicon Game',
  description:
    'The chrome dino game, playable inside the browser tab favicon.',
};

export default function DinoPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4">
      <DinoGame />
      <Link
        href="/"
        className="mt-6 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors underline decoration-neutral-400 dark:decoration-neutral-600 underline-offset-2"
      >
        ← back home
      </Link>
    </div>
  );
}
