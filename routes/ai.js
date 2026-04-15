import express from "express";
import fetch from "node-fetch";
import Home from "../models/home.js";
import Donation from "../models/donation.js";

const router = express.Router();

console.log("🤖 HYBRID AI (DB + GROQ) ACTIVE");

/* ================= PRIORITY ================= */
function calculatePriority(home) {
  let score = 0;

  score += (home.people || 0) * 2;

  if (home.foodNeeded) score += 50;
  if (home.medicalNeeded) score += 60;

  const days = home.lastDonationDays || 5;
  score += days * 5;

  return score;
}

/* ================= FORMAT ================= */
function formatHome(home) {
  const name = home.homeName || "Unknown Home";

  const location =
    home.fullAddress ||
    `${home.address?.street || ""}, ${home.address?.city || ""}` ||
    "Location not available";

  const people = home.people || home.capacity || 0;

  return `🏠 ${name}
📍 ${location}
👥 ${people} children
🍛 Food Needed: ${home.foodNeeded ? "Yes" : "No"}
🏥 Medical Needed: ${home.medicalNeeded ? "Yes" : "No"}`;
}

/* ================= URGENT ================= */
async function getUrgentHomes() {
  const homes = await Home.find();

  if (!homes.length) return [];

  const scored = homes.map(h => {
    const obj = h.toObject();
    return { ...obj, score: calculatePriority(obj) };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3);
}

/* ================= GROQ FALLBACK ================= */
async function askGroq(message) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content: "You are HopeConnect AI. Help users with donation, volunteering, and social help in a friendly way."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    return data?.choices?.[0]?.message?.content || null;

  } catch (error) {
    console.log("❌ GROQ ERROR:", error);
    return null;
  }
}

/* ================= CHAT ================= */
router.post("/chat", async (req, res) => {

  const msg = req.body.message?.toLowerCase() || "";
  console.log("📩 Message:", msg);

  try {
    let reply = "";

    /* ===== GREETING ===== */
    if (msg.includes("hi") || msg.includes("hello")) {
      reply = "Hi 👋 Welcome to HopeConnect!\nHow can I help you today?";
    }

    /* ===== DONATE ===== */
    else if (msg.includes("donate")) {
      const homes = await Home.find().limit(3);

      if (!homes.length) {
        reply = "No homes available for donation right now.";
      } else {
        reply = "❤️ Here are homes you can support:\n\n";
        homes.forEach((h, i) => {
          reply += `${i + 1}.\n${formatHome(h)}\n\n`;
        });
      }
    }

    /* ===== URGENT ===== */
    else if (msg.includes("urgent")) {
      const urgentHomes = await getUrgentHomes();

      if (!urgentHomes.length) {
        reply = "No urgent needs at the moment 🎉";
      } else {
        reply = "🚨 Most urgent homes right now:\n\n";
        urgentHomes.forEach((h, i) => {
          reply += `${i + 1}.\n${formatHome(h)}\n\n`;
        });
      }
    }

    /* ===== LOCATION ===== */
    else if (msg.includes("near") || msg.includes("location")) {
      const homes = await Home.find().limit(3);

      if (!homes.length) {
        reply = "No location data available.";
      } else {
        reply = "📍 Here are some homes:\n\n";
        homes.forEach((h, i) => {
          reply += `${i + 1}. ${h.homeName}\n📍 ${h.fullAddress}\n\n`;
        });
      }
    }

    /* ===== VOLUNTEER ===== */
    else if (msg.includes("volunteer")) {
      reply =
        "🤝 You can volunteer by registering and selecting tasks.\nYour help makes a big difference ❤️";
    }

    /* ===== STATS ===== */
    else if (msg.includes("stats") || msg.includes("report")) {
      const totalHomes = await Home.countDocuments();
      const totalDonations = await Donation.countDocuments();

      reply =
        "📊 HopeConnect Stats:\n\n" +
        `🏠 Homes: ${totalHomes}\n` +
        `🎁 Donations: ${totalDonations}`;
    }

    /* ===== GROQ AI FALLBACK ===== */
    else {
      const aiReply = await askGroq(msg);

      if (aiReply) {
        reply = aiReply;
      } else {
        reply =
          "I'm here to help 😊\n\nTry asking:\n" +
          "• donate\n• urgent help\n• home locations\n• volunteer\n• stats";
      }
    }

    res.json({ reply });

  } catch (err) {
    console.log("❌ ERROR:", err);
    res.json({ reply: "Something went wrong 😔" });
  }
});

export default router;