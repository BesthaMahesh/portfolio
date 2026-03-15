require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// 1. GLOBAL CORS HEADERS (Forced)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ── Portfolio Data ──────────────────────────────────────────────────────────
const portfolioData = {
  personal: {
    name: "Bestha Mahesh Babu",
    title: "AI & Full-Stack Developer",
    email: "maheshbabu02456@gmail.com",
    phone: "8179208780",
    linkedin: "https://linkedin.com/in/mahesh-bestha-354232303",
    summary: "AI and Full-Stack developer building intelligent web applications.",
  },
  projects: [
    { id: 1, title: "AgriAI", url: "https://farmer-psi.vercel.app" },
    { id: 2, title: "AI Resume Builder", url: "https://ai-resume-platform-woad.vercel.app" },
    { id: 3, title: "ShopMe", url: "https://shopme-ecommerce-lime.vercel.app/" },
    { id: 4, title: "VisionTalk", url: "https://vision-talk-ai-chatbot.vercel.app/" },
  ]
};

// ── Routes ──────────────────────────────────────────────────────────────────

// Home route
app.get("/", (req, res) => res.json({ status: "OK", message: "Portfolio Backend is Live!" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Portfolio API is running 🚀" });
});

// GET contact (to prevent "Cannot GET" error)
app.get("/api/contact", (req, res) => {
  res.json({ message: "Please use POST to send messages." });
});

// POST contact (Main functionality)
app.post("/api/contact", async (req, res) => {
  console.log("📨 Received form:", req.body);
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: "maheshbabu02456@gmail.com",
      subject: `Portfolio: ${subject || "New Message"}`,
      html: `<h3>New message from ${name} (${email})</h3><p>${message}</p>`,
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Send fail:", error.message);
    res.status(500).json({ success: false, error: "Server could not send email." });
  }
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server on port ${PORT}`);
});
