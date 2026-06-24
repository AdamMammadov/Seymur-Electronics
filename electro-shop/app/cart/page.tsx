"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";
import Link from "next/link";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    hydrate,
  } = useCart();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: 20,
      }}
    >
      <h1>🛒 Səbət</h1>

      {items.length === 0 ? (
        <div style={{ marginTop: 30 }}>
          <p>Səbət boşdur</p>

          <Link href="/">
            <button
              style={{
                marginTop: 10,
                padding: "10px 15px",
                background: "black",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Alış-verişə qayıt
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* ITEMS LIST */}
          <div style={{ marginTop: 20, display: "grid", gap: 12 }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #eee",
                  padding: 15,
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "white",
                }}
              >
                {/* LEFT */}
                <div>
                  <h3 style={{ margin: 0 }}>{item.name}</h3>

                  <p style={{ color: "gray", margin: "5px 0" }}>
                    {item.price} AZN
                  </p>

                  <p style={{ margin: 0 }}>
                    Cəmi:{" "}
                    <b>{item.price * item.quantity} AZN</b>
                  </p>
                </div>

                {/* RIGHT */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <button
                    onClick={() => decreaseQty(item.id)}
                    style={{
                      padding: "5px 10px",
                      border: "1px solid #ddd",
                      background: "#f5f5f5",
                      cursor: "pointer",
                      borderRadius: 6,
                    }}
                  >
                    -
                  </button>

                  <span style={{ minWidth: 20, textAlign: "center" }}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    style={{
                      padding: "5px 10px",
                      border: "1px solid #ddd",
                      background: "#f5f5f5",
                      cursor: "pointer",
                      borderRadius: 6,
                    }}
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginLeft: 10,
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL SECTION */}
          <div
            style={{
              marginTop: 25,
              paddingTop: 15,
              borderTop: "1px solid #ddd",
            }}
          >
            <h2>💰 Toplam: {total} AZN</h2>

            <button
              onClick={clearCart}
              style={{
                marginTop: 10,
                background: "black",
                color: "white",
                padding: "10px 15px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              Səbəti təmizlə
            </button>
          </div>
        </>
      )}
    </main>
  );
}