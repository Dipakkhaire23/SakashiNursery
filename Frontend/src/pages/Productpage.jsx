import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { plantsData } from '../pages/vegetables/plantsData';

const ProductPage = () => {
  const navigate = useNavigate();

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="min-h-screen p-6 bg-green-50">
      <Helmet>
        <title>Vegetable Plants & High-Yield Seedlings | Sakshi Hi-Tech Nursery</title>
        <meta name="description" content="Browse high-quality vegetable plants including Papaya, Tomato, Watermelon, Chilli, Capsicum, Cucumber, and Brinjal seedlings." />
        <meta name="keywords" content="Vegetable Seedlings, Tomato Plants, Papaya Seedlings, Watermelon Plants, Nursery Products Maharashtra" />
        <meta property="og:title" content="Vegetable Seedlings & Plants - Sakshi Nursery" />
        <meta property="og:description" content="Explore healthy, high-yield vegetable seedlings for commercial farming." />
      </Helmet>
      <h2 className="mb-8 text-3xl font-extrabold text-center text-green-800 font-sans tracking-tight">
        Available Plant Categories
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {plantsData.map((crop, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 50}
            onClick={() =>
              navigate(`/vegetable/${crop.category.toLowerCase().replace(/\s+/g, '-')}`)
            }
            className="premium-card p-5 bg-white border border-green-100 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition duration-300"
          >
            <h3 className="mb-3 text-xl font-bold text-green-900">
              {crop.category}
            </h3>
            <div className="relative h-48 w-full overflow-hidden rounded-xl mb-4 bg-gray-100">
              <img
                src={crop.images[0]}
                alt={crop.category}
                className="object-cover w-full h-full hover:scale-105 transition duration-500"
              />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Starting Price</span>
              <span className="text-lg font-bold text-green-700">₹{crop.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
