import React, { useState, useRef, useEffect } from "react";
import "./OurClients.css";

const DraggableCarousel = () => {
  // Sample data with client information and images
  const clientData = [
    {
      id: 1,
      name: "Client 2",
      location: "Dubai, United Arab Emirates",
      image:
        "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=2070",
    },
    {
      id: 2,
      name: "Client 2",
      location: "Singapore",
      image:
        "https://images.unsplash.com/photo-1598901847919-b95dd0fabbb6?q=80&w=2070",
    },
    {
      id: 3,
      name: "Client 3",
      location: "Amsterdam, Netherlands",
      image:
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070",
    },
    {
      id: 4,
      name: "Client 4",
      location: "Tokyo, Japan",
      image:
        "https://images.unsplash.com/photo-1591529063000-f02c4de0f986?q=80&w=2070",
    },
    {
      id: 5,
      name: "Client 5",
      location: "Paris, France",
      image:
        "https://images.unsplash.com/photo-1598449388299-f714aed282cd?q=80&w=2070",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);
  const dragThreshold = 100; // Minimum drag distance to trigger slide change

  // Handle circular indexing
  const getCircularIndex = (index) => {
    const length = clientData.length;
    return ((index % length) + length) % length;
  };

  // Get previous, current and next indexes
  const getPrevIndex = () => getCircularIndex(currentIndex - 1);
  const getNextIndex = () => getCircularIndex(currentIndex + 1);

  // Handle mouse and touch events
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);
    document.body.style.cursor = "grabbing";
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;

    const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);

    // Prevent default to stop scrolling while dragging
    e.preventDefault();
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    document.body.style.cursor = "default";

    // Determine if we should change slides based on drag distance
    if (dragOffset > dragThreshold) {
      // Dragged right - go to previous
      setCurrentIndex(getPrevIndex());
    } else if (dragOffset < -dragThreshold) {
      // Dragged left - go to next
      setCurrentIndex(getNextIndex());
    }

    // Reset drag state
    setIsDragging(false);
    setDragOffset(0);
  };

  // Add event listeners for mouse and touch events
  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel) {
      carousel.addEventListener("touchstart", handleDragStart, {
        passive: false,
      });
      carousel.addEventListener("touchmove", handleDragMove, {
        passive: false,
      });
      carousel.addEventListener("touchend", handleDragEnd);

      return () => {
        carousel.removeEventListener("touchstart", handleDragStart);
        carousel.removeEventListener("touchmove", handleDragMove);
        carousel.removeEventListener("touchend", handleDragEnd);
      };
    }
  }, [isDragging, startX]);

  return (
    <div className="tilted-carousel-container">
      <div
        className="tilted-carousel"
        ref={carouselRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        {/* Left tilted image */}
        <div className="carousel-item left-item">
          <div className="carousel-image-container">
            <img
              src={clientData[getPrevIndex()].image}
              alt={clientData[getPrevIndex()].name}
              className="carousel-image"
            />
          </div>
        </div>

        {/* Center image with drag indicator */}
        <div className="carousel-item center-item">
          <div className="carousel-image-container">
            <img
              src={clientData[currentIndex].image}
              alt={clientData[currentIndex].name}
              className="carousel-image"
            />
            <div className="drag-indicator">
              <span>Drag</span>
            </div>
          </div>
        </div>

        {/* Right tilted image */}
        <div className="carousel-item right-item">
          <div className="carousel-image-container">
            <img
              src={clientData[getNextIndex()].image}
              alt={clientData[getNextIndex()].name}
              className="carousel-image"
            />
          </div>
        </div>
      </div>

      <div className="client-info">
        <h2>{clientData[currentIndex].name}</h2>
        <p>{clientData[currentIndex].location}</p>
      </div>
    </div>
  );
};

export default DraggableCarousel;
