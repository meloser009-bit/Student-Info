import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Imported Axios for live infrastructure communication
import './StaffDashboard.css';

const StaffDashboard = ({ user, onNavigate }) => {
  const isAdmin = user?.role === 'admin';

  // Core Student Database Registry (Now populated dynamically via your API backend)
  const [students, setStudents] = useState([]);

  // States managing target selection and detailed fields
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [editName, setEditName] = useState('');
  const [editRoll, setEditRoll] = useState('');
  const [editDept, setEditDept] = useState('');
  const [editMarks, setEditMarks] = useState('');
  const [editAttendance, setEditAttendance] = useState('');

  // States managing manual enrolment form explicitly
  const [newName, setNewName] = useState('');
  const [newRoll, setNewRoll] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newMarks, setNewMarks] = useState('');
  const [newAttendance, setNewAttendance] = useState('');

  // 📡 STEP 1: FETCH DATA ON MOUNT
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      // Map API fields ('course' on backend -> 'dept' on frontend grid match)
      const mappedStudents = response.data.map(s => ({
        id: s._id, // MongoDB object ID identifier
        name: s.name,
        roll: s.rollNumber,
        dept: s.course,
        marks: s.marks,
        attendance: s.attendance !== undefined ? s.attendance : 85 // Pull pure number
      }));
      setStudents(mappedStudents);
    } catch (error) {
      console.error("Error fetching database documents:", error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 🔄 DYNAMIC AUTOPREFILL BUFFER: Loads data into state fields when row is picked
  useEffect(() => {
    if (selectedStudentId) {
      const target = students.find(s => s.id === selectedStudentId);
      if (target) {
        setEditName(target.name);
        setEditRoll(target.roll);
        setEditDept(target.dept);
        setEditMarks(target.marks);
        setEditAttendance(target.attendance);
      }
    } else {
      setEditName('');
      setEditRoll('');
      setEditDept('');
      setEditMarks('');
      setEditAttendance('');
    }
  }, [selectedStudentId, students]);

  // Helper function to safely extract numbers from string inputs containing %
  const cleanNumericValue = (val) => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const stringVal = String(val).replace('%', '').trim();
    return parseInt(stringVal) || 0;
  };

  // 💾 STEP 2: OVERHAULED GLOBAL MODIFIER (PUT Request)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    try {
      const updatedDataPayload = {
        name: editName.toUpperCase(),
        rollNumber: editRoll,
        course: editDept.toUpperCase(),
        marks: parseInt(editMarks || 0),
        // 🌟 FIX: Convert string inputs like "95%" or "95" safely to raw integer numbers
        attendance: cleanNumericValue(editAttendance)
      };

      // Put to database using MongoDB's string hex ID mapping parameter
      const response = await axios.put(`http://localhost:5000/api/students/${selectedStudentId}`, updatedDataPayload);

      if (response.status === 200) {
        alert(`System Ledger Updated: Profile records for ${editName} overwritten successfully in Cloud.`);
        setSelectedStudentId(''); // Flush inspector inputs
        fetchStudents(); // Refresh data layout matrix smoothly
      }
    } catch (error) {
      alert(`Error updating record: ${error.response?.data?.message || error.message}`);
    }
  };

  // ➕ STEP 3: MANUAL STUDENT ENROLMENT ENTRY PIPELINE (POST Request)
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      // Create a clean email slug by stripping whitespace from the provided name
      const emailSlug = newName.toLowerCase().replace(/\s+/g, '');
      
      const newRecordPayload = {
        name: newName.toUpperCase(),
        email: `${emailSlug}@eduflow.com`, // Auto-generated institutional email
        password: 'Student@2026',          // Safe structural default password schema requirement
        rollNumber: newRoll,
        course: newDept.toUpperCase(),
        marks: parseInt(newMarks || 0),
        // 🌟 FIX: Convert string input to raw integer number
        attendance: cleanNumericValue(newAttendance)
      };

      const response = await axios.post('http://localhost:5000/api/students', newRecordPayload);

      if (response.status === 201 || response.status === 200) {
        alert(`Database Entry Initialized:\nAccount provisioned for ${newName.toUpperCase()}!\nLogin Email: ${newRecordPayload.email}`);
        // Reset manual creation states
        setNewName('');
        setNewRoll('');
        setNewDept('');
        setNewMarks('');
        setNewAttendance('');
        fetchStudents(); // Refresh data layout matrix instantly
      }
    } catch (error) {
      alert(`Provisioning Denied: ${error.response?.data?.message || error.message}`);
    }
  };

  // 🗑️ STEP 4: DELETE RECORD PIPELINE (DELETE Request)
  const handleDeleteRecord = async (id, studentName) => {
    const confirmPurge = window.confirm(` CRITICAL ACTION: Permanently drop the entire academic entry row for ${studentName}? This cannot be undone.`);
    if (confirmPurge) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/students/${id}`);
        if (response.status === 200) {
          alert(`Document Purged Successfully.`);
          if (selectedStudentId === id) setSelectedStudentId('');
          fetchStudents(); // Refresh UI layout
        }
      } catch (error) {
        alert(`Deletion denied: ${error.message}`);
      }
    }
  };

  return (
    <div className="admin-dashboard-wrapper">
      
      <header className="admin-action-strip">
        <div className="admin-strip-branding">
          <span className={`role-badge ${isAdmin ? 'badge-superadmin' : 'badge-faculty'}`}>
            {isAdmin ? ' SYSTEM SUPERADMIN' : ' FACULTY PORTAL'}
          </span>
          <h1>{isAdmin ? 'Central Control Center' : 'Academic Grading Desk'}</h1>
        </div>
        <button onClick={() => onNavigate('home')} className="btn-admin-logout">
           Secure Logout
        </button>
      </header>

      <div className="admin-grid-layout">
        
        {/* LEFT COMPONENT: MASTER STUDENT MATRIX SHEET */}
        <main className="admin-main-panel">
          <div className="database-card-wrapper">
            <div className="card-header-flex">
              <h3> Core Academic Database Rows</h3>
            </div>
            
            <div className="table-responsive-scroll">
              <table className="db-data-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Roll Number</th>
                    <th>Department</th>
                    <th>Performance</th>
                    <th>Attendance</th>
                    {isAdmin && <th className="text-center">System Clearance Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr 
                      key={student.id} 
                      className={`table-row-item ${selectedStudentId === student.id ? 'row-inspecting' : ''}`}
                      onClick={() => setSelectedStudentId(student.id)}
                      title="Click to load full profile into modification tool"
                    >
                      <td className="font-bold-dark">{student.name}</td>
                      <td><code>{student.roll}</code></td>
                      <td><span className="dept-pill">{student.dept}</span></td>
                      <td className="font-bold-purple">{student.marks}%</td>
                      {/* 🌟 Displaying the percent formatting purely on the UI tier */}
                      <td>{student.attendance}%</td>
                      {isAdmin && (
                        <td className="text-center" onClick={(e) => e.stopPropagation()}>
                          <button 
                            onClick={() => handleDeleteRecord(student.id, student.name)} 
                            className="btn-table-action-delete"
                          >
                             Delete Row
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="table-tip-footer"> <em>Pro-tip: Click directly on any row inside the table to immediately open its deep profile variables below.</em></p>
          </div>
        </main>

        {/* RIGHT COMPONENT: DEEP INSPECTOR VARIABLE INJECTOR FORM */}
        <aside className="admin-side-panel">
          
          <div className="control-card-wrapper">
            <h3> Full Profile Inspector & Editor</h3>
            <p className="card-instruction-text">Select a student record to modify personal identifying details, department streams, and core metrics.</p>
            
            <form onSubmit={handleUpdateProfile} className="admin-panel-form">
              
              <div className="form-input-block">
                <label>Active Target Profile</label>
                <select 
                  value={selectedStudentId} 
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="admin-panel-input selector-highlight"
                >
                  <option value="">-- Click table row or choose here --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.roll})</option>
                  ))}
                </select>
              </div>

              {/* Input fields render automatically once targeted ID maps */}
              {selectedStudentId ? (
                <div className="inspector-fields-fadein">
                  
                  <div className="form-input-block">
                    <label>Edit Student Full Name</label>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="admin-panel-input"
                      required 
                    />
                  </div>

                  <div className="form-input-row-flex">
                    <div className="form-input-block">
                      <label>Roll Number</label>
                      <input 
                        type="text" 
                        value={editRoll}
                        onChange={(e) => setEditRoll(e.target.value)}
                        className="admin-panel-input"
                        required 
                      />
                    </div>
                    <div className="form-input-block">
                      <label>Department</label>
                      <input 
                        type="text" 
                        value={editDept}
                        onChange={(e) => setEditDept(e.target.value)}
                        className="admin-panel-input"
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-input-row-flex">
                    <div className="form-input-block">
                      <label>Score Matrix (%)</label>
                      <input 
                        type="number" 
                        min="0" max="100"
                        value={editMarks}
                        onChange={(e) => setEditMarks(e.target.value)}
                        className="admin-panel-input"
                        required 
                      />
                    </div>
                    <div className="form-input-block">
                      <label>Attendance Tracker (%)</label>
                      <input 
                        type="text" 
                        value={editAttendance}
                        onChange={(e) => setEditAttendance(e.target.value)}
                        className="admin-panel-input"
                        placeholder="e.g. 95"
                        required 
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-execute-modification">
                    Save Profile Changes
                  </button>
                  
                  <button type="button" onClick={() => setSelectedStudentId('')} className="btn-cancel-inspection">
                    Clear 
                  </button>

                </div>
              ) : (
                <div className="inspector-fallback-notice">
                  <span className="notice-icon"></span>
                  <p>No student card loaded. Choose a listing row from the central database ledger to inspect parameters.</p>
                </div>
              )}

            </form>
          </div>

          {/* INLINE ADD NEW STUDENT MODULE CARD PANEL */}
          <div className="control-card-wrapper" style={{ marginTop: '24px' }}>
            <h3>➕ Manual Student Enrolment</h3>
            <p className="card-instruction-text">Directly provision and register a brand new academic profile row straight into the cloud collection matrix.</p>
            
            <form onSubmit={handleAddStudent} className="admin-panel-form">
              
              <div className="form-input-block">
                <label>Enrol Full Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  className="admin-panel-input" 
                  placeholder="e.g. John Doe" 
                  required 
                />
              </div>

              <div className="form-input-row-flex">
                <div className="form-input-block">
                  <label>Roll Number</label>
                  <input 
                    type="text" 
                    value={newRoll} 
                    onChange={(e) => setNewRoll(e.target.value)} 
                    className="admin-panel-input" 
                    placeholder="e.g. NIE25CS001" 
                    required 
                  />
                </div>
                <div className="form-input-block">
                  <label>Department</label>
                  <input 
                    type="text" 
                    value={newDept} 
                    onChange={(e) => setNewDept(e.target.value)} 
                    className="admin-panel-input" 
                    placeholder="e.g. CSE" 
                    required 
                  />
                </div>
              </div>

              <div className="form-input-row-flex">
                <div className="form-input-block">
                  <label>Initial Score (%)</label>
                  <input 
                    type="number" 
                    min="0" max="100" 
                    value={newMarks} 
                    onChange={(e) => setNewMarks(e.target.value)} 
                    className="admin-panel-input" 
                    placeholder="0" 
                    required 
                  />
                </div>
                <div className="form-input-block">
                  <label>Attendance Status (%)</label>
                  <input 
                    type="text" 
                    value={newAttendance} 
                    onChange={(e) => setNewAttendance(e.target.value)} 
                    className="admin-panel-input" 
                    placeholder="85" 
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-execute-modification" 
                style={{ 
                  backgroundColor: '#10b981', 
                  borderColor: '#10b981', 
                  color: '#ffffff', 
                  fontWeight: '600',
                  marginTop: '12px'
                }}
              >
                Provision Student Profile
              </button>
            </form>
          </div>

          <div className={`control-card-wrapper safety-status-box ${isAdmin ? 'admin-unlocked' : 'faculty-locked'}`}>
            <h3> Administrative Power</h3>
            {isAdmin ? (
              <div className="security-alert-unlocked">
                <div className="pulse-alert-icon"></div>
                <p><strong>System Clearances: Unlocked.</strong> You have master deletion keys active. Purging an element completely drops it from the database.</p>
              </div>
            ) : (
              <div className="security-alert-locked">
                <div className="lock-icon"></div>
                <p><strong>Deletions Restricted.</strong> Row deletion tools are restricted to SuperAdmin tiers. Faculty accounts can edit details but cannot drop database rows.</p>
              </div>
            )}
          </div>

        </aside>

      </div>

    </div>
  );
};

export default StaffDashboard;