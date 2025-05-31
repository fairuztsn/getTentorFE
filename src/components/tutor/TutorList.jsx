import { useState, useEffect } from 'react';
import TutorCard from './TutorCard';
import axios from 'axios';
import { useSearchParams } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const TutorList = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q"); 

  const [tentors, setTentors] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching data
        let response;

        if(!q) {
          response = await axios.get(`${BACKEND_URL}/api/tentors`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        }else {
          response = await axios.get(`${BACKEND_URL}/api/tentors/search?q=${q}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          });
        }

        setTentors(response.data);
      } catch (error) {
        alert('Error! Baca console pls');
        console.error(error);
      } finally {
        setLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchTutors();
  }, [q]);

  return (
    <section className="mt-8 px-8">
      <h2 className="text-3xl font-semibold mb-4 text-blue">
        {q ? `Hasil Pencarian untuk "${q}"` : 'Daftar Tentor Tersedia'}
      </h2>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue"></div>
        </div>
      )}
      {!loading && tentors.length === 0 && (
        <p className="text-center text-gray-500">Tidak ada tentor yang ditemukan.</p>
      )}
      <div className="flex flex-wrap gap-6 justify-center items-center">
        {tentors.map((tentor, idx) => (
          <TutorCard 
            key={idx} 
            id={tentor.id} 
            image={tentor.fotoUrl} 
            name={tentor.nama} 
            subjects={
              tentor.listMataKuliah
              .map(
                mk => mk.nama
              )
            }
            
            averageRating={tentor.averageRating.toFixed(1)}/>
        ))}
      </div>
    </section>
  );
};

export default TutorList;
