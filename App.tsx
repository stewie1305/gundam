
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { User, Page } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/" 
          element={<Home user={user} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />} 
        />
        <Route 
          path="/login" 
          element={<Login onLogin={setUser} />} 
        />
        <Route 
          path="/admin" 
          element={<Admin user={user} onLogout={() => setUser(null)} />} 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
