'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowBigRightDash,
  ArrowLeft,
  ArrowUpRight,
  EyeIcon,
  Github,
  Instagram,
} from 'lucide-react';
import ParticleEffect from '../../components/ParticleEffect';
import React, { useEffect, useState } from 'react';
import { Project, projects } from '@/lib/info';
import { useViewStore } from '@/store/viewStore';

export default function ProjectDetail() {
  const { id } = useParams();
  const view = useViewStore((state) => state.view);
  const fetchViews = useViewStore((state) => state.fetchViews);

  useEffect(()=>{
    fetchViews();
  },[])

  const [project, setProject] = useState<Project>(projects.find((p) => p.id === id) || {} as Project);

  useEffect(()=>{
    setProject((project) => ({ ...project, views: view.find((v) => v.project === id)?.views || 0 }));
  },[project,view])
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden"
    >
      <ParticleEffect />
      <nav className="flex justify-between items-center p-6  z-10 relative">
        <Link
          href="/projects"
          className="text-sm text-neutral-400 hover:text-white transition-colors inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
        <div className='text-sm text-neutral-400 flex '>
          <EyeIcon/> &nbsp; {project.views}
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-start justify-start gap-12 p-6 relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 ">
            {project.title}
          </h1>
          <div className="flex gap-2"></div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-neutral-400 mr-3 hover:text-white transition-colors ml-10 ${
                  project.github === 'private' ? 'pointer-events-none' : ''
                } }`}
              >
                {project.github === 'private' ? (
                  'Private Repo'
                ) : (
                  <Github className="h-6 w-6" />
                )}
              </a>
            )}
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowUpRight className="h-6 w-6" />
              </a>
            )}
            {project.instagram && (
              <a
                href={project.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            )}
          </div>
          <p className="text-neutral-400 text-lg mb-8">{project.description}</p>
          <p className="text-neutral-300">
            {project.longDescription
              .split('<br/>')
              .map((val: string, idx: number) => (
                <React.Fragment key={idx}>
                  {val.includes('@Aviral') ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: val.replace(
                          '@Aviral',
                          `<a href="https://github.com/AviralJ58" target="_blank" class="underline italic text-white font-700">@Aviral (Accenture)</a>`
                        ),
                      }}
                    />
                  ) : (
                    <span>{val}</span>
                  )}
                  <br />
                </React.Fragment>
              ))}
          </p>
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{  opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-neutral-300">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{  opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
