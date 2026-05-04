"use client";

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function CountingNumber({ value, prefix = '', suffix = '', duration = 2 }: { value: number, prefix?: string, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(percentage * value));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <motion.span 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="font-mono tabular-nums"
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  );
}
