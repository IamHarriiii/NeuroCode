// 📁 frontend/src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
      axios.get('http://localhost:8000/api/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setProfile(res.data);
        setForm(res.data);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, []);

  const handleSave = async () => {
    setStatus("Saving...");
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    try {
      await axios.put('http://localhost:8000/api/profile/', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus("Saved successfully");
      setProfile(form);
      setEditMode(false);
    } catch {
      setStatus("Error saving changes");
    }
  };

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (!profile) return <p className="text-center">Failed to load profile.</p>;

  return (
    <div className="p-4 shadow bg-white rounded">
      <h2 className="text-xl font-bold mb-2">Profile</h2>
      {editMode ? (
        <>
          <input className="input mb-2" value={form.first_name} onChange={e => setForm({ ...form, first_name: e.target.value })} />
          <input className="input mb-2" value={form.last_name} onChange={e => setForm({ ...form, last_name: e.target.value })} />
          <input className="input mb-2" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
          <button className="btn" onClick={handleSave}>Save</button>
          <button className="btn ml-2" onClick={() => setEditMode(false)}>Cancel</button>
          {status && <p className="mt-2 text-sm">{status}</p>}
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {profile.username && <p><strong>Username:</strong> {profile.username}</p>}
          <button className="btn mt-3" onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
}