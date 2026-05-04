"use client";

import { Loader2 } from "lucide-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlatformStore } from '@/store/usePlatformStore';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { MapPin, Box, Zap, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { listings, incrementImpact } = usePlatformStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const item = listings.find((l) => l.id === params.id) || listings[0]; // fallback to first item

  const handlePurchase = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      // Simulate impact increase
      incrementImpact(Math.floor(item.quantity * 0.5), item.quantity, item.predictedValue * 0.1);

      // Redirect after success animation
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 relative">
      <Link href="/marketplace" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl overflow-hidden relative h-[400px] lg:h-[600px] border border-white/10"
        >
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-primary flex items-center border border-primary/30">
              <ShieldCheck className="w-4 h-4 mr-2" /> AI Verified: {item.type}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8 flex flex-col justify-center"
        >
          <div>
            <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
            <div className="flex items-center space-x-6 text-gray-400">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {item.location}</span>
              <span className="flex items-center"><Box className="w-4 h-4 mr-1" /> {item.quantity} {item.unit}</span>
            </div>
          </div>

          <GlassCard className="bg-primary/5 border-primary/20">
            <div className="flex items-start">
              <Zap className="w-6 h-6 text-primary mr-4 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-primary mb-2">AI Optimization Insight</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Purchasing this {item.type.toLowerCase()} instead of raw materials will save approximately <strong>{(item.quantity * 0.5).toFixed(0)}kg of CO₂</strong> emissions and reduce your production costs by an estimated <strong>12%</strong>.
                </p>
              </div>
            </div>
          </GlassCard>

          <div className="flex items-end justify-between border-b border-gray-700 pb-8">
            <div>
              <p className="text-gray-400 mb-1">Total Value</p>
              <h2 className="text-5xl font-extrabold text-white">${item.predictedValue}</h2>
            </div>
          </div>

          <div className="pt-4">
            <AnimatedButton
              variant="primary"
              className="w-full py-4 text-lg relative overflow-hidden"
              onClick={handlePurchase}
              disabled={isProcessing || showSuccess}
            >
              {isProcessing ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Loader2 className="w-6 h-6" />
                </motion.div>
              ) : (
                "Initiate Secure Transfer"
              )}

              {/* Shine effect */}
              {!isProcessing && !showSuccess && (
                <motion.div
                  className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 1 }}
                />
              )}
            </AnimatedButton>
          </div>
        </motion.div>
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-[#0f172a] border border-primary/50 p-12 rounded-3xl flex flex-col items-center text-center shadow-[0_0_50px_rgba(16,185,129,0.3)]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle2 className="w-24 h-24 text-primary mb-6" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">Transaction Verified</h2>
              <p className="text-gray-400 max-w-sm mb-2">Smart contract executed successfully.</p>
              <p className="text-primary font-medium">Redirecting to Intelligence Dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
