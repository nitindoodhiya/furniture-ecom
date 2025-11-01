// pages/products/[id].tsx
"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCart } from "../../src/context/cart";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  dimensions: string;
  reviews: Review[];
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  author: string;
}

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // REVIEW FORM STATE
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/furniture/${id}`
        );
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !product) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          furnitureId: Number(id),
          rating,
          comment,
        }),
      });

      if (!res.ok) throw new Error("Review failed");

      // REFETCH PRODUCT TO GET NEW REVIEWS
      const updatedRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/furniture/${id}`
      );
      const updatedData = await updatedRes.json();
      setProduct(updatedData);

      // RESET FORM
      setRating(5);
      setComment("");
    } catch (err) {
      alert("Review failed. Backend dead?");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <div
          style={{
            border: "4px solid #333",
            borderTop: "4px solid #e00",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 1s linear infinite",
            margin: "0 auto",
          }}
        ></div>
        <p style={{ marginTop: "1rem" }}>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "100px 20px", textAlign: "center" }}>
        <h1>Product not found</h1>
        <button
          onClick={() => router.push("/products")}
          style={{
            background: "#e00",
            color: "#fff",
            padding: "1rem 2rem",
            border: "none",
            marginTop: "1rem",
          }}
        >
          BACK TO PRODUCTS
        </button>
      </div>
    );
  }

  const reviews = product.reviews || [];

  return (
    <div
      style={{
        padding: "100px 20px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <button
        onClick={() => router.push("/products")}
        style={{
          background: "none",
          border: "none",
          color: "#e00",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        ← Back to Products
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginTop: "1rem",
        }}
        className="max-md:grid-cols-1"
      >
        {/* IMAGE */}
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "600px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              margin: "0 0 1rem",
            }}
          >
            {product.name}
          </h1>
          <p
            style={{
              fontSize: "2rem",
              color: "#e00",
              fontWeight: "bold",
              margin: "0 0 1.5rem",
            }}
          >
            ${product.price.toFixed(2)}
          </p>

          <button
            onClick={() => {
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
              });
              router.push("/cart");
            }}
            style={{
              background: "#e00",
              color: "#fff",
              padding: "1rem 2rem",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              width: "100%",
              marginBottom: "2rem",
              cursor: "pointer",
            }}
          >
            ADD TO CART
          </button>

          <div style={{ borderTop: "1px solid #333", paddingTop: "1.5rem" }}>
            <h3 style={{ margin: "0 0 1rem", fontSize: "1.2rem" }}>
              Product Details
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.95rem",
                color: "#ccc",
              }}
            >
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Description:</strong> {product.description}
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Dimensions:</strong> {product.dimensions}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      {/* REVIEWS SECTION */}
      <div
        style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid #444",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", margin: "0 0 1.5rem", color: "#000" }}>
          Reviews ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <p style={{ color: "#aaa", fontStyle: "italic" }}>
            No reviews yet. Be the first!
          </p>
        ) : (
          <div style={{ display: "grid", gap: "1.5rem" }}>
            {reviews.map((review) => (
              <div
                key={review.id}
                style={{
                  background: "#1f1f1f",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  border: "1px solid #333",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                      fontSize: "1.1rem",
                    }}
                  >
                    {review.author || `User ${review.id}`}
                  </span>
                  <span style={{ color: "#e00", fontSize: "1.2rem" }}>
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p
                  style={{
                    margin: "0 0 0.5rem",
                    color: "#e5e5e5",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  {review.comment}
                </p>
                <small style={{ color: "#999", fontStyle: "italic" }}>
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* ADD REVIEW FORM */}
      {/* ADD REVIEW FORM — WITH CLICKABLE STARS */}
      <div
        style={{
          marginTop: "3rem",
          padding: "2rem",
          background: "#1a1a1a",
          borderRadius: "12px",
        }}
      >
        <h3 style={{ fontSize: "1.5rem", margin: "0 0 1.5rem", color: "#fff" }}>
          Add Your Review
        </h3>
        <form onSubmit={handleSubmitReview}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "1.8rem",
                    cursor: "pointer",
                    padding: 0,
                    color: star <= rating ? "#e00" : "#444",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (star > rating) e.currentTarget.style.color = "#e00";
                  }}
                  onMouseLeave={(e) => {
                    if (star > rating) e.currentTarget.style.color = "#444";
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid #444",
                background: "#111",
                color: "#fff",
                resize: "vertical",
                minHeight: "100px",
                fontSize: "1rem",
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              background: submitting ? "#666" : "#e00",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: submitting ? "not-allowed" : "pointer",
              fontSize: "1rem",
              transition: "background 0.2s",
            }}
          >
            {submitting ? "Submitting..." : "SUBMIT REVIEW"}
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
