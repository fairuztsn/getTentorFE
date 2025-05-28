import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // buat auto-redirect logout
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Cek if token expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/login"); // redirect logout
        } else {
          // Set user data dari token
          setUser({
            id: decoded.sub,
            email: decoded.email,
            name: decoded.nama,
            role: decoded.role,
            fotoUrl: decoded.fotoUrl || null,
          });

        }
      } catch (err) {
        console.error("Token tidak valid", err);
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
      }
    }
    setLoading(false);
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);