// =============================================================
// EcoLoop AI – Express Backend Server
// Run with: node server.js (from /backend folder)
// API endpoints:
//   GET  /api/dashboard   → analytics & KPI data
//   POST /api/classify    → AI classification result (simulated)
//   GET  /api/products    → marketplace products list
// =============================================================

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Enable CORS so the Next.js frontend (localhost:3000) can call us
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3005'] }));
app.use(express.json());

// -----------------------------------------------------------
// MOCK DATABASE (JSON) – No real DB needed
// -----------------------------------------------------------

// Dashboard / analytics data
const dashboardData = {
  co2Saved: '4,281.5',
  co2Unit: 'Metric Tons / Quarter',
  costSavings: '$842.1K',
  costUnit: 'USD Optimized',
  circularRate: '94.8%',
  circularUnit: 'Waste-to-Resource Efficiency',
  aiPrecision: '99.9%',
  aiUnit: 'Classification Accuracy',
  impactChart: [
    { month: 'Nov', co2: 3100, savings: 520 },
    { month: 'Dec', co2: 3480, savings: 610 },
    { month: 'Jan', co2: 3720, savings: 680 },
    { month: 'Feb', co2: 3950, savings: 720 },
    { month: 'Mar', co2: 4100, savings: 790 },
    { month: 'Apr', co2: 4281, savings: 842 },
  ],
  recentConversions: [
    { id: 1, material: 'Polymer Type 04', action: 'Converted to High-Density Bio-Fuel', time: '2m ago', status: 'green' },
    { id: 2, material: 'Alloy Composite', action: 'Recycled for Aerospace Framing', time: '15m ago', status: 'cyan' },
    { id: 3, material: 'Mixed Glass Fiber', action: 'Processing in Loop 02', time: '42m ago', status: 'amber' },
    { id: 4, material: 'Industrial Catalyst', action: 'Neutralized & Repurposed', time: '1h ago', status: 'green' },
  ],
};

// Marketplace products
const products = [
  {
    id: 'p-001', title: 'HDPE Polymer Regrind', batch: 'PR-9022', location: 'Frankfurt, GER',
    price: '$420/MT', unit: 'MT', quantity: '45.5 MT', resourcePotential: '92% Recovery',
    category: 'Polymers', purityScore: 92,
    description: 'High-density polyethylene regrind suitable for re-extrusion into packaging films and pipes.',
  },
  {
    id: 'p-002', title: 'Grade 316 Stainless Shavings', batch: 'MS-4410', location: 'Lyon, FRA',
    price: '$1,280/MT', unit: 'MT', quantity: '12.8 MT', resourcePotential: '88% Circular',
    category: 'Metals', purityScore: 88,
    description: '316-grade stainless steel machining shavings from aerospace component manufacturing.',
  },
  {
    id: 'p-003', title: 'Secondary Aluminum Ingots', batch: 'AL-003', location: 'Chicago, USA',
    price: '$2,100/MT', unit: 'MT', quantity: '85.0 MT', resourcePotential: '99% Purity',
    category: 'Metals', purityScore: 99,
    description: 'Secondary 6061-T6 aluminum ingots recovered from aerospace scrap. Certified 99% purity.',
  },
  {
    id: 'p-004', title: 'Mixed Server E-Waste', batch: 'EW-2219', location: 'Tokyo, JPN',
    price: '$8,500/Lot', unit: 'Lot', quantity: '2.4 MT', resourcePotential: 'Au/Cu Extraction',
    category: 'E-Waste', purityScore: 85,
    description: 'Decommissioned enterprise server boards with high precious metal concentration.',
  },
  {
    id: 'p-005', title: 'PET Polymer Flakes', batch: 'PF-0721', location: 'Mumbai, IND',
    price: '$380/MT', unit: 'MT', quantity: '30.0 MT', resourcePotential: '95% Food-Grade',
    category: 'Polymers', purityScore: 95,
    description: 'Washed PET flakes from post-consumer bottles. Suitable for fiber extrusion.',
  },
  {
    id: 'p-006', title: 'Industrial Glass Fiber', batch: 'GF-1103', location: 'Berlin, GER',
    price: '$620/MT', unit: 'MT', quantity: '18.2 MT', resourcePotential: '80% Reusable',
    category: 'Glass/Fiber', purityScore: 80,
    description: 'E-glass fiber off-cuts from wind turbine blade production.',
  },
];

// AI classification result templates (rotated randomly)
const classificationTemplates = [
  {
    materials: [
      { name: 'PET-G Polymer', confidence: 94.2, recoveryValue: 8200, color: '#39FF14' },
      { name: '6061 Aluminum', confidence: 78.1, recoveryValue: 4280, color: '#00EEFC' },
    ],
    processingStream: 'Loop 01 – Polymer Recovery',
    latency: 12,
    throughput: '2.4t/h',
  },
  {
    materials: [
      { name: 'HDPE Regrind', confidence: 99.1, recoveryValue: 6900, color: '#39FF14' },
      { name: 'Copper Wire Scraps', confidence: 88.4, recoveryValue: 5380, color: '#FFB900' },
    ],
    processingStream: 'Loop 02 – Metal Separation',
    latency: 9,
    throughput: '1.8t/h',
  },
  {
    materials: [
      { name: 'Mixed E-Waste', confidence: 91.7, recoveryValue: 12400, color: '#8E2DE2' },
      { name: 'Borosilicate Glass', confidence: 73.5, recoveryValue: 2100, color: '#00EEFC' },
    ],
    processingStream: 'Loop 03 – Precious Metal Extraction',
    latency: 15,
    throughput: '0.9t/h',
  },
];

// -----------------------------------------------------------
// ROUTES
// -----------------------------------------------------------

/**
 * GET /api/dashboard
 * Returns: KPIs, chart data, recent conversions
 */
app.get('/api/dashboard', (req, res) => {
  res.json({
    success: true,
    data: dashboardData,
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/products
 * Returns: All marketplace products (with optional ?category= filter)
 */
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  const filtered = category && category !== 'all'
    ? products.filter(p => p.category.toLowerCase() === category.toLowerCase())
    : products;

  res.json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
});

/**
 * POST /api/classify
 * Body: { filename?: string }
 * Returns: Simulated AI classification result
 */
app.post('/api/classify', (req, res) => {
  // Pick a random classification template
  const template = classificationTemplates[Math.floor(Math.random() * classificationTemplates.length)];
  const totalValue = template.materials.reduce((sum, m) => sum + m.recoveryValue, 0);

  // Simulate processing delay (300–600ms)
  const delay = 300 + Math.random() * 300;
  setTimeout(() => {
    res.json({
      success: true,
      data: {
        ...template,
        totalValue,
        filename: req.body.filename || 'sample-waste.jpg',
        modelVersion: 'EcoLoop-V4-Pro',
        facility: 'Detroit Reclamation Hub B-4',
        timestamp: new Date().toISOString(),
      },
    });
  }, delay);
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// -----------------------------------------------------------
// START SERVER
// -----------------------------------------------------------
app.listen(PORT, () => {
  console.log(`✅  EcoLoop AI Backend running on http://localhost:${PORT}`);
  console.log(`   GET  /api/dashboard`);
  console.log(`   GET  /api/products`);
  console.log(`   POST /api/classify`);
});
