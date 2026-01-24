// src/pages/CartPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeCartItem } from "../../../src/api/cartService";
import { createOrder, verifyPayment } from "../../../src/api/paymentService";
import { HiTrash, HiShoppingCart, HiCheck, HiX, HiArrowLeft, HiCreditCard } from "react-icons/hi";
import { getUserId } from "../utils/getUserId";

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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => setError("Payment system unavailable. Please refresh.");
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const userId = getUserId();
      const res = await getCart(userId);
      setItems(res.data || []);
    } catch (err) {
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadCart(); }, []);

  const handleRemove = async (id: number) => {
    try {
      await removeCartItem(id);
      setItems(items.filter(item => item.id !== id));
      setSuccess("Item removed");
      setTimeout(() => setSuccess(""), 2000);
    } catch {
      setError("Failed to remove item");
    }
  };

  const total = items.reduce((sum, it) => sum + (it.course?.price ?? 0), 0);

  const handleCheckout = async () => {
    // Note: This logic assumes single-item checkout based on your original code.
    // If you want to checkout the whole cart, your backend 'createOrder' needs to support 'items' array.
    if (items.length === 0) return;
    
    try {
      setError("");
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
        description: `Enrollment: ${firstItem.course.title}`,
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
            setSuccess("Payment Successful! Redirecting...");
            setTimeout(() => navigate(`/course/${firstItem.course.id}`), 2000);
          } catch {
            setError("Payment verification failed");
          }
        },
        theme: { color: "#6366f1" },
      };

      const rz = new window.Razorpay(options);
      rz.open();
    } catch (err: any) {
      setError("Checkout initialization failed");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        {/* Header Section */}
        <header style={styles.header}>
          <button onClick={() => navigate("/courses")} style={styles.backBtn}>
            <HiArrowLeft /> Continue Shopping
          </button>
          <h1 style={styles.mainTitle}>Shopping Cart</h1>
          <p style={styles.countText}>{items.length} Courses in Cart</p>
        </header>

        {/* Notifications */}
        {success && <div style={styles.successAlert}><HiCheck /> {success}</div>}
        {error && <div style={styles.errorAlert}><HiX /> {error}</div>}

        <div style={styles.mainGrid}>
          {/* Cart Items List */}
          <section style={styles.itemsSection}>
            {loading ? (
              <div style={styles.skeletonBox}>Loading items...</div>
            ) : items.length === 0 ? (
              <div style={styles.emptyState}>
                <HiShoppingCart size={60} color="#cbd5e1" />
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any courses yet.</p>
                <button style={styles.primaryBtn} onClick={() => navigate("/courses")}>
                  Browse Courses
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} style={styles.cartCard}>
                  <img src={item.course?.imageUrl} alt="" style={styles.courseImg} />
                  <div style={styles.itemDetails}>
                    <h3 style={styles.courseTitle}>{item.course?.title}</h3>
                    <p style={styles.instructor}>By Lumina Instructor</p>
                  </div>
                  <div style={styles.priceSection}>
                    <span style={styles.priceTag}>₹{item.course?.price}</span>
                    <button style={styles.removeBtn} onClick={() => handleRemove(item.id)}>
                      <HiTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>

          {/* Checkout Sidebar */}
          <aside style={styles.sidebar}>
            <div style={styles.summaryCard}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div style={styles.summaryRow}>
                <span>Tax (GST)</span>
                <span>₹0.00</span>
              </div>
              <hr style={styles.divider} />
              <div style={styles.totalRow}>
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button 
                style={{...styles.checkoutBtn, opacity: (!razorpayLoaded || items.length === 0) ? 0.6 : 1}}
                onClick={handleCheckout}
                disabled={!razorpayLoaded || items.length === 0}
              >
                <HiCreditCard /> Checkout Now
              </button>
              <p style={styles.secureText}>🔒 Secure Checkout via Razorpay</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContainer: { backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 20px" },
  contentWrapper: { maxWidth: "1200px", margin: "0 auto" },
  header: { marginBottom: "32px" },
  backBtn: { background: "none", border: "none", color: "#6366f1", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontWeight: 600, marginBottom: "12px" },
  mainTitle: { fontSize: "2.5rem", fontWeight: 800, color: "#1e293b", margin: 0 },
  countText: { color: "#64748b", marginTop: "4px" },
  mainGrid: { display: "grid", gridTemplateColumns: "1fr 350px", gap: "32px", alignItems: "start" },
  
  // Cart Card
  itemsSection: { display: "flex", flexDirection: "column", gap: "16px" },
  cartCard: { 
    display: "flex", backgroundColor: "#fff", borderRadius: "16px", padding: "16px", 
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", alignItems: "center", gap: "20px" 
  },
  courseImg: { width: "140px", height: "90px", borderRadius: "12px", objectFit: "cover" },
  itemDetails: { flex: 1 },
  courseTitle: { margin: "0 0 4px 0", fontSize: "1.1rem", color: "#1e293b" },
  instructor: { color: "#64748b", fontSize: "0.9rem", margin: 0 },
  priceSection: { textAlign: "right", display: "flex", flexDirection: "column", gap: "12px" },
  priceTag: { fontSize: "1.25rem", fontWeight: 700, color: "#1e293b" },
  removeBtn: { background: "#fee2e2", color: "#ef4444", border: "none", padding: "8px", borderRadius: "8px", cursor: "pointer", fontSize: "1.2rem", transition: "0.2s" },

  // Sidebar
  summaryCard: { backgroundColor: "#fff", borderRadius: "20px", padding: "24px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", position: "sticky", top: "20px" },
  summaryTitle: { marginTop: 0, marginBottom: "20px", fontSize: "1.25rem" },
  summaryRow: { display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "#64748b" },
  divider: { border: "none", borderTop: "1px solid #e2e8f0", margin: "16px 0" },
  totalRow: { display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "1.5rem", color: "#1e293b", marginBottom: "24px" },
  checkoutBtn: { width: "100%", padding: "16px", borderRadius: "12px", border: "none", backgroundColor: "#4f46e5", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" },
  secureText: { textAlign: "center", fontSize: "0.8rem", color: "#94a3b8", marginTop: "12px" },

  // Alerts
  successAlert: { backgroundColor: "#dcfce7", color: "#166534", padding: "16px", borderRadius: "12px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" },
  errorAlert: { backgroundColor: "#fee2e2", color: "#991b1b", padding: "16px", borderRadius: "12px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" },
  emptyState: { textAlign: "center", padding: "60px", backgroundColor: "#fff", borderRadius: "20px" },
  primaryBtn: { marginTop: "20px", padding: "12px 24px", borderRadius: "8px", border: "none", backgroundColor: "#4f46e5", color: "#fff", fontWeight: 600, cursor: "pointer" }
};

export default CartPage;