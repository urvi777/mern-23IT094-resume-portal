import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeUrl: { type: String, required: true },
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
