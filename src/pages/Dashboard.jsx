import { useNavigate } from "react-router-dom"
import { logout } from "../utils/auth";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import TutorList from "@/components/tutor/TutorList";

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
            <button
              type="button"
              className="mt-5 w-full py-3 px-6 text-white bg-red-500 hover:bg-red-600 rounded-lg font-semibold shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={handleLogout}
            >
              {`Get me outta this place`}
            </button>
          </div>
        </>
    )
}