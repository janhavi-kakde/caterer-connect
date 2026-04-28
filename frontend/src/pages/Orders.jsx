import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get(
        `${API_URL}/api/orders/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,   // ✅ FIXED
          },
        }
      );

      setOrders(res.data);
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">My Orders 🧾</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white p-4 mb-4 rounded shadow">
            <p><strong>Caterer:</strong> {order.caterer?.name}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
}