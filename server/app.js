import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import resumeRoutes from './routes/resumeRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();


// Middleware to parse JSON
app.use(express.json());

// MongoDB connection string
const connectionString = "mongodb+srv://23it094:spiKz8QUTVF06j39@cluster0.u4tnng6.mongodb.net/mydatabase?retryWrites=true&w=majority";

// Routes
app.use('/api', resumeRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Resume Upload API');
});

// Connect to MongoDB
mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Use a fallback for the port in case it's not defined in .env
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
