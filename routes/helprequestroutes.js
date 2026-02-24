import express from "express";
import HelpRequest from "../models/helprequest.js";
import crypto from "crypto";

const router = express.Router();

/* ===== AI PRIORITY ===== */
function calculatePriority(urgency, needType){

  let score = 0;

  if(urgency==="Critical") score+=100;
  else if(urgency==="Urgent") score+=70;
  else score+=40;

  if(needType==="Medical") score+=50;
  if(needType==="Food") score+=40;

  return score;
}

/* ===== CREATE REQUEST ===== */
router.post("/create", async(req,res)=>{

  const { homeId, needType, urgency, description } = req.body;

  const score = calculatePriority(urgency,needType);

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
router.get("/", async(req,res)=>{

  const requests = await HelpRequest.find()
    .populate("homeId")
    .sort({ aiPriorityScore:-1 });

  res.json(requests);
});

export default router;