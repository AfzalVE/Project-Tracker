import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import sectionRoutes from './routes/sectionRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://127.0.0.1:5500' }));
app.use(express.json());

app.use('/api/sections', sectionRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
