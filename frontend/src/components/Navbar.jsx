import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-10 py-4 bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-primary tracking-wide">
        Cater<span className="text-dark">Connect</span>
      </h1>

      {/* Links */}
      <div className="flex items-center gap-8 text-lg font-medium">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <Link to="/login" className="hover:text-primary transition">Login</Link>
        <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-xl hover:scale-105 transition">
          Register
        </Link>
      </div>
    </div>
  );
}