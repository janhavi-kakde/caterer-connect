import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { API_URL } from "../../config";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user", // ✅ NEW
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/register`,
        form
      );

      // ✅ Auto login
      login(data);

      // ✅ Role-based redirect
      if (data.role === "caterer") {
        navigate("/caterer/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account 🍽️
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Join CaterConnect today
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EXISTING FIELDS */}
          {[
            { label: "Full Name", key: "name", type: "text", placeholder: "John Doe" },
            { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
            { label: "Phone", key: "phone", type: "tel", placeholder: "9876543210" },
            { label: "Password", key: "password", type: "password", placeholder: "••••••••" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                required
                placeholder={placeholder}
                className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary"
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
              />
            </div>
          ))}

          {/* ✅ NEW ROLE SELECT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Register As
            </label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              className="w-full border border-gray-300 p-3 rounded-xl"
            >
              <option value="user">User</option>
              <option value="caterer">Caterer</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}