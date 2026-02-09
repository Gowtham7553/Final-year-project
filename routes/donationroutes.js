import express from "express";
import Donation from "../models/donation.js";
import Home from "../models/home.js";

const router = express.Router();

/* =====================================================
   📦 CREATE DONATION
===================================================== */
router.post("/create", async (req, res) => {
  try {

    const {
      donorId,
      homeId,
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

    if (!donorId || !homeId) {
      return res.status(400).json({ message: "Missing donor/home" });
    }

    const donation = new Donation({
      donorId,
      homeId,
      donorAddress,
      homeAddress,

      donorLocation:{ lat: donorLat, lng: donorLng },
      homeLocation:{ lat: homeLat, lng: homeLng },

      items:[{ category, description, quantity }],
      status:"Pending"
    });

    await donation.save();

    res.json({ message:"Donation created", donation });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message:"Server error" });
  }
});


/* =====================================================
   🏠 GET HOMES
===================================================== */
router.get("/homes", async (req,res)=>{
  try{
    const homes = await Home.find().select("homeName address location fullAddress phone");
    res.json(homes);
  }catch{
    res.status(500).json({message:"Failed to load homes"});
  }
});


/* =====================================================
   🚚 GET TASKS FOR VOLUNTEER
===================================================== */
router.get("/pending", async (req,res)=>{
  try{
    const donations = await Donation.find()
      .populate("homeId","homeName fullAddress location phone")
      .populate("donorId","name email");

    res.json(donations);
  }catch{
    res.status(500).json({message:"Error loading tasks"});
  }
});


/* =====================================================
   🙋 ACCEPT DELIVERY + GENERATE OTP
===================================================== */
router.put("/accept/:id", async (req,res)=>{
 try{
  const { volunteerId } = req.body;

  const donation = await Donation.findById(req.params.id);
  if(!donation) return res.status(404).json({message:"Not found"});

  donation.status = "Accepted";
  donation.volunteerId = volunteerId;

  // 🔐 generate OTP
  donation.otp = Math.floor(1000 + Math.random() * 9000).toString();

  await donation.save();

  console.log("OTP:", donation.otp);

  res.json({message:"Accepted", otp: donation.otp});

 }catch{
  res.status(500).json({message:"Error"});
 }
});


/* =====================================================
   📦 MARK PICKED
===================================================== */
router.put("/pickup/:id", async (req,res)=>{
  try{
    const donation = await Donation.findById(req.params.id);
    donation.status = "Picked";
    await donation.save();
    res.json({message:"Picked"});
  }catch{
    res.status(500).json({message:"Error"});
  }
});


/* =====================================================
   🔐 VERIFY OTP → MARK DELIVERED + KEEP VOLUNTEER
===================================================== */
router.post("/verify-otp/:id", async (req,res)=>{
 try{

  const { otp } = req.body;

  const donation = await Donation.findById(req.params.id);

  if(!donation){
    return res.status(404).json({message:"Donation not found"});
  }

  if(donation.otp !== otp){
    return res.status(400).json({message:"Wrong OTP"});
  }

  // ✅ KEEP volunteerId (VERY IMPORTANT)
  donation.status = "Delivered";
  donation.otp = "";

  await donation.save();

  console.log("✅ Delivered saved for volunteer:", donation.volunteerId);

  res.json({message:"Delivery completed"});

 }catch(err){
  console.log(err);
  res.status(500).json({message:"Error"});
 }
});



/* =====================================================
   📍 LIVE LOCATION UPDATE
===================================================== */
router.put("/location/:id", async (req,res)=>{
  try{
    const { latitude, longitude } = req.body;

    const donation = await Donation.findById(req.params.id);
    if(!donation) return res.status(404).json({message:"Not found"});

    donation.volunteerLocation = { latitude, longitude };
    await donation.save();

    res.json({message:"Location updated"});
  }catch{
    res.status(500).json({message:"Location error"});
  }
});
/* =====================================================
   📜 VOLUNTEER COMPLETED HISTORY (FINAL)
===================================================== */
router.get("/history/:volunteerId", async (req,res)=>{
 try{

  const { volunteerId } = req.params;

  console.log("📜 Fetch history for:", volunteerId);

  const donations = await Donation.find({
    volunteerId: volunteerId,
    status: "Delivered"
  })
  .populate("homeId","homeName")
  .sort({ updatedAt:-1 });

  console.log("✅ History found:", donations.length);

  res.json(donations);

 }catch(err){
  console.log("History error:",err);
  res.status(500).json({message:"History error"});
 }
});


export default router;
