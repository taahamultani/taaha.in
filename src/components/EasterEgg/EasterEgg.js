import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "../Particle";
import "./EasterEgg.css";

function EasterEgg() {
  const [copySuccess, setCopySuccess] = useState('');
  const binaryText = "01101000 01110100 01110100 01110000 01110011 00111010 00101111 00101111 01110111 01110111 01110111 00101110 01111001 01101111 01110101 01110100 01110101 01100010 01100101 00101110 01100011 01101111 01101101 00101111 01110111 01100001 01110100 01100011 01101000 00111111 01110110 00111101 00110101 01110111 01001111 01011000 01100011 00110000 00110011 01010010 01110111 01010110 01000001";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(binaryText)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        setCopySuccess('Failed to copy');
      });
  };

  return (
    <Container fluid className="easter-egg-section">
      <Particle />
      <Container>
        <Row>
          <Col md={12} className="easter-egg-content">
            <h1>Congratulations</h1>
            <h2>You found an Easter Egg</h2>
            <div className="binary-container">
              <pre className="binary-text">
                {binaryText}
              </pre>
              <div className="button-group">
                <Button 
                  variant="primary" 
                  onClick={copyToClipboard}
                  className="copy-button"
                >
                  {copySuccess || 'Copy Text'}
                </Button>
                <Button 
                  variant="primary"
                  href="https://www.rapidtables.com/convert/number/binary-to-ascii.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="decrypt-button"
                >
                  Go to binary decryptor
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default EasterEgg; 