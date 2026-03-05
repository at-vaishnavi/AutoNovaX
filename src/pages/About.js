import React from "react";
// Import CSS file for About page styling
import "../styles/About.css";

// Functional component About to display company info
function About() {
  return (
    // Main container div for the About page content
    <div className="about-container">

      {/* Header section with company name and tagline */}
      <header className="about-header">
        <h1>AutoNovaX</h1>
        <p>Driving trust and quality since 2015 🚗</p>
      </header>

      {/* Grid container for various info cards about the company */}
      <div className="about-grid">

        {/* Card 1: Company Journey */}
        <div className="about-card">
          <h2>🚀 Our Journey</h2>
          <p>
            From a local venture in 2015 to a trusted brand, we’ve grown with a clear focus on
            quality and service.
          </p>
        </div>

        {/* Card 2: Mission Statement with bullet points */}
        <div className="about-card">
          <h2>🎯 Our Mission</h2>
          <ul>
            <li>Provide genuine, high-performance parts</li>
            <li>Offer expert support & fast delivery</li>
            <li>Stay future-ready with tech trends</li>
          </ul>
        </div>

        {/* Card 3: Reasons to choose the company */}
        <div className="about-card">
          <h2>🌟 Why Choose Us?</h2>
          <ul>
            <li>10+ years of automotive expertise</li>
            <li>Wide range & competitive prices</li>
            <li>Trusted by workshops & retailers</li>
          </ul>
        </div>

        {/* Card 4: Specialties / product focus areas */}
        <div className="about-card">
          <h2>🔧 Our Specialties</h2>
          <ul>
            <li>Alternators, starters, relays, flashers</li>
            <li>High-performance & electrical spares</li>
            <li>Authorized stockist of top brands</li>
          </ul>
        </div>

        {/* Card 5: Company core values */}
        <div className="about-card">
          <h2>💡 Our Values</h2>
          <ul>
            <li>Quality & Reliability</li>
            <li>Integrity in every transaction</li>
            <li>Customer-first mindset</li>
          </ul>
        </div>

        {/* Card 6: Future plans */}
        <div className="about-card">
          <h2>📈 What’s Next?</h2>
          <ul>
            <li>Expanding inventory</li>
            <li>Boosting online experience</li>
            <li>Collaborating with new brands</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Export the About component to be used in other parts of the app
export default About;
