import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContextProvider';
import { logout } from '@/utils/auth';
import Header from "@/components/Header";
import TutorFavorites from "@/components/tutor/TutorFavorites";

export default function TentorFavorites() {
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      navigate('/login');
  }

  const { user } = useUser();

  return (
      <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {user?.role === "tentor" ? 
          <>
            Bro
          </> : <>
            <TutorFavorites />
          </>}
        </div>
      </>
  )
}