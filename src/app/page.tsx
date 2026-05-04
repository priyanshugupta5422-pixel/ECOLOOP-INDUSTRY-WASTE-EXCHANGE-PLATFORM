"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  BarChart3,
  ShoppingCart,
  Zap,
  Shield,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

/* ============================================================
   LANDING PAGE – Based on Stitch "EcoLoop AI" Design
   Color: Obsidian bg (#131313) + Neon Green (#39FF14)
   Fonts: Space Grotesk (headlines) / Inter (body)
   ============================================================ */

// Animation variants for staggered reveals
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// Hero metrics from Stitch design
const heroStats = [
  { value: "+84%", label: "Resource Recovery Rate" },
  { value: "99.9%", label: "Classification Accuracy" },
  { value: "$2.4M", label: "Monthly Trade Volume" },
];

// Core capabilities matching Stitch content
const capabilities = [
  {
    id: "classification",
    icon: Cpu,
    title: "AI Classification",
    description:
      "Our proprietary neural networks analyze waste streams in real-time, identifying chemical composition, purity levels, and potential reuse applications with surgical precision.",
    features: [
      "Multi-spectral visual auditing",
      "Automated CO₂ footprint labeling",
      "Predictive purity forecasting",
    ],
    cta: { label: "Explore Tech Stack", href: "/classification" },
    accent: "#39FF14",
  },
  {
    id: "trading",
    icon: ShoppingCart,
    title: "Resource Trading",
    description:
      "A secure, blockchain-verified marketplace connecting waste producers with secondary manufacturers. Turn liabilities into liquid assets through automated bidding.",
    features: [
      "Real-time commodity indexing",
      "End-to-end logistics automation",
      "Tier-1 industrial verification",
    ],
    cta: { label: "Enter Marketplace", href: "/marketplace" },
    accent: "#00EEFC",
  },
  {
    id: "command",
    icon: BarChart3,
    title: "Command Center",
    description:
      "Monitor your entire resource ecosystem from a single pane of glass. Real-time telemetry on material flows, revenue generation, and environmental compliance metrics.",
    features: [
      "Live operational dashboards",
      "Environmental impact tracking",
      "Predictive maintenance alerts",
    ],
    cta: { label: "View Dashboard", href: "/dashboard" },
    accent: "#8E2DE2",
  },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#131313" }}>
      {/* ==================== HERO SECTION ==================== */}
      <section
        className="grid-bg"
        style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow behind hero */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(57, 255, 20, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "900px", textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}
          >
            <div className="chip chip-green">
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#39FF14",
                  boxShadow: "0 0 6px #39FF14",
                  display: "inline-block",
                }}
              />
              AI Classification Engine Online • v4-Pro
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#efffe3",
              marginBottom: "24px",
            }}
          >
            Convert Industrial Waste
            <br />
            <span className="text-neon">into Value</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "#baccb0",
              maxWidth: "620px",
              margin: "0 auto 40px",
            }}
          >
            The world&apos;s first AI-driven industrial metabolism engine. We automate the
            classification, processing, and trading of manufacturing byproducts into
            high-grade resources.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/classification" className="btn-primary">
              Start Classifying <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard" className="btn-ghost">
              View Dashboard
            </Link>
          </motion.div>

          {/* Hero stats grid – matching Stitch "+84% Resource Recovery Rate" etc */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginTop: "64px",
            }}
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="glass-card" style={{ padding: "24px 16px" }}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(24px, 4vw, 36px)",
                    fontWeight: 700,
                    color: "#39FF14",
                    textShadow: "0 0 20px rgba(57, 255, 20, 0.4)",
                    marginBottom: "6px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#baccb0",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== SYSTEM CORE CAPABILITIES ==================== */}
      <section style={{ padding: "96px 24px", maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div className="chip chip-cyan" style={{ display: "inline-flex", marginBottom: "16px" }}>
            <Zap size={12} />
            System Core Capabilities
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: "#efffe3",
              letterSpacing: "-0.02em",
            }}
          >
            Built for Industrial Scale
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card"
              style={{ padding: "32px" }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `${cap.accent}18`,
                  border: `1px solid ${cap.accent}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <cap.icon size={22} color={cap.accent} />
              </div>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#efffe3",
                  marginBottom: "12px",
                }}
              >
                {cap.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "#baccb0",
                  marginBottom: "20px",
                }}
              >
                {cap.description}
              </p>

              {/* Feature list */}
              <ul style={{ listStyle: "none", marginBottom: "24px" }}>
                {cap.features.map((feat) => (
                  <li
                    key={feat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "#baccb0",
                      marginBottom: "8px",
                    }}
                  >
                    <CheckCircle2 size={14} color={cap.accent} />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link
                href={cap.cta.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: cap.accent,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "gap 0.15s ease",
                }}
              >
                {cap.cta.label} <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==================== METRICS BAND ==================== */}
      <section
        style={{
          background: "rgba(57, 255, 20, 0.03)",
          borderTop: "1px solid rgba(57, 255, 20, 0.08)",
          borderBottom: "1px solid rgba(57, 255, 20, 0.08)",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
            textAlign: "center",
          }}
        >
          {[
            { label: "Efficiency", value: "94.2%", icon: TrendingUp, color: "#39FF14" },
            { label: "Impact", value: "12k TCO₂", icon: Shield, color: "#00EEFC" },
            { label: "Materials Library", value: "42,000+", icon: Cpu, color: "#8E2DE2" },
            { label: "Market Sync", value: "Real-time", icon: Zap, color: "#39FF14" },
          ].map((m) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <m.icon size={28} color={m.color} style={{ marginBottom: "12px" }} />
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: m.color,
                  marginBottom: "4px",
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#baccb0",
                }}
              >
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "32px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1280px",
            margin: "0 auto",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "13px",
              color: "#85967c",
            }}
          >
            © 2024 EcoLoop AI. Industrial Waste Autonomy.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Protocol", "System Status", "Contact Support"].map((link) => (
              <Link
                key={link}
                href="#"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "12px",
                  color: "#85967c",
                  textDecoration: "none",
                  letterSpacing: "0.03em",
                  transition: "color 0.15s ease",
                }}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
