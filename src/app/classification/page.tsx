"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, ScanLine, CheckCircle2, Activity, Cpu, Zap, Globe } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import AuthGuard from "@/components/auth/AuthGuard";

// Neural engine specs from Stitch design
const engineSpecs = [
  { icon: Cpu, label: "Model Version", value: "EcoLoop-V4-Pro" },
  { icon: Activity, label: "Spectral Sensitivity", value: "400nm - 2500nm (SWIR)" },
  { icon: CheckCircle2, label: "Materials Library", value: "42,000+ Compounds" },
  { icon: Globe, label: "Global Market Sync", value: "Real-time (LME/COMEX)" },
];

// Simulated classification results (matching Stitch: PET-G Polymer, 6061 Aluminum)
const MOCK_RESULTS = [
  [
    { name: "PET-G Polymer", confidence: 94.2, recoveryValue: 8200, color: "#39FF14" },
    { name: "6061 Aluminum", confidence: 78.1, recoveryValue: 4280, color: "#00EEFC" },
  ],
  [
    { name: "HDPE Regrind", confidence: 99.1, recoveryValue: 6900, color: "#39FF14" },
    { name: "Copper Wire Scraps", confidence: 88.4, recoveryValue: 5380, color: "#FFB900" },
  ],
  [
    { name: "Mixed E-Waste", confidence: 91.7, recoveryValue: 12400, color: "#8E2DE2" },
    { name: "Borosilicate Glass", confidence: 73.5, recoveryValue: 2100, color: "#00EEFC" },
  ],
];

export default function ClassificationPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [step, setStep] = useState<"idle" | "scanning" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const { classificationResult, setClassificationResult, setIsClassifying } = useAppStore();

  const handleFile = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
    setStep("idle");
    setClassificationResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type.startsWith("image/")) handleFile(f);
  };

  const runClassification = async () => {
    setStep("scanning");
    setIsClassifying(true);
    setProgress(0);

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => (p >= 95 ? p : p + Math.random() * 12));
    }, 180);

    try {
      // Attempt real API call
      const res = await fetch("http://localhost:4000/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file?.name }),
      });
      if (res.ok) {
        const data = await res.json();
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setClassificationResult(data);
          setStep("done");
          setIsClassifying(false);
        }, 400);
        return;
      }
    } catch {
      // Fall back to simulated result
    }

    // Simulated delay + random result
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      const pick = MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
      const totalValue = pick.reduce((sum, m) => sum + m.recoveryValue, 0);
      setTimeout(() => {
        setClassificationResult({ materials: pick, totalValue, processingStream: "Loop 02", latency: 12, throughput: "2.4t/h" });
        setStep("done");
        setIsClassifying(false);
      }, 400);
    }, 2800);
  };

  return (
    <AuthGuard>
      <div style={{ minHeight: "calc(100vh - 64px)", background: "#131313", padding: "32px 24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <ScanLine size={20} color="#39FF14" />
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "#efffe3", letterSpacing: "-0.02em" }}>
              Neural Waste Analysis
            </h1>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#baccb0" }}>
            Deploy industrial-grade computer vision to identify, categorize, and value circular materials in real-time.
          </p>
          {/* Inline stats from Stitch */}
          <div style={{ display: "flex", gap: "24px", marginTop: "16px", flexWrap: "wrap" }}>
            {[{ l: "AI Confidence", v: "99.4%" }, { l: "Latency", v: "12ms" }, { l: "Throughput", v: "2.4t/h" }].map(s => (
              <div key={s.l} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#39FF14" }}>{s.v}</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase", color: "#85967c" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upload Zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${isDragging ? "#39FF14" : preview ? "rgba(57,255,20,0.3)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "16px",
            background: isDragging ? "rgba(57,255,20,0.04)" : "rgba(255,255,255,0.02)",
            cursor: "pointer",
            minHeight: preview ? "280px" : "220px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "24px",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.2s ease",
            boxShadow: isDragging ? "0 0 30px rgba(57,255,20,0.1)" : "none",
          }}>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} id="file-upload"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

          {preview ? (
            <img src={preview} alt="Upload preview" style={{ maxHeight: "240px", maxWidth: "100%", objectFit: "contain", borderRadius: "8px" }} />
          ) : (
            <>
              <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(57,255,20,0.08)", border: "1px solid rgba(57,255,20,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UploadCloud size={26} color="#39FF14" />
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#efffe3", marginBottom: "4px" }}>Input Feed Required</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#85967c" }}>Drag industrial byproduct imagery or click to initiate high-resolution visual uplink.</p>
              </div>
            </>
          )}
        </motion.div>

        {/* Classify Button */}
        {file && step === "idle" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <button onClick={runClassification} className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              <Cpu size={18} /> Run AI Classification
            </button>
          </motion.div>
        )}

        {/* Scanning Progress */}
        <AnimatePresence>
          {step === "scanning" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="glass-card" style={{ padding: "24px", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", color: "#efffe3", fontWeight: 600 }}>Analyzing stream...</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", color: "#39FF14", fontWeight: 700 }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
                <motion.div animate={{ width: `${progress}%` }} transition={{ ease: "easeOut" }}
                  style={{ height: "100%", background: "linear-gradient(90deg, #39FF14, #00EEFC)", borderRadius: "4px", boxShadow: "0 0 12px rgba(57,255,20,0.5)" }} />
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#85967c", marginTop: "8px" }}>Multi-spectral neural analysis in progress…</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {step === "done" && classificationResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: "#efffe3", marginBottom: "16px" }}>
                AI Classification Results
              </h2>
              <div style={{ display: "grid", gap: "12px", marginBottom: "16px" }}>
                {classificationResult.materials.map((mat) => (
                  <motion.div key={mat.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: mat.color, boxShadow: `0 0 8px ${mat.color}` }} />
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#efffe3" }}>{mat.name}</span>
                      </div>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 700, color: mat.color }}>{mat.confidence}% confidence</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "4px", height: "4px", overflow: "hidden", marginBottom: "10px" }}>
                      <div style={{ width: `${mat.confidence}%`, height: "100%", background: mat.color, borderRadius: "4px" }} />
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#baccb0" }}>
                      Estimated Recovery Value: <strong style={{ color: mat.color }}>${mat.recoveryValue.toLocaleString()}</strong>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Total value box */}
              <div className="glass-card-glow" style={{ padding: "24px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase", color: "#85967c", marginBottom: "8px" }}>Projected Recovery Value</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px", fontWeight: 700, color: "#39FF14", textShadow: "0 0 20px rgba(57,255,20,0.5)" }}>
                  ${classificationResult.totalValue.toLocaleString()}.00
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#baccb0", marginTop: "8px" }}>
                  Processing Stream: <strong style={{ color: "#efffe3" }}>{classificationResult.processingStream}</strong>
                </p>
              </div>

              {/* Re-classify */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "12px" }}>
                <button onClick={() => { setStep("idle"); setFile(null); setPreview(null); setClassificationResult(null); }} className="btn-ghost">
                  Classify Another
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Neural Engine Status (always visible) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card" style={{ padding: "24px", marginTop: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <Activity size={16} color="#39FF14" />
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 600, color: "#efffe3" }}>Neural Engine Status</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            {engineSpecs.map((spec) => (
              <div key={spec.label} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <spec.icon size={16} color="#39FF14" style={{ marginTop: "2px", flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase", color: "#85967c", marginBottom: "2px" }}>{spec.label}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#efffe3" }}>{spec.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "16px", padding: "12px", background: "rgba(57,255,20,0.04)", borderRadius: "8px", border: "1px solid rgba(57,255,20,0.1)" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#85967c" }}>
              Local Edge Processing • Facility: Detroit Reclamation Hub B-4
            </p>
          </div>
        </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}
