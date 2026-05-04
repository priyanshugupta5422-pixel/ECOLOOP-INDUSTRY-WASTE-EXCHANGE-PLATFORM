"use client";

import { motion } from 'framer-motion';
import { hoverScale } from '@/animations/motion';

export function GlassCard({ children, className = '', onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  return (
    <motion.div
      variants={hoverScale}
      initial="rest"
      whileHover="hover"
      whileTap={onClick ? "tap" : "rest"}
      onClick={onClick}
      className={`glass rounded-2xl p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
