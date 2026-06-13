import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Imported Axios for live API requests
import './Login.css';

const Login = ({ onNavigate, initialRole, setSessionUser }) => {
  const [role, setRole] = useState(initialRole || 'student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to display bad credential warnings

  useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
    }
  }, [initialRole]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear errors before sending a new request

    try {
      // Fire credentials to your live Express endpoint
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      if (response.data.success) {
        const user = response.data;

        // Transform API payload directly into your shared state format
        const activeUserProfile = {
          _id: user._id || user.id, // 🌟 FIXED: Preservation of Database ID for live sync
          name: user.name,
          role: user.role, 
          rollNumber: user.rollNumber || "STAFF_2026",
          course: user.course || "N/A",
          marks: user.marks || 0,
          attendance: user.attendance ?? 0, // 🌟 FIXED: Preservation of attendance metric
          email: user.email || email
        };

        // Cache details in localStorage for safety persistence across refreshes
        localStorage.setItem('userSession', JSON.stringify(activeUserProfile));
        
        // Pass profile object straight to your app engine state handler
        setSessionUser(activeUserProfile);

        // Direct the user flow to the correct dashboard workspace layout sheet
        if (user.role === 'student') {
          onNavigate('student-dash');
        } else {
          onNavigate('staff-dash'); 
        }
      }
    } catch (err) {
      // Trap invalid password/email alerts from studentController.js
      setError(err.response?.data?.message || 'Authentication link failed');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-card">
        
        <div className="login-card-header">
          <h2>Welcome Back</h2>
          <p>Please enter your credentials to access your academic workspace.</p>
        </div>

        {/* Dynamic Error Message Block using clean CSS styling */}
        {error && (
          <div className="auth-error-banner">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          
          {/* Dropdown Selection Field */}
          <div className="login-input-group">
            <label>Portal Access Level</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="login-dropdown-select"
            >
              <option value="student">Student Dashboard Gateway</option>
              <option value="faculty">Faculty / Teacher Portal</option>
              <option value="admin">Institutional SuperAdmin</option>
            </select>
          </div>

          {/* Email Text Input Field */}
          <div className="login-input-group">
            <label>Institutional Email Address</label>
            <input 
              type="email" 
              placeholder="username@domain.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-text-input" 
              required 
            />
          </div>

          {/* Password Input Field */}
          <div className="login-input-group">
            <label>Security Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-text-input" 
              required 
            />
          </div>

          {/* Submission Trigger */}
          <button type="submit" className="btn-auth-action-submit">
            Enter {role.toUpperCase()} Workspace
          </button>
        </form>

        {/* Sub-Navigation Controls */}
        <div className="login-card-footer-navigation">
          <p>New to the platform? <button type="button" onClick={() => onNavigate('register')} className="footer-inline-link">Create an account</button></p>
          <button type="button" onClick={() => onNavigate('home')} className="btn-back-to-landing-home">
            ← Cancel and return home
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;