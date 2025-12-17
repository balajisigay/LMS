// src/pages/CartPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeCartItem } from "../../../src/api/cartService";
import { createOrder, verifyPayment } from "../../../src/api/paymentService";
import { HiTrash, HiShoppingCart, HiCheck, HiX } from "react-icons/hi";

const demoUserId = "demoUser";

// TypeScript declaration for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      setError("Payment system could not be loaded. Please refresh the page.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const loadCart = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getCart(demoUserId);
      setItems(res.data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCart();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      setError("");
      await removeCartItem(id);
      await loadCart();
      setSuccess("Item removed from cart");
      setTimeout(() => setSuccess(""), 2000);
    } catch (err: any) {
      console.error("Remove failed", err);
      setError(err?.message || "Failed to remove item");
    }
  };

  const total = items.reduce((sum, it) => sum + (it.course?.price ?? 0), 0);

  const handleCheckout = async () => {
    try {
      setError("");
      setSuccess("");

      if (total <= 0 || items.length === 0) {
        setError("Your cart is empty");
        return;
      }

      if (!razorpayLoaded) {
        setError("Payment system is still loading. Please wait...");
        return;
      }

      const amountInt = Math.round(total);

      // Step 1 — create order
      const res = await createOrder(amountInt);
      const { orderId, key } = res.data;

      const options = {
        key,
        amount: amountInt * 100,
        currency: "INR",
        name: "Lumina LMS",
        description: "Course Purchase",
        order_id: orderId,

        handler: async function (response: any) {
          try {
            const enrolledCourses: number[] = [];

            for (const item of items) {
              await verifyPayment({
                userId: demoUserId,
                amount: item.course?.price ?? 0,
                courseId: item.courseId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              });
              enrolledCourses.push(item.courseId);
            }

            // Clear cart after successful payment
            for (const item of items) {
              await removeCartItem(item.id);
            }

            if (enrolledCourses.length > 0) {
              setSuccess(
                `Payment Successful! You are enrolled in ${enrolledCourses.length} course(s).`
              );
              setTimeout(() => navigate(`/course/${enrolledCourses[0]}`), 1500);
            } else {
              setSuccess("Payment Successful!");
              await loadCart();
            }
          } catch (err) {
            console.error("Verification error:", err);
            setError("Payment verification failed!");
          }
        },

        prefill: {
          name: "Demo User",
          email: "demo@example.com",
          contact: "9999999999",
        },

        theme: { color: "#0f172a" },

        modal: {
          ondismiss: function () {
            console.log("Payment cancelled by user");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        setError(`Payment failed: ${response.error.description}`);
      });

      razorpay.open();
    } catch (err: any) {
      console.error("Checkout error:", err);
      const errorMessage =
        err?.response?.data?.error || err?.message || "Unknown error";
      setError(`Payment could not start: ${errorMessage}`);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        {/* Success/Error Notifications */}
        {success && (
          <div style={styles.successAlert}>
            <HiCheck style={styles.alertIcon} />
            {success}
          </div>
        )}
        {error && (
          <div style={styles.errorAlert}>
            <HiX style={styles.alertIcon} />
            {error}
          </div>
        )}

        {/* Main Cart Card */}
        <div style={styles.cartCard}>
          {/* Header / Cover */}
          <div style={styles.coverPhoto}>
            <div style={styles.coverGradient}></div>
            <div style={styles.headerContent}>
              <div style={styles.headerIconWrap}>
                <HiShoppingCart size={26} color="white" />
              </div>
              <div>
                <h1 style={styles.title}>My Cart</h1>
                <p style={styles.subtitle}>
                  Review your courses and complete your enrollment
                </p>
              </div>
            </div>
          </div>

          {/* Cart Content */}
          <div style={styles.cartContent}>
            <div style={styles.grid}>
              {/* Left: Items */}
              <div style={styles.left}>
                {loading && (
                  <div style={styles.loadingBox}>
                    <div style={styles.spinner}></div>
                    <p style={styles.loadingText}>Loading cart...</p>
                  </div>
                )}

                {!loading && items.length === 0 && (
                  <div style={styles.emptyState}>
                    <HiShoppingCart size={40} color="#9ca3af" />
                    <h2 style={styles.emptyTitle}>Your cart is empty</h2>
                    <p style={styles.emptyText}>
                      Browse courses and add them to your cart to see them here.
                    </p>
                    <button
                      style={styles.browseButton}
                      onClick={() => navigate("/courses")}
                    >
                      Explore Courses
                    </button>
                  </div>
                )}

                {!loading &&
                  items.length > 0 &&
                  items.map((item) => (
                    <div key={item.id} style={styles.cartItem}>
                      <div style={styles.thumbnailWrapper}>
                        <img
                          src={item.course?.imageUrl}
                          alt={item.course?.title}
                          style={styles.image}
                        />
                      </div>

                      <div style={styles.itemInfo}>
                        <h3 style={styles.courseTitle}>
                          {item.course?.title}
                        </h3>
                        <p style={styles.instructor}>
                          {item.course?.instructor?.name ?? ""}
                        </p>
                        <p style={styles.price}>
                          ₹ {item.course?.price?.toFixed(2)}
                        </p>
                      </div>

                      <button
                        style={styles.removeBtn}
                        onClick={() => handleRemove(item.id)}
                      >
                        <HiTrash size={16} />
                      </button>
                    </div>
                  ))}
              </div>

              {/* Right: Summary */}
              <aside style={styles.right}>
                <div style={styles.summary}>
                  <h3 style={styles.summaryTitle}>Order Summary</h3>

                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Courses</span>
                    <span style={styles.summaryValue}>{items.length}</span>
                  </div>

                  <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Subtotal</span>
                    <strong style={styles.summaryTotal}>
                      ₹ {total.toFixed(2)}
                    </strong>
                  </div>

                  <p style={styles.summaryNote}>
                    Secure payments powered by Razorpay. Instant course access
                    after successful payment.
                  </p>

                  <button
                    style={{
                      ...styles.checkoutBtn,
                      opacity: !razorpayLoaded || items.length === 0 ? 0.6 : 1,
                      cursor:
                        !razorpayLoaded || items.length === 0
                          ? "not-allowed"
                          : "pointer",
                    }}
                    onClick={handleCheckout}
                    disabled={!razorpayLoaded || items.length === 0}
                  >
                    {razorpayLoaded
                      ? items.length === 0
                        ? "Cart is Empty"
                        : "Proceed to Checkout"
                      : "Loading Payment..."}
                  </button>

                  <p style={styles.footerText}>
                    Need help? Contact support for any payment issues.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
  },
  contentWrapper: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  successAlert: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    padding: "16px 24px",
    borderRadius: "16px",
    marginBottom: "24px",
    fontSize: "15px",
    fontWeight: 500,
    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.3)",
  },
  errorAlert: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    padding: "16px 24px",
    borderRadius: "16px",
    marginBottom: "24px",
    fontSize: "15px",
    fontWeight: 500,
    boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
  },
  alertIcon: {
    width: "20px",
    height: "20px",
  },
  cartCard: {
    background: "white",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  },
  coverPhoto: {
    height: "160px",
    position: "relative",
    overflow: "hidden",
  },
  coverGradient: {
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  },
  headerContent: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "flex-end",
    gap: "16px",
    padding: "24px 32px",
    color: "white",
  },
  headerIconWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    background: "rgba(15, 23, 42, 0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.4)",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
  },
  subtitle: {
    margin: 0,
    marginTop: "4px",
    fontSize: "14px",
    opacity: 0.9,
  },
  cartContent: {
    padding: "24px 32px 32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
    gap: 24,
    alignItems: "flex-start",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  right: {},
  loadingBox: {
    padding: "32px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(148, 163, 184, 0.3)",
    borderTop: "4px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    fontSize: "15px",
    color: "#6b7280",
  },
  emptyState: {
    padding: "40px 24px",
    borderRadius: "18px",
    border: "2px dashed #e5e7eb",
    background: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    textAlign: "center",
  },
  emptyTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
    color: "#111827",
  },
  emptyText: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
    maxWidth: "340px",
  },
  browseButton: {
    marginTop: 8,
    padding: "10px 18px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    fontWeight: 600,
    fontSize: "14px",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    padding: 16,
    background: "#f9fafb",
    borderRadius: 16,
    border: "2px solid #f3f4f6",
    gap: 16,
  },
  thumbnailWrapper: {
    width: 120,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    background: "#e5e7eb",
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  itemInfo: {
    flex: 1,
    minWidth: 0,
  },
  courseTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    color: "#111827",
  },
  instructor: {
    margin: "4px 0 0 0",
    fontSize: "14px",
    color: "#6b7280",
  },
  price: {
    margin: "8px 0 0 0",
    fontSize: "15px",
    fontWeight: 700,
    color: "#111827",
  },
  removeBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    border: "2px solid #fee2e2",
    background: "#fef2f2",
    color: "#ef4444",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  summary: {
    padding: 20,
    background: "#111827",
    borderRadius: 18,
    color: "white",
    position: "sticky",
    top: 80,
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.6)",
  },
  summaryTitle: {
    margin: 0,
    marginBottom: 16,
    fontSize: "18px",
    fontWeight: 700,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: "14px",
    color: "#9ca3af",
  },
  summaryValue: {
    fontSize: "14px",
    fontWeight: 600,
  },
  summaryTotal: {
    fontSize: "18px",
    fontWeight: 700,
  },
  summaryNote: {
    marginTop: 12,
    marginBottom: 0,
    fontSize: "12px",
    color: "#9ca3af",
    lineHeight: 1.5,
  },
  checkoutBtn: {
    marginTop: 16,
    width: "100%",
    padding: "12px 16px",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "white",
    border: "none",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "15px",
  },
  footerText: {
    marginTop: 12,
    fontSize: "11px",
    color: "#9ca3af",
    textAlign: "center",
  },
};

// keyframes + button hover like ProfilePage
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  button:hover {
    transform: translateY(-2px);
  }

  button:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);

export default CartPage;
