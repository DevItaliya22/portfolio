'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { title: 'Home', route: '/' },
    { title: 'Projects And Learning', route: '/projects' },
    { title: 'Contact', route: '/contact' },
  ];

  return (
    <nav className="flex justify-between items-center p-6 text-neutral-400 relative z-10">
      {/* Left side - empty for balance */}
      <div className="w-32"></div>
      
      {/* Center - Navigation items */}
      <div className="flex gap-6">
        {navItems.map((item) => (
          <motion.a
            key={item.route}
            href={item.route}
            className={`text-sm hover:text-white transition-colors ${pathname === item.route ? 'text-white' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.title}
          </motion.a>
        ))}
      </div>

      {/* Right side - Available for work indicator (only show when not on main page) */}
      {pathname !== '/' && (
        <div className="flex items-center gap-2 text-sm text-neutral-300">
          <div className="relative">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          </div>
          <span>Available for work</span>
        </div>
      )}
      
      {/* Empty div for balance when on main page */}
      {pathname === '/' && <div className="w-32"></div>}
    </nav>
  );
}

export default Navbar;
