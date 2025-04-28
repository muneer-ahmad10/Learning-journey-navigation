import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/About.css';
import '../styles/root.css'; 

export default function SignupPage() {
  const navigate = useNavigate();
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);

    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    // Validate password match
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    const userData = {
      fname: formData.get('firstName'),
      lname: formData.get('lastName'),
      username: formData.get('username'),
      gender: formData.get('gender'),
      dob: formData.get('dob'),
      email: formData.get('email'),
      password: formData.get('password'),
      profile_pic: formData.get('profilePic').name,
    };

    setErrors({});
    setLoading(true);
    setFormMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      setLoading(false);

      if (response.ok) {
        setIsSuccess(true);
        setFormMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/Login'), 2000);
      } else {
        const error = await response.json();
        setFormMessage(error.message);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setFormMessage('Registration failed. Please try again.');
      setIsSuccess(false);
      setLoading(false);
    }
  };

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

      {/* Signup Form */}
      <section className="p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="card border-light-subtle shadow-sm">
            <div className="row g-0">
              <div className="col-12 col-md-6 text-bg-primary">
                <div className="d-flex align-items-center justify-content-center h-100">
                  <div className="col-10 col-xl-8 py-3">
                    <h2 className="fw-bold fs-4" style={{ color: "var(--energy-gold)" }}>Learning Journey</h2>
                    <hr className="border-primary-subtle mb-4" />
                    <h2 className="h1 mb-4">Navigate Your Personalized Learning Journey</h2>
                    <p className="lead m-0">Discover curated paths, access powerful resources, and let smart technology guide your growth every step of the way.</p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-3 gy-md-4 overflow-hidden">
                      {/* First Name */}
                      <div className="col-12">
                        <label htmlFor="firstName" className="form-label">First Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="firstName" id="firstName" required />
                      </div>

                      {/* Last Name */}
                      <div className="col-12">
                        <label htmlFor="lastName" className="form-label">Last Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="lastName" id="lastName" required />
                      </div>

                      {/* Username */}
                      <div className="col-12">
                        <label htmlFor="username" className="form-label">Username <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="username" id="username" required />
                        {errors.username && <div className="text-danger">{errors.username}</div>}
                      </div>

                      {/* Gender */}
                      <div className="col-12">
                        <label className="form-label">Gender <span className="text-danger">*</span></label>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gender" id="male" value="Male" required />
                          <label className="form-check-label" htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gender" id="female" value="Female" required />
                          <label className="form-check-label" htmlFor="female">Female</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gender" id="other" value="Other" required />
                          <label className="form-check-label" htmlFor="other">Other</label>
                        </div>
                      </div>

                      {/* DOB */}
                      <div className="col-12">
                        <label htmlFor="dob" className="form-label">Date of Birth <span className="text-danger">*</span></label>
                        <input type="date" className="form-control" name="dob" id="dob" required />
                      </div>

                      {/* Profile Pic */}
                      <div className="col-12">
                        <label htmlFor="profilePic" className="form-label">Profile Picture <span className="text-danger">*</span></label>
                        <input type="file" className="form-control" name="profilePic" id="profilePic" accept="image/png, image/jpeg" required />
                      </div>

                      {/* Email */}
                      <div className="col-12">
                        <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                        <input type="email" className="form-control" name="email" id="email" required />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                      </div>

                      {/* Password */}
                      <div className="col-12">
                        <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                        <input type="password" className="form-control" name="password" id="password" required />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                      </div>

                      {/* Confirm Password */}
                      <div className="col-12">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                        <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" required />
                        {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                      </div>

                      {/* Agree Terms */}
                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="iAgree" id="iAgree" required />
                          <label className="form-check-label text-secondary" htmlFor="iAgree">
                            I agree to the <a href="#!" className="link-primary text-decoration-none">terms and conditions</a>
                          </label>
                        </div>
                      </div>

                      {/* Message */}
                      {formMessage && (
                        <div className="col-12">
                          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {formMessage}
                          </div>
                        </div>
                      )}

                      {/* Loader */}
                      {loading && (
                        <div className="col-12 d-flex justify-content-center">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}

                      {/* Submit */}
                      <div className="col-12">
                        <div className="d-grid">
                          <button className="btn btn-primary" type="submit">
                            Sign up
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Link to login */}
                  <hr className="mt-5 mb-4 border-secondary-subtle" />
                  <p className="m-0 text-secondary text-center">
                    Already have an account? <Link to="/Login" className="link-primary text-decoration-none">Sign in</Link>
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
