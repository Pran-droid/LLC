import mongoose from "mongoose";
import Register from "../models/register.js";

export const createRegister = async (req, res) => {
	const register = req.body; // user will send this data

	if (!register.rollno || !register.password) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newRegister = new Register(product);

	try {
		await newRegister.save();
		res.status(201).json({ success: true, data: newRegister });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

