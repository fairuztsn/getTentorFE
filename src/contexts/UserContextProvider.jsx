// src/contexts/UserContextProvider.jsx
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // Check if token expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setUser(null);
          navigate("/login");
        } else {
          axios
            .get("http://localhost:8080/api/auth/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              // Extract all necessary fields from response
              const userData = res.data;
              setUser({
                id: decoded.sub,
                email: decoded.email,
                role: decoded.role,
                name: decoded.nama, // Use nama from token
                fotoUrl: userData.fotoUrl || 'http://localhost:8080/api/images/view/default-profile.png',
              });
              setLoading(false);
            })
            .catch((err) => {
              console.error("Gagal mengambil data user:", err);
              localStorage.removeItem("token");
              setUser(null);
              navigate("/login");
              setLoading(false);
            });
        }
      } catch (err) {
        console.error("Token tidak valid", err);
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);