import React from "react";
import { motion } from "framer-motion";

function Navbar() {
  return (
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
        className="text-sm hover:text-white transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Projects
      </motion.a>
      <motion.a
        href="/contact"
        className="text-sm hover:text-white transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact
      </motion.a>
    </nav>
  );
}

export default Navbar;
