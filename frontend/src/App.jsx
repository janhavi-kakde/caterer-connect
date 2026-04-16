import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CatererDetails from "./pages/CatererDetails";
import CatererLayout from "./caterer/layout/CatererLayout";
import Dashboard from "./caterer/pages/Dashboard";
import MenuManager from "./caterer/pages/MenuManager";
import Orders from "./caterer/pages/Orders";

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
        <Route path="/caterer" element={<CatererLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="menu" element={<MenuManager />} />
  <Route path="orders" element={<Orders />} />
</Route>
      </Routes>
    </Router>
  );
}