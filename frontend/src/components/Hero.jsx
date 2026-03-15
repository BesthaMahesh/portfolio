import { useState, useEffect } from "react";
import Counter from "./Counter";
import Chatbot from "./Chatbot";
import "./Hero.css";

const ROLES = ["Full Stack AI Developer", "AI Developer"];

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });


  return (
    <section id="about" className="hero">
      <div className="wrap hero__grid">
        <div className="hero__content">

          {/* Available badge */}
          <div className="hero__badge fade-a">
            <span className="hero__pulse" />
            Available for opportunities
          </div>

          {/* Headline */}
          <div className="hero__identity fade-b">
            <div className="hero__monogram">BMB</div>
            <div>
              <p className="hero__firstname">Bestha</p>
              <h1 className="hero__name">
                <em>Mahesh Babu</em>
              </h1>
            </div>
          </div>

          {/* Role */}
          <div className="hero__role fade-c">
            <span className="hero__role-line" />
            <span className="hero__role-text">
              Full Stack AI Developer
            </span>
          </div>

          {/* Bio */}
          <p className="hero__bio fade-d">
            Building intelligent web applications where machine learning meets elegant UI.
            Specializing in AI integration, React frontends, and cloud-deployed solutions
            that turn ideas into production-ready products.
          </p>

          {/* Actions */}
          <div className="hero__actions fade-e">
            <button className="btn-blue" onClick={() => scrollTo("projects")}>
              View Projects
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <a
              className="btn-blue"
              href="/BESTHA_MAHESH_BABU.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              View Resume
            </a>
            <button className="btn-blue" onClick={() => scrollTo("contact")}>
              Let's Talk
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="hero__stats fade-f">
            {[
              { to: 3, dec: 0, label: "Projects Live" },
              { to: 3, dec: 0, label: "certs" },
              { to: 8.08, dec: 2, label: "CGPA" },
            ].map((s) => (
              <div key={s.label} className="hero__stat">
                <div className="hero__stat-val">
                  <Counter to={s.to} decimals={s.dec} />
                </div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__chat-side fade-e">
          <Chatbot />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-bar" />
      </div>
    </section>
  );
}
