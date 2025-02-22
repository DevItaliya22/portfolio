'use client';
import { socialLinks } from '@/lib/info';
import { motion } from 'framer-motion';
import { SpotlightCard } from '../components/SpotlightCard';
import Navbar from '../components/Navbar';
export const fetchCache = 'force-no-store';
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 from-20% via-neutral-800 via-40% to-neutral-900 to-80% flex flex-col">
      <Navbar></Navbar>
      <motion.div
        className="flex-1 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SpotlightCard className="h-full transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-indigo-500/10">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-neutral-800 rounded-full transition-colors duration-300 group-hover:bg-neutral-700">
                    <link.icon className="w-6 h-6 text-indigo-400 transition-colors duration-300 group-hover:text-indigo-300" />
                  </div>
                  <span className="text-2xl font-medium text-white transition-colors duration-300 group-hover:text-indigo-200">
                    {link.handle}
                  </span>
                  <span className="text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">
                    {link.label}
                  </span>
                </div>
              </SpotlightCard>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
