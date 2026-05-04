"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PackagePlus, Send, Loader2, IndianRupee, MapPin, Target, Hash } from "lucide-react";
import { useAppStore, type Product } from "@/store/useAppStore";
import AuthGuard from "@/components/auth/AuthGuard";

export default function SellPage() {
  const router = useRouter();
  const { addCustomProduct } = useAppStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Polymers",
    priceValue: "",
    priceUnit: "MT",
    quantityValue: "",
    quantityUnit: "MT",
    batch: "",
    location: "",
    resourcePotential: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newProduct: Product = {
        id: `p-custom-${Date.now()}`,
        title: formData.title,
        batch: formData.batch || `BCH-${Math.floor(Math.random() * 10000)}`,
        location: formData.location,
        price: `₹${formData.priceValue}/${formData.priceUnit}`,
        unit: formData.priceUnit,
        quantity: `${formData.quantityValue} ${formData.quantityUnit}`,
        resourcePotential: formData.resourcePotential,
        category: formData.category,
        purityScore: Math.floor(Math.random() * 20) + 80, // Random 80-99%
        description: formData.description,
      };

      addCustomProduct(newProduct);
      setIsSubmitting(false);
      router.push("/marketplace");
    }, 1200);
  };

  return (
    <AuthGuard>
      <div style={{ minHeight: "calc(100vh - 64px)", background: "#131313", padding: "32px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <PackagePlus size={24} color="#39FF14" />
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "32px", fontWeight: 700, color: "#efffe3", letterSpacing: "-0.02em" }}>
                List Waste Material
              </h1>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#baccb0" }}>
              Enter the details of your industrial byproduct to make it available on the global marketplace.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card" style={{ padding: "32px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* Title & Category */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#85967c", marginBottom: "6px" }}>Material Title *</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleChange} className="input-field" placeholder="e.g. High-Density Polymer Regrind" style={{ width: "100%" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#85967c", marginBottom: "6px" }}>Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="input-field" style={{ width: "100%" }}>
                    <option value="Polymers">Polymers</option>
                    <option value="Metals">Metals</option>
                    <option value="E-Waste">E-Waste</option>
                    <option value="Glass/Fiber">Glass/Fiber</option>
                  </select>
                </div>
              </div>

              {/* Price & Quantity */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#85967c", marginBottom: "6px" }}>Pricing *</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ position: "relative", flex: 2 }}>
                      <IndianRupee size={16} color="#85967c" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                      <input type="number" name="priceValue" required min="1" value={formData.priceValue} onChange={handleChange} className="input-field" placeholder="420" style={{ width: "100%", paddingLeft: "36px" }} />
                    </div>
                    <select name="priceUnit" value={formData.priceUnit} onChange={handleChange} className="input-field" style={{ flex: 1 }}>
                      <option value="MT">per MT</option>
                      <option value="Lot">per Lot</option>
                      <option value="kg">per kg</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#85967c", marginBottom: "6px" }}>Available Quantity *</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input type="number" name="quantityValue" required min="0.1" step="0.1" value={formData.quantityValue} onChange={handleChange} className="input-field" placeholder="45.5" style={{ flex: 2, width: "100%" }} />
                    <select name="quantityUnit" value={formData.quantityUnit} onChange={handleChange} className="input-field" style={{ flex: 1 }}>
                      <option value="MT">MT</option>
                      <option value="Lot">Lots</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Batch, Location, Potential */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#85967c", marginBottom: "6px" }}>Batch/Lot Number</label>
                  <div style={{ position: "relative" }}>
                    <Hash size={16} color="#85967c" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                    <input type="text" name="batch" value={formData.batch} onChange={handleChange} className="input-field" placeholder="Auto-generated" style={{ width: "100%", paddingLeft: "36px" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#85967c", marginBottom: "6px" }}>Origin Location *</label>
                  <div style={{ position: "relative" }}>
                    <MapPin size={16} color="#85967c" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                    <input type="text" name="location" required value={formData.location} onChange={handleChange} className="input-field" placeholder="e.g. Frankfurt, GER" style={{ width: "100%", paddingLeft: "36px" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", color: "#85967c", marginBottom: "6px" }}>Resource Potential *</label>
                  <div style={{ position: "relative" }}>
                    <Target size={16} color="#85967c" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                    <input type="text" name="resourcePotential" required value={formData.resourcePotential} onChange={handleChange} className="input-field" placeholder="e.g. 92% Recovery" style={{ width: "100%", paddingLeft: "36px" }} />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label style={{ display: "block", fontSize: "13px", color: "#85967c", marginBottom: "6px" }}>Material Description *</label>
                <textarea 
                  name="description" 
                  required 
                  value={formData.description} 
                  onChange={handleChange} 
                  className="input-field" 
                  placeholder="Provide details about the byproduct's origin, contaminants, handling requirements, and suitability for secondary use..." 
                  style={{ width: "100%", minHeight: "100px", resize: "vertical" }} 
                />
              </div>

              <div style={{ borderTop: "1px solid rgba(57,255,20,0.2)", marginTop: "8px", paddingTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary" 
                  style={{ padding: "14px 32px", display: "flex", alignItems: "center", gap: "8px", fontSize: "16px" }}
                >
                  {isSubmitting ? (
                    <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Broadcasting Listing...</>
                  ) : (
                    <><Send size={18} /> Publish to Marketplace</>
                  )}
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}
