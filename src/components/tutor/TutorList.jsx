import { useState, useEffect } from 'react';
import TutorCard from './TutorCard';
import axios from 'axios';
import { useSearchParams } from "react-router-dom";

const TutorList = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q"); 

  const [tentors, setTentors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        let response;

        if(!q) {
          response = await axios.get('http://localhost:8080/api/tentors', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
        }else {
          response = await axios.get(`http://localhost:8080/api/tentors/search?q=${q}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          });
        }

        setTentors(response.data);
        console.log(response.data)
      } catch (error) {
        alert('Error! Baca console pls');
        console.error(error);
      }
    };

    fetchTutors();
  }, [q]);

  return (
    <section className="mt-8 px-8">
      <h2 className="text-xl font-semibold mb-4 text-blue">Tentor Tersedia</h2>
      <div className="flex flex-wrap gap-6">
        {tentors.map((tentor, idx) => (
          <TutorCard key={idx} id={tentor.id} image={tentor.fotoUrl} name={tentor.nama} subjects={['Lorem', 'Ipsum']}/>
        ))}
      </div>
    </section>
  );
};

export default TutorList;
