"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, LogIn, Leaf } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function LoginPage() {
  const { login } = useAppStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Fake user profile
      const user = {
        id: "u-101",
        name: email.split("@")[0].replace(/[^a-zA-Z]/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Operator",
        email: email,
      };
      
      login(user);
      setIsLoading(false);
      router.push("/dashboard"); // Redirect to dashboard after login
    }, 1500);
  };

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", background: "#131313", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        className="glass-card"
        style={{ 
          maxWidth: "420px", 
          width: "100%", 
          padding: "40px", 
          border: "1px solid rgba(57,255,20,0.2)",
          boxShadow: "0 0 50px rgba(57,255,20,0.05)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ 
            width: "56px", height: "56px", borderRadius: "14px", 
            background: "linear-gradient(135deg, rgba(57,255,20,0.1), rgba(0,238,252,0.1))", 
            border: "1px solid rgba(57,255,20,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", 
            margin: "0 auto 20px" 
          }}>
            <Leaf size={28} color="#39FF14" />
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700, color: "#efffe3", marginBottom: "8px", letterSpacing: "-0.02em" }}>
            EcoLoop <span style={{ color: "#39FF14" }}>AI</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#baccb0" }}>
            Enter your credentials to access the industrial waste intelligence network.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#85967c", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Operator Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="#85967c" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@ecoloop.ai"
                className="input-field"
                style={{ width: "100%", paddingLeft: "42px", height: "48px" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#85967c", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Passkey
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="#85967c" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-field"
                style={{ width: "100%", paddingLeft: "42px", height: "48px" }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary" 
            style={{ width: "100%", marginTop: "12px", padding: "16px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", fontSize: "15px" }}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                Authenticating...
              </>
            ) : (
              <>
                <LogIn size={18} /> Initiate Uplink
              </>
            )}
          </button>
        </form>

      </motion.div>
    </div>
  );
}
