import video from "../assets/food.mp4";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();

  const [caterers, setCaterers] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  // 🔥 FETCH DATA
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/caterers")
      .then((res) => {
        console.log("API DATA:", res.data); // 🔍 DEBUG
        setCaterers(res.data);
      })
      .catch((err) => console.log("API ERROR:", err));
  }, []);

  // 📍 GET USER LOCATION
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log("User Location:", coords);
        setUserLocation(coords);
      },
      (error) => console.log(error)
    );
  };

  // 📏 DISTANCE FUNCTION
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div>
      {/* ================= HERO ================= */}
      <div className="w-full h-screen relative">
        <video
          src={video}
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute w-full h-full bg-black/60"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Homemade Catering <br /> Made Simple
          </h1>

          <p className="text-lg text-gray-200 mt-4 max-w-xl">
            Discover trusted home chefs for weddings, birthdays & events
          </p>

          <div className="mt-8 flex w-full max-w-xl">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-4 rounded-l-xl outline-none text-gray-700"
            />
            <button className="bg-primary px-6 text-white rounded-r-xl">
              Search
            </button>
          </div>

          <button
            onClick={getLocation}
            className="mt-4 bg-secondary px-6 py-2 text-white rounded-xl"
          >
            Use My Location 📍
          </button>
        </div>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap gap-4 justify-center my-10">
        <select
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="p-3 rounded-lg shadow"
        >
          <option value="">All</option>
          <option>North Indian</option>
          <option>South Indian</option>
          <option>Chinese</option>
          <option>Multi Cuisine</option>
        </select>
      </div>

      {/* ================= CATERERS ================= */}
      <div className="bg-gray-100 py-16 px-10">
        <h2 className="text-4xl font-bold text-center mb-10">
          Caterers Near You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caterers.length === 0 ? (
            <p className="col-span-3 text-center">
              No data found 😢 (Check backend/API)
            </p>
          ) : (
            caterers
              // ✅ CUISINE FILTER (FIXED)
              .filter((item) =>
                selectedCuisine
                  ? item.cuisine
                      .toLowerCase()
                      .includes(selectedCuisine.toLowerCase())
                  : true
              )

              .map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/caterer/${item._id}`)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
                >
                  <img
                    src={item.image}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-gray-500">{item.cuisine}</p>

                    <div className="flex justify-between mt-3">
                      <span className="text-yellow-500">
                        ⭐ {item.rating}
                      </span>
                      <span className="font-semibold text-primary">
                        ₹{item.price}/plate
                      </span>
                    </div>

                    {/* 📍 DISTANCE SHOW */}
                    {userLocation && (
                      <p className="text-sm text-gray-500 mt-1">
                        {getDistance(
                          userLocation.lat,
                          userLocation.lng,
                          item.location.lat,
                          item.location.lng
                        ).toFixed(2)}{" "}
                        km away
                      </p>
                    )}

                    <button className="mt-4 w-full bg-primary text-white py-2 rounded-lg">
                      View Menu
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}