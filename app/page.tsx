'use client'

import { motion } from 'framer-motion'
import ParticleEffect from './components/ParticleEffect'
import { FileDown, Github, Twitter } from 'lucide-react'

export default function Page() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden"
    >
      <ParticleEffect />
      <nav className="flex justify-center gap-6 p-6 text-neutral-400 relative z-10 ">
        <motion.a 
          href="/projects" 
          className="text-sm hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Projects
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
            href="https://twitter.com/DevItaliya22"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Twitter className="h-5 w-5" />
          </motion.a>
          <motion.a 
            href="https://github.com/DevItaliya22"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="h-5 w-5" />
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
      
      <main className="flex-1 flex flex-col items-center justify-center gap-6 p-6 relative z-10">
        <motion.h1 
          className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          Dev Italiya
        </motion.h1>
        <motion.p 
          className="text-neutral-400 text-sm md:text-base max-w-[600px] text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          I'm building web applications and websites for clients around the world. 
        </motion.p>
      </main>
    </motion.div>
  )
}

