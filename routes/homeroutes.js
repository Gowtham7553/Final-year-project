import express from "express";
import Home from "../models/home.js";

const router = express.Router(); // ✅ THIS WAS MISSING

router.post("/register", async (req, res) => {
  try {
    console.log("📥 Incoming Home Data:", req.body);

    const home = new Home(req.body);
    const savedHome = await home.save();

    console.log("✅ Home saved:", savedHome);

    res.status(201).json({
      message: "Home registered successfully",
      homeId: savedHome._id,
    });
  } catch (error) {
    console.error("❌ Home save error:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
});

export default router;
