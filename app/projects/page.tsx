
"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Eye, FileDown, Github, Twitter } from 'lucide-react'
import { SpotlightCard } from "../components/SpotlightCard"
import ParticleEffect from "../components/ParticleEffect"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  date: string
  views: number
}

const projects: Project[] = [
  {
    id: "unkey-dev",
    title: "unkey.dev",
    description: "API authentication and authorization for developers. Secure, scalable, and easy to integrate.",
    tags: ["API", "Auth", "SaaS"],
    date: "Apr 1, 2023",
    views: 18000
  },
  {
    id: "project-nebula",
    title: "Project Nebula",
    description: "A cloud-native database solution designed for high performance and scalability.",
    tags: ["Database", "Cloud", "Performance"],
    date: "May 15, 2023",
    views: 12000
  },
  {
    id: "devflow",
    title: "DevFlow",
    description: "Streamline your development workflow with our integrated CI/CD pipeline and collaboration tools.",
    tags: ["DevOps", "Collaboration", "Productivity"],
    date: "Jun 30, 2023",
    views: 15000
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function ProjectsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden"
    >
      <ParticleEffect />
      <nav className="flex justify-center gap-6 p-6 text-neutral-400 relative z-10">
        <motion.a 
          href="/" 
          className="text-sm hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Home
        </motion.a>
        <motion.a 
          href="/contact" 
          className="text-sm hover:text-white transition-colors mr-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact
        </motion.a>
        
        <motion.a 
          href="https://drive.google.com/file/d/1HvREDAjhvTZcT8XCi7nj5APDe-yRWDsK/view?usp=drive_link"
          className="text-neutral-400 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FileDown className="h-5 w-5" />
        </motion.a>
      </nav>
      
      <main className="flex-1 flex flex-col items-center justify-start gap-12 p-6 relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            Projects
          </h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-[600px] mx-auto">
            Exploring the intersection of technology and innovation. Here are some of the projects I've been working on.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
            >
              <SpotlightCard>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm text-neutral-400">{project.date}</span>
                  <div className="flex items-center gap-1 text-neutral-400">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">{(project.views / 1000).toFixed(0)}K</span>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
                <p className="text-neutral-400 mb-6 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs bg-neutral-800/50 text-neutral-300 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link 
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center text-sm text-white hover:text-neutral-300 transition-colors"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </motion.div>
  )
}

