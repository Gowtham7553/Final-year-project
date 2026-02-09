import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import Home from "../models/home.js";

const router = express.Router();

/* ================= IMAGE STORAGE ================= */
const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"uploads/");
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname);
  }
});

const upload = multer({ storage });

/* ================= REGISTER HOME ================= */
router.post("/register", upload.single("image"), async (req,res)=>{
  try{
    console.log("📥 Incoming Home:", req.body);

    const existing = await Home.findOne({ email:req.body.email });
    if(existing){
      return res.status(400).json({message:"Email already registered"});
    }

    const hashedPassword = await bcrypt.hash(req.body.password,10);

    const home = new Home({
      homeName:req.body.homeName,
      registrationNumber:req.body.registrationNumber,
      representativeName:req.body.representativeName,
      phone:req.body.phone,
      email:req.body.email,
      password:hashedPassword,
      about:req.body.about,
      capacity:req.body.capacity,

      address:{
        street:req.body.street,
        city:req.body.city,
        zipCode:req.body.zipCode,
      },

      // 📍 SAVE MAP LOCATION
      location:{
        latitude: req.body.latitude ? Number(req.body.latitude) : 0,
        longitude: req.body.longitude ? Number(req.body.longitude) : 0
      },

      fullAddress:req.body.fullAddress || "",

      image:req.file ? `/uploads/${req.file.filename}` : "",
      role:"Home"
    });

    const saved = await home.save();

    console.log("✅ Home saved with location:", saved.location);

    res.status(201).json({
      message:"Home registered successfully",
      homeId:saved._id
    });

  }catch(error){
    console.log("❌ Home register error:", error);
    res.status(500).json({message:"Registration failed"});
  }
});

/* ================= GET HOME PROFILE ================= */
router.get("/:id", async (req,res)=>{
  try{
    const home = await Home.findById(req.params.id).select("-password");

    if(!home){
      return res.status(404).json({message:"Home not found"});
    }

    res.json(home);

  }catch(error){
    console.log(error);
    res.status(500).json({message:"Server error"});
  }
});

/* ================= GET ALL HOMES WITH LOCATION ================= */
/* For donor & volunteer delivery */
router.get("/", async (req,res)=>{
  try{
    const homes = await Home.find().select(
      "homeName address fullAddress location image"
    );

    res.json(homes);
  }catch{
    res.status(500).json({message:"Failed to load homes"});
  }
});

export default router;
