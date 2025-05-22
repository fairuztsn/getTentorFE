import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx'; 
import SearchBar from "@/components/SearchBar.jsx";
import TutorList from "@/components/Tutor/TutorList.jsx";
import Login from '@/components/Login.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <Header />
          <SearchBar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TutorList />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
