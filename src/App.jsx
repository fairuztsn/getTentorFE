import { useState } from 'react';
import '@/App.css';
import Login from '@/pages/Login.jsx';
import NotFound from '@/components/errors/NotFound.jsx';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from '@/pages/Dashboard';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailPost from './pages/DetailPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
              <Route
          path="/detail-post"
          element={
            <PrivateRoute>
              <DetailPost />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

