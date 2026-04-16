import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CatererDetails from "./pages/CatererDetails";
import Orders from "./pages/Orders";          // ← ADD

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/caterer/:id" element={<CatererDetails />} />
        <Route path="/orders" element={<Orders />} />   {/* ← ADD */}
      </Routes>
    </Router>
  );
}