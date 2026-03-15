import "./Marquee.css";

const TECH = [
  "Python","React.js","Node.js","TensorFlow","OpenAI API","Flask","CNN",
  "Scikit-Learn","Pandas","NumPy","Tailwind CSS","Vite","REST API","Git",
  "Vercel","Azure AI","Prompt Engineering","Machine Learning",
];

export default function Marquee() {
  const doubled = [...TECH, ...TECH];
  return (
    <div className="marquee-section">
      <div className="marquee-wrap">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-text">{t}</span>
              <span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
