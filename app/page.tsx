"use client";

import { motion } from "framer-motion";
import ParticleEffect from "./components/ParticleEffect";
import { FileDown, Github, Twitter } from "lucide-react";
import Navbar from "./components/Navbar";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden"
    >
      <ParticleEffect />
      <Navbar></Navbar>
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
          I'm building web applications and websites for clients around the
          world.
        </motion.p>
      </main>
    </motion.div>
  );
}
