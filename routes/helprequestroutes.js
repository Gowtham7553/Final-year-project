import express from "express";
import HelpRequest from "../models/helpRequest.js";
import crypto from "crypto";

const router = express.Router();

/* ===== AI PRIORITY ===== */
function calculatePriority(home, needType, urgency){

 let score = 0;

 // urgency weight
 if(urgency==="Critical") score+=100;
 else if(urgency==="Urgent") score+=70;
 else score+=40;

 // need type
 if(needType==="Medical") score+=60;
 if(needType==="Food") score+=50;

 // number of people
 score += (home.people || 20);

 // last donation days
 score += (home.lastDonationDays || 5) * 5;

 return score;
}

/* ===== CREATE REQUEST ===== */
router.post("/create", async(req,res)=>{

  const { homeId, needType, urgency, description } = req.body;

  // here we don't have home data so use default object
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
    aiPriorityScore:score,
    blockchainHash:hash
  });

  res.json(newRequest);
});

/* ===== GET ALL REQUESTS (Sorted by AI) ===== */
router.get("/", async (req,res)=>{

  const requests = await HelpRequest.find()
    .populate("homeId")
    .sort({ aiPriorityScore: -1, createdAt: -1 });

  res.json(requests);
});

export default router;