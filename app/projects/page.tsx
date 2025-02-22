'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { SpotlightCard } from '../components/SpotlightCard';
import ParticleEffect from '../components/ParticleEffect';
import Navbar from '../components/Navbar';
import { projects } from '@/lib/info';
import { useEffect, useState } from 'react';

export const dynamic = "force-dynamic";  // Forces dynamic rendering
export const fetchCache = 'force-no-store';  // Ensures fresh data on every request

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const convertViews = (views: number) => (views < 1000 ? views : `${(views / 1000).toFixed(0)}K`);

export default function ProjectsPage() {
  const [viewData, setViewData] = useState<{ id: string | number; project: string; views: number }[]>([]);
  const [dynamicProjects, setDynamicProjects] = useState(projects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRes = async () => {
      const res = await fetch('/api/view', { cache: 'no-store' });
      const data = await res.json();
      setViewData(data.view);
      setLoading(false); // Data fetching complete, set loading to false
    };
    getRes();
  }, []);

  useEffect(() => {
    if (viewData.length > 0) {
      setDynamicProjects((prevProjects) =>
        prevProjects.map((project) => ({
          ...project,
          views: viewData.find((v) => v.project === project.id)?.views || 0,
        }))
      );
    }
  }, [viewData]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <ParticleEffect />
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start gap-12 p-6 relative z-10 max-w-6xl mx-auto w-full">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">Projects</h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-[600px] mx-auto">Exploring the intersection of technology and innovation. Here are some of the projects I've been working on.</p>
        </motion.div>

        <motion.div className="grid gap-8 w-full" variants={containerVariants} initial="hidden" animate="visible">
          {dynamicProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <SpotlightCard className="border-neutral-900">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm text-neutral-400">{project.date}</span>
                  <div className="flex items-center gap-1 text-neutral-400">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">
                      {loading ? 'Loading...' : convertViews(project.views)}
                    </span>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
                <p className="text-neutral-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-neutral-800/50 text-neutral-300 px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <Link href={`/projects/${project.id}`} prefetch={false} className="inline-flex items-center text-sm text-white hover:text-neutral-300 transition-colors">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </motion.div>
  );
}
