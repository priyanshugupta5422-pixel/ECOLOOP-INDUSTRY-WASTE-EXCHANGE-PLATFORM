"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Wallet, ShieldCheck, CheckCircle2, Loader2, ArrowRight, Trash2 } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import AuthGuard from "@/components/auth/AuthGuard";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useAppStore();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wallet">("wallet");

  // Helper to calculate cost safely
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      // Extract numbers from strings like "$420/MT" and "45.5 MT"
      const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      const qtyNum = parseFloat(item.quantity.replace(/[^0-9.]/g, ""));
      return total + (isNaN(priceNum) || isNaN(qtyNum) ? 0 : priceNum * qtyNum);
    }, 0);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    // Simulate blockchain/payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Auto redirect back to dashboard after 3 seconds
      setTimeout(() => {
        clearCart();
        router.push("/dashboard");
      }, 3000);
    }, 2000);
  };

  const totalValue = calculateTotal();

  return (
    <AuthGuard>
      <div style={{ minHeight: "calc(100vh - 64px)", background: "#131313", padding: "32px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "32px" }}>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "32px", fontWeight: 700, color: "#efffe3", marginBottom: "8px" }}>
              Secure Transaction
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#baccb0" }}>
              Review your requested materials and finalize the smart contract.
            </p>
          </motion.div>

          {cart.length === 0 && !isSuccess ? (
            <div className="glass-card" style={{ padding: "48px", textAlign: "center" }}>
              <p style={{ color: "#baccb0", fontSize: "16px", marginBottom: "24px" }}>Your material queue is empty.</p>
              <Link href="/marketplace" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Browse Marketplace <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              
              {/* Order Summary */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: "24px", position: "relative", overflow: "hidden" }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 600, color: "#efffe3", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <ShieldCheck size={20} color="#39FF14" /> Order Summary
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div>
                        <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#efffe3", fontSize: "15px", marginBottom: "4px" }}>{item.title}</h4>
                        <p style={{ fontSize: "13px", color: "#85967c" }}>{item.quantity} • {item.price}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#39FF14", fontWeight: 600 }}>
                          ${(parseFloat(item.price.replace(/[^0-9.]/g, "")) * parseFloat(item.quantity.replace(/[^0-9.]/g, ""))).toLocaleString()}
                        </span>
                        {!isSuccess && (
                          <button onClick={() => removeFromCart(item.id)} style={{ background: "transparent", border: "none", color: "#ff4d4d", cursor: "pointer", opacity: 0.7 }} title="Remove item">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(57,255,20,0.2)" }}>
                  <span style={{ fontSize: "16px", color: "#baccb0" }}>Total Estimated Value</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "#39FF14" }}>
                    ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </motion.div>

              {/* Payment Portal */}
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-card" style={{ padding: "24px" }}>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 600, color: "#efffe3", marginBottom: "24px" }}>
                      Payment Gateway
                    </h2>

                    <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
                      <button 
                        onClick={() => setPaymentMethod("wallet")}
                        style={{ flex: 1, padding: "12px", borderRadius: "8px", border: paymentMethod === "wallet" ? "1px solid #39FF14" : "1px solid rgba(255,255,255,0.1)", background: paymentMethod === "wallet" ? "rgba(57,255,20,0.1)" : "rgba(255,255,255,0.02)", color: paymentMethod === "wallet" ? "#39FF14" : "#baccb0", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", transition: "all 0.2s" }}
                      >
                        <Wallet size={16} /> Web3 Wallet
                      </button>
                      <button 
                        onClick={() => setPaymentMethod("card")}
                        style={{ flex: 1, padding: "12px", borderRadius: "8px", border: paymentMethod === "card" ? "1px solid #39FF14" : "1px solid rgba(255,255,255,0.1)", background: paymentMethod === "card" ? "rgba(57,255,20,0.1)" : "rgba(255,255,255,0.02)", color: paymentMethod === "card" ? "#39FF14" : "#baccb0", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", transition: "all 0.2s" }}
                      >
                        <CreditCard size={16} /> Credit Card
                      </button>
                    </div>

                    <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {paymentMethod === "card" ? (
                        <>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", color: "#85967c", marginBottom: "6px" }}>Card Number</label>
                            <input type="text" placeholder="0000 0000 0000 0000" className="input-field" required style={{ width: "100%" }} />
                          </div>
                          <div style={{ display: "flex", gap: "16px" }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: "block", fontSize: "12px", color: "#85967c", marginBottom: "6px" }}>Expiry</label>
                              <input type="text" placeholder="MM/YY" className="input-field" required style={{ width: "100%" }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <label style={{ display: "block", fontSize: "12px", color: "#85967c", marginBottom: "6px" }}>CVC</label>
                              <input type="text" placeholder="123" className="input-field" required style={{ width: "100%" }} />
                            </div>
                          </div>
                        </>
                      ) : (
                        <div style={{ padding: "24px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", border: "1px dashed rgba(57,255,20,0.3)", textAlign: "center", marginBottom: "8px" }}>
                          <p style={{ color: "#baccb0", fontSize: "14px", marginBottom: "12px" }}>Connect your wallet to sign the EcoLoop Smart Contract.</p>
                          <input type="text" value="0x7aB4...9c2F" readOnly className="input-field" style={{ width: "100%", textAlign: "center", color: "#39FF14", fontFamily: "monospace" }} />
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isProcessing}
                        className="btn-primary" 
                        style={{ width: "100%", marginTop: "16px", padding: "16px", display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", fontSize: "16px" }}
                      >
                        {isProcessing ? (
                          <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Processing Transaction...</>
                        ) : (
                          "Authorize Transfer"
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: "48px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(57,255,20,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}
                    >
                      <CheckCircle2 size={32} color="#39FF14" />
                    </motion.div>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "#39FF14", marginBottom: "8px" }}>
                      Transaction Verified
                    </h2>
                    <p style={{ color: "#baccb0", marginBottom: "24px" }}>
                      The smart contract has been deployed. Materials are secured for pickup.
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#85967c", fontSize: "13px" }}>
                      <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
                      Redirecting to dashboard...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
