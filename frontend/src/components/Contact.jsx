import { useState } from "react";
import useReveal from "./useReveal";
import "./Contact.css";

const INIT = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INIT);
  const [st,   setSt]   = useState(null); // sending | ok | err
  useReveal();

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSt("sending");
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (data.success) {
        setSt("ok");
        setForm(INIT);
        setTimeout(() => setSt(null), 5000);
      } else {
        setSt("err");
        setTimeout(() => setSt(null), 5000);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSt("err");
      setTimeout(() => setSt(null), 5000);
    }
  };

  return (
    <section id="contact" className="sec contact-bg">
      <div className="wrap">
        <div className="reveal" style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="sh-label">// get in touch</span>
          <h2 className="sh-title">Let's <em>Connect</em></h2>
          <p className="contact__sub">
            Open to full-time roles, internships &amp; freelance projects.
          </p>
        </div>

        <div className="contact-layout two-col">
          {/* Info panel */}
          <div className="reveal">
            {[
              { icon:"✉", label:"Email",    val:"maheshbabu02456@gmail.com", href:"mailto:maheshbabu02456@gmail.com" },
              { icon:"📞", label:"Phone",   val:"+91 8179208780",            href:"https://wa.me/918179208780" },
              { icon:"🔗", label:"LinkedIn",val:"mahesh-bestha-354232303",   href:"https://linkedin.com/in/mahesh-bestha-354232303" },
            ].map((d) => (
              <a key={d.label} href={d.href} target="_blank" rel="noopener noreferrer" className="c-detail card">
                <span className="c-detail__icon">{d.icon}</span>
                <div>
                  <div className="c-detail__label">{d.label}</div>
                  <div className="c-detail__val">{d.val}</div>
                </div>
              </a>
            ))}

            <div className="c-avail">
              <span className="c-avail__dot" />
              Open to full-time, internship &amp; freelance
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="c-form card reveal">
            <div className="c-form__row">
              {["name", "email"].map((f) => (
                <div key={f} className="c-form__field">
                  <label className="c-form__label">{f} *</label>
                  <input
                    className="c-form__input"
                    name={f}
                    type={f === "email" ? "email" : "text"}
                    value={form[f]}
                    onChange={change}
                    placeholder={f === "name" ? "Your name" : "your@email.com"}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="c-form__field">
              <label className="c-form__label">subject</label>
              <input className="c-form__input" name="subject" value={form.subject} onChange={change} placeholder="What's this about?" />
            </div>

            <div className="c-form__field">
              <label className="c-form__label">message *</label>
              <textarea className="c-form__input c-form__textarea" name="message" value={form.message} onChange={change} placeholder="Tell me about your project or opportunity..." required rows={5} />
            </div>

            {st === "ok"  && <div className="c-msg c-msg--ok">✓ Message sent! I'll get back to you soon.</div>}
            {st === "err" && <div className="c-msg c-msg--err">✗ Something went wrong. Email me directly.</div>}

            <button type="submit" className="btn-g c-form__submit" disabled={st === "sending"}>
              {st === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
