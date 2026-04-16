import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CatererDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/caterers/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // 🛒 ADD TO CART
  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  const bookOrder = async () => {
  if (cart.length === 0) return alert("Add at least one item to cart!");
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    await axios.post(
      "http://localhost:5000/api/orders",
      {
        caterer: id,
        items: cart,
        totalAmount: cart.length * data.price,
        eventDate: new Date(),
        guestCount: 1,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Order placed successfully! 🎉");
    setCart([]);
  } catch (err) {
    alert(err.response?.data?.message || "Booking failed");
  }
};
  if (!data) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">

      {/* IMAGE */}
      <img
        src={data.image}
        className="w-full h-80 object-cover rounded-2xl"
      />

      {/* INFO */}
      <h1 className="text-3xl font-bold mt-5">{data.name}</h1>
      <p className="text-gray-500">{data.cuisine}</p>
      <p className="mt-2">⭐ {data.rating}</p>

      {/* MENU */}
      <h2 className="text-2xl mt-8 mb-4">Menu 🍽️</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {data.menu.map((item, index) => (
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
      <button onClick={bookOrder} className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg">
        Book Now 🚀
      </button>
    </div>
  );
}