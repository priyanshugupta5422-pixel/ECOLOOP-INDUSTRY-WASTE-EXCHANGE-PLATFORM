import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, Loader2, LogIn } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAppStore();
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
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          style={{ 
            position: "fixed", 
            inset: 0, 
            background: "rgba(0,0,0,0.8)", 
            backdropFilter: "blur(4px)",
            zIndex: 100, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            padding: "24px" 
          }}
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card"
            style={{ 
              maxWidth: "400px", 
              width: "100%", 
              padding: "32px", 
              position: "relative",
              border: "1px solid rgba(57,255,20,0.2)",
              boxShadow: "0 0 40px rgba(57,255,20,0.05)"
            }}
          >
            <button 
              onClick={onClose}
              style={{ position: "absolute", top: "16px", right: "16px", background: "transparent", border: "none", color: "#85967c", cursor: "pointer" }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{ 
                width: "48px", height: "48px", borderRadius: "12px", 
                background: "rgba(57,255,20,0.1)", border: "1px solid rgba(57,255,20,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", 
                margin: "0 auto 16px" 
              }}>
                <LogIn size={24} color="#39FF14" />
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "#efffe3", marginBottom: "8px" }}>
                Secure Access
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#baccb0" }}>
                Enter your credentials to access the EcoLoop AI network.
              </p>
            </div>

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#85967c", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Operator Email
                </label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} color="#85967c" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operator@ecoloop.ai"
                    className="input-field"
                    style={{ width: "100%", paddingLeft: "36px" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#85967c", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Passkey
                </label>
                <div style={{ position: "relative" }}>
                  <Lock size={16} color="#85967c" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="input-field"
                    style={{ width: "100%", paddingLeft: "36px" }}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="btn-primary" 
                style={{ width: "100%", marginTop: "8px", padding: "14px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                    Authenticating...
                  </>
                ) : (
                  "Initiate Uplink"
                )}
              </button>
            </form>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
