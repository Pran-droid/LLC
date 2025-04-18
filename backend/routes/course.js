import express from "express";
import Course from "../models/course.js";


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json({success: true, data: courses});
    }catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error' });
    }
}); 

router.get('/lifestyle', async (req, res) => {
    try {
        const courses = await Course.find({category: "Lifestyle"});
        res.status(200).json({success: true, data: courses});
    }catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error' });
    }
}); 
router.get('/arts', async (req, res) => {
    try {
        const courses = await Course.find({category: "Art"});
        res.status(200).json({success: true, data: courses});
    }catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error' });
    }
}); 
router.get('/sport', async (req, res) => {
    try {
        const courses = await Course.find({category: "Sports"});
        res.status(200).json({success: true, data: courses});
    }catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error' });
    }
}); 
router.get('/technical', async (req, res) => {
    try {
        const courses = await Course.find({category: "Technical"});
        res.status(200).json({success: true, data: courses});
    }catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error' });
    }
}); 
router.get('/miscellaneous', async (req, res) => {
    try {
        const courses = await Course.find({category: "Miscellaneous"});
        res.status(200).json({success: true, data: courses});
    }catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error' });
    }
}); 

router.post('/', async (req, res) => {
    const course = req.body;
    if (!course.id || !course.name || !course.image || !course.description ) { 
        return res.status(400).json({success:false, message: 'Please fill all the fields' });
    }
    
    const newCourse = new Course(course);
    try {
        await newCourse.save();
        res.status(201).json({success:true, message: 'course successful' });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({success:false, message: 'course already Registered' });
        }
        res.status(500).json({success:false, message: 'Server error' });
    }
});

export default router;