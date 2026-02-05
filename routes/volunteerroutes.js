import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import Volunteer from "../models/volunteer.js";

const router = express.Router();

/* ================= IMAGE STORAGE ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= SIGNUP ================= */
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, phone, password, skills, availability } = req.body;

    const existingUser = await Volunteer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const volunteer = new Volunteer({
      fullName,
      email,
      phone,              // ⭐ SAVE PHONE
      password: hashedPassword,
      skills,
      availability,
    });

    await volunteer.save();

    res.status(201).json({
      message: "Volunteer created",
      volunteerId: volunteer._id,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

/* ================= GET PROFILE ================= */
router.get("/:id", async (req, res) => {
  try {
    const volunteer = await Volunteer
      .findById(req.params.id)
      .select("-password");

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json(volunteer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPLOAD IMAGE ================= */
router.post("/upload/:id", upload.single("image"), async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    volunteer.image = `/uploads/${req.file.filename}`;
    await volunteer.save();

    res.json({
      message: "Image uploaded",
      image: volunteer.image,
    });
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
