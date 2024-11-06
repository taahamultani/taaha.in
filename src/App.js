import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import IdleEmoji from "./components/IdleEmoji/IdleEmoji.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);
  const [copyText, setCopyText] = useState("Copy to Clipboard");

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyClick = () => {
    const binaryText = "01101000 01110100 01110100 01110000 01110011 00111010 00101111 00101111 01110111 01110111 01110111 00101110 01111001 01101111 01110101 01110100 01110101 01100010 01100101 00101110 01100011 01101111 01101101 00101111 01110111 01100001 01110100 01100011 01101000 00111111 01110110 00111101 00110101 01110111 01001111 01011000 01100011 00110000 00110011 01010010 01110111 01010110 01000001";
    navigator.clipboard.writeText(binaryText);
    setCopyText("Copied!");
    
    setTimeout(() => {
      setCopyText("Copy to Clipboard");
    }, 2000);
  };

  const handleDecryptClick = () => {
    window.open('https://www.rapidtables.com/convert/number/binary-to-ascii.html', '_blank');
  };

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <IdleEmoji />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route 
            path="/secrets" 
            element={
              <ProtectedRoute>
                <div style={{ 
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                  padding: "20px",
                  textAlign: "center",
                  background: "#1a1a1a",
                  color: "#00ff00"
                }}>
                  <div style={{
                    background: "#2a2a2a",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)",
                    maxWidth: "800px",
                    wordWrap: "break-word"
                  }}>
                    <p style={{
                      marginBottom: "20px",
                      fontSize: "1.2em",
                      fontStyle: "italic",
                      opacity: "0.8"
                    }}>
                      Well well, look who's patient enough to watch a cat... 🐈
                    </p>
                    01101000 01110100 01110100 01110000 01110011 00111010 00101111 00101111 01110111 01110111 01110111 00101110 01111001 01101111 01110101 01110100 01110101 01100010 01100101 00101110 01100011 01101111 01101101 00101111 01110111 01100001 01110100 01100011 01101000 00111111 01110110 00111101 00110101 01110111 01001111 01011000 01100011 00110000 00110011 01010010 01110111 01010110 01000001
                  </div>
                  <div style={{
                    marginTop: "30px",
                    display: "flex",
                    gap: "20px"
                  }}>
                    <button 
                      onClick={handleCopyClick}
                      style={{
                        padding: "10px 20px",
                        background: "#00ff00",
                        color: "#1a1a1a",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "all 0.3s ease",
                        minWidth: "150px"
                      }}
                      onMouseOver={e => e.target.style.transform = "scale(1.05)"}
                      onMouseOut={e => e.target.style.transform = "scale(1)"}
                    >
                      {copyText}
                    </button>
                    <button 
                      onClick={handleDecryptClick}
                      style={{
                        padding: "10px 20px",
                        background: "#1a1a1a",
                        color: "#00ff00",
                        border: "2px solid #00ff00",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "all 0.3s ease"
                      }}
                      onMouseOver={e => e.target.style.transform = "scale(1.05)"}
                      onMouseOut={e => e.target.style.transform = "scale(1)"}
                    >
                      Decrypt
                    </button>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
