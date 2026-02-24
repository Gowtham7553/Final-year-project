import express from "express";
import Donation from "../models/donation.js";
import Home from "../models/home.js";
import crypto from "crypto";

const router = express.Router();

/* =====================================================
   🧠 AI PRIORITY ALGORITHM
===================================================== */
function calculatePriority(data){

  const urgencyWeight = {
    medical: 1.0,
    food: 0.8,
    clothes: 0.6,
    education: 0.4,
    other: 0.3
  };

  let urgency =
    urgencyWeight[data.category?.toLowerCase()] || 0.5;

  let impact = data.childrenAffected
    ? data.childrenAffected / 100
    : 0.5;

  let waitingScore = 0.5;

  let historical = data.previousHelp
    ? data.previousHelp / 20
    : 0;

  let priority =
    urgency * 0.4 +
    impact * 0.3 +
    waitingScore * 0.2 -
    historical * 0.1;

  return Number(priority.toFixed(2));
}


/* =====================================================
   💰 + 📦 CREATE DONATION (MONEY + ITEMS)
===================================================== */
router.post("/create", async (req, res) => {
  try {

    const {
      donorId,
      homeId,
      amount,
      paymentMethod,

      category,
      description,
      quantity,

      donorAddress,
      homeAddress,
      donorLat,
      donorLng,
      homeLat,
      homeLng,
    } = req.body;

    if (!donorId) {
      return res.status(400).json({ message: "Missing donor" });
    }

    /* ================= MONEY DONATION ================= */
    if (amount) {

      const donation = new Donation({
        donorId,
        amount,
        paymentMethod,
        type: "money",
        status: "Paid"
      });

      await donation.save();
      return res.json({ message: "Money donated", donation });
    }

    /* ================= ITEM DONATION ================= */
    if (!homeId) {
      return res.status(400).json({ message: "Home required" });
    }

    // ⭐ AI PRIORITY
    const priorityScore = calculatePriority({
      category,
      childrenAffected: quantity
    });

    // ⭐ BLOCKCHAIN HASH
    const blockHash = crypto
      .createHash("sha256")
      .update(donorId + homeId + Date.now().toString())
      .digest("hex");

    const donation = new Donation({
      donorId,
      homeId,
      donorAddress,
      homeAddress,

      donorLocation: { lat: donorLat, lng: donorLng },
      homeLocation: { lat: homeLat, lng: homeLng },

      items: [{ category, description, quantity }],
      type: "items",
      priority: priorityScore,
      blockHash: blockHash,        // ⭐ blockchain
      status: "Pending"
    });

    await donation.save();

    console.log("🔗 Blockchain hash:", blockHash);

    res.json({
      message: "Item donation created",
      blockchainHash: blockHash,
      donation
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


/* =====================================================
   🏠 GET HOMES
===================================================== */
router.get("/homes", async (req,res)=>{
 try{
   const homes = await Home.find();
   res.json(homes);
 }catch{
   res.status(500).json({message:"Failed"}); 
 }
});


/* =====================================================
   🚚 VOLUNTEER TASKS (AI SORTED)
===================================================== */
router.get("/pending", async (req,res)=>{
 try{

   const donations = await Donation.find({
     type:"items",
     status:{ $ne:"Delivered" }
   })
   .populate("homeId","homeName fullAddress phone location")
   .populate("donorId","name")
   .sort({ priority:-1, createdAt:-1 }); // ⭐ AI sorting

   res.json(donations);

 }catch(err){
   console.log(err);
   res.status(500).json({message:"Error"});
 }
});


/* =====================================================
   🙋 ACCEPT DELIVERY
===================================================== */
router.put("/accept/:id", async (req,res)=>{
 try{
   const { volunteerId } = req.body;

   const donation = await Donation.findById(req.params.id);
   if(!donation) return res.status(404).json({message:"Not found"});

   donation.status="Accepted";
   donation.volunteerId=volunteerId;

   // ⭐ OTP FOR HOME
   donation.otp = Math.floor(1000+Math.random()*9000).toString();

   await donation.save();

   console.log("🏠 HOME OTP:", donation.otp);

   res.json({message:"Accepted"});

 }catch(err){
   console.log(err);
   res.status(500).json({message:"Error"});
 }
});


/* =====================================================
   📦 MARK PICKED
===================================================== */
router.put("/pickup/:id", async (req,res)=>{
 try{
   const donation=await Donation.findById(req.params.id);
   if(!donation) return res.status(404).json({message:"Not found"});

   donation.status="Picked";
   await donation.save();

   res.json({message:"Picked"});
 }catch{
   res.status(500).json({message:"Error"});
 }
});


/* =====================================================
   🔐 VERIFY OTP (HOME ENTERS)
===================================================== */
router.post("/verify-otp/:id", async (req,res)=>{
 try{
   const { otp } = req.body;

   const donation = await Donation.findById(req.params.id);
   if(!donation) return res.status(404).json({message:"Not found"});

   if(donation.otp !== otp){
     return res.status(400).json({message:"Wrong OTP"});
   }

   donation.status="Delivered";
   donation.otp="";
   await donation.save();

   res.json({message:"Delivered success"});

 }catch(err){
   console.log(err);
   res.status(500).json({message:"Error"});
 }
});


/* =====================================================
   📍 LIVE LOCATION UPDATE (VOLUNTEER)
===================================================== */
router.put("/location/:id", async (req,res)=>{
 try{
   const { latitude, longitude } = req.body;

   const donation = await Donation.findById(req.params.id);
   if(!donation) return res.status(404).json({message:"Not found"});

   donation.volunteerLocation={latitude,longitude};
   await donation.save();

   res.json({message:"Location updated"});

 }catch{
   res.status(500).json({message:"Location error"});
 }
});


/* =====================================================
   📜 VOLUNTEER HISTORY
===================================================== */
router.get("/history/:volunteerId", async (req,res)=>{
 try{

   const donations = await Donation.find({
     volunteerId:req.params.volunteerId,
     status:"Delivered",
     type:"items"
   })
   .populate("homeId","homeName")
   .sort({updatedAt:-1});

   res.json(donations);

 }catch{
   res.status(500).json({message:"History error"});
 }
});


/* =====================================================
   🏠 HOME GET OTP (POPUP)
===================================================== */
router.get("/home-otp/:donationId", async (req,res)=>{
 try{
   const donation = await Donation.findById(req.params.donationId);
   if(!donation) return res.status(404).json({message:"Not found"});

   res.json({otp:donation.otp});

 }catch{
   res.status(500).json({message:"OTP error"});
 }
});


/* =====================================================
   🤖 AI HOME MATCHING
===================================================== */
router.get("/ai-match/:donorLat/:donorLng", async (req,res)=>{
 try{

   const { donorLat, donorLng } = req.params;
   const homes = await Home.find();

   let bestHome=null;
   let bestScore=0;

   homes.forEach(home=>{
     if(!home.location) return;

     const dist =
       Math.sqrt(
         Math.pow(donorLat-home.location.latitude,2)+
         Math.pow(donorLng-home.location.longitude,2)
       );

     let score = (1/dist) + (home.childrenCount || 10)/100;

     if(score > bestScore){
       bestScore = score;
       bestHome = home;
     }
   });

   res.json(bestHome);

 }catch{
   res.status(500).json({message:"AI match error"});
 }
});

export default router;