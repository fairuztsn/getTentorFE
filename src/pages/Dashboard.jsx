import { useNavigate } from "react-router-dom"
import { logout } from "../utils/auth";

export default function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <>
          <Header />
          <SearchBar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TutorList />
          </div>
        </>
    )
}