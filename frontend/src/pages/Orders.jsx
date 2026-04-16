import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) { navigate("/login"); return; }

    axios
      .get("http://localhost:5000/api/orders/my", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [user]);

  const statusColors = {
    pending:   "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    preparing: "bg-orange-100 text-orange-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-xl">
      Loading orders...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-2">My Orders 🧾</h2>
        <p className="text-gray-500 mb-8">Track all your past and current catering bookings</p>

        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-xl">No orders yet! Browse caterers and place your first order.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-primary text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
            >
              Find Caterers
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    {order.caterer?.image && (
                      <img
                        src={order.caterer.image}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-bold">{order.caterer?.name}</h3>
                      <p className="text-gray-500 text-sm">{order.caterer?.cuisine}</p>
                    </div>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full font-semibold capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 border-t pt-4">
                  <div>
                    <p className="font-semibold text-gray-800">Event Date</p>
                    <p>{new Date(order.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Guests</p>
                    <p>{order.guestCount} people</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Total Amount</p>
                    <p className="text-primary font-bold text-base">₹{order.totalAmount}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Payment</p>
                    <p className="capitalize">{order.paymentStatus}</p>
                  </div>
                </div>

                {/* Items */}
                {order.items?.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <p className="font-semibold text-gray-700 mb-2">Items Ordered</p>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {item.name} × {item.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-4">
                  Ordered on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}