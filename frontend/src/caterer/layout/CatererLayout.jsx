import { Outlet, Link } from "react-router-dom";

export default function CatererLayout() {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Caterer Panel</h2>

        <nav className="flex flex-col gap-4">
          <Link to="/caterer/dashboard">Dashboard</Link>
          <Link to="/caterer/menu">Menu</Link>
          <Link to="/caterer/orders">Orders</Link>
          <Link to="/caterer/profile">Profile</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}