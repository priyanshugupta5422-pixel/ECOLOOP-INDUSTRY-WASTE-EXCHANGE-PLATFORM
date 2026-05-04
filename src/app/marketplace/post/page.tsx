"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlatformStore } from '@/store/usePlatformStore';
import { simulateAIClassification } from '@/utils/mockAI';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { UploadCloud, Loader2, Info } from 'lucide-react';

export default function PostWastePage() {
  const router = useRouter();
  const { addListing } = usePlatformStore();
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    quantity: '',
    unit: 'kg',
    location: '',
    predictedValue: 0,
    confidenceScore: 0,
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800'
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsAnalyzing(true);
      setImageUploaded(true);
      
      const result: any = await simulateAIClassification(e.target.files[0]);
      
      setFormData({
        ...formData,
        type: result.type,
        predictedValue: result.suggestedPrice,
        confidenceScore: result.confidenceScore,
        title: `${result.type} Waste Materials`
      });
      
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      quantity: parseInt(formData.quantity) || 0,
    };
    
    addListing(newListing);
    router.push('/marketplace');
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Listing</h1>
        <p className="text-gray-400">Upload an image and let AI pre-fill your listing details.</p>
      </motion.div>

      <div className="space-y-8">
        <GlassCard className="relative overflow-hidden group border-dashed border-2 border-primary/40">
          {!imageUploaded || isAnalyzing ? (
            <div className="p-12 flex flex-col items-center text-center">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              {isAnalyzing ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Loader2 className="w-12 h-12 text-primary mb-4" />
                </motion.div>
              ) : (
                <UploadCloud className="w-12 h-12 text-gray-400 mb-4 group-hover:text-primary transition-colors" />
              )}
              <h3 className="font-semibold text-lg">{isAnalyzing ? "AI is analyzing image..." : "Upload Waste Image"}</h3>
              <p className="text-sm text-gray-500 mt-2">Required for AI classification and pricing</p>
            </div>
          ) : (
            <div className="p-6 flex items-center space-x-6">
              <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <img src={formData.imageUrl} alt="Uploaded" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-primary font-bold flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  AI Classification Complete
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  Detected <span className="font-semibold">{formData.type}</span> with {(formData.confidenceScore * 100).toFixed(0)}% confidence.
                </p>
                <button onClick={() => setImageUploaded(false)} className="text-xs text-gray-500 hover:text-white mt-2 underline">
                  Upload different image
                </button>
              </div>
            </div>
          )}
          
          {isAnalyzing && (
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-primary"
              animate={{ y: ['0%', '2000%', '0%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          )}
        </GlassCard>

        <AnimatePresence>
          {imageUploaded && !isAnalyzing && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <GlassCard className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Listing Title</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-white/5 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Material Type</label>
                    <input 
                      type="text" 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full bg-white/5 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Quantity</label>
                    <div className="flex space-x-2">
                      <input 
                        type="number" 
                        value={formData.quantity}
                        onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                        className="w-full bg-white/5 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-primary transition-colors"
                        required
                      />
                      <select 
                        value={formData.unit}
                        onChange={(e) => setFormData({...formData, unit: e.target.value})}
                        className="bg-white/5 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-primary"
                      >
                        <option value="kg">kg</option>
                        <option value="tons">tons</option>
                        <option value="liters">liters</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g. Austin, TX"
                      className="w-full bg-white/5 border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-primary transition-colors"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Suggested Price (USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                      <input 
                        type="number" 
                        value={formData.predictedValue}
                        onChange={(e) => setFormData({...formData, predictedValue: Number(e.target.value)})}
                        className="w-full bg-primary/10 border border-primary/30 text-primary font-bold rounded-lg p-3 pl-8 focus:outline-none focus:border-primary transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>

              <div className="flex justify-end pt-4">
                <AnimatedButton type="submit" variant="primary">
                  Publish to Marketplace
                </AnimatedButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
