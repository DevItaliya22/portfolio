'use client';

import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';

export function ConfettiSideCannons() {
  const handleClick = () => {
    const end = Date.now() + 1 * 1000; // 1 second
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 360 - 45,
        spread: 70,
        startVelocity: 60,
        origin: { x: 0, y: 0 },
        colors: colors,
        ticks: 200,
        decay: 0.9,
      });
      confetti({
        particleCount: 2,
        angle: 180 + 45,
        spread: 70,
        startVelocity: 60,
        origin: { x: 1, y: 0 },
        colors: colors,
        ticks: 200,
        decay: 0.9,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="fixed bottom-4 right-4 z-50 size-10 rounded-full p-0 border-neutral-300 bg-white/80 dark:border-neutral-600 dark:bg-neutral-900/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white backdrop-blur-sm"
      aria-label="Celebrate"
    >
      🎉
    </Button>
  );
}
