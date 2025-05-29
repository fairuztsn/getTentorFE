// src/components/Header.jsx
import { useUser } from "@/contexts/UserContextProvider";
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <header className="bg-light-blue py-4 px-6 flex justify-between items-center shadow">
      <div className="flex items-center space-x-2">
        <img src={`/public/images/gettentor.png`} alt="logo" className="w-64 h-12" onClick={() => navigate('/')} style={{cursor: 'pointer'}}/>
      </div>
      <div className="flex items-center space-x-4">
        {user?.role !== "tentor" && <button onClick={() => navigate('/profile/favorites')} className="bg-blue-dark hover:bg-blue-600 text-white px-4 py-1 rounded mr-10">Tentor Favorit</button>}
        <div className="flex items-center space-x-2" onClick={() => navigate('/profile')} style={{cursor: 'pointer'}}>
          <span className="text-gray-700">{user?.name}</span>
          <img src={`${BACKEND_URL}/api/images/view/${user?.fotoUrl}`} className="w-8 h-8 rounded-full border" alt="User Avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;