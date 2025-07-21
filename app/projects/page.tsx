import React from 'react';
import { Eye, Link } from 'lucide-react';
import { projects } from '../../lib/info';
import Navbar from '../components/Navbar';
import ParticleEffect from '../components/ParticleEffect';
import { getAllProjectsWithViews } from '@/lib/views';
import { Metadata } from 'next';

// Force dynamic rendering for fresh data
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects - Dev Italiya',
  description:
    'Explore my portfolio of web applications, automation platforms, and client projects built with modern technologies like React, Next.js, and Node.js.',
  keywords: [
    'dev italiya projects',
    'portfolio',
    'web applications',
    'react projects',
    'next.js projects',
    'full stack projects',
  ],
  openGraph: {
    title: 'Projects - Dev Italiya',
    description:
      'Explore my portfolio of web applications, automation platforms, and client projects.',
    url: 'https://www.devitaliya.me/projects',
    type: 'website',
  },
  twitter: {
    title: 'Projects - Dev Italiya',
    description:
      'Explore my portfolio of web applications, automation platforms, and client projects.',
  },
};

const convertViews = (views: number) =>
  views < 1000 ? views : `${(views / 1000).toFixed(0)}K`;

export default async function Projects2Page() {
  // Get all projects with their view counts from JSON file
  const dynamicProjects = await getAllProjectsWithViews();

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Dev Italiya Projects',
    description: 'Portfolio of development projects by Dev Italiya',
    itemListElement: dynamicProjects.map((project, index) => ({
      '@type': 'CreativeWork',
      position: index + 1,
      name: project.title,
      description: project.description,
      dateCreated: project.date,
      creator: {
        '@type': 'Person',
        name: 'Dev Italiya',
      },
      keywords: project.tags,
    })),
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <ParticleEffect />
        <div className="relative z-10">
          <Navbar />

          <main className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Featured Projects
              </h1>
              <p className="text-neutral-400 text-lg">
                A collection of projects I've built, from automation platforms
                to client websites.
              </p>
            </div>

            {/* Projects List */}
            <div className="space-y-1">
              {dynamicProjects.map((project) => (
                <a
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block group"
                >
                  <div className="flex items-center justify-between py-4 px-4 hover:bg-neutral-900/50 rounded-lg transition-colors duration-200">
                    <div className="flex-1">
                      <h2 className="text-lg font-medium group-hover:text-neutral-300 transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm text-neutral-400 mt-1">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-neutral-400 ml-4">
                      <span className="hidden sm:block">{project.date}</span>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{convertViews(project.views)}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer space */}
            <div className="mt-16 pt-8 border-t border-neutral-800">
              <p className="text-center text-neutral-500 text-sm">
                {dynamicProjects.length} projects total
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
