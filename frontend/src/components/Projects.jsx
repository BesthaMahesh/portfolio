import useReveal from "./useReveal";
import "./Projects.css";

const PROJECTS = [
  {
    title: "AgriAI — Smart Farming Platform",
    badge: "AI Powered",
    desc: "A full-stack AI platform built with React, Flask, and Python using CNN models to analyze agricultural data and generate real-time insights.",
    role: "ML & CNN models",
    pattern: "Smart Analysis",
    url: "https://farmer-psi.vercel.app",
    empty: false
  },
  {
    title: "AI Resume Builder Platform",
    badge: "ATS Optimized",
    desc: "An end-to-end web application using React and Node.js with autonomous AI agents managing resume optimization and content suggestions.",
    role: "AI Orchestration",
    pattern: "Parallel Reasoning",
    url: "https://ai-resume-platform-woad.vercel.app",
    empty: false
  },
  {
    title: "ShopMe — AI E-commerce Platform",
    badge: "Full-Stack AI",
    desc: "A premium e-commerce application built with React and Node.js featuring an integrated AI assistant for personalized shopping experiences.",
    role: "Full-Stack Dev",
    pattern: "AI Assistance",
    url: "https://shopme-ecommerce-lime.vercel.app/",
    empty: false
  },
  {
    title: "Upcoming Project",
    badge: "Planned",
    desc: "Exploring new horizons in machine learning and web integration. Stay tuned for updates on this box.",
    role: "TBD",
    pattern: "Ideation",
    empty: true
  }
];

export default function Projects() {
  useReveal();
  return (
    <section id="projects" className="sec projects-bg">
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 64, textAlign: 'center' }}>
          <span className="sh-label">// selected work</span>
          <h2 className="sh-title">Featured <em>Projects</em></h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={i} className={`proj-card reveal ${p.empty ? 'proj-card--empty' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="proj-card__header">
                <span className="proj-card__label">CASE STUDY</span>
                <span className="proj-card__badge">{p.badge}</span>
              </div>
              
              <div className="proj-card__body">
                <h3 className="proj-card__title">{p.title}</h3>
                <p className="proj-card__desc">{p.desc}</p>
              </div>

              <div className="proj-card__footer">
                <div className="proj-card__stat">
                  <span className="proj-card__stat-label">SPECIALIZED ROLE</span>
                  <span className="proj-card__stat-val">{p.role}</span>
                </div>
                <div className="proj-card__stat">
                  <span className="proj-card__stat-label">EXECUTION PATTERN</span>
                  <span className="proj-card__stat-val">{p.pattern}</span>
                </div>
              </div>

              {!p.empty && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="proj-card__link">
                   View Project 
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                   </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
