import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-10 py-4 bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-primary tracking-wide">
        Cater<span className="text-dark">Connect</span>
      </h1>

      {/* Links */}
      <div className="flex items-center gap-6 text-lg font-medium">
        <Link to="/" className="hover:text-primary transition">Home</Link>

        {user ? (
          // ✅ LOGGED IN STATE
          <>
            <Link to="/orders" className="hover:text-primary transition">
              My Orders
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-base">Hi, {user.name.split(" ")[0]} 👋</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:scale-105 transition text-base"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          // ✅ LOGGED OUT STATE
          <>
            <Link to="/login" className="hover:text-primary transition">Login</Link>
            <Link
              to="/register"
              className="bg-primary text-white px-4 py-2 rounded-xl hover:scale-105 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}