import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import '../styles/Contact.css';

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert('Your message has been sent! We will contact you soon.');
  };

  return (
    <Container fluid className="contact-page py-5">
      {/* Hero Section */}
      <section className="contact-hero text-center mb-5 p-4">
        <h1 className="display-4 fw-bold mb-3">Contact Learning Journey Navigator</h1>
        <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
          Have questions about your learning journey? Our team is here to help you navigate your path to success.
        </p>
      </section>

      {/* Contact Content */}
      <Container>
        <Row>
          {/* Contact Information */}
          <Col lg={5} className="mb-5 mb-lg-0">
            <div className="contact-info-card p-4 h-100">
              <h2 className="fw-bold mb-4">Get In Touch</h2>
              
              <div className="contact-method mb-4">
                <div className="contact-icon">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <h5 className="fw-bold">Email Us</h5>
                  <p className="mb-0">support@learningjourney.com</p>
                  <p>inquiries@learningjourney.com</p>
                </div>
              </div>

              <div className="contact-method mb-4">
                <div className="contact-icon">
                  <FaPhone size={24} />
                </div>
                <div>
                  <h5 className="fw-bold">Call Us</h5>
                  <p className="mb-0">+91-123456</p>
                  <p>Monday-Friday, 9am-5pm EST</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <h5 className="fw-bold">Visit Us</h5>
                  <p className="mb-0">Islamia college of Science and commerce</p>
                  <p>Hawal,190002</p>
                </div>
              </div>

              <div className="mt-5">
                <h5 className="fw-bold mb-3">Connect With Us</h5>
                <div className="social-links d-flex gap-3">
                  {['Twitter', 'LinkedIn', 'Facebook'].map((social) => (
                    <a 
                      key={social} 
                      href={`https://www.${social.toLowerCase()}.com/#`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Col>

          {/* Contact Form */}
          <Col lg={7}>
            <div className="contact-form-card p-4">
              <h2 className="fw-bold mb-4">Send Us a Message</h2>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your first name" required />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your last name" required />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Select required>
                    <option value="">Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Feedback</option>
                    <option>Partnerships</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formMessage">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    placeholder="Tell us about your learning journey needs" 
                    required 
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="submit-btn"
                >
                  <FaPaperPlane className="me-2" />
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Map Section */}
      <section className="map-section mt-5">
        <Container>
          <h2 className="text-center fw-bold mb-4">Our Location</h2>
          <div className="map-container ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.5857590089486!2d74.80753767522809!3d34.10575091490381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1856c6e90bfd3%3A0x3724ed8afec26216!2zSXNsYW1pYSBDb2xsZWdlIG9mIFNjaWVuY2UgYW5kIENvbW1lcmNlKNin2LPZhNin2YXbjNuBINqp2KfZhNisINii2YEg2LPYp9im2YbYsyDYp9mI2LEg2qnYp9mF2LHYsyk!5e0!3m2!1sen!2sin!4v1745126542290!5m2!1sen!2sin"
              title="Islamic College of Science and Commerce Location"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </Container>
  );
}