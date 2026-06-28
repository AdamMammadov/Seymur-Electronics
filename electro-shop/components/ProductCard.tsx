"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCart((state) => state.addToCart);
  const isInCart = useCart((state) => state.isInCart);
  const getItem = useCart((state) => state.getItem);

  const wishlist = useCart((state) => state.wishlist);
  const addToWishlist = useCart((state) => state.addToWishlist);
  const removeFromWishlist = useCart((state) => state.removeFromWishlist);

  const inCart = isInCart(product.id);
  const cartItem = getItem(product.id);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const inWishlist = mounted
    ? wishlist?.some((item) => item.id === product.id)
    : false;

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.error("Wishlist-dən silindi 💔");
    } else {
      addToWishlist(product);
      toast.success("Wishlist-ə əlavə olundu ❤️");
    }
  };

  const productImages: Record<number, string> = {
    1: "/images/Beko_BI5WBT691415W_1.png",
    2: "/images/tm-mt-bmt-1108-wm-0735_1.png",
    3: "/images/tm-mt-bmt-1108-wm-0735_1.png",
    4: "/images/tm-mt-bmt-1108-wm-0739_1.png",
    5: "/images/tm-mt-bmt-1108-wm-0735_1.png",
    6: "/images/Beko_WSPE7H616A_1.png",
    7: "/images/Beko WSRE 6512 PRW2.png",
    8: "/images/BOSCH WAN24200ME1.png",
    9: "/images/BOSCH WAN2420XME1.png",
    10: "/images/BOSCH WAN2420XME1.png",
    11: "/images/BOSCH WGA24400ME4.png",
    12: "/images/BOSCH WGA2440XME3.png",
    13: "/images/BOSCH WLS2846SME4.png",
    14: "/images/BOSCH WGA2441XME1.png",
    15: "/images/BOSCH WGA25400ME1.png",
    16: "/images/Bosch_WGA2540XME_1.png",
    17: "/images/Bosch_Series_8_WGB2440XME_1.png",
    18: "/images/Paltaryuyan_maşın_BOSCH_WGB2560XME_1.png",
    19: "/images/BOSCHWLS28460ME_1.png",
    20: "/images/HISENSE WF3S7021BB_1.png",
    21: "/images/HISENSE WF5I9043BBFS_1.png",
    22: "/images/HISENSE WFQP6012EVM_1.png",
    23: "/images/HISENSE WFQP7012EVMT_1.png",
    24: "/images/HITACHI BD-802HVOW_1.png",
    25: "/images/HOFFMANN WMH6012W_1.png",
    26: "/images/HOFFMANN WMH7012W_1.png",
    27: "/images/HOFFMANN WMH8014T_1.png",
    28: "/images/HOFFMANN WMH9014T_1.png",
    29: "/images/HOTPOINT WBIH 7290VWB_1.png",
    30: "/images/HOTPOINT WBIH 7290VWB_1.png",
    31: "/images/LG F2T9GW9P-1.webp",
    32: "/images/LG F2V5HYPYJE-1.png",
    33: "/images/LG F2V7GWL2P-1.png",
    34: "/images/LG F2V9GW9P-1.png",
    35: "/images/LG F2Y1HYP6J-1.png",
    36: "/images/LG F2Y1VYP6JP-1.png",
    37: "/images/LG F4V5EYLYP-1.png",
    38: "/images/LG F4V5VYL2P-1.png",
    39: "/images/LG LVF0800PBPC-1.png",
    40: "/images/LG LVF0900PBGC-1.png",
    41: "/images/MIDEA MF01610US40-T-1.png",
    42: "/images/MIDEA MF01712BS40-T-1.png",
    43: "/images/NEOS KG10-1220N-GR-1.png",
    44: "/images/NEOS KG60-1021N-GR-1.png",
    45: "/images/NEOS KG70-1220N-GR-1.png",
    46: "/images/NEOS KG70-1220N-GR-1.png",
    47: "/images/NEOS KG80-1221N-GR-1.png",
    48: "/images/SAMSUNG WW11CG604CLBLP-1.png",
    49: "/images/SAMSUNG WW70AGAS25AXLP-1.png",
    50: "/images/SAMSUNG WW70FG3M05AW-1.png",
    51: "/images/SAMSUNG WW90DG5U34AELP-1.png",
    52: "/images/SAMSUNG WW90DG6U34LBLP-1.png",
    53: "/images/TOSHIBA TW-BL80A2UZ(SS)-1.png",
    54: "/images/TOSHIBA TW-BN80C2UZ(MK)-1.png",
    55: "/images/VESTEL WMP BI 86301-1.png",
    56: "/images/WHIRLPOOL BI WMWG 91485-1.png",
    57: "/images/YOSHIRO YWM-M610SI44W-1.png",
    58: "/images/YOSHIRO YWM-M712SI44GG-1.png",
    59: "/images/YOSHIRO YWM-M712SI44W-1.png",
    60: "/images/HITACHI BD-D802HVOW-1.png",
    61: "/images/LG F15L9DGD-1.png",
    62: "/images/LG F20L2CRV2E2-1.png",
    63: "/images/LG F2V5GG2S-1.png",
    64: "/images/LG L5C0905PSGC-1.png",
    65: "/images/LG L9C1107PBGC-1.png",
    66: "/images/LG W1S1CVK2EHM-1.png",
    67: "/images/LG W4W8BVPKZHM-1.png",
  };

  return (
    <>
      <div className="card">
        {/* ❤️ WISHLIST */}
        <button onClick={toggleWishlist} className="wishlist">
          {inWishlist ? "❤️" : "🤍"}
        </button>

        {/* IMAGE */}
        {productImages[product.id] && (
          <div className="image">
            <img
              src={productImages[product.id]}
              alt={product.name}
            />
          </div>
        )}

        {/* CONTENT */}
        <div className="content">
          <Link href={`/product/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>

          <span className="category">{product.category}</span>

          <p className="price">{product.price} AZN</p>

          {inCart && (
            <small className="incart">
              Səbətdə: {cartItem?.quantity} ədəd
            </small>
          )}

          <div className="buttons">
            <button
              onClick={() => {
                addToCart(product);
                toast.success("Məhsul səbətə əlavə olundu 🛒");
              }}
              className="cartBtn"
            >
              {inCart ? "➕ Yenə əlavə et" : "🛒 Səbətə at"}
            </button>

            <Link href={`/product/${product.id}`}>
              <button className="viewBtn">Bax</button>
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ CSS RESPONSIVE */}
      <style jsx>{`
        .card {
          border: 1px solid #eee;
          padding: 16px;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 6px 15px rgba(0,0,0,0.06);
          transition: 0.25s;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 190px;
          position: relative;
          gap: 12px;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        .wishlist {
          position: absolute;
          top: 10px;
          right: 10px;
          border: none;
          background: transparent;
          font-size: 20px;
          cursor: pointer;
        }

        .image {
          width: 110px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;

          order: 2; /* 🔥 FIX: şəkil sağa */
        }

        .content {
          flex: 1;
          order: 1; /* 🔥 FIX: content sola */
        }

        .image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .content h3 {
          margin-bottom: 5px;
          font-size: 18px;
          color: #111;
        }

        .category {
          font-size: 12px;
          background: #f3f3f3;
          padding: 4px 8px;
          border-radius: 6px;
          color: #555;
        }

        .price {
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
          color: #1a8917;
        }

        .buttons {
          margin-top: 15px;
          display: flex;
          gap: 10px;
        }

        .cartBtn {
          flex: 1;
          padding: 10px;
          background: black;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }

        .viewBtn {
          padding: 10px 14px;
          background: #f5f5f5;
          border: 1px solid #ddd;
          border-radius: 10px;
          cursor: pointer;
        }

        /* 🔥 MOBİL RESPONSIVE */
        @media (max-width: 768px) {
          .card {
            flex-direction: column;
            align-items: stretch;
            min-height: auto;
          }

          .image {
            width: 100%;
            height: 160px;
            order: -1; /* 🔥 mobil yuxarı qalır */
          }

          .content h3 {
            font-size: 16px;
          }

          .price {
            font-size: 16px;
          }

          .buttons {
            flex-direction: column;
          }

          .cartBtn,
          .viewBtn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}