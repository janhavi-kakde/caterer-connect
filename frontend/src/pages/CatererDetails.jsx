import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
export default function CatererDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);

  // PAYMENT STATES
  const [showPayment, setShowPayment] = useState(false);
  const user = JSON.parse(localStorage.getItem("cater-user"));

useEffect(() => {
  axios
    .get(`${API_URL}/api/caterers/${id}`)
    .then((res) => setData(res.data))
    .catch((err) => console.log(err));
}, [id]);

  // ADD TO CART
  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // STEP 1: OPEN PAYMENT MODAL
  const bookOrder = () => {
    if (cart.length === 0) {
      alert("Add at least one item to cart!");
      return;
    }

    setShowPayment(true);
  };

  // STEP 2: PLACE ORDER AFTER PAYMENT SELECTION
  const placeOrder = async (method) => {
    const token = localStorage.getItem("token");

    console.log("🔑 Token:", token);

    if (!token || token === "undefined" || token === "null") {
      alert("Please login first to place an order.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/orders`,
        {
          caterer: id,
          items: cart.map((item) => ({
            name: item,
            quantity: 1,
            price: 100, // default price (you can improve later)
          })),

          totalAmount: cart.length * 100,
          eventDate: new Date(),
          guestCount: 1,

          // ✅ NEW PAYMENT FIELDS
          paymentMethod: method,
          paymentStatus: method === "cod" ? "unpaid" : "paid",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Order response:", response.data);

      alert("Order placed successfully 🎉");

      setCart([]);
      setShowPayment(false);
    } catch (err) {
      console.error("❌ Booking error:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("cater-user");
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert("Booking failed. Please try again.");
      }
    }
  };

  if (!data) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      {/* CATERER INFO */}
      <img
        src={data.image}
        className="w-full h-80 object-cover rounded-2xl"
        alt={data.name}
      />

      <h1 className="text-3xl font-bold mt-5">{data.name}</h1>
      <p className="text-gray-500">{data.cuisine}</p>
      <p className="mt-2">⭐ {data.rating}</p>

      {/* MENU */}
      <h2 className="text-2xl mt-8 mb-4">Menu 🍽️</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {data.menu?.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
          >
            <span>{item}</span>

            <button
              onClick={() => addToCart(item)}
              className="bg-primary text-white px-4 py-1 rounded"
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* CART */}
      <h2 className="text-2xl mt-8">Cart 🛒</h2>

      {cart.length === 0 ? (
        <p>No items added</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {cart.map((item, i) => (
            <li key={i} className="bg-gray-200 p-2 rounded">
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* BOOK BUTTON */}
      <button
        onClick={bookOrder}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Book Now 🚀
      </button>

      {/* PAYMENT MODAL */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="text-xl font-bold mb-4">
              Choose Payment Method
            </h2>

            <button
              onClick={() => placeOrder("online")}
              className="w-full bg-blue-600 text-white py-2 rounded mb-2"
            >
              Pay Online 💳 
            </button>

            <button
              onClick={() => placeOrder("cod")}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              Cash on Delivery 💵
            </button>

            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-2 text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}