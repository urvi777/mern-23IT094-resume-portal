import express from 'express';
import multer from 'multer';
import { uploadResume, getResumes, deleteResume } from '../controllers/resumeController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/resumes', upload.single('resume'), uploadResume);
router.get('/resumes', getResumes);
router.get("/resumes/:id", getResumes);
router.delete('/resumes/:id', deleteResume);

export default router;
