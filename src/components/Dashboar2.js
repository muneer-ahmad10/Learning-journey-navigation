import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [input, setInput] = useState('');
  const [wikiResult, setWikiResult] = useState('');
  const [videos, setVideos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }

    const handleStorageChange = () => {
      const tokenExists = !!localStorage.getItem('token');
      setIsLoggedIn(tokenExists);

      if (!tokenExists) {
        setInput('');
        setWikiResult('');
        setVideos([]);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isLoggedIn, navigate]);

  const handleSearch = async () => {
    if (!input.trim()) return;

    try {
      // Wikipedia API call
      const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(input)}`);
      const wikiData = await wikiResponse.json();
      setWikiResult(wikiData.extract || 'No Wikipedia summary found.');

      // Log search history
      await fetch('http://localhost:5000/log-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
          action: `Searched for ${input}`
        })
      });

      // YouTube API call
      const YT_API_KEY = 'AIzaSyDyvYtuXMuOrqyScikIWzYDnXwZDH7tIw0';
      const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        input + ' tutorial'
      )}&type=video&maxResults=6&key=${YT_API_KEY}`;
      const ytResponse = await fetch(ytUrl);
      const ytData = await ytResponse.json();

      if (ytData.items) {
        const videoResults = ytData.items.map((item) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
        }));
        setVideos(videoResults);
      } else {
        setVideos([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setWikiResult('Failed to fetch data.');
      setVideos([]);
    }
  };

  const logWatched = async (videoId, title) => {
    try {
      await fetch('http://localhost:5000/log-watch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
          videoId,
          title,
          action: `Watched ${title}`
        })
      });
    } catch (error) {
      console.error('Failed to log watched video:', error);
    }
  };

  return (
    <Container className="mt-5">
      <div className="text-center mb-4">
        <h1 className="text-primary">Learning Journey Navigator</h1>
        <p className="text-muted">Discover information and resources about your dream career</p>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <Form className="d-flex" style={{ maxWidth: '500px', width: '100%' }} onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <Form.Control
            type="text"
            placeholder="e.g. Software Engineer, Doctor"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="me-2"
            required
          />
          <Button variant="primary" onClick={handleSearch}>
            🔍 Search
          </Button>
        </Form>
      </div>

      {wikiResult && (
        <Row className="mb-4">
          <Col md={12}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Wikipedia Summary</Card.Title>
                <Card.Text>{wikiResult}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {videos.length > 0 && (
        <Card className="mb-4">
          <Card.Header><strong>Video Tutorials</strong></Card.Header>
          <Card.Body>
            <Row>
              {videos.map((video) => (
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
                      <Button
                        variant="outline-success"
                        className="mt-2"
                        onClick={() => logWatched(video.videoId, video.title)}
                      >
                        ✅ Mark as Watched
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
