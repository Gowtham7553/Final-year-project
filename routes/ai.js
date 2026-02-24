import express from "express";
import Home from "../models/home.js";
import Donation from "../models/donation.js";

const router = express.Router();

/* =====================================================
   🧠 AI PRIORITY ALGORITHM (LEVEL 5)
===================================================== */
function calculatePriority(home){

  let score = 0;

  // more people = more priority
  score += home.people * 2;

  // if no food stock
  if(home.foodNeeded) score += 40;

  // medical emergency
  if(home.medicalNeeded) score += 50;

  // if last donation long ago
  const days = home.lastDonationDays || 5;
  score += days * 5;

  return score;
}

/* =====================================================
   🤖 GET MOST URGENT HOME FROM DATABASE
===================================================== */
async function getMostUrgentHome(){

  const homes = await Home.find();

  if(homes.length === 0) return null;

  let scoredHomes = homes.map(h => ({
    ...h._doc,
    score: calculatePriority(h)
  }));

  scoredHomes.sort((a,b)=>b.score-a.score);

  return scoredHomes[0];
}

/* =====================================================
   🤖 AI CHAT ROUTE
===================================================== */
router.post("/chat", async (req,res)=>{

  const msg = req.body.message?.toLowerCase() || "";
  let reply="";

  try{

    /* ===== DONATION QUERY ===== */
    if(msg.includes("donate")){
      const homes = await Home.find().limit(3);

      if(homes.length===0){
        reply="No homes registered yet.";
      }else{
        reply="You can donate to:\n";
        homes.forEach(h=>{
          reply += `• ${h.name} (${h.location})\n`;
        });
      }
    }

    /* ===== VOLUNTEER ===== */
    else if(msg.includes("volunteer")){
      reply="Register as volunteer and accept delivery from dashboard.";
    }

    /* ===== URGENT PREDICTION ===== */
    else if(msg.includes("urgent")){
      const urgent = await getMostUrgentHome();

      if(!urgent){
        reply="No homes found in database.";
      }else{
        reply = `🚨 MOST URGENT HOME NOW\n\n${urgent.name}\n📍 ${urgent.location}\n👥 ${urgent.people} people\n⚠ Needs immediate help`;
      }
    }

    /* ===== ANALYTICS ===== */
    else if(msg.includes("stats") || msg.includes("report")){
      const totalHomes = await Home.countDocuments();
      const totalDonations = await Donation.countDocuments();

      reply = `📊 HOPECONNECT AI REPORT\n\n🏠 Homes: ${totalHomes}\n🎁 Donations: ${totalDonations}`;
    }

    else{
      reply="Ask about donate, urgent help or stats.";
    }

    res.json({reply});

  }catch(err){
    console.log(err);
    res.json({reply:"AI error"});
  }

});

export default router;