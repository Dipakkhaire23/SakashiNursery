import React, { useState, useEffect } from 'react';

// Import the images
import Slide1 from '../images/Slidebar_1.jpg';
import Slide2 from '../images/Slidebar_2.jpg';
import Slide3 from '../images/Slidebar_3.jpg';
import Slide4 from '../images/Slidebar_4.jpg';
import Slide5 from '../images/Slidebar_5.jpg';
import Slide6 from '../images/Slidebar_6.jpg';



const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [Slide1, Slide2, Slide3,Slide4,Slide5,Slide6];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className=" relative">
      <div className="w-full h-[500px] bg-gray-300">
        <img
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8594;
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-yellow-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;
