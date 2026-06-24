"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    address?: string;
  }>({});

  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isPhoneValid = (value: string) =>
    /^[0-9+\s]{7,15}$/.test(value);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) newErrors.name = "Ad daxil edin";
    if (!phone.trim()) newErrors.phone = "Telefon daxil edin";
    else if (!isPhoneValid(phone))
      newErrors.phone = "Telefon düzgün deyil";
    if (!address.trim()) newErrors.address = "Ünvan daxil edin";

    setErrors(newErrors);

    if (items.length === 0) {
      toast.error("Səbət boşdur");
      return false;
    }

    if (Object.keys(newErrors).length > 0) {
      toast.error("Məlumatları düzgün doldurun");
      return false;
    }

    return true;
  };

  const handleOrder = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      /* =========================
         EMAIL CONTENT
      ========================== */
      const productList = items
        .map(
          (item) =>
            `${item.name} × ${item.quantity} = ${
              item.price * item.quantity
            } AZN`
        )
        .join("\n");

      /* =========================
         SEND EMAIL (LOCAL API)
      ========================== */
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          items,
          total,
          productList,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Email göndərilmədi");
      }

      /* SUCCESS */
      setLoading(false);
      setOrdered(true);
      clearCart();

      toast.success("Sifariş göndərildi və mailə düşdü 📩");
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("Xəta baş verdi ❌");
    }
  };

  /* SUCCESS SCREEN */
  if (ordered) {
    return (
      <main style={{ padding: 30, textAlign: "center" }}>
        <h1>✅ Sifariş qəbul edildi</h1>
        <p>Tezliklə sizinlə əlaqə saxlanılacaq</p>

        <Link href="/">
          <button
            style={{
              marginTop: 15,
              padding: "10px 16px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Ana səhifəyə dön
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 650, margin: "0 auto", padding: 20 }}>
      <h1>🧾 Checkout</h1>

      {/* ORDER SUMMARY */}
      <div
        style={{
          marginBottom: 20,
          padding: 15,
          border: "1px solid #eee",
          borderRadius: 10,
          background: "#fafafa",
        }}
      >
        <h3>Order Summary</h3>
        <p>Products: {items.length}</p>
        <p>Total: {total.toFixed(2)} AZN</p>

        <div style={{ marginTop: 10 }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                padding: "2px 0",
              }}
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                {(item.price * item.quantity).toFixed(2)} AZN
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div style={{ display: "grid", gap: 12 }}>
        <input
          placeholder="Ad Soyad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: 10,
            border: errors.name ? "1px solid red" : "1px solid #ddd",
            borderRadius: 6,
          }}
        />
        {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}

        <input
          placeholder="Telefon"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            padding: 10,
            border: errors.phone ? "1px solid red" : "1px solid #ddd",
            borderRadius: 6,
          }}
        />
        {errors.phone && <small style={{ color: "red" }}>{errors.phone}</small>}

        <textarea
          placeholder="Ünvan"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{
            padding: 10,
            border: errors.address ? "1px solid red" : "1px solid #ddd",
            borderRadius: 6,
          }}
        />
        {errors.address && (
          <small style={{ color: "red" }}>{errors.address}</small>
        )}

        <button
          onClick={handleOrder}
          disabled={loading}
          style={{
            padding: 12,
            background: loading ? "#444" : "black",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Göndərilir..." : "Sifarişi təsdiqlə"}
        </button>
      </div>
    </main>
  );
}