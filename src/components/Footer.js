import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import tmLogo from "../Assets/tm-new.png";

function Footer() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setIsScrolled(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container 
      fluid 
      className={`footer ${isScrolled ? "footer-solid" : ""}`} 
      style={{ 
        position: "relative", 
        zIndex: 1001,
      }}
    >
      <Row className="align-items-center">
        <Col md="4" className="footer-copywright d-flex align-items-center justify-content-center">
          <h3>
            Inspiration and Design by{" "}
            <a 
              href="https://github.com/soumyajit4419" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-name-link"
              style={{ 
                color: "white",
                textDecoration: "none",
                position: "relative",
                zIndex: 1002,
              }}
            >
              Soumyajit Behera
            </a>
          </h3>
        </Col>
        <Col md="4" className="footer-copywright d-flex align-items-center justify-content-center">
          <img 
            src={tmLogo} 
            alt="TM Logo" 
            style={{ 
              maxHeight: "100px", 
              width: "auto",
              margin: "15px 0"
            }} 
          />
        </Col>
        <Col md="4" className="footer-body d-flex align-items-center justify-content-center">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/soumyajit4419"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://twitter.com/Soumyajit4419"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiOutlineTwitter />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/soumyajit4419/"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/soumyajit4419"
                style={{ color: "white" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
