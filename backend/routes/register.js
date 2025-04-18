import express from "express";
import Register from "../models/register.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const register = req.body;
    if (!register.rollno || !register.password || !register.choice1 || !register.choice2 || !register.choice3 || !register.choice4) { 
        return res.status(400).json({success:false, message: 'Please fill all the fields' });
    }
    if (register.choice1 == register.choice2 || 
        register.choice1 == register.choice3 || 
        register.choice1 == register.choice4 || 
        register.choice2 == register.choice3 ||
        register.choice2 == register.choice4 ||
        register.choice3 == register.choice4) {
        return res.status(400).json({success:false, message: 'Please select different choices' });
        
    }
    
    const newRegister = new Register(register);
    try {
        await newRegister.save();
        res.status(201).json({success:true, message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({success:false, message: 'Roll Number:' + register.rollno + ' already Registered' });
        }
        res.status(500).json({success:false, message: 'Server error' });
    }
});

export default router;