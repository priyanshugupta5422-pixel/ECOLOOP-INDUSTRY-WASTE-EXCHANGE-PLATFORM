"use client";

import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Zap, Globe } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import AuthGuard from "@/components/auth/AuthGuard";

// Monthly performance data
const monthlyData = [
  { month: "Nov", co2: 3100, revenue: 520, materials: 42 },
  { month: "Dec", co2: 3480, revenue: 610, materials: 48 },
  { month: "Jan", co2: 3720, revenue: 680, materials: 53 },
  { month: "Feb", co2: 3950, revenue: 720, materials: 57 },
  { month: "Mar", co2: 4100, revenue: 790, materials: 62 },
  { month: "Apr", co2: 4281, revenue: 842, materials: 67 },
];

// Radar data for material performance
const radarData = [
  { subject: "Polymers", score: 92, fullMark: 100 },
  { subject: "Metals", score: 88, fullMark: 100 },
  { subject: "E-Waste", score: 85, fullMark: 100 },
  { subject: "Glass", score: 78, fullMark: 100 },
  { subject: "Catalysts", score: 95, fullMark: 100 },
  { subject: "Composites", score: 82, fullMark: 100 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#2a2a2a", border: "1px solid rgba(57,255,20,0.2)", borderRadius: "8px", padding: "10px 14px" }}>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#baccb0", marginBottom: "4px" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", color: p.color || "#39FF14", fontWeight: 600 }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <AuthGuard>
      <div style={{ minHeight: "calc(100vh - 64px)", background: "#131313", padding: "32px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <BarChart2 size={20} color="#39FF14" />
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "#efffe3", letterSpacing: "-0.02em" }}>
              Analytics
            </h1>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#baccb0" }}>
            Deep performance metrics across all waste streams, conversion loops, and revenue channels.
          </p>
        </motion.div>

        {/* Top metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          {[
            { label: "Total CO₂ Saved", value: "24,832 MT", icon: Globe, color: "#39FF14", sub: "Lifetime" },
            { label: "Revenue Generated", value: "₹4.2M", icon: TrendingUp, color: "#00EEFC", sub: "Trailing 12M" },
            { label: "Processing Speed", value: "2.4 t/h", icon: Zap, color: "#8E2DE2", sub: "Average" },
            { label: "Streams Active", value: "12", icon: BarChart2, color: "#FFB900", sub: "Right now" },
          ].map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="glass-card" style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase", color: "#85967c" }}>{m.label}</span>
                <m.icon size={16} color={m.color} />
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: m.color, marginBottom: "4px" }}>{m.value}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#85967c" }}>{m.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "16px" }}>
          {/* Bar chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#efffe3", marginBottom: "4px" }}>Monthly Performance</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#85967c", marginBottom: "24px" }}>CO₂ (MT) & Revenue ($K) by Month</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fontFamily: "'Space Grotesk'", fontSize: 12, fill: "#85967c" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: "'Space Grotesk'", fontSize: 11, fill: "#85967c" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="co2" name="CO₂ (MT)" fill="#39FF14" radius={[4, 4, 0, 0]} opacity={0.8} />
                <Bar dataKey="revenue" name="Revenue ($K)" fill="#00EEFC" radius={[4, 4, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Radar chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="glass-card" style={{ padding: "24px" }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#efffe3", marginBottom: "4px" }}>Material Performance</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#85967c", marginBottom: "16px" }}>Recovery efficiency by category</p>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontFamily: "'Space Grotesk'", fontSize: 12, fill: "#baccb0" }} />
                <Radar name="Score" dataKey="score" stroke="#39FF14" fill="#39FF14" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass-card" style={{ padding: "24px", marginTop: "16px" }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#efffe3", marginBottom: "20px" }}>Monthly Breakdown</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Month", "CO₂ Saved (MT)", "Revenue ($K)", "Materials Processed"].map(h => (
                    <th key={h} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#85967c", textAlign: "left", padding: "8px 16px 12px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row, i) => (
                  <tr key={row.month} style={{ borderBottom: i < monthlyData.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <td style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: "#efffe3", padding: "12px 16px" }}>{row.month}</td>
                    <td style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#39FF14", padding: "12px 16px" }}>{row.co2.toLocaleString()}</td>
                    <td style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#00EEFC", padding: "12px 16px" }}>${row.revenue}K</td>
                    <td style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#baccb0", padding: "12px 16px" }}>{row.materials} batches</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}
