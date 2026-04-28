import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  const data = [
  { name: "Orders", value: stats.totalOrders },
  { name: "Revenue", value: stats.totalRevenue },
  { name: "Pending", value: stats.pendingOrders },
];

  const fetchStats = async () => {
    const user = JSON.parse(localStorage.getItem("cater-user"));

    if (!user?.catererId) return;

    const res = await axios.get(
      `${API_URL}/api/caterers/dashboard/${user.catererId}`
    );

    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      
      <div className="bg-white p-6 rounded shadow">
        <h2>Total Orders</h2>
        <p className="text-2xl font-bold">{stats.totalOrders}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2>Total Revenue</h2>
        <p className="text-2xl font-bold">₹{stats.totalRevenue}</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2>Pending Orders</h2>
        <p className="text-2xl font-bold">{stats.pendingOrders}</p>
      </div>
      <div className="col-span-3 bg-white p-6 rounded shadow">
  <h2 className="text-lg font-semibold mb-4">Analytics</h2>

  <ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" radius={[10, 10, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
</div>
    </div>
  );
}