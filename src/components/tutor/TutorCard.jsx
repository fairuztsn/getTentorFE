// src/components/TutorCard.jsx

import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

const TutorCard = ({ id, image, name, subjects, averageRating }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-60 flex flex-col h-full">
      {/* Gambar dengan ukuran tetap dan crop otomatis */}
      <div className="w-full h-48 overflow-hidden rounded-lg">
        <img
          src={image ? `${BACKEND_URL}/api/images/view/${image}` : `${BACKEND_URL}/api/images/view/default-profile.png`}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-lg font-semibold mt-5">{name}</h2>

      {/* Subject Tags */}
      <div className="flex flex-wrap gap-1 mt-5 min-h-[48px]">
        {subjects.slice(0, 3).map((subject, idx) => (
          <span
            key={idx}
            className="text-xs bg-light-blue text-blue-dark px-2 py-1 rounded max-w-[80px] truncate"
          >
            {subject}
          </span>
        ))}

        {subjects.length > 3 && (
          <span className="text-xs bg-light-blue text-blue-dark px-2 py-1 rounded">
            +{subjects.length - 3} lainnya
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="text-sm mt-5">⭐ {`${averageRating}`}/5.0</div>

      {/* Action Button */}
      <button
        className="w-full bg-blue text-white py-1 rounded hover:bg-blue-600 mt-5"
        onClick={() => navigate(`/tentor/${id}`)}
      >
        Lihat Tentor
      </button>
    </div>
  );
};

export default TutorCard;
