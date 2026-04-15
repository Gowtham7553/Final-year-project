console.log("🔥 helprequestroutes loaded");
import express from "express";
import HelpRequest from "../models/helprequest.js";
import crypto from "crypto";

const router = express.Router();

/* 🔥 BASE PRIORITY */
function getBasePriority(needType) {
  if (needType === "Medical") return 10;
  if (needType === "Food") return 9;
  if (needType === "Education") return 8;
  return 5;
}

/* 🤖 AI PRIORITY */
function calculatePriority(home, needType, urgency) {

  let score = 0;

  score += getBasePriority(needType) * 10;

  if (urgency === "Critical") score += 100;
  else if (urgency === "Urgent") score += 70;
  else score += 40;

  score += (home?.people || 20);
  score += (home?.lastDonationDays || 5) * 5;

  return score;
}

/* 🚀 CREATE REQUEST */
router.post("/create", async (req, res) => {

  try {
    const { homeId, needType, urgency, description } = req.body;

    const score = calculatePriority({}, needType, urgency);

    const hash = crypto
      .createHash("sha256")
      .update(homeId + needType + urgency + description + score)
      .digest("hex");

    const newRequest = await HelpRequest.create({
      homeId,
      needType,
      urgency,
      description,
      aiPriorityScore: score,
      blockchainHash: hash,
      status: "pending"
    });

    console.log("✅ New Request Created:", newRequest);

    res.json(newRequest);

  } catch (err) {
    console.log("❌ Create Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* 📥 GET REQUESTS (FOR DONOR) */
router.get("/", async (req, res) => {

  try {
    const requests = await HelpRequest.find({ status: "pending" })
      .populate("homeId")
      .sort({ aiPriorityScore: -1, createdAt: -1 });

    console.log("📦 Fetched Requests:", requests);

    res.json(requests);

  } catch (err) {
    console.log("❌ Fetch Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* 🏠 GET REQUESTS BY HOME (FOR HOME PROFILE) */
router.get("/home/:homeId", async (req, res) => {
  try {
    const { homeId } = req.params;
    const requests = await HelpRequest.find({ homeId })
      .sort({ createdAt: -1 });

    console.log("🏠 Fetched Requests for Home:", homeId, "Count:", requests.length);
    requests.forEach(req => {
      console.log("  Request:", req._id, "Status:", req.status, "OTP:", req.otp);
    });

    res.json(requests);

  } catch (err) {
    console.log("❌ Home Requests Fetch Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* 🚚 SAVE PICKUP LOCATION */
router.post("/pickup/:id", async (req, res) => {
  console.log("🔥 PICKUP ROUTE HIT");

  try {
    const { pickupLocation } = req.body;

    console.log("📍 Pickup Location Received:", pickupLocation);

    if (!pickupLocation) {
      return res.status(400).json({ error: "Pickup location missing" });
    }

    const updatedRequest = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      {
        pickupLocation,
        status: "assigned", // 🔥 task assigned to volunteer
        otp: Math.floor(1000 + Math.random() * 9000).toString()
      },
      { returnDocument: 'after' }
    );

    console.log("✅ Updated Request with Pickup:", updatedRequest);

    res.json(updatedRequest);

  } catch (err) {
    console.log("❌ Pickup Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* 📥 GET ASSIGNED REQUESTS (FOR VOLUNTEER) */
router.get("/assigned", async (req, res) => {
  try {
    const requests = await HelpRequest.find({ 
      status: { $in: ["assigned", "Picked"] } 
    })
      .populate("homeId")
      .sort({ updatedAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 📦 MARK PICKED (FOR VOLUNTEER) */
router.put("/pickup/:id", async (req, res) => {
  try {
    const updated = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      { status: "Picked" },
      { returnDocument: 'after' }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 🔐 COMPLETED (FOR VOLUNTEER) */
router.put("/complete/:id", async (req, res) => {
  try {
    const { otp } = req.body;
    const request = await HelpRequest.findById(req.params.id);
    
    if (!request) return res.status(404).json({ error: "Not found" });
    if (request.otp && request.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const updated = await HelpRequest.findByIdAndUpdate(
      req.params.id,
      { status: "Completed" },
      { returnDocument: 'after' }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* 🏠 GET ALL REQUESTS FOR A HOME */
router.get("/home/:id", async (req, res) => {
  try {
    const requests = await HelpRequest.find({ homeId: req.params.id })
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;