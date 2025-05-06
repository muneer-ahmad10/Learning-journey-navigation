import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [career, setCareer] = useState('');
  const [level, setLevel] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Listen for logout from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      const tokenExists = !!localStorage.getItem('token');
      setIsLoggedIn(tokenExists);

      if (!tokenExists) {
        setCareer('');
        setLevel('');
        setSubmitted(false);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const videoSearchTerm = `${career} ${level}`.trim().replace(/\s+/g, '+');
  const wikiTitle = `${career}_${level}`.trim().replace(/\s+/g, '_');

  return (
    <Container fluid className="py-5 bg-light">
      <Container className="bg-white p-4 rounded shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Your Learning Dashboard</h1>
        </div>

        {/* Form */}
        <Form onSubmit={handleSubmit} className="mb-4">
          <Row className="g-3">
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Enter your career (e.g., Web Developer)"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                required
              />
            </Col>
            <Col md={5}>
              <Form.Select value={level} onChange={(e) => setLevel(e.target.value)} required>
                <option value="">Select Skill Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button type="submit" variant="primary" className="w-100">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>


        {submitted && (
          <>
            {/* YouTube Tutorial Embed */}
            <Card className="mb-4">
              <Card.Header><strong>Video Tutorials</strong></Card.Header>
              <Card.Body>
              <a
                  href={`https://www.youtube.com/results?search_query=${videoSearchTerm}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-danger"
                >
                  Watch Tutorials on YouTube
              </a>
              </Card.Body>
            </Card>

            {/* Wikipedia Embed */}
            <Card>
              <Card.Header><strong>Wikipedia Article</strong></Card.Header>
              <Card.Body>
                <iframe
                  src={`https://en.wikipedia.org/wiki/${wikiTitle}`}
                  width="100%"
                  height="600"
                  title="Wikipedia Article"
                  frameBorder="0"
                ></iframe>
                <p className="mt-3">
                  <a
                    href={`https://en.wikipedia.org/wiki/${wikiTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open full article on Wikipedia
                  </a>
                </p>
              </Card.Body>
            </Card>
          </>
        )}
      </Container>
    </Container>
  );
}
