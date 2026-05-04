"use client";

import { motion } from 'framer-motion';
import { hoverScale } from '@/animations/motion';

export function AnimatedButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
}) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300";
  const variants = {
    primary: "bg-primary text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)]",
    secondary: "bg-secondary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7)]",
    outline: "border-2 border-primary text-primary hover:bg-primary/10"
  };

  return (
    <motion.button
      variants={hoverScale}
      initial="rest"
      whileHover={!disabled ? "hover" : "rest"}
      whileTap={!disabled ? "tap" : "rest"}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
}
