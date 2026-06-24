"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // 🔥 əlavə et

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    getTotalPrice,
  } = useCart();

  const router = useRouter(); // 🔥 əlavə et

  const total = getTotalPrice();

  /* ESC CLOSE */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeCart]);

  /* LOCK SCROLL */
  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 40,
        }}
      />

      {/* DRAWER */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: 380,
          height: "100vh",
          background: "white",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.2)",
          padding: 20,
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <h2 style={{ margin: 0 }}>🛒 Səbət</h2>

          <button
            onClick={closeCart}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* ITEMS */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingBottom: 100, // 🔥 bir az optimizasiya
          }}
        >
          {items.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 60 }}>
              <p style={{ color: "gray" }}>Səbət boşdur 🛒</p>
              <small>Məhsul əlavə et və alış-verişə başla</small>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  borderBottom: "1px solid #eee",
                  paddingBottom: 12,
                  marginBottom: 12,
                }}
              >
                <h4 style={{ margin: 0 }}>{item.name}</h4>

                <p style={{ margin: "5px 0", color: "gray" }}>
                  {item.price} AZN
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={() => decreaseQty(item.id)}
                    disabled={item.quantity <= 1}
                    style={{
                      opacity: item.quantity <= 1 ? 0.5 : 1,
                      cursor:
                        item.quantity <= 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQty(item.id)}>+</button>

                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      toast.error("Məhsul silindi ❌");
                    }}
                    style={{
                      marginLeft: "auto",
                      color: "red",
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: 10,
            position: "sticky",
            bottom: 0,
            background: "white",
          }}
        >
          <h3>Total: {total.toFixed(2)} AZN</h3>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                clearCart();
                toast.success("Səbət təmizləndi 🧹");
              }}
              disabled={items.length === 0}
              style={{
                flex: 1,
                padding: 10,
                background: items.length ? "black" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: items.length ? "pointer" : "not-allowed",
              }}
            >
              Təmizlə
            </button>

            {/* 🔥 ƏN VACİB FIX BURADIR */}
            <button
              disabled={items.length === 0}
              onClick={() => {
                if (items.length === 0) return;

                closeCart(); // 🔥 əvvəl bağla
                router.push("/checkout"); // 🔥 sonra keç
              }}
              style={{
                flex: 1,
                padding: 10,
                background: items.length ? "green" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: items.length ? "pointer" : "not-allowed",
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}