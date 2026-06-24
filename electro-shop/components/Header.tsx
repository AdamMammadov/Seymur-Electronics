"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { useState, useEffect } from "react";

export default function Header() {
  const openCart = useCart((state) => state.openCart);
  const items = useCart((state) => state.items);

  const search = useCart((state) => state.search);
  const setSearch = useCart((state) => state.setSearch);

  const setCategory = useCart((state) => state.setCategory);
  const setBrand = useCart((state) => state.setBrand);

  const minPrice = useCart((state) => state.minPrice);
  const maxPrice = useCart((state) => state.maxPrice);

  const setMinPrice = useCart((state) => state.setMinPrice);
  const setMaxPrice = useCart((state) => state.setMaxPrice);

  const resetFilters = useCart((state) => state.resetFilters);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const [catalogOpen, setCatalogOpen] = useState(false);

  // ✅ MOBIL FIX
  const [hoveredCategory, setHoveredCategory] = useState<string | null>("tv");
  const [openedMobileCategory, setOpenedMobileCategory] = useState<string | null>(null);

  // ✅ RESPONSIVE FIX
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const [focusMin, setFocusMin] = useState(false);
  const [focusMax, setFocusMax] = useState(false);

  const categoryBrands: Record<string, string[]> = {
    tv: ["Samsung", "LG", "Hisense", "Toshiba"],
    washing: ["HOTPOINT", "Neos", "LG", "Bosch", "Beko", "Hisense", "Midea", "Hitachi", "HOFFMANN"],
    ac: ["Samsung", "LG", "Midea", "Hisense"],
    fridge: ["Samsung", "LG", "Beko", "Hisense"],
    combi: ["Bosch", "Beko"],
    dishwasher: ["Bosch", "Beko", "LG"],
    dryer: ["Samsung", "LG", "Beko"],
    freezer: ["Hisense", "Beko"],
    vacuum: ["Bosch", "Samsung", "LG"],
    coffee: ["Bosch", "Midea"],
    stove: ["Beko", "Bosch"],
    microwave: ["Samsung", "LG", "Midea"],
    oven: ["Bosch", "Beko"],
  };

  const categories = [
    { key: "tv", label: "Televizor" },
    { key: "washing", label: "Paltaryuyan" },
    { key: "ac", label: "Kondisioner" },
    { key: "fridge", label: "Soyuducu" },
    { key: "combi", label: "Kombi" },
    { key: "dishwasher", label: "Qabyuyan" },
    { key: "dryer", label: "Paltar Qurudan" },
    { key: "freezer", label: "Dondurucu" },
    { key: "vacuum", label: "Tozsoran" },
    { key: "coffee", label: "Qəhvə Dəmləyən" },
    { key: "stove", label: "Qaz Peçi" },
    { key: "microwave", label: "Mikro Dalğa" },
    { key: "oven", label: "Soba" },
  ];

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .top-bar {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .logo-row {
            justify-content: space-between;
          }

          .search {
            width: 100% !important;
            max-width: 100% !important;
          }

          .desktop-right {
            display: none !important;
          }

          .mobile-cart {
            display: block !important;
          }

          .filter-input {
            width: 48% !important;
          }

          .title-text {
            font-size: 14px !important;
          }

          .catalog {
            flex-direction: column !important;
          }

          /* ✅ MOBIL CATEGORY */
          .mobile-category-row {
            border-bottom: 1px solid #eee;
          }

          .mobile-brand-list {
            padding-left: 20px;
            background: #f7f7f7;
          }

          .mobile-brand-item {
            padding: 10px 12px;
            cursor: pointer;
          }
        }

        @media (min-width: 769px) {
          .mobile-cart {
            display: none !important;
          }
        }
      `}</style>

      <header
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: "15px 20px",
          background: "linear-gradient(90deg, #5f2c82, #49a09d)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        {/* TOP */}
        <div
          className="top-bar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 15,
          }}
        >
          {/* SOL */}
          <div
            className="logo-row"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flex: "0 0 auto",
            }}
          >
            <Link href="/" onClick={resetFilters} style={{ textDecoration: "none" }}>
              <h2 style={{ margin: 0, color: "#fff" }}>
                ⚡ Seymur Electronics
              </h2>
            </Link>

            <button
              onClick={openCart}
              className="mobile-cart"
              style={{
                padding: "8px 14px",
                background: "#111",
                color: "white",
                borderRadius: 10,
                position: "relative",
              }}
            >
              🛒
              {count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "red",
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          </div>

          {/* ORTA */}
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <input
              className="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              style={{
                width: "100%",
                maxWidth: 350,
                padding: "10px 14px",
                borderRadius: 20,
                border: "none",
              }}
            />
          </div>

          {/* SAĞ */}
          <div
            className="desktop-right"
            style={{ display: "flex", alignItems: "center", gap: 15 }}
          >
            <nav style={{ display: "flex", gap: 15 }}>
              <Link href="/" onClick={resetFilters} style={{ color: "#fff" }}>
                Home
              </Link>

              <Link href="/wishlist" style={{ color: "#fff" }}>
                Wishlist
              </Link>
            </nav>

            <button
              onClick={openCart}
              style={{
                padding: "8px 14px",
                background: "#111",
                color: "white",
                borderRadius: 10,
                position: "relative",
              }}
            >
              🛒 Cart
              {count > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "red",
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* FILTER ROW */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            onClick={() => setCatalogOpen(!catalogOpen)}
            style={{
              padding: "8px 14px",
              borderRadius: 20,
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            ☰ Kataloq
          </button>

          <input
            className="filter-input"
            type="text"
            inputMode="numeric"
            value={focusMin ? minPrice || "" : ""}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            onFocus={() => setFocusMin(true)}
            onBlur={() => setFocusMin(false)}
            placeholder="Qiymət aralığı"
            style={{
              width: 140,
              padding: "8px",
              borderRadius: 12,
              border: "none",
              textAlign: "center",
              background: focusMin ? "#fff" : "#e5e5e5",
            }}
          />

          <input
            className="filter-input"
            type="text"
            inputMode="numeric"
            value={focusMax ? maxPrice || "" : ""}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            onFocus={() => setFocusMax(true)}
            onBlur={() => setFocusMax(false)}
            placeholder="Qiymət aralığı"
            style={{
              width: 140,
              padding: "8px",
              borderRadius: 12,
              border: "none",
              textAlign: "center",
              background: focusMax ? "#fff" : "#e5e5e5",
            }}
          />

          <div
            className="title-text"
            style={{
              width: "100%",
              textAlign: "center",
              fontWeight: 700,
              fontSize: 18,
              color: "#fff",
            }}
          >
            Məişət Texnikasının Nəğd və Kreditlə Satışı
          </div>
        </div>

        {/* KATALOQ */}
        {catalogOpen && (
          <div
            className="catalog"
            style={{
              display: "flex",
              background: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              alignItems: "flex-start",
            }}
          >
            {/* SOL CATEGORY */}
            <div
              style={{
                minWidth: 220,
                width: 220,
                borderRight: !isMobile ? "1px solid #eee" : "none",
              }}
            >
              {categories.map((cat) => (
                <div
                  key={cat.key}
                  className="mobile-category-row"
                >
                  <div
                    onMouseEnter={() => {
                      if (!isMobile) {
                        setHoveredCategory(cat.key);
                        setCategory(cat.key);
                      }
                    }}
                    onClick={() => {
                      setCategory(cat.key);

                      // ✅ MOBILE DROPDOWN
                      if (isMobile) {
                        setOpenedMobileCategory(
                          openedMobileCategory === cat.key ? null : cat.key
                        );
                      } else {
                        setHoveredCategory(cat.key);
                      }
                    }}
                    style={{
                      padding: 12,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span>{cat.label}</span>

                    {isMobile && (
                      <span>
                        {openedMobileCategory === cat.key ? "−" : "+"}
                      </span>
                    )}
                  </div>

                  {/* ✅ MOBILE BRANDS */}
                  {isMobile &&
                    openedMobileCategory === cat.key && (
                      <div className="mobile-brand-list">
                        {(categoryBrands[cat.key] || []).map((b) => (
                          <div
                            key={b}
                            className="mobile-brand-item"
                            onClick={() => {
                              setCategory(cat.key);
                              setBrand(b.toLowerCase());

                              // ✅ KATALOQ BAĞLANSIN
                              setCatalogOpen(false);
                            }}
                          >
                            {b}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* ✅ DESKTOP BRANDS FIX */}
            {!isMobile && (
              <div
                style={{
                  minWidth: 220,
                  width: 220,
                  paddingTop: 4,
                }}
              >
                {(categoryBrands[hoveredCategory || ""] || []).map((b) => (
                  <div
                    key={b}
                    onClick={() => {
                      setBrand(b.toLowerCase());
                      setCatalogOpen(false);
                    }}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {b}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}