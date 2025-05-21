import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBookOpen, FaRoute, FaUserTie, FaBrain, FaGraduationCap, FaLightbulb, FaUserGraduate, FaChartLine, FaHandsHelping } from 'react-icons/fa';
import teamMembers from '../data/team';
import '../styles/About.css';

export default function AboutPage() {
  return (
    <Container fluid className="about-page py-5">
      {/* Hero Section */}
      <section className="about-hero text-center py-5 mb-5">
        <div className="inner-container mx-auto">
          <h1 className="display-4 fw-bold mb-4">About Learning Journey Navigator</h1>
          <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
            Your personalized compass for navigating the complex world of learning and skill development
          </p>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center mb-5">
            <Col md={6} className="order-md-2">
              <div className="mission-image p-4 rounded">
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  <div className="mission-icon">
                    <FaBookOpen size={40} />
                    <span>Resources</span>
                  </div>
                  <div className="mission-icon">
                    <FaRoute size={40} />
                    <span>Pathways</span>
                  </div>
                  <div className="mission-icon">
                    <FaUserTie size={40} />
                    <span>Guidance</span>
                  </div>
                  <div className="mission-icon">
                    <FaBrain size={40} />
                    <span>Adaptive</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} className="order-md-1">
              <h2 className="fw-bold mb-4">Our Mission</h2>
              <p className="mb-4">
                We believe every learner deserves access to personalized educational guidance 
                regardless of their background. Our platform bridges the gap between 
                learning and mastery through:
              </p>
              <ul className="mission-list">
                <li><FaLightbulb className="me-2" /> AI-powered learning recommendations</li>
                <li><FaRoute className="me-2" /> Personalized journey roadmaps</li>
                <li><FaUserGraduate className="me-2" /> Skill-aligned development</li>
                <li><FaHandsHelping className="me-2" /> Mentorship opportunities</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-5">What We Offer</h2>
          <Row>
            {[
              {
                title: "Journey Mapping",
                description: "Our system creates personalized learning sequences that adapt to your goals.",
                icon: <FaGraduationCap />
              },
              {
                title: "Skill Development",
                description: "Curated paths to build competencies for your chosen domain.",
                icon: <FaBookOpen />
              },
              {
                title: "Progress Analytics",
                description: "Real-time feedback on your learning trajectory.",
                icon: <FaChartLine />
              }
            ].map((feature, index) => (
              <Col md={4} key={index} className="mb-4">
                <div className="feature-card p-4 h-100 rounded">
                  <div className="feature-icon mb-3">
                    {feature.icon}
                  </div>
                  <h4 className="fw-bold mb-3">{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Methodology Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5">Our Methodology</h2>
          <Row>
            <Col md={4} className="mb-4">
              <div className="method-card p-4 h-100">
                <div className="number-circle mb-3">1</div>
                <h4>Assessment</h4>
                <p>
                  We evaluate your current knowledge, learning preferences, and aspirations
                  through our diagnostic tools.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="method-card p-4 h-100">
                <div className="number-circle mb-3">2</div>
                <h4>Path Creation</h4>
                <p>
                  Our system generates a customized learning journey with milestones
                  and recommended resources.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="method-card p-4 h-100">
                <div className="number-circle mb-3">3</div>
                <h4>Continuous Adaptation</h4>
                <p>
                  We dynamically adjust your path based on performance and evolving goals.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="team-section py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-5">Our Team</h2>
          <Row className="justify-content-center">
            {teamMembers.map((teamMembers) => (
              <Col sm={6} md={4} lg={3} key={teamMembers.id} className="mb-4">
                <div className="team-card text-center p-3 h-100">
                  <div className="team-image mb-3 mx-auto rounded-circle overflow-hidden">
                    <img src={teamMembers.image} alt={teamMembers.name} />
                  </div>
                  <h5 className="fw-bold mb-1">{teamMembers.name}</h5>
                  <p className="text-muted small mb-2">{teamMembers.role}</p>
                  <p className="small">{teamMembers.bio}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">Begin Your Learning Journey Today</h2>
          <p className="lead mb-4">
            Join thousands of learners who've found their path with our Navigator
          </p>
          <Link 
            to="/signup"
            className="btn btn-lg px-5 py-3 shadow-sm hover-grow"
            style={{
              backgroundColor: 'var(--energy-gold)',
              color: 'var(--deep-navy)',
              border: 'none',
              borderRadius: '50px',
              fontWeight: 600,
              transition: 'all 0.3s ease'
            }}
          >
            Start Navigating →
          </Link>
        </Container>
      </section>
    </Container>
  );
}