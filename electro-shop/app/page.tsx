"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/store/cart";
import { useState, useEffect } from "react";

export default function Home() {
  const search = useCart((state) => state.search);
  const category = useCart((state) => state.category);
  const brand = useCart((state) => state.brand);
  const minPrice = useCart((state) => state.minPrice);
  const maxPrice = useCart((state) => state.maxPrice);
  const sort = useCart((state) => state.sort);

  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 35;

  // 🔥 FIX: hydration problemi üçün
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isTablet, setIsTablet] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔥 FIX: ilk renderdə boş qaytarır → flicker yox olur
  if (isMobile === null || isTablet === null) return null;

  const filtered = (products || []).filter((p) => {
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all" ? true : p.category === category;

    const matchBrand =
      brand === "all"
        ? true
        : p.brand?.toLowerCase() === brand.toLowerCase();

    const matchPrice =
      p.price >= minPrice && p.price <= maxPrice;

    return matchSearch && matchCategory && matchBrand && matchPrice;
  });

  const sorted = [...filtered];

  switch (sort) {
    case "price_asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name_asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name_desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <main
      style={{
        padding: 0,
        background:
          "linear-gradient(135deg, #dbeafe 0%, #f0f9ff 40%, #eef2ff 100%)",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: isMobile ? 260 : 420,
          marginBottom: 30,
        }}
      >
        <img
          src="/images/hero.png"
          alt="Electro Shop"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff",
            width: isMobile ? "90%" : "auto",
          }}
        >
          <p
            style={{
              fontSize: isMobile ? 14 : 20,
              fontWeight: 600,
              color: "#ffd166",
              background: "rgba(0,0,0,0.6)",
              padding: "10px 18px",
              borderRadius: 10,
              display: "inline-block",
              backdropFilter: "blur(4px)",
            }}
          >
            Min: {minPrice} AZN • Max: {maxPrice} AZN
          </p>

          <p
            style={{
              marginTop: 10,
              fontSize: isMobile ? 14 : 16,
              background: "rgba(0,0,0,0.6)",
              padding: "8px 14px",
              borderRadius: 8,
              display: "inline-block",
            }}
          >
            Tapılan məhsul: {sorted.length}
          </p>
        </div>
      </div>

      {/* PRODUCTS */}
      {sorted.length === 0 ? (
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <p>Heç bir məhsul tapılmadı 😕</p>
          <small>Filtrləri dəyişərək yenidən yoxla</small>
        </div>
      ) : (
        <>
          <div
            style={{
              padding: isMobile ? 10 : 20,
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                ? "repeat(2,1fr)"
                : "repeat(3,1fr)",
              gap: isMobile ? 12 : 20,
              background: "rgba(255,255,255,0.4)",
              borderRadius: 16,
              margin: isMobile ? 10 : 20,
              backdropFilter: "blur(6px)",
            }}
          >
            {paginated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* PAGINATION */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              paddingBottom: 40,
              flexWrap: "wrap",
            }}
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background: page === i + 1 ? "#111" : "#ddd",
                  color: page === i + 1 ? "#fff" : "#000",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </main>
  );
}