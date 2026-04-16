import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("cater-user"));

      if (!user || !user.catererId) {
        alert("Please login as caterer properly");
        return;
      }

      console.log("Using catererId:", user.catererId);

      const res = await axios.get(
        `http://localhost:5000/api/caterer/orders/${user.catererId}`
      );

      console.log("Orders received:", res.data);

      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/caterer/order/${orderId}/status`,
        { status }
      );

      alert("Status updated");
      fetchOrders();
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Incoming Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white p-4 mt-3 rounded shadow">
            
            <p>
              <strong>Customer:</strong> {order.user?.name || "N/A"}
            </p>

            <p>
              <strong>Items:</strong>{" "}
              {order.items.map((i) => i.name).join(", ")}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <div className="flex gap-2 mt-3">
              {["confirmed", "preparing", "delivered"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(order._id, s)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}