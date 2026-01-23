import express from "express";
import bcrypt from "bcryptjs";
import Volunteer from "../models/volunteer.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, skills, availability } = req.body;

    // Check existing user
    const existingUser = await Volunteer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const volunteer = new Volunteer({
      fullName,
      email,
      password: hashedPassword,
      skills,
      availability,
    });

    await volunteer.save();

    res.status(201).json({
      message: "Volunteer account created successfully",
      volunteerId: volunteer._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
