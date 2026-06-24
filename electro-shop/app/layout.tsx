import type { ReactNode } from "react";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="az">
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        {/* GLOBAL HEADER */}
        <Header />

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* GLOBAL CART DRAWER */}
        <CartDrawer />

        {/* TOAST SYSTEM */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}