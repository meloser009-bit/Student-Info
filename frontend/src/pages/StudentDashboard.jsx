import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Imported Axios for live sync connectivity
import './StudentDashboard.css';

const StudentDashboard = ({ user, onNavigate }) => {
  // 📡 ADD LIVE SYNC STATE
  const [liveUser, setLiveUser] = useState(user);

// Fetch fresh profile state values directly from the database engine on mount
  useEffect(() => {
    const fetchFreshStudentData = async () => {
      // 🌟 FIXED: Added exhaustive checks for every possible MERN stack ID variant
      const studentId = user?._id || user?.id || user?._doc?._id || user?.data?._id;
      
      // Temporary check to see if the ID is actually reaching the component
      console.log("DEBUG: Current session studentId parsed as:", studentId);
      
      if (!studentId) {
        console.warn("DEBUG: Fetch skipped because no valid student ID was found in props.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/students`);
        
        // Loose equality comparison (==) handles string vs object ID variations beautifully
        const freshData = response.data.find(s => 
          s._id == studentId || 
          s.id == studentId || 
          s._id?.toString() === studentId?.toString()
        );

        if (freshData) {
          console.log("DEBUG: Match found in DB! Live Attendance is:", freshData.attendance);
          setLiveUser(freshData);
        } else {
          console.warn("DEBUG: API called successfully, but no student matched ID:", studentId);
        }
      } catch (error) {
        console.error("Error refreshing live dashboard data stream:", error.message);
      }
    };

    fetchFreshStudentData();
  }, [user]);

  // Read real dynamic metrics falling out of your live synchronized state fields
  const displayName = liveUser?.name || "ALBIN JOSEPH T";
  const displayRoll = liveUser?.rollNumber || "Nie25cs013";
  const displayCourse = liveUser?.course || "Computer Science & Engineering";
  // Sync email checks against backend keys
  const displayEmail = liveUser?.email || `${displayName.toLowerCase().replace(/\s+/g, '')}@school.edu`;
  const displayMarks = liveUser?.marks !== undefined ? liveUser?.marks : 92;
  
  const displayAttendance = liveUser?.attendance != null // ✅ FIXED: != null covers both undefined and null cleanly
    ? `${liveUser.attendance}%`
    : "0%";

  return (
    <div className="dashboard-view-wrapper">
      
      {/* --- DASHBOARD MINI-HEADER BANNER --- */}
      <header className="dashboard-action-strip">
        <div className="strip-branding">
      
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