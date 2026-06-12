import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StaffDashboard from './pages/StaffDashboard';
import StudentDashboard from './pages/StudentDashboard';
import BetaGate from './pages/BetaGate';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authRole, setAuthRole] = useState('student');

  // 🛡️ LOGIC FIX: Initialize session state as null so user parameters populate dynamically out of MongoDB Atlas
  const [sessionUser, setSessionUser] = useState(null);

  // 🔄 HISTORY SYNC ENGINE: Listens to the browser back/forward buttons
  useEffect(() => {
    // Check if there is an active user session persisted in local storage on component mount
    const savedSession = localStorage.getItem('userSession');
    if (savedSession) {
      setSessionUser(JSON.parse(savedSession));
    }

    const handlePopState = (event) => {
      // If the user hits "Back", read the state we saved in history, or default to 'home'
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        setCurrentPage('home');
      }
    };

    // Initialize the very first history state so the browser remembers 'home'
    window.history.replaceState({ page: 'home' }, '', '');

    // Attach the browser navigation listener
    window.addEventListener('popstate', handlePopState);
    
    // Clean up the listener if the component unmounts
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 🚀 NAVIGATOR: Pushes the new view into the browser's history timeline
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo(0, 0); 
    
    // Drop a digital breadcrumb in the browser history record
    window.history.pushState({ page: pageName }, '', `?page=${pageName}`);
  };

  const handlePathwayGate = (chosenRole) => {
    setAuthRole(chosenRole);
    setCurrentPage('login');
    // Drop a breadcrumb for this transition too
    window.history.history.pushState({ page: 'login' }, '', `?page=login`);
  };

  return (
    <div className="app-container">
      <main className="main-viewport">
        {currentPage === 'home' && (
          <Home 
            onNavigate={navigateTo} 
            onSelectPathway={handlePathwayGate} 
          />
        )}

        {currentPage === 'beta-gate' && (
          <BetaGate onNavigate={navigateTo} />
        )}

        {currentPage === 'login' && (
          <Login 
            onNavigate={navigateTo} 
            initialRole={authRole}
            setSessionUser={setSessionUser}
          />
        )}
        
        {currentPage === 'register' && (
          <Register 
            onNavigate={navigateTo} 
          />
        )}
        
        {currentPage === 'staff-dash' && (
          <StaffDashboard 
            user={sessionUser} 
            onNavigate={navigateTo} 
          />
        )}
        
        {currentPage === 'student-dash' && (
          <StudentDashboard 
            user={sessionUser} 
            onNavigate={navigateTo} 
          />
        )}
      </main>

      <footer className="global-footer">
        <p>&copy; 2026 EduFlow Portal.</p>
      </footer>
    </div>
  );
}

export default App;