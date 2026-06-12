import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for real API registration calls
import './Register.css';

const Register = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to display database/validation errors

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      // Match the payload perfectly to your models/students.js schema fields
      const newStudentPayload = {
        name,
        rollNumber,
        course,
        email,
        password,
        marks: 0 // Default baseline marks for a newly self-registered account
      };

      // Hit your clean Express API route endpoint
      const response = await axios.post('http://localhost:5000/api/students', newStudentPayload);

      if (response.status === 201) {
        alert(`Registration Successful for ${name}! Moving to login gate...`);
        onNavigate('login');
      }
    } catch (err) {
      // Catch duplicates or connection issues
      setError(err.response?.data?.message || 'Registration failed. Check your network or credentials.');
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-form-card">
        
        <div className="register-card-header">
          <h2>Create Student Account</h2>
          <p>Join the secure institutional digital portal network system.</p>
        </div>

        {/* Dynamic Error Message Block using clean CSS styling */}
        {error && (
          <div className="auth-error-banner">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleRegisterSubmit}>
          
          {/* Dual Column Layout Row */}
          <div className="register-form-row">
            <div className="register-input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="register-text-input" 
                required 
              />
            </div>
            <div className="register-input-group">
              <label>KTU Roll Number</label>
              <input 
                type="text" 
                placeholder="roll number" 
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="register-text-input" 
                required 
              />
            </div>
          </div>

          {/* Department Designation field */}
          <div className="register-input-group">
            <label>Enrolled Course / Department</label>
            <input 
              type="text" 
              placeholder="Course / Department" 
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="register-text-input" 
              required 
            />
          </div>

          {/* Institutional Email Address Box */}
          <div className="register-input-group">
            <label>Academic Email Address</label>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-text-input" 
              required 
            />
          </div>

          {/* Password Entry */}
          <div className="register-input-group">
            <label>Choose Account Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-text-input" 
              required 
            />
          </div>

          {/* Execution Submission Element */}
          <button type="submit" className="btn-register-action-submit">
            Register Academic Profile
          </button>
        </form>

        {/* Alternate Flow Action Toggle link */}
        <p className="register-card-switch-text">
          Already registered? <button type="button" onClick={() => onNavigate('login')} className="register-inline-link">Sign In here</button>
        </p>

      </div>
    </div>
  );
};

export default Register;