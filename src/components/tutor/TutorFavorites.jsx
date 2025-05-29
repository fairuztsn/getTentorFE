import { useState, useEffect } from 'react';
import TutorCard from './TutorCard';
import axios from 'axios';
import { useUser } from '@/contexts/UserContextProvider';

const TutorFavorites = () => {
  const { user } = useUser();
  const [tentors, setTentors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/favorites/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setTentors(response.data);
      } catch (error) {
        alert('Error! Baca console pls');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTutors();
    }
  }, [user]);

  // Render loading if user masih ksoong
  if (!user) {
    return <div className="text-center py-10 text-gray-500">Memuat data pengguna...</div>;
  }

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Mengambil tentor favorit...</div>;
  }

  return (
    <section className="mt-8 px-8">
      <div className="m-5">
        <h2 className='text-xl font-semibold text-white bg-blue'>
            Tentor Favorit {user?.name}
        </h2>
      </div>
      <div className="flex flex-wrap gap-6 justify-center items-center">
        {tentors.length > 0 ? (
          tentors.map((tentor, idx) => (
            <TutorCard
              key={idx}
              id={tentor.id}
              image={tentor.fotoUrl}
              name={tentor.nama}
              subjects={tentor.listMataKuliah.map(mk => mk.nama)}
              averageRating={tentor.averageRating.toFixed(1)}
            />
          ))
        ) : (
          <div className="text-gray-500 text-sm">Belum ada tentor favorit</div>
        )}
      </div>
    </section>
  );
};

export default TutorFavorites;