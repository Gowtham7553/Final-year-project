import express from "express";
import bcrypt from "bcryptjs";
import Volunteer from "../models/volunteer.js";
import Donor from "../models/donor.js";
import Home from "../models/home.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    // 🔹 ROLE BASED COLLECTION CHECK
    if (role === "Volunteer") {
      user = await Volunteer.findOne({ email });
    } else if (role === "Donor") {
      user = await Donor.findOne({ email });
    } else if (role === "Home") {
      user = await Home.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({
        message: `${role} account not found`,
      });
    }

    // 🔹 PASSWORD CHECK
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // 🔹 OPTIONAL: HOME APPROVAL CHECK
    if (role === "Home" && user.status !== "APPROVED") {
      return res.status(403).json({
        message: "Home not approved yet",
      });
    }

    res.json({
      message: "Login successful",
      role,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

export default router;
