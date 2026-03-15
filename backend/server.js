require("dotenv").config();
const express = require("express");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);

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

// Log every request to help debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} received`);
  next();
});

// ── Portfolio Data ──────────────────────────────────────────────────────────
const portfolioData = {
  personal: {
    name: "Bestha Mahesh Babu",
    title: "AI & Full-Stack Developer",
    email: "maheshbabu02456@gmail.com",
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

app.get("/", (req, res) => res.json({ status: "OK", message: "Portfolio Backend is Live!" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Portfolio API is running 🚀" });
});

app.get("/api/portfolio", (req, res) => {
  res.json({ success: true, data: portfolioData });
});

// GET contact (to prevent "Cannot GET" error)
app.get("/api/contact", (req, res) => {
  res.json({ message: "Please use POST to send messages." });
});

// POST contact (Main functionality using RESEND API)
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Default sender for free accounts
      to: 'maheshbabu02456@gmail.com',
      subject: `Portfolio: ${subject || "New Message"}`,
      html: `
        <h3>Message from ${name} (${email})</h3>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error("❌ Resend Error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    console.log("✅ Email sent via Resend:", data.id);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("❌ Server Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server on port ${PORT}`);
});
