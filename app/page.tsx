import PortfolioContent from '@/components/portfolio/PortfolioContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dev Italiya - Full Stack Developer',
  description:
    'Full-stack developer building innovative web applications and websites for clients worldwide. Specializing in React, Next.js, Node.js, and modern web technologies.',
  keywords: [
    'dev italiya',
    'full stack developer',
    'web developer',
    'react developer',
    'next.js',
    'node.js',
    'portfolio',
  ],
  openGraph: {
    title: 'Dev Italiya - Full Stack Developer',
    description:
      'Full-stack developer building innovative web applications and websites for clients worldwide.',
    url: 'https://devitaliya.com',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Dev Italiya - Full Stack Developer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Italiya - Full Stack Developer',
    description:
      'Full-stack developer building innovative web applications and websites for clients worldwide.',
    images: ['/og.png'],
  },
};

export default function Page() {
  return <PortfolioContent />;
}
