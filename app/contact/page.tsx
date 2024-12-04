'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Twitter, Github, FileDown } from 'lucide-react'
import Link from 'next/link'
import ParticleEffect from '../components/ParticleEffect'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log({ name, email, message })
    toast({
      title: "Message Sent",
      description: "Thanks for reaching out! I'll get back to you soon.",
    })
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden"
    >
      <ParticleEffect />
      <nav className="flex justify-center items-center p-6 relative z-10">
        <Link 
          href="/"
          className="text-sm text-neutral-400 pr-4 hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link 
          href="/projects"
          className="text-sm text-neutral-400 pr-20 hover:text-white transition-colors"
        >
          Projects
        </Link>
        <div className="flex space-x-4">
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
        </div>
      </nav>
      
      <main className="flex-1 flex flex-col items-center justify-start gap-12 p-6 relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          className="text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            Get in Touch
          </h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-[600px] mx-auto">
            Have a question or want to work together? I'd love to hear from you. Fill out the form below or reach out through one of my social channels.
          </p>
        </motion.div>
        
        <motion.form 
          className="w-full max-w-md"
          onSubmit={handleSubmit}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-1">Message</label>
              <Textarea
                id="message"
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 min-h-[150px]"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.form>
      </main>
    </motion.div>
  )
}

