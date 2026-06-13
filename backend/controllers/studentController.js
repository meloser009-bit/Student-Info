import Student from '../models/students.js';

// @desc    Authenticate user & verify access roles
// @route   POST /api/students/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. HARDCODED FACULTY BYPASS GATEWAY
    if (email === "faculty@eduflow.com" && password === "Faculty@2026") {
      return res.status(200).json({
        success: true,
        role: "faculty",
        name: "Faculty Lead"
      });
    }

    // 2. HARDCODED SUPERADMIN BYPASS GATEWAY
    if (email === "admin@eduflow.com" && password === "Admin@2026") {
      return res.status(200).json({
        success: true,
        role: "admin",
        name: "System Root Admin"
      });
    }

    // 3. DYNAMIC DATABASE STUDENT SEARCH
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(401).json({ success: false, message: "Invalid Email Address or Credentials" });
    }

    // Direct string match verification for hackathon rapid prototype integration
    if (student.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid Password Security Key" });
    }

    // Authentication Success Response matching your schema properties
    res.status(200).json({
      success: true,
      _id: student._id, // 🌟 FIXED: Passed database ID down so your useEffect sync can find it!
      role: student.role || 'student',
      name: student.name,
      rollNumber: student.rollNumber,
      course: student.course,
      marks: student.marks,
      attendance: student.attendance ?? 0, // 🌟 FIXED: Included the live attendance metric field
      email: student.email
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server authentication error", error: error.message });
  }
};

// @desc    Add a new student
// @route   POST /api/students
export const addStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: "Student data added successfully", data: newStudent });        
  } catch (error) {
    res.status(400).json({ message: "Error adding student", error: error.message });
  }
};

// @desc    Get all students
// @route   GET /api/students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
};

// @desc    Get a single student profile
// @route   GET /api/students/:id
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: "Invalid Student ID format", error: error.message });
  }
};

// @desc    Delete a student record
// @route   DELETE /api/students/:id
export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student record not found" });
    }
    res.status(200).json({ message: "Student data deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting student", error: error.message });
  }
};

// @desc    Update a student record
// @route   PUT /api/students/:id
export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student record not found" });
    }
    res.status(200).json({ message: "Data updated successfully", data: updatedStudent });
  } catch (error) {
    res.status(400).json({ message: "Error updating student", error: error.message });
  }
};