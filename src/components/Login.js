import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // New loading state
  const [message, setMessage] = useState('');  // New message state
  const [messageType, setMessageType] = useState(''); // success or error type for styling
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    setMessage('');
    setMessageType('');
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('isLoggedIn', 'true');  // ✅ Add this
        localStorage.setItem('token', data.token || 'dummy_token');
        setMessage('Redirecting to Dashboard...');
        setMessageType('success');
        setTimeout(() => {
          navigate('/dashboard');
          window.location.reload();
        }, 2000);
      } else if (response.status === 404) {
        // User not found
        setMessage('User not found. Please check your credentials.');
        setMessageType('error');
      } else {
        // Invalid credentials or other login error
        setMessage('Invalid credentials!');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setMessage('Something went wrong. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <section className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="text-center mb-3">
                  <a href="#!" style={{ textDecoration: 'none' }}>
                    <h1 style={{ fontWeight: 'bolder' }}>Login</h1>
                  </a>
                </div>
                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                  Sign in to your account
                </h2>
                <form onSubmit={handleLogin}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="name@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)} // Update email state
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} // Update password state
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex gap-2 justify-content-between">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            name="rememberMe"
                            id="rememberMe"
                          />
                          <label className="form-check-label text-secondary" htmlFor="rememberMe">
                            Keep me logged in
                          </label>
                        </div>
                        <Link to="/Reset" className="link-primary text-decoration-none">
                          Forgot password?
                        </Link>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
                          {loading ? 'Logging in...' : 'Log in'}
                        </button>
                      </div>
                    </div>

                    <div className="col-12">
                      <p className="m-0 text-secondary text-center">
                        Don't have an account?{' '}
                        <Link to="/Signup" className="link-primary text-decoration-none">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>

                {/* Message Box */}
                {message && (
                  <div className="mt-3 text-center">
                    <div
                      className={`alert ${messageType === 'error' ? 'alert-danger' : 'alert-success'}`}
                      role="alert"
                    >
                      {message}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
