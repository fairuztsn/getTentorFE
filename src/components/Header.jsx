// src/components/Header.jsx
import { useUser } from "@/contexts/UserContextProvider";
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const Header = () => {
  const { user, setUser } = useUser(); // pastikan context menyediakan setUser
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dari localStorage atau cookie
    localStorage.removeItem("token");

    // Hapus user dari context
    setUser(null);

    // Arahkan ke halaman login atau landing page
    navigate("/login");
  };

  return (
    <header className="bg-light-blue py-4 px-6 flex justify-between items-center shadow">
      <div className="flex items-center space-x-2">
        <img
          src={`/images/gettentor.png`}
          alt="logo"
          className="w-64 h-12"
          onClick={() => {
            if (user?.role === 'tentor') {
              navigate('/profile'); // atau halaman khusus tentor
            } else {
              navigate('/'); // dashboard mentee
            }
          }}
          style={{ cursor: 'pointer' }}
          />
      </div>
      <div className="flex items-center space-x-4">
        {user?.role !== "tentor" && (
          <button
            onClick={() => navigate('/profile/favorites')}
            className="bg-blue-dark hover:bg-blue-600 text-white px-5 py-2 rounded-md"
          >
            Tentor Favorit
          </button>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>

        <div className="flex items-center space-x-2" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
          <span className="text-gray-700">{user?.name}</span>
          <img
            src={`${BACKEND_URL}/api/images/view/${user?.fotoUrl}`}
            className="w-8 h-8 rounded-full border"
            alt="User Avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
