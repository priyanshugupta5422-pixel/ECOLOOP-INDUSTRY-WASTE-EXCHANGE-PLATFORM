"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, Recycle, Cpu, LayoutDashboard, RefreshCw } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";

const dashboardData = {
  co2Saved: "4,281.5", co2Unit: "Metric Tons / Quarter",
  costSavings: "$842.1K", costUnit: "USD Optimized",
  circularRate: "94.8%", circularUnit: "Waste-to-Resource Efficiency",
  aiPrecision: "99.9%", aiUnit: "Classification Accuracy",
};

const recentConversions = [
  { id: 1, material: "Polymer Type 04", action: "Converted to High-Density Bio-Fuel", time: "2m ago", status: "green" },
  { id: 2, material: "Alloy Composite", action: "Recycled for Aerospace Framing", time: "15m ago", status: "cyan" },
  { id: 3, material: "Mixed Glass Fiber", action: "Processing in Loop 02", time: "42m ago", status: "amber" },
  { id: 4, material: "Industrial Catalyst", action: "Neutralized & Repurposed", time: "1h ago", status: "green" },
];

const impactChartData = [
  { month: "Nov", co2: 3100, savings: 520 },
  { month: "Dec", co2: 3480, savings: 610 },
  { month: "Jan", co2: 3720, savings: 680 },
  { month: "Feb", co2: 3950, savings: 720 },
  { month: "Mar", co2: 4100, savings: 790 },
  { month: "Apr", co2: 4281, savings: 842 },
];

const statusColors: Record<string, string> = { green: "#39FF14", cyan: "#00EEFC", amber: "#FFB900" };

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#2a2a2a", border: "1px solid rgba(57,255,20,0.2)", borderRadius: "8px", padding: "10px 14px" }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#baccb0", marginBottom: "4px" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", color: p.color, fontWeight: 600 }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    // Fetch from Express backend; silently fall back to static data
    fetch("http://localhost:4000/api/dashboard").catch(() => {}).finally(() => setIsLoading(false));
  }, []);

  const handleRefresh = () => {
    setLastRefresh(new Date());
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const kpis = [
    { label: "CO₂ Saved", value: dashboardData.co2Saved, unit: dashboardData.co2Unit, icon: Recycle, color: "#39FF14" },
    { label: "Cost Savings", value: dashboardData.costSavings, unit: dashboardData.costUnit, icon: DollarSign, color: "#00EEFC" },
    { label: "Circular Rate", value: dashboardData.circularRate, unit: dashboardData.circularUnit, icon: TrendingUp, color: "#8E2DE2" },
    { label: "AI Precision", value: dashboardData.aiPrecision, unit: dashboardData.aiUnit, icon: Cpu, color: "#FFB900" },
  ];

  return (
    <AuthGuard>
      <div style={{ minHeight: "calc(100vh - 64px)", background: "#131313", padding: "32px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <LayoutDashboard size={20} color="#39FF14" />
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "#efffe3", letterSpacing: "-0.02em" }}>
                Command Center
              </h1>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#baccb0" }}>
              Autonomous waste stream intelligence and carbon sequestration metrics.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#85967c" }}>
              Updated {lastRefresh.toLocaleTimeString()}
            </span>
            <button onClick={handleRefresh} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 14px", color: "#baccb0", fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", cursor: "pointer" }}>
              <RefreshCw size={14} />Refresh
            </button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          {kpis.map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", color: "#baccb0" }}>{kpi.label}</div>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `${kpi.color}15`, border: `1px solid ${kpi.color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <kpi.icon size={18} color={kpi.color} />
                </div>
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700, color: kpi.color, marginBottom: "4px" }}>
                {isLoading ? <span style={{ display: "inline-block", width: "80px", height: "28px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }} /> : kpi.value}
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#85967c" }}>{kpi.unit}</div>
            </motion.div>
          ))}
        </div>

        {/* Area Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card" style={{ padding: "24px", marginBottom: "24px" }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#efffe3", marginBottom: "4px" }}>Environmental Impact Over Time</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#85967c", marginBottom: "24px" }}>CO₂ Reduction (MT) & Cost Savings ($K)</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={impactChartData}>
              <defs>
                <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#39FF14" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#39FF14" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00EEFC" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#00EEFC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontFamily: "'Space Grotesk'", fontSize: 12, fill: "#85967c" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: "'Space Grotesk'", fontSize: 11, fill: "#85967c" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="co2" name="CO₂ Saved" stroke="#39FF14" strokeWidth={2} fill="url(#co2Gradient)" dot={false} />
              <Area type="monotone" dataKey="savings" name="Savings ($K)" stroke="#00EEFC" strokeWidth={2} fill="url(#savingsGradient)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Conversions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card" style={{ padding: "24px" }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#efffe3", marginBottom: "20px" }}>Recent Conversions</h3>
          {recentConversions.map((conv, i) => (
            <div key={conv.id} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 0", borderBottom: i < recentConversions.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: statusColors[conv.status], boxShadow: `0 0 8px ${statusColors[conv.status]}`, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: "#efffe3", marginBottom: "2px" }}>{conv.material}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#baccb0" }}>{conv.action}</div>
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#85967c", flexShrink: 0 }}>{conv.time}</div>
            </div>
          ))}
        </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}
