// src/pages/CartPage.tsx
import React, { useEffect, useState } from "react";
import { getCart, removeCartItem } from "../../../src/api/cartService";
import { createOrder, verifyPayment } from "../../../src/api/paymentService";

const demoUserId = "demoUser"; // replace with real logged-in user ID

export const CartPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  // -------------------------------
  // RAZORPAY CHECKOUT
  // -------------------------------
const handleCheckout = async () => {
  try {
    if (total <= 0) return alert("Cart is empty");

    const amountInt = Math.round(total); // FIX FLOAT ISSUE

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

      handler: async function (response) {
        // Step 2 — verify on backend
        const verifyRes = await verifyPayment({
          userId: demoUserId,
          amount: amountInt,
          courseId: items[0]?.courseId,

          RazorpayPaymentId: response.razorpay_payment_id,
          RazorpayOrderId: response.razorpay_order_id,
          RazorpaySignature: response.razorpay_signature
        });

        if (verifyRes.data.success) {
          alert("Payment Successful! 🎉 You are enrolled!");
          loadCart();
        } else {
          alert("Payment verification failed!");
        }
      },

      prefill: {
        name: "Demo User",
        email: "demo@example.com",
        contact: "9999999999"
      },

      theme: { color: "#0f172a" }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (err) {
    console.error("Checkout error", err);
    alert("Payment could not start");
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

            <button style={styles.checkoutBtn} onClick={handleCheckout}>
              Checkout
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
