import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaStar, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LineClampedDescription from "./LineClampedDescription";
import { plantsData } from "./plantsData";

// eslint-disable-next-line react/prop-types
const VegetablePage = ({ categoryName, setCartItemCoun }) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [addedToCart, setAddedToCart] = useState(new Set());
  const [alreadyInCart, setAlreadyInCart] = useState(new Set());
  const [productReviews, setProductReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  // Load the single plant for this category statically
  useEffect(() => {
    const plant = plantsData.find(
      (p) => p.category.toLowerCase().replace(/\s+/g, "-") === categoryName.toLowerCase().replace(/\s+/g, "-")
    );
    if (plant) {
      setSelectedProduct(plant);
      setProductReviews(plant.reviews || []);
      
      // Check if already in local cart
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (cart.some((item) => item.id === plant.id)) {
        setAlreadyInCart(new Set([plant.id]));
      } else {
        setAlreadyInCart(new Set());
      }
      setAddedToCart(new Set());
    } else {
      setSelectedProduct(null);
    }
  }, [categoryName]);

  const handleCancelReview = () => {
    setUserRating(0);
    setUserComment("");
  };

  const handlepostreview = () => {
    if (!userComment.trim() || userRating === 0) {
      toast.error("Please add a comment and rating");
      return;
    }
    
    const newReview = {
      username: "Guest User",
      rating: userRating,
      comment: userComment,
    };
    
    setProductReviews((prev) => [...prev, newReview]);
    toast.success("Review posted locally!");
    setUserRating(0);
    setUserComment("");
  };

  const handleAddToCart = (productId) => {
    setIsProcessing(true);
    setTimeout(() => {
      const quantity = quantities[productId] || 500;
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      
      if (cart.some((item) => item.id === productId)) {
        toast("Already in cart", { icon: "ℹ️" });
        setAlreadyInCart((prev) => new Set(prev).add(productId));
        setIsProcessing(false);
        return;
      }

      const cartItem = {
        id: selectedProduct.id,
        productName: selectedProduct.name,
        price: selectedProduct.price,
        quantity: quantity,
        category: selectedProduct.category
      };

      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      setAddedToCart((prev) => new Set(prev).add(productId));
      toast.success("Product added to cart");
      
      if (typeof setCartItemCoun === "function") {
        setCartItemCoun(cart.length);
      }
      setIsProcessing(false);
    }, 400);
  };

  useEffect(() => {
    setSlideIndex(0);
  }, [selectedProduct]);

  useEffect(() => {
    if (!selectedProduct?.images?.length) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedProduct]);

  const handleSeeDiscount = () => setShowDiscount(!showDiscount);

  const prevSlide = () => {
    const length = selectedProduct?.images?.length || 1;
    setSlideIndex((prev) => (prev - 1 + length) % length);
  };

  const nextSlide = () => {
    const length = selectedProduct?.images?.length || 1;
    setSlideIndex((prev) => (prev + 1) % length);
  };

  const handleWhatsAppOrder = (productName) => {
    const whatsappNumber = "917972456090";
    const text = encodeURIComponent(
      `Hi Sakshi Hi-Tech Nursery, I am interested in ordering ${productName} plants. Please let me know the process!`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  const handleCallUs = () => {
    window.location.href = "tel:+917972456090";
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <p className="text-gray-600 font-semibold">Plant Category Not Found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-green-50 flex flex-col items-center justify-center animate-fade-in">
      <Toaster position="top-left" />
      
      <section className="w-full max-w-xl py-4">
        <article className="p-8 bg-white shadow-xl rounded-2xl border border-green-100 flex flex-col gap-6">
          {/* Plant Name */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-green-900 font-sans tracking-tight">
              {selectedProduct.name}
            </h1>
            <p className="text-xs font-semibold text-green-600/85 uppercase tracking-widest mt-1">
              {selectedProduct.category} Seedling
            </p>
          </div>

          {/* Plant Image */}
          <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gray-100 shadow-inner">
            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.name}
              className="object-cover w-full h-full hover:scale-102 transition duration-500"
            />
          </div>

          {/* Price */}
          <div className="text-center bg-green-50/50 py-3 rounded-xl border border-green-100/50">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-0.5">Price</span>
            <span className="text-3xl font-black text-green-700">
              ₹{selectedProduct.price.toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <div className="leading-relaxed text-gray-700 whitespace-pre-line text-justify text-sm px-1 border-t border-b border-gray-100 py-4 my-2">
            {selectedProduct.description}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleWhatsAppOrder(selectedProduct.name)}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-white bg-[#25D366] hover:bg-[#20ba59] font-bold rounded-xl transition duration-200 shadow-md hover:shadow-lg text-sm"
            >
              <FaWhatsapp size={18} />
              Inquire on WhatsApp
            </button>
            <button
              onClick={handleCallUs}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-white bg-emerald-600 hover:bg-emerald-700 font-bold rounded-xl transition duration-200 shadow-md hover:shadow-lg text-sm"
            >
              <FaPhoneAlt size={14} />
              Call to Inquire
            </button>
          </div>

          {/* Back Navigation Link */}
          <div className="text-center mt-2">
            <button
              onClick={() => navigate("/products")}
              className="text-xs text-green-700 hover:text-green-800 font-bold underline transition"
            >
              ← View All Available Plants
            </button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default VegetablePage;
