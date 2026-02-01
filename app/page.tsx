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
    url: 'https://www.devitaliya.me',
    type: 'website',
  },
  twitter: {
    title: 'Dev Italiya - Full Stack Developer',
    description:
      'Full-stack developer building innovative web applications and websites for clients worldwide.',
  },
};

export default function Page() {
  return <PortfolioContent />;
}
