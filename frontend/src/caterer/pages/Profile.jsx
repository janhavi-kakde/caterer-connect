import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("cater-user"));

      if (!user) return;

      const res = await axios.get(
        `${API_URL}/api/caterer/profile/${user._id}`
      );

      setProfile(res.data);
    } catch (err) {
      console.log("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-6">No profile found</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Caterer Profile</h2>

      <div className="space-y-3">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Role:</strong> {profile.role}</p>
      </div>
    </div>
  );
}