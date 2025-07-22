import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const devPrivate = localFont({
  src: './fonts/dev-private.woff',
  variable: '--font-dev-private',
  weight: '400',
});
const poppinsExtraBoldItalic = localFont({
  src: './fonts/Poppins-ExtraBoldItalic.woff',
  variable: '--font-poppins-extrabold-italic',
  weight: '800',
  style: 'italic',
});
const satoshiLight = localFont({
  src: './fonts/Satoshi-Light.woff',
  variable: '--font-satoshi-light',
  weight: '500',
});

const satoshiBold = localFont({
  src: './fonts/Satoshi-Bold.woff',
  variable: '--font-satoshi-bold',
  weight: '700',
});

export const metadata: Metadata = {
  title: {
    default: 'Dev Italiya - Full Stack Developer',
    template: '%s | Dev Italiya',
  },
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
  authors: [{ name: 'Dev Italiya' }],
  creator: 'Dev Italiya',
  metadataBase: new URL('https://www.devitaliya.me'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Dev Italiya - Full Stack Developer',
    description:
      'Full-stack developer building innovative web applications and websites for clients worldwide.',
    url: 'https://www.devitaliya.me',
    siteName: 'Dev Italiya Portfolio',
    images: [
      {
        url: '/image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dev Italiya - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Italiya - Full Stack Developer',
    description:
      'Full-stack developer building innovative web applications and websites for clients worldwide.',
    creator: '@DevItaliya22',
    images: ['/image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dev Italiya',
    jobTitle: 'Full Stack Developer',
    description:
      'Full-stack developer building innovative web applications and websites for clients worldwide',
    url: 'https://www.devitaliya.me',
    sameAs: [
      'https://twitter.com/DevItaliya22',
      'https://github.com/DevItaliya22',
      'https://www.linkedin.com/in/dev-italiya-0a3a2b273/',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'Full Stack Development',
      'Web Development',
    ],
    workExample: {
      '@type': 'WebSite',
      name: 'Dev Italiya Portfolio',
      url: 'https://www.devitaliya.me',
    },
  };

  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/image.jpg"
          type="image/jpeg"
          style={{ borderRadius: '50%' }}
        />
        <script
          defer
          data-website-id="6783df6488b0ca8b0194a39b"
          data-domain="www.devitaliya.me"
          src="https://datafa.st/js/script.js"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${devPrivate.variable} ${poppinsExtraBoldItalic.variable} ${satoshiLight.variable} ${satoshiBold.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
