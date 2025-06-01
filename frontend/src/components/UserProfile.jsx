// 📁 frontend/src/components/UserProfile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("");

  // Load user profile
  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    if (token) {
      axios
        .get("http://localhost:8000/api/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProfile(res.data);
          setForm(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleSave = async () => {
    setStatus("Saving...");
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    try {
      await axios.put("http://localhost:8000/api/profile/", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus("Saved successfully");
      setProfile(form);
      setEditMode(false);
    } catch {
      setStatus("Error saving changes");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-700 dark:text-gray-300">Loading profile...</p>
    );
  if (!profile)
    return (
      <p className="text-center text-red-500 dark:text-red-400">Failed to load profile.</p>
    );

  return (
    <div className="p-6 shadow bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">User Profile</h2>

      {/* Edit Mode */}
      {editMode ? (
        <>
          <div className="space-y-4 mb-4">
            <input
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            />
            <input
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            />
            <input
              name="username"
              placeholder="Username"
              value={form.username || ""}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Save & Cancel Buttons */}
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded transition-colors mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded transition-colors"
          >
            Cancel
          </button>

          {/* Status Message */}
          {status && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{status}</p>
          )}
        </>
      ) : (
        // View Mode
        <>
          <div className="mb-4 space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="font-medium">Name:</strong> {profile.first_name} {profile.last_name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="font-medium">Email:</strong> {profile.email}
            </p>
            {profile.username && (
              <p className="text-gray-700 dark:text-gray-300">
                <strong className="font-medium">Username:</strong> {profile.username}
              </p>
            )}
          </div>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded transition-colors"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfile;