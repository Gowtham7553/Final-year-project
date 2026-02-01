import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import volunteerRoutes from "./routes/volunteerroutes.js";
import homeRoutes from "./routes/homeroutes.js";
import donorRoutes from "./routes/donorroutes.js";
import authRoutes from "./routes/authroutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/volunteers", volunteerRoutes);
app.use("/api/homes", homeRoutes);
app.use("/api/donors", donorRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
