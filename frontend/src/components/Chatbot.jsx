import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./Chatbot.css";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are a sophisticated AI assistant representing Bestha Mahesh Babu on his professional portfolio.
Your goal is to provide accurate, professional, and helpful information about Mahesh's career, skills, and projects.

### WHO IS MAHESH BABU?
Mahesh is a Machine Learning Enthusiast and Full-Stack Developer based in Andhra Pradesh, India.
- **Education**: 8.08 CGPA.
- **Certifications**: 3 Cloud Certifications.
- **Focus**: Building intelligent web applications where machine learning meets elegant UI.

### TECHNICAL EXPERTISE:
- **Programming**: Python, JavaScript, HTML5, CSS3.
- **Frameworks**: React.js, Flask, Node.js, Vite.
- **AI & ML**: Machine Learning, CNN Models, Model Training, Prediction Systems.
- **AI Integration**: OpenAI API, Prompt Engineering, AI Assistants, AI-Powered Apps.
- **Libraries**: Scikit-Learn, Pandas, NumPy, TensorFlow.
- **Tools**: Git & GitHub, VS Code, Vercel, Jupyter Notebook.

### KEY PROJECTS:
1. **AgriAI — Smart Farming Platform**:
   - URL: https://farmer-psi.vercel.app
   - Details: AI-powered smart farming platform using CNN models to analyze agricultural data and generate real-time crop insights. Features an integrated OpenAI-powered assistant.
   - Stack: React, Flask, Python, CNN, OpenAI API.
2. **AI Resume Builder Platform**:
   - URL: https://ai-resume-platform-woad.vercel.app
   - Details: ATS-optimized resume builder with AI content suggestions and automated formatting.
   - Stack: React, AI APIs, Prompt Engineering.
3. **ShopMe — AI E-commerce Platform**:
   - URL: https://shopme-ecommerce-lime.vercel.app/
   - Details: A premium e-commerce application built with React and Node.js featuring an integrated AI assistant for personalized shopping experiences.
   - Stack: React, Node.js, AI Assistant.

### COMMUNICATION GUIDELINES:
- **Tone**: Professional, friendly, and innovative.
- **Conciseness**: Keep answers brief but informative.
- **Formatting**: Use Markdown (bold, lists, etc.) to make answers readable.
- **Contact Info**: If asked for contact details, provide: +91 8179208780 or mention the Contact section.
- **Role**: If someone says "Who are you?", explain you are Mahesh's AI assistant.

Always represent Mahesh in the best possible light. If you don't know a specific detail, politely suggest contacting Mahesh directly via the contact form.`;

const INITIAL_MESSAGE = {
  id: 0,
  role: "assistant",
  text: "Ask about experience, projects, skills, education, certifications, or applied AI system design work.",
};

export default function Chatbot() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const messagesRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const clearChat = () => setMessages([INITIAL_MESSAGE]);

  const sendMessage = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const history = messages
      .filter((m) => m.id !== 0)
      .map((m) => ({ role: m.role, content: m.text }));

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
            { role: "user", content: text },
          ],
        }),
      });

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't get a response. Please try again.";

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", text: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "Connection error. Please check your internet and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      sendMessage(e);
    }
  };

  return (
    <div className="cb-container" onClick={(e) => e.stopPropagation()}>
      {/* Robot Icon sitting above */}
      <div className="cb-robot">
        <div className="cb-robot-head">
          <div className="cb-robot-eyes">
            <span className="cb-eye"></span>
            <span className="cb-eye"></span>
          </div>
        </div>
      </div>

      <div className="cb-panel">
        {/* Header */}
        <div className="cb-header">
          <p className="cb-header-title">Ask about me</p>
          <button type="button" className="cb-clear-btn" onClick={clearChat}>
            Clear
          </button>
        </div>

        {/* Messages */}
        <div className="cb-messages" ref={messagesRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`cb-bubble-wrap ${msg.role === "user" ? "cb-bubble-wrap--user" : ""}`}
            >
              <div
                className={`cb-bubble ${
                  msg.role === "user" ? "cb-bubble--user" : "cb-bubble--bot"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="cb-bubble-wrap">
              <div className="cb-bubble cb-bubble--bot cb-bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="cb-input-area">
          <div className="cb-textarea-wrap">
            <textarea
              ref={inputRef}
              className="cb-textarea"
              placeholder="Ask about projects, experience, skills, or education"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              onKeyDown={handleKey}
              rows={1}
            />
            <button
              type="button"
              className="cb-send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
            >
              Send
            </button>
          </div>
          <p className="cb-char-count">{input.length}/500</p>
        </div>
      </div>
    </div>
  );
}

