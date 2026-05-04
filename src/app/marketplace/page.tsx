"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, MapPin, CheckCircle2, X } from "lucide-react";
import { useAppStore, type Product } from "@/store/useAppStore";
import AuthGuard from "@/components/auth/AuthGuard";
import Link from "next/link";

const PRODUCTS: Product[] = [
  {
    id: "p-001", title: "HDPE Polymer Regrind", batch: "PR-9022", location: "Frankfurt, GER",
    price: "₹420/MT", unit: "MT", quantity: "45.5 MT", resourcePotential: "92% Recovery",
    category: "Polymers", purityScore: 92,
    description: "High-density polyethylene regrind suitable for re-extrusion into packaging films and pipes. Contaminant-free batch with consistent MFI.",
  },
  {
    id: "p-002", title: "Grade 316 Stainless Shavings", batch: "MS-4410", location: "Lyon, FRA",
    price: "₹1,280/MT", unit: "MT", quantity: "12.8 MT", resourcePotential: "88% Circular",
    category: "Metals", purityScore: 88,
    description: "316-grade stainless steel machining shavings from aerospace component manufacturing. Low oil contamination, ready for EAF remelting.",
  },
  {
    id: "p-003", title: "Secondary Aluminum Ingots", batch: "AL-003", location: "Chicago, USA",
    price: "₹2,100/MT", unit: "MT", quantity: "85.0 MT", resourcePotential: "99% Purity",
    category: "Metals", purityScore: 99,
    description: "Secondary 6061-T6 aluminum ingots recovered from aerospace scrap. Independently certified 99% purity. Ready for immediate casting.",
  },
  {
    id: "p-004", title: "Mixed Server E-Waste", batch: "EW-2219", location: "Tokyo, JPN",
    price: "₹8,500/Lot", unit: "Lot", quantity: "2.4 MT", resourcePotential: "Au/Cu Extraction",
    category: "E-Waste", purityScore: 85,
    description: "Decommissioned enterprise server boards, HDDs, and PSUs. High precious metal concentration — Au, Ag, Cu, Pd. WEEE compliant.",
  },
  {
    id: "p-005", title: "PET Polymer Flakes", batch: "PF-0721", location: "Mumbai, IND",
    price: "₹380/MT", unit: "MT", quantity: "30.0 MT", resourcePotential: "95% Food-Grade",
    category: "Polymers", purityScore: 95,
    description: "Washed PET flakes from post-consumer bottles. Food-grade quality after cleaning. Suitable for fiber extrusion and sheet manufacturing.",
  },
  {
    id: "p-006", title: "Industrial Glass Fiber", batch: "GF-1103", location: "Berlin, GER",
    price: "₹620/MT", unit: "MT", quantity: "18.2 MT", resourcePotential: "80% Reusable",
    category: "Glass/Fiber", purityScore: 80,
    description: "E-glass fiber off-cuts from wind turbine blade production. Suitable for GMT composites and acoustic insulation panels.",
  },
];

const CATEGORIES = ["All", "Polymers", "Metals", "E-Waste", "Glass/Fiber"];

const categoryColors: Record<string, string> = {
  Polymers: "#39FF14",
  Metals: "#00EEFC",
  "E-Waste": "#8E2DE2",
  "Glass/Fiber": "#FFB900",
  All: "#baccb0",
};

export default function MarketplacePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [ordered, setOrdered] = useState<string | null>(null);
  const { cart, addToCart, removeFromCart, categoryFilter, setCategoryFilter, searchQuery, setSearchQuery } = useAppStore();

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = categoryFilter === "all" || categoryFilter === "All" || p.category === categoryFilter;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const inCart = (id: string) => cart.some((p) => p.id === id);

  const handleOrder = (product: Product) => {
    addToCart(product);
    setOrdered(product.id);
    setTimeout(() => setOrdered(null), 2000);
  };

  return (
    <AuthGuard>
      <div style={{ minHeight: "calc(100vh - 64px)", background: "#131313", padding: "32px 24px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <ShoppingCart size={20} color="#39FF14" />
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "#efffe3", letterSpacing: "-0.02em" }}>
                  Industrial Waste Marketplace
                </h1>
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#baccb0" }}>
                High-performance resource recovery platform. Browse verified industrial byproducts.
              </p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#85967c", marginTop: "4px" }}>
                Processing Node: Waste-Alpha-7. Circular efficiency at 94.2%.
              </p>
            </div>
            {/* Cart indicator */}
            <Link href="/checkout" style={{ textDecoration: "none" }}>
              <div className="glass-card" style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", transition: "all 0.2s", border: "1px solid rgba(57,255,20,0.3)" }}>
                <ShoppingCart size={16} color="#39FF14" />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: "#efffe3" }}>{cart.length} items</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#39FF14", marginLeft: "8px", borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "8px" }}>Checkout &rarr;</span>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Search + Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
            <Search size={16} color="#85967c" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by material or location..."
              className="input-field"
              style={{ paddingLeft: "36px" }} />
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => {
              const active = categoryFilter === cat || (cat === "All" && (categoryFilter === "all" || categoryFilter === "All"));
              return (
                <button key={cat} onClick={() => setCategoryFilter(cat)}
                  style={{
                    padding: "8px 14px", borderRadius: "8px", border: `1px solid ${active ? categoryColors[cat] : "rgba(255,255,255,0.08)"}`,
                    background: active ? `${categoryColors[cat]}12` : "transparent",
                    color: active ? categoryColors[cat] : "#baccb0",
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: active ? 600 : 400,
                    cursor: "pointer", transition: "all 0.15s",
                  }}>
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Product Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {filtered.map((product, i) => {
            const color = categoryColors[product.category] || "#39FF14";
            return (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card"
                style={{ padding: "24px", cursor: "pointer" }}
                onClick={() => setSelectedProduct(product)}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span className="chip" style={{ background: `${color}12`, color: color, border: `1px solid ${color}25`, fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "9999px" }}>
                    {product.category}
                  </span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", color: "#85967c" }}>#{product.batch}</span>
                </div>

                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", fontWeight: 600, color: "#efffe3", marginBottom: "8px" }}>{product.title}</h3>

                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                  <MapPin size={13} color="#85967c" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#85967c" }}>{product.location}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase", color: "#85967c", marginBottom: "4px" }}>Price</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700, color: color }}>{product.price}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase", color: "#85967c", marginBottom: "4px" }}>Quantity</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: "#efffe3" }}>{product.quantity}</div>
                  </div>
                </div>

                {/* Purity bar */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase", color: "#85967c" }}>Resource Pot.</span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 600, color: color }}>{product.resourcePotential}</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "3px", height: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${product.purityScore}%`, height: "100%", background: color, borderRadius: "3px" }} />
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); inCart(product.id) ? removeFromCart(product.id) : handleOrder(product); }}
                  style={{
                    width: "100%", padding: "10px", borderRadius: "8px",
                    background: inCart(product.id) ? "rgba(57,255,20,0.1)" : `${color}18`,
                    border: `1px solid ${inCart(product.id) ? "#39FF14" : color}40`,
                    color: inCart(product.id) ? "#39FF14" : color,
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 600,
                    cursor: "pointer", transition: "all 0.15s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  }}>
                  {ordered === product.id ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><CheckCircle2 size={14} /> Added!</span>
                  ) : inCart(product.id) ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><X size={14} /> Remove</span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><ShoppingCart size={14} /> Add to Cart</span>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
              onClick={() => setSelectedProduct(null)}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card"
                style={{ maxWidth: "560px", width: "100%", padding: "32px", position: "relative" }}>
                <button onClick={() => setSelectedProduct(null)}
                  style={{ position: "absolute", top: "16px", right: "16px", background: "transparent", border: "none", color: "#85967c", cursor: "pointer" }}>
                  <X size={20} />
                </button>

                <div className="chip" style={{ display: "inline-flex", marginBottom: "16px", background: `${categoryColors[selectedProduct.category]}12`, color: categoryColors[selectedProduct.category], border: `1px solid ${categoryColors[selectedProduct.category]}25`, fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase", padding: "4px 10px", borderRadius: "9999px" }}>
                  {selectedProduct.category}
                </div>

                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px", fontWeight: 700, color: "#efffe3", marginBottom: "8px" }}>{selectedProduct.title}</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                  <MapPin size={13} color="#85967c" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#85967c" }}>Batch #{selectedProduct.batch} • {selectedProduct.location}</span>
                </div>

                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.7, color: "#baccb0", marginBottom: "24px" }}>{selectedProduct.description}</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                  {[{ l: "Price", v: selectedProduct.price }, { l: "Quantity", v: selectedProduct.quantity }, { l: "Resource Pot.", v: selectedProduct.resourcePotential }].map(s => (
                    <div key={s.l}>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase", color: "#85967c", marginBottom: "4px" }}>{s.l}</div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 700, color: categoryColors[selectedProduct.category] }}>{s.v}</div>
                    </div>
                  ))}
                </div>

                <button onClick={() => { inCart(selectedProduct.id) ? removeFromCart(selectedProduct.id) : handleOrder(selectedProduct); }}
                  className={inCart(selectedProduct.id) ? "btn-ghost" : "btn-primary"}
                  style={{ width: "100%" }}>
                  {inCart(selectedProduct.id) ? "Remove from Cart" : "Add to Cart"}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </AuthGuard>
  );
}
