require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// 1. LOW LEVEL MANUAL CORS HEADERS (The "Bulletproof" way)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Allow any origin that sends a request
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, Accept");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  // Handle the 'preflight' Browser check (the OPTIONS request)
  if (req.method === "OPTIONS") {
    console.log(`✅ Preflight (OPTIONS) success for: ${origin}`);
    return res.status(204).end();
  }
  next();
});

// 2. SECONDARY CORS MIDDLEWARE (Safeguard)
app.use(cors());
app.use(express.json());

// Log for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url} received`);
  next();
});

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

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Portfolio API is running 🚀" });
});

app.get("/api/portfolio", (req, res) => {
  res.json({ success: true, data: portfolioData });
});

app.post("/api/contact", async (req, res) => {
  console.log("📨 Contact Request Body:", req.body);
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
      html: `
        <h3>Message from ${name} (${email})</h3>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("✅ Email sent successfully");
    res.json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("❌ Email failed:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server fully operational on port ${PORT}`);
});
