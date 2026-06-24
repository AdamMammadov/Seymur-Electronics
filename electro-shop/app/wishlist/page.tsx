"use client";

import { useCart } from "@/store/cart";
import Link from "next/link";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const wishlist = useCart((s) => s.wishlist);
  const removeFromWishlist = useCart((s) => s.removeFromWishlist);
  const addToCart = useCart((s) => s.addToCart);
  const isInCart = useCart((s) => s.isInCart);

  if (!wishlist || wishlist.length === 0) {
    return (
      <main
        style={{
          padding: 40,
          textAlign: "center",
        }}
      >
        <h1>❤️ Wishlist</h1>
        <p style={{ color: "gray" }}>Heç nə əlavə edilməyib</p>

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
            🛍️ Alış-verişə başla
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>❤️ Wishlist</h1>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 15,
          marginTop: 20,
        }}
      >
        {wishlist.map((item) => {
          const inCart = isInCart(item.id);

          return (
            <div
              key={item.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 14,
                padding: 15,
                background: "#fff",
                boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                transition: "0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-3px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0px)")
              }
            >
              {/* NAME */}
              <h3 style={{ margin: 0 }}>{item.name}</h3>

              {/* CATEGORY */}
              <span
                style={{
                  fontSize: 12,
                  color: "#666",
                  background: "#f5f5f5",
                  padding: "3px 8px",
                  borderRadius: 6,
                  width: "fit-content",
                }}
              >
                {item.category}
              </span>

              {/* PRICE */}
              <strong style={{ color: "#1a8917" }}>
                {item.price} AZN
              </strong>

              {/* IN CART STATUS */}
              {inCart && (
                <small style={{ color: "gray" }}>
                  artıq səbətdədir 🛒
                </small>
              )}

              {/* BUTTONS */}
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  onClick={() => {
                    addToCart(item);
                    toast.success("Səbətə əlavə olundu 🛒");
                  }}
                  style={{
                    flex: 1,
                    padding: "8px",
                    background: inCart ? "#333" : "black",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  {inCart ? "➕ Yenə əlavə et" : "🛒 Cart"}
                </button>

                <button
                  onClick={() => {
                    removeFromWishlist(item.id);
                    toast.error("Silindi 💔");
                  }}
                  style={{
                    padding: "8px",
                    background: "#f5f5f5",
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  ✖
                </button>
              </div>

              {/* DETAIL */}
              <Link href={`/product/${item.id}`}>
                <button
                  style={{
                    width: "100%",
                    marginTop: 5,
                    padding: "8px",
                    background: "#f9f9f9",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  Bax
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}