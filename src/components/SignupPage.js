import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles/About.css';

export default function AboutPage() {
  return (
    <Container fluid className="about-page py-5">
      {/* Hero Section */}
      <section className="about-hero text-center py-5 mb-5">
        <div className="inner-container mx-auto">
          <h1 className="display-4 fw-bold mb-4">Register here</h1>
          <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
            Welcome to the personalized compass for navigating the complex world of learning and skill development
          </p>
        </div>
      </section>
      {/* Signup section */}
      <section className="signup-section py-5"/>
        <Container className="text-center">
          <h2 className="fw-bold mb-4">Create Your Account</h2>
          <p className="lead mb-4">Join us and start your learning journey today!</p>
          <form className="signup-form">
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Full Name" required />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email Address" required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password" required />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </Container>

      {/* CTA Section */}
      <section className="cta-section py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">Begin Your Learning Journey Today</h2>
          <p className="lead mb-4">
            Join thousands of learners who've found their path with our Navigator
          </p>
        </Container>
      </section>
    </Container>
  );
}