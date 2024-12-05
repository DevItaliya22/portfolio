import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname();
  const paths: string[] = ['/', '/Projects', '/Contact'];

  return (
    <nav className="flex justify-center gap-6 p-6 text-neutral-400 relative z-10">
      {paths.map((path:string) => (
        <motion.a
          key={path}
          href={path.toLocaleLowerCase()}
          className={`text-sm hover:text-white transition-colors ${pathname === path.toLocaleLowerCase() ? 'text-white' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {path === '/' ? 'Home' : path.slice(1)}
        </motion.a>
      ))}
    </nav>
  );
}

export default Navbar;
