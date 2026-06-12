import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    course: {
      type: String,
      required: true,
      trim: true
    },
    marks: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensured unique so two students can't share an email
      trim: true
    },
    // --- ADDED AUTHENTICATION FIELDS ---
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'student' // Defaults to student automatically
    }
  },
  {
    timestamps: true // Automatically creates createdAt and updatedAt fields
  }
);

const Student = mongoose.model('Student', StudentSchema);
export default Student;