import  { useState, useEffect } from 'react';

import { Link} from "react-router-dom";

// Import the images
import Slide1 from '../images/Slidebar_1.jpg';
import Slide2 from '../images/Slidebar_2.jpg';
import Slide3 from '../images/Slidebar_3.jpg';
import Slide4 from '../images/Slidebar_4.jpg';
import Slide5 from '../images/Slidebar_5.jpg';
import Slide6 from '../images/Slidebar_6.jpg';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
const [fadeIn, setFadeIn] = useState(false);
  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);
  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 100); // slight delay for smoother animation
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
      {/* Slide Image */}
      <img
        src={slides[currentSlide]}
        alt={`Slide ${currentSlide + 1}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          transition: 'opacity 1s ease-in-out',
        }}
      />

      <>
      {/* Light black overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1rem',
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out',
        }}
      >
        <h2
          style={{
            color: 'white',
            fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', // Responsive: min 1.5rem, max 3.5rem
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          Sakshi HiTech Nursery
        </h2>
        <h3
          style={{
            color: 'white',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.25rem)', // Responsive subtitle
            maxWidth: '90%',
            lineHeight: '1.8',
          }}
        >
          Empowering Indian Agriculture with Excellence. <br />
          Delivering premium quality seeds, saplings, and essential agri-inputs to farmers. <br />
          Bringing fresh, nutritious fruits and vegetables straight to consumers’ homes.
        </h3>
       <Link
  to="/register"
  className="relative inline-block px-5 py-2 overflow-hidden font-semibold text-white transition border-2 border-yellow-300 rounded-lg group hover:text-white"
>
  <span className="absolute top-0 left-0 z-0 w-full h-0 transition-all duration-300 ease-in-out bg-yellow-300 group-hover:h-full"></span>
  <span className="relative z-10 text-white">Get Started</span>
</Link>

      </div>
    </>


      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '1rem',
          transform: 'translateY(-50%)',
          zIndex: 3,
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '1rem',
          transform: 'translateY(-50%)',
          zIndex: 3,
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        &#8594;
      </button>

      {/* Navigation Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem',
          zIndex: 3,
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: currentSlide === index ? '#facc15' : '#d1d5db',
              transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;
