import { useState, useEffect } from 'react';
import TutorCard from './TutorCard';
import axios from 'axios';

const tutors = [
  {
    name: 'Seixin',
    image: 'seixin.jpg',
    subjects: ['PBO', 'Jarkom', 'APPL', 'AI'],
  },
  {
    name: 'Saiki Kusuo',
    image: 'saiki.jpg',
    subjects: ['Alpro', 'BasDat'],
  },
  {
    name: 'Uesugi Fuutarou',
    image: 'uesugi.jpg',
    subjects: ['Kalkulus', 'Statistika', 'Bindo'],
  },
  {
    name: 'Yuiga Nariyuki',
    image: 'yuiga.jpg',
    subjects: ['Fisika', 'Bindo', 'Bing', 'Kalkulus', 'Statistika'],
  },
];

const TutorList = () => {
  const [tentors, setTentors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tentors', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTentors(response.data);
      } catch (error) {
        alert('Error! Baca console pls');
        console.error(error);
      }
    };

    fetchTutors();
  }, []);

  return (
    <section className="mt-8 px-8">
      <h2 className="text-xl font-semibold mb-4 text-blue">Tentor Tersedia</h2>
      <div className="flex flex-wrap gap-6">
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
            
            averageRating={tentor.averageRating}/>
        ))}
      </div>
    </section>
  );
};

export default TutorList;
