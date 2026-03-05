// src/pages/Home.js
import React, { useState, useEffect } from "react";
import "../styles/Home.css";

const Home = () => {
  // State to track the currently active slide (1 to 5)
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    // Automatically switch slides every 2.5 seconds
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev === 5 ? 1 : prev + 1));
    }, 2500);

    // Clean up interval on component unmount
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="home">
      {/* Slideshow */}
      <div className="slideshow">
        <div className={`slide slide1 ${activeSlide === 1 ? "slide-active" : ""}`}></div>
        <div className={`slide slide2 ${activeSlide === 2 ? "slide-active" : ""}`}></div>
        <div className={`slide slide3 ${activeSlide === 3 ? "slide-active" : ""}`}></div>
        <div className={`slide slide4 ${activeSlide === 4 ? "slide-active" : ""}`}></div>
        <div className={`slide slide5 ${activeSlide === 5 ? "slide-active" : ""}`}></div>
      </div>

      {/* Hero Text */}
      <div className={`hero-text ${activeSlide === 1 ? "text-visible" : ""}`}>
        <h1 className="hero-title">WELCOME TO AutoNovaX</h1>
        <p className="hero-desc">Quality Auto Spare Parts</p>
        <p className="hero-desc">Distributors all over India</p>
      </div>
    </div>
  );
};

export default Home;