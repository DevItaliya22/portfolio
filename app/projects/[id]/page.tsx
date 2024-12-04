'use client'

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ParticleEffect from '../../components/ParticleEffect'

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  features: string[]
  techStack: string[]
}

const projects: Project[] = [
  {
    id: 'unkey-dev',
    title: 'unkey.dev',
    description: 'API authentication and authorization for developers. Secure, scalable, and easy to integrate.',
    longDescription: 'Unkey.dev is a cutting-edge solution for API authentication and authorization, designed to simplify the development process while maintaining robust security. Our platform offers a seamless integration experience, allowing developers to focus on building great products without worrying about the complexities of user authentication and access control.',
    tags: ['API', 'Auth', 'SaaS'],
    features: [
      'Secure API key management',
      'Role-based access control',
      'Real-time analytics and monitoring',
      'Easy integration with existing systems',
      'Scalable infrastructure'
    ],
    techStack: ['Node.js', 'TypeScript', 'Redis', 'PostgreSQL', 'Docker']
  },
  {
    id: 'project-nebula',
    title: 'Project Nebula',
    description: 'A cloud-native database solution designed for high performance and scalability.',
    longDescription: 'Project Nebula is a next-generation, cloud-native database solution that combines the power of distributed systems with the simplicity of traditional databases. Built from the ground up to handle massive scale and complex queries, Nebula offers unparalleled performance and reliability for modern, data-intensive applications.',
    tags: ['Database', 'Cloud', 'Performance'],
    features: [
      'Distributed architecture for high availability',
      'Automatic sharding and load balancing',
      'Advanced query optimization',
      'Real-time data replication',
      'Built-in analytics engine'
    ],
    techStack: ['Rust', 'gRPC', 'Kubernetes', 'Prometheus', 'Grafana']
  },
  {
    id: 'devflow',
    title: 'DevFlow',
    description: 'Streamline your development workflow with our integrated CI/CD pipeline and collaboration tools.',
    longDescription: 'DevFlow is a comprehensive development workflow solution that brings together continuous integration, continuous deployment, and team collaboration tools in one unified platform. By automating repetitive tasks and providing powerful insights into your development process, DevFlow helps teams deliver high-quality software faster and more efficiently.',
    tags: ['DevOps', 'Collaboration', 'Productivity'],
    features: [
      'Integrated CI/CD pipeline',
      'Code review and collaboration tools',
      'Automated testing and quality checks',
      'Release management and versioning',
      'Team performance analytics'
    ],
    techStack: ['Go', 'React', 'Docker', 'Jenkins', 'Terraform']
  }
]

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden"
    >
      <ParticleEffect />
      <nav className="flex justify-between items-center p-6 relative z-10">
        <Link 
          href="/projects"
          className="text-sm text-neutral-400 hover:text-white transition-colors inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </nav>
      
      <main className="flex-1 flex flex-col items-start justify-start gap-12 p-6 relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          className="w-full"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-neutral-400 text-lg mb-8">{project.description}</p>
          <p className="text-neutral-300">{project.longDescription}</p>
        </motion.div>
        
        <motion.div 
          className="w-full"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
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
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span key={index} className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </main>
    </motion.div>
  )
}

