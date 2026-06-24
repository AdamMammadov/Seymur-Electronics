"use client";

import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/store/cart";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();

  const addToCart = useCart((state) => state.addToCart);

  const wishlist = useCart((state) => state.wishlist);
  const addToWishlist = useCart((state) => state.addToWishlist);
  const removeFromWishlist = useCart((state) => state.removeFromWishlist);

  const product = products.find((p) => p.id === Number(id));

  const [qty, setQty] = useState(1);
  const [imgIndex, setImgIndex] = useState(0);

  // 🔥 RESPONSIVE
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const images =
    product?.images || [product?.image || "/images/placeholder.png"];

  if (!product) {
    return (
      <main style={{ padding: 40, textAlign: "center" }}>
        <h2>❌ Məhsul tapılmadı</h2>

        <Link href="/">
          <button
            style={{
              marginTop: 15,
              padding: "10px 15px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Geri dön
          </button>
        </Link>
      </main>
    );
  }

  const inWishlist = wishlist?.some((w) => w.id === product.id);

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.error("Wishlist-dən silindi 💔");
    } else {
      addToWishlist(product);
      toast.success("Wishlist-ə əlavə olundu ❤️");
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    toast.success(`Səbətə ${qty} ədəd əlavə olundu 🛒`);
  };

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: isMobile ? 15 : 30, // 🔥 mobil padding
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1d4ce6, #e0f7fa, #1479df)",
        borderRadius: isMobile ? 0 : 20, // 🔥 mobil full width
      }}
    >
      <Link href="/" style={{ textDecoration: "none", color: "#080606" }}>
        ← Geri qayıt
      </Link>

      <div
        style={{
          marginTop: 20,
          padding: isMobile ? 15 : 25,
          border: "1px solid #eee",
          borderRadius: 16,
          background: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          position: "relative",
          display: "grid",

          // 🔥 ƏSAS FIX BURDA
          gridTemplateColumns: isMobile ? "1fr" : "1fr 400px",

          gap: isMobile ? 20 : 30,
          alignItems: "center",
        }}
      >
        {/* ❤️ Wishlist */}
        <button
          onClick={toggleWishlist}
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            border: "none",
            background: "transparent",
            fontSize: 22,
            cursor: "pointer",
          }}
        >
          {inWishlist ? "❤️" : "🤍"}
        </button>

        {/* LEFT */}
        <div>
          <span
            style={{
              fontSize: 12,
              background: "#f3f4f6",
              padding: "4px 10px",
              borderRadius: 6,
              color: "#555",
            }}
          >
            {product.category}
          </span>

          <h1 style={{ marginTop: 10, fontSize: isMobile ? 20 : 28 }}>
            {product.name}
          </h1>

          <h2 style={{ marginTop: 10, color: "#16a34a" }}>
            {product.price} AZN
          </h2>

          <p style={{ color: "#555", marginTop: 10, lineHeight: 1.6 }}>
            {product.description || "Məhsul haqqında əlavə məlumat yoxdur."}
          </p>

          {product.specs && (
            <div style={{ marginTop: 20 }}>
              <h3 style={{ marginBottom: 10 }}>Xüsusiyyətlər</h3>

              <div
                style={{
                  display: "grid",

                  // 🔥 mobil fix
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",

                  gap: 8,
                }}
              >
                {Object.entries(product.specs).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      background: "#f9fafb",
                      padding: "8px 10px",
                      borderRadius: 8,
                      fontSize: 14,
                    }}
                  >
                    <strong>{key}:</strong> {value}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 20,
            }}
          >
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          {/* ACTIONS */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 20,

              // 🔥 mobil fix
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <button
              onClick={handleAddToCart}
              style={{
                padding: "10px 15px",
                background: "black",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                width: isMobile ? "100%" : "auto",
              }}
            >
              🛒 Səbətə at ({qty})
            </button>

            <Link href="/checkout" style={{ width: isMobile ? "100%" : "auto" }}>
              <button
                style={{
                  width: "100%",
                  padding: "10px 15px",
                  background: "#f5f5f5",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div style={{ textAlign: "center" }}>
          <img
            src={images[imgIndex]}
            alt="product"
            style={{
              width: "100%",
              maxHeight: isMobile ? 220 : 320, // 🔥 mobil fix
              objectFit: "contain",
            }}
          />

          <div
            style={{
              marginTop: 10,
              display: "flex",
              gap: 10,
              justifyContent: "center",
            }}
          >
            <button
              onClick={() =>
                setImgIndex((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
            >
              ⬅
            </button>

            <button
              onClick={() =>
                setImgIndex((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
            >
              ➡
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}