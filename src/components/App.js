import React, { useState, useEffect, useRef } from "react";
import "../styles.css";
import HeroCarousel from "./HeroCarousel";
// import DraggableCarousel from './DraggableCarousel';
import OurClients from "./OurClients";
export default function App() {
  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero-section">
        <HeroCarousel />
      </section>

      {/* Clients Section */}
      <section className="clients-section">
        <div className="section-container">
          <h2 className="section-title">Quality Products</h2>
          <div className="subtitle-container">
            <p className="section-subtitle">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
              aspernatur sed placeat facilis eveniet, fuga unde repellat minima
              architecto maxime distinctio eos iste commodi quo consequatur
              autem ipsa aliquam laborum quisquam saepe dolorem mollitia quod
              asperiores. Tenetur eligendi veniam tempora.
            </p>
          </div>

          <OurClients />
        </div>
      </section>

      {/* You can add more sections below */}
    </div>
  );
}
