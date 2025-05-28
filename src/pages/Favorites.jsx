import { useNavigate } from "react-router-dom"
import Header from "@/components/Header";
import TutorList from "@/components/tutor/TutorList";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <>
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-center text-blue-dark mt-10 mb-8">
                Tentor Favorite Nama Mentee
            </h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TutorList />
        </div>
        </>
    )
}