import React from 'react';
import './StudentDashboard.css';

const StudentDashboard = ({ user, onNavigate }) => {
  // Read real dynamic metrics falling out of your MongoDB student database profile fields
  const displayName = user?.name || "ALBIN JOSEPH T";
  const displayRoll = user?.rollNumber || "Nie25cs013";
  const displayCourse = user?.course || "Computer Science & Engineering";
  const displayEmail = user?.email || `${displayName.toLowerCase().replace(/\s+/g, '')}@school.edu`;
  const displayMarks = user?.marks !== undefined ? user?.marks : 92;
  const displayAttendance = user?.attendance || "94.2%";

  return (
    <div className="dashboard-view-wrapper">
      
      {/* --- DASHBOARD MINI-HEADER BANNER --- */}
      <header className="dashboard-action-strip">
        <div className="strip-branding">
          <span className="strip-badge"> INTERNAL PORTAL</span>
          <h1>Student Workspace</h1>
        </div>
        <button onClick={() => {
          localStorage.clear(); // Flush cache descriptors upon exit safety tracking
          onNavigate('home');
        }} className="btn-dashboard-logout">
           Secure Logout
        </button>
      </header>

      {/* --- PROFILE BANNER CARD --- */}
      <section className="profile-hero-card">
        <div className="profile-flex-node">
          <div className="profile-avatar-frame">
            <div className="avatar-placeholder-initials">
              {displayName.charAt(0)}
            </div>
            <span className="status-indicator-dot"></span>
          </div>
          
          <div className="profile-meta-block">
            <h2 className="profile-user-name">{displayName}</h2>
            <div className="profile-badges-row">
              <span className="meta-badge"> ROLL: {displayRoll}</span>
              <span className="meta-badge"> KTU STUDENT</span>
              <span className="meta-badge"> {displayEmail}</span>
            </div>
            <p className="profile-department-subtext">Program Flow: <strong>{displayCourse}</strong></p>
          </div>
        </div>
      </section>

      {/* --- CORE ANALYTICS ARCHITECTURE GRID --- */}
      <div className="dashboard-content-layout-grid">
        
        {/* LEFT COLUMN: ACCUMULATED PERFORMANCE METRICS */}
        <div className="analytics-left-column">
          
          <div className="dual-metric-cards-row">
            {/* Academic Performance Evaluation Card */}
            <div className="metric-card-base evaluation-purple-theme">
              <div className="card-top-flex">
                <span className="card-category-label">ACADEMIC EVALUATION</span>
                <span className="card-graphic-icon">📊</span>
              </div>
              <h3 className="card-main-title">Cumulative Performance</h3>
              <div className="score-display-block">
                <span className="score-bold-accent">{displayMarks}%</span>
                <span className="score-denominator-scale"> / 100%</span>
              </div>
              <div className="progress-track-bar-bg">
                {/* Dynamically matches tracking bar fills using cloud scores */}
                <div className="progress-fill-thumb" style={{ width: `${displayMarks}%` }}></div>
              </div>
            </div>

            {/* Credits Counter Card */}
            <div className="metric-card-base credits-radial-theme">
              <span className="card-category-label">CURRICULUM CREDITS</span>
              <div className="radial-visual-container">
                <div className="radial-mock-circle">
                  <span className="radial-inner-number">24</span>
                  <span className="radial-inner-label"></span>
                </div>
              </div>
              <p className="radial-footer-subtext">Current Semester Target: <strong>26 Credits</strong></p>
            </div>
          </div>

          {/* Long Horizontal Attendance Status Sheet */}
          <div className="metric-card-base attendance-horizontal-card">
            <div className="attendance-flex-layout">
              <div className="attendance-text-side">
                <div className="attendance-badge-icon">📅</div>
                <div>
                  <h3>{displayAttendance} Attendance Maintained</h3>
                  <p>Excellent consistency metrics across active running laboratory sessions.</p>
                </div>
              </div>
              <div className="attendance-mock-chart-bars">
                <div className="mock-chart-bar-pill fill-80"></div>
                <div className="mock-chart-bar-pill fill-95"></div>
                <div className="mock-chart-bar-pill fill-90"></div>
                <div className="mock-chart-bar-pill fill-100"></div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: UPCOMING EVENTS & QUICK LINKS TIMELINE */}
        <aside className="analytics-right-sidebar">

          <div className="sidebar-card-wrapper quick-links-card">
            <h3 className="sidebar-section-heading"> Quick Access Channels</h3>
            <ul className="quick-links-navigation-list">
              <li><button onClick={() => onNavigate('beta-gate')} className="link-navigation-row"><span> Download Academic Syllabus</span> <span className="arrow-icon"></span></button></li>
              <li><button onClick={() => onNavigate('beta-gate')}  className="link-navigation-row"><span> Library Clearances Portal</span> <span className="arrow-icon"></span></button></li>
              <li><button onClick={() => onNavigate('beta-gate')} className="link-navigation-row"><span> Contact Department Head</span> <span className="arrow-icon"></span></button></li>
            </ul>
          </div>

        </aside>

      </div>

    </div>
  );
};

export default StudentDashboard;