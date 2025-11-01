// pages/products.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../src/context/cart";

interface Furniture {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function Products() {
  const [items, setItems] = useState<Furniture[]>([]);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/furniture`)
      .then((res) => {
        if (!res.ok) throw new Error("API dead");
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => {
        console.error(err);
        setItems([]);
      });
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#fff" }}>
      {/* HEADER */}
      <header
        style={{
          padding: "60px 20px",
          textAlign: "center",
          background: "#000",
        }}
      >
        <h1 style={{ fontSize: "3.5rem", margin: "0 0 0.5rem", color: "#c00" }}>
          THE COLLECTION
        </h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.8 }}>
          Pick your weapon. Burn your money.
        </p>
      </header>

      {/* PRODUCT GRID */}
      <main
        style={{
          padding: "40px 20px",
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {items.length === 0 ? (
          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              fontSize: "1.2rem",
            }}
          >
            No furniture found. Backend sleeping?
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#1a1a1a",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(200, 0, 0, 0.2)",
                transition: "0.3s",
                cursor: "pointer",
              }}
              // CLICK → GO TO PRODUCT PAGE
              onClick={() => router.push(`/products/${item.id}`)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  background: "#333",
                }}
              />
              <div style={{ padding: "1.2rem" }}>
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.3rem" }}>
                  {item.name}
                </h3>
                <p
                  style={{
                    margin: "0 0 1rem",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#c00",
                  }}
                >
                  ${item.price.toFixed(2)}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      imageUrl: item.imageUrl,
                    });
                  }}
                  style={{
                    width: "100%",
                    background: "#c00",
                    color: "#fff",
                    border: "none",
                    padding: "0.8rem",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#a00")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "#c00")
                  }
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      {/* BACK TO HOME */}
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <Link href="/">
          <span
            style={{
              color: "#c00",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Back to Infurno
          </span>
        </Link>
      </div>
    </div>
  );
}