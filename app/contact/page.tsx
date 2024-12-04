"use client"

import { Twitter, Mail, Github, BookOpen, FileDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { SpotlightCard } from "../components/SpotlightCard"

const socialLinks = [
  {
    icon: Twitter,
    handle: "@DevItaliya22",
    label: "Twitter",
    href: "https://twitter.com/DevItaliya22"
  },
  {
    icon: BookOpen,
    handle: "DevSphere",
    label: "Medium",
    href: "https://medium.com/@thrilled_bisque_gnu_255"
  },
  
  {
    icon: Github,
    handle: "DevItaliya22",
    label: "Github",
    href: "https://github.com/DevItaliya22"
  },
  {
    icon: FileDown,
    handle: "Resume",
    label: "resume",
    href: "https://drive.google.com/file/d/1HvREDAjhvTZcT8XCi7nj5APDe-yRWDsK/view?usp=drive_link"
  },
  {
    icon: Mail,
    handle: "devitaliya.work",
    label: "Email",
    href: "mailto:devitaliya.work@gmail.com"
  },
  
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 from-20% via-neutral-800 via-40% to-neutral-900 to-80% flex flex-col">
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
          href="/projects" 
          className="text-sm hover:text-white transition-colors mr-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Projects
        </motion.a>
      </nav>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl w-full">
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <SpotlightCard >
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-neutral-900 rounded-full">
                    <link.icon className="w-6 h-6 text-neutral-500" />
                  </div>
                  <span className="text-2xl font-medium text-white">{link.handle}</span>
                  <span className="text-neutral-500">{link.label}</span>
                </div>
              </SpotlightCard>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}

