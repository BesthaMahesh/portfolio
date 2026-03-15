import useReveal from "./useReveal";
import "./Skills.css";

const GROUPS = [
  { icon: "⌨", label: "Programming",        items: ["Python","JavaScript","HTML5","CSS3"] },
  { icon: "⚛", label: "Frameworks",         items: ["React.js","Flask","Node.js","Vite"] },
  { icon: "🧠", label: "AI & ML",           items: ["Machine Learning","CNN Models","Model Training","Prediction Systems"] },
  { icon: "🔗", label: "AI Integration",    items: ["OpenAI API","Prompt Engineering","AI Assistants","AI-Powered Apps"] },
  { icon: "📦", label: "Libraries",         items: ["Scikit-Learn","Pandas","NumPy","TensorFlow"] },
  { icon: "🛠", label: "Tools & Platforms", items: ["Git & GitHub","VS Code","Vercel","Jupyter Notebook"] },
];

export default function Skills() {
  useReveal();
  return (
    <section id="skills" className="sec skills-bg">
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 64, textAlign: 'center' }}>
          <span className="sh-label">// expertise</span>
          <h2 className="sh-title">Technical <em>Skills</em></h2>
        </div>

        <div className="skills-grid three-col">
          {GROUPS.map((g, i) => (
            <div key={g.label} className="sk-card card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className="sk-card__head">
                <div className="sk-card__icon">{g.icon}</div>
                <h3 className="sk-card__label">{g.label}</h3>
              </div>
              <div className="sk-card__items">
                {g.items.map((it) => (
                  <div key={it} className="sk-item">
                    <span className="sk-dot" />
                    {it}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
