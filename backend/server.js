require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ── Portfolio Data ──────────────────────────────────────────────────────────
const portfolioData = {
  personal: {
    name: "Bestha Mahesh Babu",
    title: "AI & Full-Stack Developer",
    email: "maheshbabu02456@gmail.com",
    phone: "8179208780",
    linkedin: "https://linkedin.com/in/mahesh-bestha-354232303",
    summary:
      "AI and Full-Stack developer with experience building intelligent web applications using machine learning models and modern web technologies. Skilled in integrating AI APIs, developing responsive web interfaces, and deploying scalable applications using Python, React.js, and cloud AI services.",
  },

  projects: [
    {
      id: 1,
      title: "AgriAI – Smart Farming Prediction Platform",
      url: "https://farmer-psi.vercel.app",
      description:
        "An AI-powered smart farming platform using machine learning and CNN models to analyze agricultural data and generate crop insights.",
      highlights: [
        "ML & CNN models for agricultural data analysis",
        "OpenAI API integration for AI assistant",
        "React.js + Tailwind CSS + Vite frontend",
        "Real-time farming guidance & marketplace features",
      ],
      tech: ["React.js", "Python", "CNN", "OpenAI API", "Tailwind CSS", "Vite"],
      category: "AI / Full-Stack",
    },
    {
      id: 2,
      title: "AI Resume Builder Platform",
      url: "https://ai-resume-platform-woad.vercel.app",
      description:
        "An AI-powered resume builder that generates professional resumes with intelligent content suggestions, automated optimization, and ATS-friendly output.",
      highlights: [
        "AI-powered content suggestions via AI APIs",
        "Automated resume optimization",
        "ATS-friendly resume generation",
        "Responsive React.js interface",
      ],
      tech: ["React.js", "AI APIs", "JavaScript", "CSS3"],
      category: "AI / Web App",
    },
    {
      id: 3,
      title: "ShopMe – AI E-commerce Platform",
      url: "https://shopme-ecommerce-lime.vercel.app/",
      description:
        "A premium e-commerce application built with React and Node.js featuring an integrated AI assistant for personalized shopping experiences.",
      highlights: [
        "React + Node.js full-stack architecture",
        "Integrated AI Assistant for customer support",
        "Secure checkout & product management",
        "Fully responsive and premium UI design",
      ],
      tech: ["React.js", "Node.js", "Express", "MongoDB", "AI Toolkit"],
      category: "Full-Stack AI",
    },
    {
      id: 4,
      title: "VisionTalk – AI Multi-modal Chatbot",
      url: "https://vision-talk-ai-chatbot.vercel.app/",
      description:
        "A sophisticated multi-modal AI chatbot capable of processing image inputs and engaging in natural language conversations with advanced vision awareness.",
      highlights: [
        "Multi-modal AI with Vision capabilities",
        "Image-to-text analysis integration",
        "Real-time conversational interface",
        "Built with React and advanced AI APIs",
      ],
      tech: ["React.js", "AI Vision APIs", "Tailwind CSS", "Vite"],
      category: "AI / Multi-modal",
    },
  ],

  skills: {
    Programming: ["Python", "JavaScript", "HTML5", "CSS3"],
    "Frameworks & Libraries": [
      "React.js",
      "Flask",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
    ],
    "Web Development": [
      "Responsive UI Design",
      "REST API Integration",
      "Frontend-Backend Communication",
    ],
    "AI & Machine Learning": [
      "Machine Learning",
      "CNN Models",
      "Model Training",
      "Prediction Systems",
    ],
    "AI Integration": [
      "OpenAI API",
      "Prompt Engineering",
      "AI Assistants",
      "AI-Powered Applications",
    ],
    Tools: ["Git", "GitHub", "VS Code", "Vercel", "Jupyter Notebook"],
  },

  certifications: [
    {
      title: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      year: "2025",
      badge: "azure",
    },
    {
      title: "Salesforce Certified Agentforce Specialist",
      issuer: "Salesforce",
      year: "2025",
      badge: "salesforce",
    },
    {
      title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      issuer: "Oracle",
      year: "2025",
      badge: "oracle",
    },
  ],

  education: [
    {
      degree: "B.Tech – Computer Science & Engineering (AI & ML)",
      institution: "Rajiv Gandhi Memorial College of Engineering & Technology",
      location: "Nandyal, Andhra Pradesh",
      year: "2027",
      gpa: "8.08",
    },
  ],
};

// ── Routes ──────────────────────────────────────────────────────────────────

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Portfolio API is running 🚀" });
});

// Get all portfolio data
app.get("/api/portfolio", (req, res) => {
  res.json({ success: true, data: portfolioData });
});

// Get specific sections
app.get("/api/portfolio/projects", (req, res) => {
  res.json({ success: true, data: portfolioData.projects });
});

app.get("/api/portfolio/skills", (req, res) => {
  res.json({ success: true, data: portfolioData.skills });
});

app.get("/api/portfolio/certifications", (req, res) => {
  res.json({ success: true, data: portfolioData.certifications });
});

// Contact form handler
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, error: "Name, email, and message are required." });
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
      subject: `Portfolio Contact: ${subject || "New Message"}`,
      html: `
        <h3>New Message from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({
      success: true,
      message: "Message received! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
});

// ── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Portfolio API running at http://localhost:${PORT}`);
  console.log(`📋 Try: GET http://localhost:${PORT}/api/portfolio`);
});
