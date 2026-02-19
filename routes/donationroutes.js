import express from "express";
import Donation from "../models/donation.js";
import Home from "../models/home.js";

const router = express.Router();

/* =====================================================
   💰 + 📦 CREATE DONATION
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

    /* 💰 MONEY DONATION */
    if (amount) {

      const donation = new Donation({
        donorId,
        amount,
        paymentMethod,
        type:"money",
        status:"Paid"
      });

      await donation.save();
      return res.json({ message:"Money donated", donation });
    }

    /* 📦 ITEM DONATION */
    if (!homeId) {
      return res.status(400).json({ message:"Home required" });
    }

    const donation = new Donation({
      donorId,
      homeId,
      donorAddress,
      homeAddress,

      donorLocation:{ lat: donorLat, lng: donorLng },
      homeLocation:{ lat: homeLat, lng: homeLng },

      items:[{ category, description, quantity }],
      type:"items",
      status:"Pending"
    });

    await donation.save();

    res.json({ message:"Item donation created", donation });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message:"Server error" });
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
   🚚 VOLUNTEER TASKS (ONLY ITEMS)
===================================================== */
router.get("/pending", async (req,res)=>{
 try{

   const donations = await Donation.find({
     type:"items",
     status:{ $ne:"Delivered" }
   })
   .populate("homeId","homeName fullAddress phone location")
   .populate("donorId","name")
   .sort({createdAt:-1});

   res.json(donations);

 }catch(err){
   console.log(err);
   res.status(500).json({message:"Error"});
 }
});


/* =====================================================
   🙋 ACCEPT
===================================================== */
router.put("/accept/:id", async (req,res)=>{
 try{
   const { volunteerId } = req.body;

   const donation = await Donation.findById(req.params.id);
   if(!donation) return res.status(404).json({message:"Not found"});

   donation.status="Accepted";
   donation.volunteerId=volunteerId;

   // OTP for home
   donation.otp=Math.floor(1000+Math.random()*9000).toString();

   await donation.save();

   console.log("🏠 HOME OTP:", donation.otp);

   res.json({message:"Accepted"});

 }catch(err){
   console.log(err);
   res.status(500).json({message:"Error"});
 }
});


/* =====================================================
   📦 PICKED
===================================================== */
router.put("/pickup/:id", async (req,res)=>{
 try{
   const donation=await Donation.findById(req.params.id);
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
   📍 LIVE LOCATION UPDATE
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
   🏠 HOME GET OTP
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

export default router;
