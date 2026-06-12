import express from 'express';
import { 
  addStudent, 
  getAllStudents, 
  getStudentById,
  deleteStudent, 
  updateStudent,
  loginUser // <-- 1. Imported your new login controller
} from '../controllers/studentController.js';

const router = express.Router();

// --- AUTHENTICATION PIPELINE ROUTE ---
router.post('/login', loginUser); // <-- 2. Added the login mount endpoint

// CRUD Route mappings
router.post('/students', addStudent);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.delete('/students/:id', deleteStudent);
router.put('/students/:id', updateStudent);

export default router;