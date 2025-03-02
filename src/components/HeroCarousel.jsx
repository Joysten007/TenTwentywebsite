import React, { useState, useEffect, useRef } from "react";
import "./HeroCarousel.css";
import banner from "../assets/images/banner.png";
import "./menu.css";

const HeroCarousel = () => {
  // Images - replace these placeholder URLs with your actual images
  const images = [
    banner,
    "https://images.unsplash.com/photo-1738253145888-e8f1e20ab05b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1707343843982-f8275f3994c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1682687220509-61b8a906ca19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle
  const timerRef = useRef(null);
  const slideDuration = 5000; // 5 seconds per slide

  // Get the next index in a circular manner
  const getNextIndex = (index) => (index + 1) % images.length;

  // Handle slide transitions
  const nextSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => getNextIndex(prevIndex));

    // Reset progress
    setProgress(0);

    // Allow for a new transition after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Should match the CSS transition duration
  };

  // Handle manual slide change
  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;

    clearInterval(timerRef.current);
    setIsTransitioning(true);
    setCurrentIndex(index);
    setProgress(0);

    setTimeout(() => {
      setIsTransitioning(false);
      startProgressTimer();
    }, 500);
  };

  // Progress timer function
  const startProgressTimer = () => {
    clearInterval(timerRef.current);

    // Reset progress
    setProgress(0);

    // Start new timer
    timerRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (100 / slideDuration) * 100;

        if (newProgress >= 100) {
          nextSlide();
          return 0;
        }

        return newProgress;
      });
    }, 100);
  };

  // Initialize and clean up timer
  useEffect(() => {
    startProgressTimer();

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div>
      {/* Navigation Menu */}
      <nav className="nav-container">
        {/* Desktop navigation links */}
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#news">News</a>
          <a href="#services">Services</a>
          <a href="#team">Our Team</a>
          <a href="#enquiry">Make Enquiry</a>
        </div>

        <div className="button-container">
          <button style={{ padding: "5px 18px", fontSize: "17px" }}>
            Contact us <i class="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>

        {/* Hamburger menu button */}
        <button
          className="hamburger-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Mobile drawer menu - conditionally rendered */}
        {isMenuOpen && (
          <div className="mobile-menu open">
            <div className="menu-items">
              <a href="#about" className="menu-item">
                About
              </a>
              <a href="#news" className="menu-item">
                News
              </a>
              <a href="#services" className="menu-item">
                Services
              </a>
              <a href="#team" className="menu-item">
                Our Team
              </a>
              <a href="#enquiry" className="menu-item">
                Make Enquiry
              </a>
            </div>
          </div>
        )}
      </nav>

      <div className="hero-container">
        {/* Main carousel */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "slide-active" : ""}`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={`slide-image ${
                index === currentIndex ? "zoom-active" : ""
              }`}
            />

            {/* Content overlay */}
            <div className="content-overlay">
              <div className="content-wrapper">
                <h1 className="subheading">Welcome To TenTwenty Farms</h1>
                <p className="headline">
                  From Our Farms <br /> to Your Hands
                </p>
                {/* <button className="cta-button">Get Started</button> */}
              </div>
            </div>
          </div>
        ))}

        {/* Loading thumbnail indicator */}
        <div className="thumbnail-container">
          <div className="thumbnail-wrapper">
            {/* Next slide thumbnail */}
            <img
              src={images[getNextIndex(currentIndex)]}
              alt="Next slide"
              className="thumbnail-image"
            />

            {/* Progress loader border */}
            <div className="loader-container">
              {/* Top border */}
              <div
                className="loader-top"
                style={{ width: `${progress > 25 ? 100 : progress * 4}%` }}
              />

              {/* Right border */}
              <div
                className="loader-right"
                style={{
                  height: `${
                    progress > 50
                      ? 100
                      : (progress - 25) * 4 > 0
                      ? (progress - 25) * 4
                      : 0
                  }%`,
                }}
              />

              {/* Bottom border */}
              <div
                className="loader-bottom"
                style={{
                  width: `${
                    progress > 75
                      ? 100
                      : (progress - 50) * 4 > 0
                      ? (progress - 50) * 4
                      : 0
                  }%`,
                }}
              />

              {/* Left border */}
              <div
                className="loader-left"
                style={{
                  height: `${
                    (progress - 75) * 4 > 0 ? (progress - 75) * 4 : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
