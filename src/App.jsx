import { useState } from 'react';
import '@/App.css';
import Login from '@/pages/Login.jsx';
import Register from '@/pages/Register.jsx';
import NotFound from '@/components/errors/NotFound.jsx';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from '@/pages/Dashboard';
import Profile from "@/pages/Profile.jsx";
import TentorFavorites from '@/pages/TentorFavorites';
import Home from '@/pages/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailPost from './pages/DetailPost';
import { UserProvider } from "@/contexts/UserContextProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/tentor/:id" element={
            <PrivateRoute>
              <DetailPost />
            </PrivateRoute>
          } />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }/>
            <Route
            path="/profile/favorites"
            element={
              <PrivateRoute>
                <TentorFavorites />
              </PrivateRoute>
            }/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
  </BrowserRouter>
  );
}

export default App;

