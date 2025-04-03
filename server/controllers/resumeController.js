import Resume from '../models/Resume.js';
import cloudinary from '../config/cloudinary.js';

// Upload Resume
export const uploadResume = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const resume = new Resume({
      name: req.body.name,
      email: req.body.email,
      resumeUrl: result.secure_url,
    });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload resume' });
  }
};

// Get All Resumes
export const getResumes = async (req, res) => {
  try {
    const { id } = req.params;
    if(id) {
      const resume = await Resume.findById(id);
      if (!resume) {
        return res.status(404).json({ error: 'Resume not found' });
      }
      return res.status(200).json(resume);
    }
    // If no ID is provided, return all resumes
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};

// Delete Resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resume' });
  }
};
