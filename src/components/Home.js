import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/root.css'; 

export default function Home() {
  return (
    <div 
      className="container-fluid text-center d-flex justify-content-center align-items-center flex-column"
      style={{
        backgroundColor: 'var(--bg-cream)', // Using CSS variable
        minHeight: 'calc(100vh - 5rem)',
        padding: '6rem 2rem 4rem', // Better vertical spacing
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--study-blue-transparent) 20%, transparent 70%)',
        opacity: 0.3,
        zIndex: 0
      }}></div>

      {/* Content container with animation-ready styling */}
      <div 
        className="position-relative" 
        style={{
          zIndex: 1,
          maxWidth: '800px',
          transition: 'all 0.4s ease-out'
        }}
      >
        {/* Your existing content */}
        <p className="text-uppercase mb-3 fw-bold tracking-wide" 
          style={{
            color: 'var(--study-blue)',
            letterSpacing: '3px',
            fontSize: '0.9rem'
          }}>
          Your Learning Assistant
        </p>
        <h1 className="fw-bold mb-4 display-4" 
            style={{
              color: 'var(--deep-navy)',
              lineHeight: 1.3,
              textShadow: '1px 1px 3px rgba(0,0,0,0.05)'
            }}>
          Navigate Your Career<br/>with Confidence
        </h1>

        <p className="lead mb-5 px-3" 
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            fontWeight: 400
          }}>
          Explore personalized learning journeys and smart guidance built for student success.
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
          Start Now →
        </Link>
      </div>
    </div>
  );
}
