"use client";

import { useCart } from "@/store/cart";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      style={{
        padding: "10px 15px",
        background: "black",
        color: "white",
        border: "none",
        borderRadius: 6,
        cursor: "pointer"
      }}
    >
      Səbətə at
    </button>
  );
}