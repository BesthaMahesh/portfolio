require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// 1. STANDARD CORS MIDDLEWARE (Allow all for debugging)
app.use(cors({
  origin: true, // This reflects the origin of the request back to the requester
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// 2. EXPLICIT OPTIONS HANDLER (FOR PREFLIGHT)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.sendStatus(200);
});

app.use(express.json());

// Log every request to help debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} from ${req.headers.origin}`);
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
    summary:
      "AI and Full-Stack developer with experience building intelligent web applications using machine learning models and modern web technologies.",
  },

  projects: [
    {
      id: 1,
      title: "AgriAI – Smart Farming Prediction Platform",
      url: "https://farmer-psi.vercel.app",
      description: "An AI-powered smart farming platform using machine learning.",
      tech: ["React.js", "Python", "CNN", "OpenAI API"],
      category: "AI / Full-Stack",
    },
    {
      id: 2,
      title: "AI Resume Builder Platform",
      url: "https://ai-resume-platform-woad.vercel.app",
      description: "An AI-powered resume builder.",
      tech: ["React.js", "AI APIs", "JavaScript"],
      category: "AI / Web App",
    },
    {
      id: 3,
      title: "ShopMe – AI E-commerce Platform",
      url: "https://shopme-ecommerce-lime.vercel.app/",
      description: "A premium e-commerce application built with React and Node.js.",
      tech: ["React.js", "Node.js", "Express", "AI Toolkit"],
      category: "Full-Stack AI",
    },
    {
      id: 4,
      title: "VisionTalk – AI Multi-modal Chatbot",
      url: "https://vision-talk-ai-chatbot.vercel.app/",
      description: "A sophisticated multi-modal AI chatbot.",
      tech: ["React.js", "AI Vision APIs", "Vite"],
      category: "AI / Multi-modal",
    },
  ],

  skills: {
    Programming: ["Python", "JavaScript", "HTML5", "CSS3"],
    "Frameworks & Libraries": ["React.js", "Flask", "Scikit-Learn", "Node.js"],
    "AI & ML": ["Machine Learning", "CNN Models", "Prediction Systems"],
  },

  certifications: [
    { title: "Azure AI Fundamentals", issuer: "Microsoft", year: "2025" },
    { title: "Agentforce Specialist", issuer: "Salesforce", year: "2025" },
    { title: "Generative AI Professional", issuer: "Oracle", year: "2025" },
  ],

  education: [
    {
      degree: "B.Tech – Computer Science & Engineering (AI & ML)",
      institution: "RGMCET",
      year: "2027",
    },
  ],
};

// ── Routes ──────────────────────────────────────────────────────────────────

app.get("/", (req, res) => res.json({ status: "OK", message: "Server is alive" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Portfolio API is running 🚀" });
});

app.get("/api/portfolio", (req, res) => {
  res.json({ success: true, data: portfolioData });
});

app.post("/api/contact", async (req, res) => {
  console.log("Contact form payload:", req.body);
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

    res.json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Email send fail:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server on port ${PORT}`);
});
