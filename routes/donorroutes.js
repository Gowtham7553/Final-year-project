import express from "express";
import bcrypt from "bcryptjs";
import Donor from "../models/donor.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log("📥 Incoming Donor Data:", req.body);

    const { email, password } = req.body;

    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const donor = new Donor({
      ...req.body,
      password: hashedPassword,
    });

    const savedDonor = await donor.save();

    console.log("✅ Donor saved:", savedDonor);

    res.status(201).json({
      message: "Donor registered successfully",
      donorId: savedDonor._id,
    });
  } catch (error) {
    console.error("❌ Donor register error:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});

export default router;
