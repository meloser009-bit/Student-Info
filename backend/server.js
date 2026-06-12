import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

// Establish the Database Connection
connectDB();

// Global Middlewares
app.use(cors()); // Enables cross-origin requests from your frontend React client port
app.use(express.json());

// Bind student endpoint routes under the "/api" prefix
app.use('/api', studentRoutes);

// Base Diagnostic Route
app.get('/', (req, res) => {
  res.send('API structural entry point is active.');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running smoothly on port ${PORT}`);
});