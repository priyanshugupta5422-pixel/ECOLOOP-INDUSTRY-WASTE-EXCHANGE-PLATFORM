"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, ScanLine, ShoppingCart, BarChart2, Leaf, Menu, X } from "lucide-react";
import { useState } from "react";

// Navigation links matching the Stitch design (Dashboard, Classification, Marketplace, Analytics)
const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/classification", label: "Classification", icon: ScanLine },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingCart },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top navigation bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(19, 19, 19, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #39FF14, #00EEFC)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Leaf size={16} color="#053900" strokeWidth={2.5} />
            </div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#e5e2e1",
                letterSpacing: "-0.02em",
              }}
            >
              EcoLoop{" "}
              <span style={{ color: "#39FF14" }}>AI</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="desktop-nav"
          >
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: "0.02em",
                    color: isActive ? "#39FF14" : "#baccb0",
                    background: isActive ? "rgba(57, 255, 20, 0.08)" : "transparent",
                    border: isActive ? "1px solid rgba(57, 255, 20, 0.15)" : "1px solid transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Icon size={15} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Status chip + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="chip chip-green"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#39FF14",
                  boxShadow: "0 0 6px rgba(57, 255, 20, 0.8)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              />
              System Online
            </div>

            {/* Hamburger for mobile */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: "none",
                background: "transparent",
                border: "none",
                color: "#e5e2e1",
                cursor: "pointer",
              }}
              className="mobile-menu-btn"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(19, 19, 19, 0.98)",
              padding: "8px 16px 16px",
            }}
          >
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "15px",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#39FF14" : "#baccb0",
                    background: isActive ? "rgba(57, 255, 20, 0.08)" : "transparent",
                    marginBottom: "4px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </header>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
