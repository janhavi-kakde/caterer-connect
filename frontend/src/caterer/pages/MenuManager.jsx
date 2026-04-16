import { useState } from "react";
import axios from "axios";

export default function MenuManager() {
  const [menu, setMenu] = useState([]);
  const [item, setItem] = useState("");

  const addItem = () => {
    if (!item) return;
    setMenu([...menu, item]);
    setItem("");
  };

  const saveMenu = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("cater-user"));

      await axios.patch(
        `http://localhost:5000/api/caterers/menu/${user.catererId}`,
        { menu }
      );

      alert("Menu saved!");
    } catch (err) {
      console.log(err);
      alert("Failed to save menu");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Manage Menu</h1>

      <input
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Add item"
        className="border p-2 mr-2"
      />

      <button
        onClick={addItem}
        className="bg-blue-500 text-white px-3 py-1"
      >
        Add
      </button>

      <button onClick={saveMenu} className="bg-green-500 text-white px-3 py-1 mt-2">
  Save Menu
</button>

      <ul className="mt-4">
        {menu.map((m, i) => (
          <li key={i} className="bg-white p-2 mt-2">
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}