import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [career, setCareer] = useState('');
  const [level, setLevel] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [videos, setVideos] = useState([]);
  const [wikiData, setWikiData] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const handleStorageChange = () => {
      const tokenExists = !!localStorage.getItem('token');
      setIsLoggedIn(tokenExists);

      if (!tokenExists) {
        setSeconds(0);
        setCareer('');
        setLevel('');
        setVideos([]);
        setWikiData('');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    let timer;
    if (isLoggedIn) {
      timer = setInterval(() => setSeconds(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isLoggedIn]);

  const formatTime = () => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = `${career} ${level} tutorial`;

    // Wikipedia title formatting
    const wikiTitle = career
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('_');

    try {
      // Wikipedia API call
      const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`);
      const wikiJson = await wikiResponse.json();
      setWikiData(wikiJson.extract || 'No summary found for this topic.');

      // YouTube API call
      const YT_API_KEY = 'AIzaSyDyvYtuXMuOrqyScikIWzYDnXwZDH7tIw0'; // Replace with your actual key
      const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=6&key=${YT_API_KEY}`;
      const ytResponse = await fetch(ytUrl);
      const ytData = await ytResponse.json();

      if (ytData.items) {
        const videoResults = ytData.items.map(item => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
        }));
        setVideos(videoResults);
      } else {
        setVideos([]);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setWikiData('Error fetching Wikipedia data.');
      setVideos([]);
    }
  };

  return (
    <Container fluid className="py-5 bg-light">
      <Container className="bg-white p-4 rounded shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Your Learning Dashboard</h1>
        </div>

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

        <div className="text-center mb-4">
          <h5>Active Time: <span className="text-success">{formatTime()}</span></h5>
        </div>

        {/* Video Section */}
        <Card className="mb-4">
          <Card.Header><strong>Video Tutorials</strong></Card.Header>
          <Card.Body>
            {videos.length > 0 ? (
              <Row>
                {videos.map(video => (
                  <Col md={6} key={video.videoId} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>{video.title}</Card.Title>
                        <div className="ratio ratio-16x9">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.videoId}`}
                            title={video.title}
                            allowFullScreen
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <p className="text-muted">No videos found. Try submitting a different query.</p>
            )}
          </Card.Body>
        </Card>

        {/* Wikipedia Section */}
        <Card>
          <Card.Header><strong>Wikipedia Summary</strong></Card.Header>
          <Card.Body>
            <p>{wikiData || 'No data loaded yet.'}</p>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}
