import express from "express";
import Donation from "../models/donation.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    console.log("📥 Donation Data:", req.body);

    const donation = new Donation({
      donorId: req.body.donorId,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
    });

    const savedDonation = await donation.save();

    res.status(201).json({
      message: "Donation successful",
      donation: savedDonation,
    });
  } catch (error) {
    console.error("❌ Donation error:", error);
    res.status(500).json({ message: "Donation failed" });
  }
});
// GET donation history by donor
router.get("/history/:donorId", async (req, res) => {
  try {
    const { donorId } = req.params;

    const donations = await Donation.find({ donorId })
      .sort({ createdAt: -1 });

    res.json({
      count: donations.length,
      totalAmount: donations.reduce(
        (sum, d) => sum + d.amount,
        0
      ),
      donations,
    });
  } catch (error) {
    console.error("❌ History error:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});


export default router; // ✅ THIS FIXES EVERYTHING
