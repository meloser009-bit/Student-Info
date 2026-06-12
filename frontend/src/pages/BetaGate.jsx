import React from 'react';
import './BetaGate.css';

const BetaGate = ({ onNavigate }) => {
  return (
    <div className="beta-gate-container">
      <div className="beta-display-card">
        
        {/* --- GRAPHIC SHIELD ENGINE --- */}
        <div className="beta-icon-wrapper">
          <span className="pulsing-radar-ring"></span>
          <span className="beta-badge-core">Beta</span>
        </div>

        {/* --- COPY METRICS --- */}
        <h1 className="beta-main-title">EduFlow Core Beta </h1>
        <h2 className="beta-subtitle">Currently On Updates</h2>
        
        <p className="beta-description">
          The system is on a temporary hold for updates and improvements. We are working hard to enhance the platform and will be back online soon. Thank you for your patience!
        </p>

      

        {/* --- NAV TRIGGER CONTROLLER --- */}
        <button onClick={() => onNavigate('student-dash')} className="btn-return-dashboard">
          ← Return to Student Workspace
        </button>

      </div>
    </div>
  );
};

export default BetaGate;