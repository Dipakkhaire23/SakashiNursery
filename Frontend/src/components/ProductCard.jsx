import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from "react-router-dom";
import { plantsData } from "../pages/vegetables/plantsData";

const products = plantsData.filter((p) =>
  ["Cabbage", "Chilli", "Watermelon", "Tomato"].includes(p.category)
);

const ProductCard = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  // const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  const isAuthenticated=localStorage.getItem("token")
    const navigate = useNavigate();

  // const handleAddToWishlist = (product) => {
  //   const isWishlisted = wishlist.includes(product.id);
  //   if (isWishlisted) {
  //     setWishlist(wishlist.filter(id => id !== product.id));
  //     toast.error(`${product.name} removed from wishlist`);
  //   } else {
  //     setWishlist([...wishlist, product.id]);
  //     toast.success(`${product.name} added to wishlist`);
  //   }
  // };

  return (
   <div className="p-6 bg-green-50">
  <h2 className="mb-8 text-3xl font-bold text-center text-green-700">
    Top selling Plants
  </h2>

  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
    {products.map((product, index) => (
      <div
        key={product.id}
        data-aos="fade-up"
        data-aos-delay={index * 100}
        className="relative p-4 transition-shadow bg-white shadow-md rounded-xl hover:shadow-lg"
      >
        {/* ✅ Image click navigates to login if unauthenticated */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onClick={() => {
            const path = `/vegetable/${product.category.toLowerCase().replace(/\s+/g, '-')}`;
            navigate(path);
          }}
          className="object-cover w-full h-40 mb-2 rounded cursor-pointer"
        />

        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-green-700">{product.name}</h3>
          <p className="text-lg font-bold text-green-600">₹{product.price}</p>
        </div>

        {/* ✅ View Details shows modal only if authenticated */}
        <div className="mt-4">
          <button
            onClick={() => {
              // if (!isAuthenticated) {
              //   localStorage.setItem("redirectAfterLogin", `/vegetable/${product.category}`);
              //   navigate("/login");
              // } else {
                
              // }
              setSelectedPlant(product); // Only open modal
            }}
            className="w-full px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* ✅ Modal */}
  {selectedPlant && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 flex flex-col items-center border border-green-100 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute text-2xl font-bold text-gray-400 hover:text-red-600 transition-colors top-4 right-4"
          onClick={() => setSelectedPlant(null)}
        >
          ×
        </button>

        <img
          src={selectedPlant.images[0]}
          alt={selectedPlant.name}
          className="object-cover w-full h-56 rounded-xl mb-4 shadow-sm"
        />

        <h2 className="text-2xl font-extrabold text-green-800 mb-2">{selectedPlant.name}</h2>
        <p className="text-sm text-gray-600 mb-4 whitespace-pre-line text-justify leading-relaxed px-1">
          {selectedPlant.description}
        </p>
        <div className="flex justify-between items-center w-full border-t border-gray-100 pt-4 mt-auto">
          <div>
            <span className="text-xs text-gray-500 block">Category</span>
            <span className="font-semibold text-green-700">{selectedPlant.category}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block text-right">Price</span>
            <span className="text-lg font-bold text-green-700">{selectedPlant.price}</span>
          </div>
        </div>

        <div className="flex gap-4 w-full mt-6">
          <button
            onClick={() => {
              const path = `/vegetable/${selectedPlant.category.toLowerCase().replace(/\s+/g, '-')}`;
              navigate(path);
              setSelectedPlant(null);
            }}
            className="flex-1 py-2.5 bg-green-600 hover:bg-yellow-600 text-white font-bold rounded-lg transition duration-200 text-center"
          >
            Order / View Details
          </button>
          <a
            href={selectedPlant.wiki}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 border border-green-200 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition duration-200 text-center text-sm flex items-center justify-center"
          >
            View on Wikipedia
          </a>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default ProductCard;
