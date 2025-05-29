// src/pages/Profile.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useUser } from "@/contexts/UserContextProvider";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        ipk: user.ipk || "",
        noTelp: user.noTelp || "",
        fotoUrl: user.fotoUrl,
        listMataKuliah: [...(user.listMataKuliah || [])],
        pengalamanArray: user.pengalaman 
          ? user.pengalaman.split("|").filter(item => item.trim() !== "").map(item => item.trim())
          : [""]
      });
    }
  }, [user]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const pengalamanItems = user.pengalaman
    ? user.pengalaman.split("|")
        .filter((item) => item.trim() !== "")
        .map((item) => item.trim())
    : [];

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMataKuliahChange = (index, value) => {
    const newMataKuliah = [...editForm.listMataKuliah];
    newMataKuliah[index] = value;
    setEditForm(prev => ({
      ...prev,
      listMataKuliah: newMataKuliah
    }));
  };

  const handlePengalamanChange = (index, value) => {
    const newPengalaman = [...editForm.pengalamanArray];
    newPengalaman[index] = value;
    setEditForm(prev => ({
      ...prev,
      pengalamanArray: newPengalaman
    }));
  };

  const handleAddMataKuliah = () => {
    setEditForm(prev => ({
      ...prev,
      listMataKuliah: [...prev.listMataKuliah, ""]
    }));
  };

  const handleRemoveMataKuliah = (index) => {
    const newMataKuliah = [...editForm.listMataKuliah];
    newMataKuliah.splice(index, 1);
    setEditForm(prev => ({
      ...prev,
      listMataKuliah: newMataKuliah
    }));
  };

  const handleAddPengalaman = () => {
    setEditForm(prev => ({
      ...prev,
      pengalamanArray: [...prev.pengalamanArray, ""]
    }));
  };

  const handleRemovePengalaman = (index) => {
    const newPengalaman = [...editForm.pengalamanArray];
    newPengalaman.splice(index, 1);
    setEditForm(prev => ({
      ...prev,
      pengalamanArray: newPengalaman
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({
          ...prev,
          fotoUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const pengalamanString = editForm.pengalamanArray.join(" | ");
    
    const updatedUser = {
      ...user,
      name: editForm.name,
      ipk: editForm.ipk,
      noTelp: editForm.noTelp,
      fotoUrl: editForm.fotoUrl,
      pengalaman: pengalamanString,
      listMataKuliah: editForm.listMataKuliah
    };
    
    setUser(updatedUser);
    setIsEditing(false);
  };

  // Tentukan role user
  const isTentor = user.role === "tentor";

  return (
    <div className="bg-[url('/images/carthe2.png')] bg-cover bg-center font-sans min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto">
        <div className="relative">      
          <div className="relative flex items-start px-4 pt-4 pb-8 gap-6">
            <div className="relative -mt-[-20px]">
              {isEditing ? (
                <div className="relative group">
                  <img
                    src={editForm?.fotoUrl || user.fotoUrl}
                    alt="Profile"
                    className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white shadow-lg z-10 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white text-center text-sm px-2">Change Photo</span>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <img
                  src={user.fotoUrl}
                  alt="Profile"
                  className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white shadow-lg z-10 object-cover"
                />
              )}
            </div>
            
            <div className="flex flex-col gap-12 pt-16">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="border bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-500 transition"
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 text-left px-4 pb-10">
          {isEditing && editForm ? (
            // EDIT MODE
            <>
              {/* Left Column - Editable Details */}
              <div className="border rounded-xl p-6 shadow bg-white/70 backdrop-blur-sm">
                <div className="space-y-6">
                  <div>
                    <div className="mb-4">
                      <label className="font-medium text-gray-700 block mb-1">Nama:</label>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="font-medium text-gray-700 block mb-1">Email:</label>
                      <input
                        type="email"
                        value={editForm.email}
                        className="w-full p-2 border rounded bg-gray-100"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* IPK Field - Hanya untuk tentor */}
                    {isTentor && (
                      <div>
                        <label className="font-medium text-gray-700 block mb-1">IPK:</label>
                        <input
                          type="number"
                          name="ipk"
                          value={editForm.ipk}
                          onChange={handleEditChange}
                          min="0"
                          max="4"
                          step="0.01"
                          className="p-2 border rounded w-24"
                        />
                      </div>
                    )}
                    
                    {/* Phone Field - Untuk semua */}
                    <div>
                      <label className="font-medium text-gray-700 block mb-1">No. Telepon:</label>
                      <input
                        type="tel"
                        name="noTelp"
                        value={editForm.noTelp}
                        onChange={handleEditChange}
                        className="p-2 border rounded w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Courses and Experience (Hanya untuk tentor) */}
              {isTentor ? (
                <div className="space-y-6">
                  {/* Mata Kuliah Edit */}
                  <div className="bg-white/70 border rounded-lg p-4 backdrop-blur-sm shadow">
                    <h3 className="text-2xl font-bold mb-3">Mata Kuliah</h3>
                    <div className="space-y-2">
                      {editForm.listMataKuliah.map((mk, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={mk}
                            onChange={(e) => handleMataKuliahChange(idx, e.target.value)}
                            className="flex-1 p-2 border rounded"
                          />
                          <button 
                            type="button" 
                            onClick={() => handleRemoveMataKuliah(idx)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <button 
                      type="button" 
                      onClick={handleAddMataKuliah}
                      className="mt-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      + Tambah Mata Kuliah
                    </button>
                  </div>

                  {/* Pengalaman Edit */}
                  <div className="bg-white/70 border rounded-lg p-4 backdrop-blur-sm shadow">
                    <h3 className="text-2xl font-bold mb-3">Pengalaman</h3>
                    <div className="space-y-2">
                      {editForm.pengalamanArray.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => handlePengalamanChange(idx, e.target.value)}
                            className="flex-1 p-2 border rounded"
                          />
                          <button 
                            type="button" 
                            onClick={() => handleRemovePengalaman(idx)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <button 
                      type="button" 
                      onClick={handleAddPengalaman}
                      className="mt-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm"
                    >
                      + Tambah Pengalaman
                    </button>
                  </div>
                </div>
              ) : (
                // Untuk mentee di mode edit, tampilkan kolom kosong agar layout tetap seimbang
                <div></div>
              )}
              
              {/* Save Button untuk semua role */}
              <div className="flex justify-center mt-6 col-span-1 md:col-span-2">
                <button 
                  onClick={handleSave}
                  className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition text-lg"
                >
                  Save Changes
                </button>
              </div>
            </>
          ) : (
            // VIEW MODE
            <>
              {/* Left Column - Profile Details untuk semua role */}
              <div className="border rounded-xl p-6 shadow bg-white/70 backdrop-blur-sm">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Email untuk semua */}
                    <div>
                      <p className="font-semibold text-gray-700">Email:</p>
                      <p className="text-lg mt-1">{user.email}</p>
                    </div>
                    
                    {/* IPK - Hanya untuk tentor */}
                    {isTentor && (
                      <div>
                        <p className="font-semibold text-gray-700">IPK:</p>
                        <p className="text-lg mt-1">{user.ipk || "-"}</p>
                      </div>
                    )}
                    
                    {/* Phone untuk semua */}
                    <div>
                      <p className="font-semibold text-gray-700">No. Telepon:</p>
                      <p className="text-lg mt-1">{user.noTelp || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Hanya untuk tentor */}
              {isTentor ? (
                <div className="space-y-6">
                  {/* Courses */}
                  <div className="bg-white/70 border rounded-lg p-4 backdrop-blur-sm shadow">
                    <h3 className="text-2xl font-bold mb-4">Mata Kuliah</h3>
                    {user.listMataKuliah && user.listMataKuliah.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {user.listMataKuliah.map((mk, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full border border-blue-200 text-base"
                          >
                            {mk}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Belum ada mata kuliah yang ditambahkan</p>
                    )}
                  </div>

                  {/* Experience */}
                  <div className="bg-white/70 border rounded-lg p-4 backdrop-blur-sm shadow">
                    <h3 className="text-2xl font-bold mb-4">Pengalaman</h3>
                    {pengalamanItems.length > 0 ? (
                      <ul className="space-y-3 text-gray-700">
                        {pengalamanItems.map((item, idx) => (
                          <li key={idx} className="text-lg">• {item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">Belum ada pengalaman yang ditambahkan</p>
                    )}
                  </div>
                </div>
              ) : (
                // Untuk mentee di mode view, tampilkan pesan khusus
                <div className="space-y-6">
                  <div className="bg-white/70 border rounded-lg p-4 backdrop-blur-sm shadow">
                    <h3 className="text-2xl font-bold mb-4">Hai Mentee!</h3>
                    <p className="text-gray-700">
                      Kamu adalah seorang mentee. Kamu bisa mencari tentor favoritmu 
                      dan melakukan pemesanan les.
                    </p>
                  </div>
                  
                  <div className="bg-white/70 border rounded-lg p-4 backdrop-blur-sm shadow">
                    <h3 className="text-2xl font-bold mb-4">Tentor Favorit</h3>
                    <p className="text-gray-700">
                      {user.favoriteTentor 
                        ? `Tentor favoritmu: ${user.favoriteTentor}`
                        : "Kamu belum memilih tentor favorit"}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}