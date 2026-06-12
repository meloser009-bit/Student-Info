import React from 'react';
import './Home.css';

const Home = ({ onNavigate, onSelectPathway }) => {
  return (
    <div className="home-page-wrapper">
      
      {/* --- ELITE HEADER NAVIGATION --- */}
      <nav className="navbar-container">
        <div className="navbar-logo">
          <h2>EduFlow</h2>
        </div>
        <ul className="navbar-links">
          <li><button onClick={() => onNavigate('home')} className="nav-text-link active">Home</button></li>
          <li><button onClick={() => onNavigate('register')} className="nav-text-link">Register</button></li>
          <li>
            <button onClick={() => onNavigate('login')} className="btn-navbar-started">
              Get Started
            </button>
          </li>
        </ul>
      </nav>

      {/* --- HERO SPLASH ANCHOR --- */}
      <header className="hero-section">
        <h1 className="hero-title">
          Welcome to your <br />
          <span className="hero-italic-accent">Academic</span> Journey
        </h1>
        <p className="hero-description">
          EduFlow is a fluid learning ecosystem designed for focus. <br />
          Experience clarity through our digital-first approach to <br />
          modern education.
        </p>
        <div className="hero-btn-row">
          <button onClick={() => onNavigate('login')} className="btn-purple-primary">
            Start Learning Today
          </button>
        
        </div>
      </header>

      {/* --- THREE-COLUMN INTERACTIVE PATHWAY MATRIX --- */}
      <section className="pathway-section">
        <h2 className="grid-main-title">Select Your Pathway</h2>
        <p className="grid-subtitle">Customized experiences tailored to your role in the ecosystem.</p>
        
        <div className="pathway-grid-container">
          
          {/* Student Pathway Shortcut Card */}
          <div className="pathway-card" onClick={() => onSelectPathway('student')}>
        
            <h3>Student Portal</h3>
            <p>Access your personal academic dashboard, monitor scores, and view performance analysis reports instantly.</p>
            <span className="card-action-text student-text">Enter Campus ➔</span>
          </div>

          {/* Teacher Pathway Shortcut Card */}
          <div className="pathway-card" onClick={() => onSelectPathway('faculty')}>
           
            <h3>Faculty Workspace</h3>
            <p>Manage performance score sheets, review the student directory grid, and input class grading metrics.</p>
            <span className="card-action-text teacher-text">Faculty Portal ➔</span>
          </div>

          {/* Admin Pathway Shortcut Card */}
          <div className="pathway-card" onClick={() => onSelectPathway('admin')}>
            <h3>System SuperAdmin</h3>
            <p>Control campus permissions, execute database record deletions, and monitor global infrastructure access grids.</p>
            <span className="card-action-text admin-text">Control Center ➔</span>
          </div>

        </div>
      </section>

      {/* --- TWO-COLUMN FOCUS BLOCK --- */}
      <section className="split-focus-section">
        <div className="split-text-block">
          <h2>Welcome to EduFlow</h2>
          <p>Your unified academic command center. Track your real-time attendance metrics, view internal subject grades, and stay ahead of upcoming campus events through a clean, centralized workspace engineered for modern student workflows.</p>
          
          <ul className="split-checklist">
            <li><span className="check-bullet">✓</span> Explicit Role-Based access filtering controls</li>
            <li><span className="check-bullet">✓</span> Lightweight layout data parsing channels</li>
            <li><span className="check-bullet">✓</span> Real-time client view state synchronization</li>
          </ul>
        </div>
        
        <div className="split-media-block">
          <div className="glass-mockup-device">
          
            <div className="device-screen">
              <img src="https://wallpapercave.com/wp/wp14731199.jpg" alt="EduFlow Dashboard Mockup" className="dashboard-mockup" />
            </div>
    
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;