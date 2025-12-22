// src/pages/CartPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeCartItem } from "../../../src/api/cartService";
import { createOrder, verifyPayment } from "../../../src/api/paymentService";
import { HiTrash, HiShoppingCart, HiCheck, HiX } from "react-icons/hi";
import { getUserId } from "../utils/getUserId";

// TypeScript declaration for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* -------------------- Razorpay Loader -------------------- */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () =>
      setError("Payment system could not be loaded. Please refresh.");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  /* -------------------- Load Cart -------------------- */
  const loadCart = async () => {
    try {
      setLoading(true);
      setError("");
      const userId = getUserId();
      const res = await getCart(userId);
      setItems(res.data || []);
    } catch (err: any) {
      console.error(err);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCart();
  }, []);

  /* -------------------- Remove Item -------------------- */
  const handleRemove = async (id: number) => {
    try {
      await removeCartItem(id);
      await loadCart();
      setSuccess("Item removed from cart");
      setTimeout(() => setSuccess(""), 2000);
    } catch {
      setError("Failed to remove item");
    }
  };

  const total = items.reduce(
    (sum, it) => sum + (it.course?.price ?? 0),
    0
  );

  /* -------------------- Checkout -------------------- */
  const handleCheckout = async () => {
    try {
      setError("");
      setSuccess("");

      if (!razorpayLoaded || items.length === 0) {
        setError("Cart is empty or payment system not ready");
        return;
      }

      const firstItem = items[0];
      const userId = getUserId();

      const orderRes = await createOrder({
        userId,
        courseId: firstItem.course.id,
        amount: firstItem.course.price,
      });

      const { orderId, key } = orderRes.data;

      const options = {
        key,
        amount: firstItem.course.price * 100,
        currency: "INR",
        name: "Lumina LMS",
        description: "Course Purchase",
        order_id: orderId,

        handler: async (response: any) => {
          try {
            await verifyPayment({
              userId,
              courseId: firstItem.course.id,
              amount: firstItem.course.price,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            await removeCartItem(firstItem.id);
            setSuccess("Payment Successful! Enrolled.");
            setTimeout(
              () => navigate(`/course/${firstItem.course.id}`),
              1500
            );
          } catch {
            setError("Payment verification failed");
          }
        },

        modal: {
          ondismiss: () => console.log("Payment cancelled"),
        },

        prefill: {
          name: "Demo User",
          email: "demo@example.com",
          contact: "9999999999",
        },

        theme: { color: "#0f172a" },
      };

      const rz = new window.Razorpay(options);
      rz.on("payment.failed", (res: any) =>
        setError(res.error?.description || "Payment failed")
      );
      rz.open();
    } catch (err: any) {
      setError(err?.message || "Checkout failed");
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        {success && (
          <div style={styles.successAlert}>
            <HiCheck /> {success}
          </div>
        )}
        {error && (
          <div style={styles.errorAlert}>
            <HiX /> {error}
          </div>
        )}

        <div style={styles.cartCard}>
          <div style={styles.coverPhoto}>
            <div style={styles.coverGradient} />
            <div style={styles.headerContent}>
              <HiShoppingCart size={28} />
              <div>
                <h1 style={styles.title}>My Cart</h1>
                <p style={styles.subtitle}>Review and checkout</p>
              </div>
            </div>
          </div>

          <div style={styles.cartContent}>
            <div style={styles.grid}>
              <div>
                {loading && <p>Loading cart...</p>}

                {!loading && items.length === 0 && (
                  <div style={styles.emptyState}>
                    <HiShoppingCart size={40} />
                    <h2>Your cart is empty</h2>
                    <button
                      style={styles.browseButton}
                      onClick={() => navigate("/courses")}
                    >
                      Browse Courses
                    </button>
                  </div>
                )}

                {items.map((item) => (
                  <div key={item.id} style={styles.cartItem}>
                    <img
                      src={item.course?.imageUrl}
                      alt=""
                      style={styles.image}
                    />
                    <div style={styles.itemInfo}>
                      <h3>{item.course?.title}</h3>
                      <p>₹ {item.course?.price}</p>
                    </div>
                    <button
                      style={styles.removeBtn}
                      onClick={() => handleRemove(item.id)}
                    >
                      <HiTrash />
                    </button>
                  </div>
                ))}
              </div>

              <aside>
                <div style={styles.summary}>
                  <h3>Summary</h3>
                  <p>Courses: {items.length}</p>
                  <h2>₹ {total.toFixed(2)}</h2>
                  <button
                    style={styles.checkoutBtn}
                    onClick={handleCheckout}
                    disabled={!razorpayLoaded || items.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Styles (UNCHANGED LOGIC) -------------------- */
const styles: Record<string, React.CSSProperties> = {
  pageContainer: { minHeight: "100vh", padding: 40 },
  contentWrapper: { maxWidth: 1100, margin: "0 auto" },
  successAlert: { background: "#16a34a", color: "#fff", padding: 16 },
  errorAlert: { background: "#dc2626", color: "#fff", padding: 16 },
  cartCard: { background: "#fff", borderRadius: 24 },
  coverPhoto: { height: 160, position: "relative" },
  coverGradient: { height: "100%", background: "#667eea" },
  headerContent: { position: "absolute", bottom: 20, left: 20, color: "#fff" },
  title: { margin: 0 },
  subtitle: { margin: 0 },
  cartContent: { padding: 24 },
  grid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 },
  emptyState: { textAlign: "center", padding: 40 },
  browseButton: { padding: 12 },
  cartItem: { display: "flex", gap: 16, marginBottom: 12 },
  image: { width: 120, height: 80, objectFit: "cover" },
  itemInfo: { flex: 1 },
  removeBtn: { background: "#fee2e2" },
  summary: { background: "#111827", color: "#fff", padding: 20 },
  checkoutBtn: { marginTop: 16, padding: 12, width: "100%" },
};

export default CartPage;
