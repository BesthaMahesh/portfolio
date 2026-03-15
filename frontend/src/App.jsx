
import Navbar        from "./components/Navbar";
import Hero          from "./components/Hero";
import Marquee       from "./components/Marquee";
import Projects      from "./components/Projects";
import Skills        from "./components/Skills";
import Certs         from "./components/Certs";
import Contact       from "./components/Contact";
import Footer        from "./components/Footer";
import Chatbot       from "./components/Chatbot";

export default function App() {
  return (
    <>
      {/* Ambient orbs */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />


      <Navbar />

      <main>
        <Hero />
        <Marquee />
        <Projects />
        <div className="div" />
        <Skills />
        <div className="div" />
        <Certs />
        <div className="div" />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
