// src/pages/CartPage.tsx
import React, { useEffect, useState } from "react";
import { getCart, removeCartItem } from "../../../src/api/cartService";
import { createOrder, verifyPayment } from "../../../src/api/paymentService";

const demoUserId = "demoUser";

// TypeScript declaration for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

export const CartPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      alert("Payment system could not be loaded. Please refresh the page.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await getCart(demoUserId);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCart();
  }, []);

  const handleRemove = async (id: number) => {
    try {
      await removeCartItem(id);
      await loadCart();
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  const total = items.reduce((sum, it) => sum + (it.course?.price ?? 0), 0);

  const handleCheckout = async () => {
    try {
      if (total <= 0) {
        alert("Cart is empty");
        return;
      }

      if (!razorpayLoaded) {
        alert("Payment system is still loading. Please wait...");
        return;
      }

      if (items.length === 0) {
        alert("No items in cart");
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
            // Process each course in cart
            for (const item of items) {
              await verifyPayment({
                userId: demoUserId,
                amount: item.course?.price ?? 0,
                courseId: item.courseId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
              });
            }

            alert("Payment Successful! 🎉 You are enrolled in all courses!");
            
            // Clear cart after successful payment
            for (const item of items) {
              await removeCartItem(item.id);
            }
            
            await loadCart();
          } catch (err) {
            console.error("Verification error:", err);
            alert("Payment verification failed!");
          }
        },

        prefill: {
          name: "Demo User",
          email: "demo@example.com",
          contact: "9999999999"
        },

        theme: { color: "#0f172a" },

        modal: {
          ondismiss: function() {
            console.log("Payment cancelled by user");
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response: any) {
        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}`);
      });
      
      razorpay.open();

    } catch (err: any) {
      console.error("Checkout error:", err);
      const errorMessage = err?.response?.data?.error || err?.message || "Unknown error";
      alert(`Payment could not start: ${errorMessage}`);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1>My Cart</h1>

      {loading && <p>Loading...</p>}
      {!loading && items.length === 0 && <p>Your cart is empty.</p>}

      <div style={styles.grid}>
        <div style={styles.left}>
          {items.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <img src={item.course?.imageUrl} alt={item.course?.title} style={styles.image} />

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{item.course?.title}</h3>
                <p style={{ margin: "6px 0" }}>{item.course?.instructor?.name ?? ""}</p>
                <p style={{ fontWeight: 700 }}>₹ {item.course?.price?.toFixed(2)}</p>
              </div>

              <button style={styles.removeBtn} onClick={() => handleRemove(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <aside style={styles.right}>
          <div style={styles.summary}>
            <h3>Order Summary</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal</span>
              <strong>₹ {total.toFixed(2)}</strong>
            </div>

            <button 
              style={{
                ...styles.checkoutBtn,
                opacity: !razorpayLoaded ? 0.6 : 1,
                cursor: !razorpayLoaded ? "not-allowed" : "pointer"
              }} 
              onClick={handleCheckout}
              disabled={!razorpayLoaded}
            >
              {razorpayLoaded ? "Checkout" : "Loading Payment..."}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: { padding: 40, maxWidth: 1200, margin: "0 auto" },
  grid: { display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 },
  left: {},
  right: {},
  cartItem: {
    display: "flex",
    alignItems: "center",
    padding: 16,
    border: "1px solid #eee",
    borderRadius: 8,
    gap: 16,
    marginBottom: 12,
  },
  image: { width: 140, height: 80, objectFit: "cover", borderRadius: 6 },
  removeBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  summary: {
    padding: 16,
    border: "1px solid #eee",
    borderRadius: 8,
    position: "sticky",
    top: 100,
  },
  checkoutBtn: {
    marginTop: 12,
    width: "100%",
    padding: "12px 16px",
    background: "#0f172a",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default CartPage;