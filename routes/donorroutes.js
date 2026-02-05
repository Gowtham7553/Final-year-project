import express from "express";
import bcrypt from "bcryptjs";
import Donor from "../models/donor.js";
import multer from "multer";

const router = express.Router();

/* =========================
   MULTER IMAGE STORAGE
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* =========================
   REGISTER DONOR
========================= */
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

/* =========================
   GET DONOR PROFILE
========================= */
router.get("/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id).select("-password");

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.json(donor);
  } catch (error) {
    console.error("❌ Donor fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   UPLOAD PROFILE IMAGE
========================= */
router.post("/upload/:id", upload.single("image"), async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    donor.profileImage = `/uploads/${req.file.filename}`;
    await donor.save();

    res.json({
      message: "Image uploaded successfully",
      image: donor.profileImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;
