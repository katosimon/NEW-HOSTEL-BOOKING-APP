import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HostelAdminDashboard = () => {
  // Load hostels from localStorage or start empty
  const [hostels, setHostels] = useState(() => {
    const saved = localStorage.getItem("hostels");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [newHostel, setNewHostel] = useState({
    name: "",
    location: "",
    description: "",
    gender: "",
    rooms: { single: 0, double: 0 },
    amenities: { wifi: false, laundry: false, transportation: false },
    priceSingle: "",
    priceDouble: "",
    contactPhone: "",
    photo: null,
  });

  const [editingHostelId, setEditingHostelId] = useState(null);
  const [deleteHostelId, setDeleteHostelId] = useState(null);

  // Persist hostels to localStorage
  useEffect(() => {
    localStorage.setItem("hostels", JSON.stringify(hostels));
  }, [hostels]);

  // Filtered hostels
  const filteredHostels = hostels.filter((h) =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Input handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in newHostel.amenities) {
      setNewHostel((prev) => ({
        ...prev,
        amenities: { ...prev.amenities, [name]: checked },
      }));
    } else if (name === "single" || name === "double") {
      setNewHostel((prev) => ({
        ...prev,
        rooms: { ...prev.rooms, [name]: +value },
      }));
    } else {
      setNewHostel((prev) => ({
        ...prev,
        [name]: type === "number" ? +value : value,
      }));
    }
  };

  // Photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewHostel((prev) => ({ ...prev, photo: URL.createObjectURL(file) }));
    }
  };

  // Save (Add or Edit)
  const saveHostel = () => {
    if (!newHostel.name.trim()) return;

    const totalRooms = newHostel.rooms.single + newHostel.rooms.double;

    const hostelData = {
      ...newHostel,
      totalRooms,
      image: newHostel.photo || "https://via.placeholder.com/80x80?text=Hostel",
    };

    if (editingHostelId) {
      setHostels((prev) =>
        prev.map((h) => (h.id === editingHostelId ? { ...h, ...hostelData } : h))
      );
      setEditingHostelId(null);
    } else {
      const id = hostels.length ? hostels[hostels.length - 1].id + 1 : 1;
      setHostels([...hostels, { id, ...hostelData }]);
    }

    // Reset form
    setNewHostel({
      name: "",
      location: "",
      description: "",
      gender: "",
      rooms: { single: 0, double: 0 },
      amenities: { wifi: false, laundry: false, transportation: false },
      priceSingle: "",
      priceDouble: "",
      contactPhone: "",
      photo: null,
    });
  };

  // Edit hostel
  const editHostel = (hostel) => {
    setEditingHostelId(hostel.id);
    setNewHostel({ ...hostel });
  };

  // Delete hostel
  const deleteHostel = () => {
    setHostels(hostels.filter((h) => h.id !== deleteHostelId));
    setDeleteHostelId(null);
  };

  return (
    <div style={{ display: "flex", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: 220,
          backgroundColor: "#dbe0f7",
          padding: "20px 10px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ fontWeight: "bold", marginBottom: 30 }}>HostelAdmin</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
          {[
            { name: "Dashboard", path: "/dashboard", icon: "🏠" },
            { name: "Hostels", path: "/hostels", icon: "🏢" },
            { name: "Tenants", path: "/tenants", icon: "👥" },
            { name: "Bookings", path: "/bookings", icon: "📅" },
            { name: "Support", path: "/contact", icon: "🛠️" },
          ].map(({ name, path, icon }) => {
            const isActive = window.location.pathname === path;
            return (
              <li key={name} style={{ marginBottom: 16 }}>
                <Link
                  to={path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 8,
                    fontWeight: isActive ? "bold" : "normal",
                    backgroundColor: isActive ? "#1a1f2e" : "transparent",
                    color: isActive ? "white" : "black",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <span>{icon}</span>
                  <span>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: 24, padding: 16, backgroundColor: "#f0f4fc" }}>
        <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, fontWeight: "bold" }}>Dashboard</h1>
            <p style={{ marginTop: 2, color: "#666" }}>Manage your hostels and accommodations</p>
          </div>
        </header>
{/* Summary Cards */}
<section
  style={{
    display: "flex",
    gap: 16,
    marginBottom: 24,
    flexWrap: "wrap",
  }}
>
  {[
    { label: "Total Hostels", value: hostels.length, icon: "🏢", bg: "#ddeaff" },
    {
      label: "Total Rooms",
      value: hostels.reduce((sum, h) => sum + h.rooms.single + h.rooms.double, 0),
      icon: "🚪",
      bg: "#dff7f0",
    },
    { label: "Active Bookings", value: 0, icon: "📅", bg: "#fff1de" }, // You can connect to booking data later
    { label: "Total Tenants", value: 0, icon: "👥", bg: "#e7d9ff" }, // You can connect to tenant data later
  ].map(({ label, value, icon, bg }) => (
    <div
      key={label}
      style={{
        flex: "1 1 180px",
        backgroundColor: bg,
        padding: "16px 24px",
        borderRadius: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ fontWeight: "bold", fontSize: 24 }}>{value}</div>
        <small style={{ color: "#666" }}>{label}</small>
      </div>
      <div style={{ fontSize: 28 }}>{icon}</div>
    </div>
  ))}
</section>

        {/* Search */}
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search hostels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc", width: "100%" }}
          />
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {/* Hostel List */}
          <div style={{ flex: 3, backgroundColor: "#fff", padding: 16, borderRadius: 12 }}>
            {filteredHostels.length === 0 && <p>No hostels found.</p>}
            {filteredHostels.map((hostel) => (
              <div
                key={hostel.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  border: "1px solid #e0e0e0",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 16,
                }}
              >
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover" }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, marginBottom: 4, fontWeight: "bold" }}>{hostel.name}</h3>
                  <small style={{ color: "#555" }}>{hostel.location}</small>
                  <p style={{ fontSize: 14, margin: 4, color: "#666" }}>{hostel.description}</p>
                  <div style={{ fontSize: 14, marginTop: 4, color: "#666" }}>
                    <span style={{ marginRight: 16 }}>🛏️ Single: {hostel.rooms.single} @ Ugx {hostel.priceSingle}</span>
                    <span>🛏️ Double: {hostel.rooms.double} @ Ugx {hostel.priceDouble}</span>
                  </div>
                  <div style={{ marginTop: 4 }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: "bold",
                        color:
                          hostel.gender === "Male"
                            ? "blue"
                            : hostel.gender === "Female"
                            ? "deeppink"
                            : "green",
                        backgroundColor:
                          hostel.gender === "Male"
                            ? "#d6e4ff"
                            : hostel.gender === "Female"
                            ? "#ffe6f0"
                            : "#daf6e3",
                      }}
                    >
                      {hostel.gender}
                    </span>
                  </div>
                </div>
                <div style={{ marginLeft: 16, display: "flex", gap: 10 }}>
                  <button onClick={() => editHostel(hostel)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>
                    ✏️
                  </button>
                  <button
                    style={{ background: "none", border: "none", cursor: "pointer", color: "red", fontSize: 18 }}
                    onClick={() => setDeleteHostelId(hostel.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Form */}
          <div style={{ flex: 2, backgroundColor: "#fff", padding: 16, borderRadius: 12 }}>
            <h3 style={{ marginTop: 0 }}>{editingHostelId ? "Edit Hostel" : "Add New Hostel"}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                name="name"
                type="text"
                placeholder="Hostel Name"
                value={newHostel.name}
                onChange={handleInputChange}
                style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
              />
              <input
                name="location"
                type="text"
                placeholder="Location"
                value={newHostel.location}
                onChange={handleInputChange}
                style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newHostel.description}
                onChange={handleInputChange}
                rows={3}
                style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
              />

              <select
                name="gender"
                value={newHostel.gender}
                onChange={handleInputChange}
                style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Mixed">Mixed</option>
              </select>

              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label>Single Rooms</label>
                  <input
                    type="number"
                    min={0}
                    name="single"
                    value={newHostel.rooms.single}
                    onChange={handleInputChange}
                    style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc", width: "100%" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Double Rooms</label>
                  <input
                    type="number"
                    min={0}
                    name="double"
                    value={newHostel.rooms.double}
                    onChange={handleInputChange}
                    style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc", width: "100%" }}
                  />
                </div>
              </div>

              {/* Fixed prices */}
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label>Single Room Price (Ugx)</label>
                  <input
                    type="number"
                    name="priceSingle"
                    value={newHostel.priceSingle}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Double Room Price (Ugx)</label>
                  <input
                    type="number"
                    name="priceDouble"
                    value={newHostel.priceDouble}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
                  />
                </div>
              </div>

              {/* Amenities */}
              <div style={{ fontSize: 14 }}>
                Amenities
                <label style={{ marginLeft: 12 }}>
                  <input type="checkbox" name="wifi" checked={newHostel.amenities.wifi} onChange={handleInputChange} /> Wi-Fi
                </label>
                <label style={{ marginLeft: 12 }}>
                  <input type="checkbox" name="laundry" checked={newHostel.amenities.laundry} onChange={handleInputChange} /> Laundry
                </label>
                <label style={{ marginLeft: 12 }}>
                  <input type="checkbox" name="transportation" checked={newHostel.amenities.transportation} onChange={handleInputChange} /> Transportation
                </label>
              </div>

              <input
                name="contactPhone"
                type="text"
                placeholder="Caretaker phone"
                value={newHostel.contactPhone}
                onChange={handleInputChange}
                style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc" }}
              />

              {/* Photo Upload */}
              <label
                htmlFor="photoUpload"
                style={{
                  border: "2px dashed #ccc",
                  borderRadius: 12,
                  padding: 16,
                  textAlign: "center",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                ⬆ Click to upload or drag and drop
                <input type="file" id="photoUpload" style={{ display: "none" }} onChange={handlePhotoUpload} accept="image/*" />
              </label>

              {newHostel.photo && <img src={newHostel.photo} alt="Preview" style={{ width: "100%", borderRadius: 8, marginTop: 8 }} />}

              <button
                onClick={saveHostel}
                style={{
                  backgroundColor: "#151f35",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {editingHostelId ? "Update Hostel" : "Add Hostel"}
              </button>

              {/* Delete Confirmation */}
              {deleteHostelId && (
                <div
                  style={{
                    marginTop: 24,
                    backgroundColor: "#fff1f0",
                    borderRadius: 8,
                    padding: 16,
                    border: "1px solid #f87373",
                    color: "#d41010",
                  }}
                >
                  <h4>Delete Confirmation</h4>
                  <p>Are you sure you want to delete this hostel?</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={() => setDeleteHostelId(null)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                        flex: 1,
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={deleteHostel}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        border: "none",
                        backgroundColor: "#d41010",
                        color: "white",
                        cursor: "pointer",
                        flex: 1,
                      }}
                    >
                      Delete Hostel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostelAdminDashboard;
