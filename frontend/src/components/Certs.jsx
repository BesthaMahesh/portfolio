import useReveal from "./useReveal";
import "./Certs.css";

const CERTS = [
  { initials: "AZ", full: "Microsoft Certified: Azure AI Fundamentals", issuer: "Microsoft", year: "2025", color: "#0078d4" },
  { initials: "SF", full: "Salesforce Certified Agentforce Specialist", issuer: "Salesforce", year: "2025", color: "#00a1e0" },
  { initials: "OCI", full: "OCI 2025 Certified Generative AI Professional", issuer: "Oracle", year: "2025", color: "#f80000" },
];

export default function Certs() {
  useReveal();
  return (
    <section id="certs" className="sec certs-bg">
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 64, textAlign: 'center' }}>
          <span className="sh-label">// credentials</span>
          <h2 className="sh-title">Certs &amp; <em>Education</em></h2>
        </div>

        <div className="certs-layout two-col">
          {/* Certifications */}
          <div>
            <p className="certs-col-label">🏆 Cloud Certifications</p>
            <div className="certs-list">
              {CERTS.map((c, i) => (
                <div key={c.initials} className="cert card reveal" style={{ transitionDelay: `${i * 0.09}s` }}>
                  <div className="cert__badge" style={{ "--cc": c.color }}>{c.initials}</div>
                  <div className="cert__info">
                    <span className="cert__issuer">{c.issuer} · {c.year}</span>
                    <h4 className="cert__title">{c.full}</h4>
                  </div>
                  <div className="cert__check">✓</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <p className="certs-col-label">🎓 Education</p>
            <div className="edu card reveal">
              <div className="edu__stripe" />
              <span className="edu__year">2023 → 2027</span>
              <h3 className="edu__degree">B.Tech – Computer Science &amp; Engineering</h3>
              <p className="edu__spec">Artificial Intelligence &amp; Machine Learning</p>
              <div className="edu__divider" />
              <p className="edu__inst">Rajeev Gandhi Memorial College of Engineering &amp; Technology</p>
              <p className="edu__loc">Nandyal, Andhra Pradesh</p>
              <div className="edu__gpa">
                <span className="edu__gpa-label">CGPA</span>
                <span className="edu__gpa-val">8.08</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
