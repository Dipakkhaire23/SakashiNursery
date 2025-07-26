import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Tomato = () => {
   const location = useLocation();
  const categoryName = "Tomato";

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [addedToCart, setAddedToCart] = useState(new Set());
  const [alreadyInCart, setAlreadyInCart] = useState(new Set());
  const [productReviews, setProductReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing1, setIsProcessing1] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  // Fetch reviews when product selected
  useEffect(() => {
    if (selectedProduct) {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            `/api/reviews/product/${selectedProduct.id}`,
          { withCredentials: true }
        )
        .then((res) => setProductReviews(res.data))
        .catch((err) => console.error("Failed to load reviews", err));
    }
  }, [selectedProduct]);

  const handleCancelReview = () => {
    setUserRating(0);
    setUserComment("");
  };

  const handlepostreview = async () => {
    try {
      setIsProcessing1(true);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews",
        {
          productId: selectedProduct.id,
          rating: userRating,
          comment: userComment,
        },
        { withCredentials: true }
      );
      toast.success("Review submitted!");
      setProductReviews((prev) => [...prev, response.data]);
      setUserRating(0);
      setUserComment("");
    } catch (error) {
      toast.error("Failed to submit review " + error);
    } finally {
      setIsProcessing1(false);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const averageRating = productReviews.length
    ? productReviews.reduce((sum, r) => sum + r.rating, 0) /
      productReviews.length
    : 0;

  const handleAddToCart = async (productId) => {
    const quantity = quantities[productId] || 1001;
    try {
      setIsProcessing(true);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/carts/AddToCart",
        { productId, quantity },
        { withCredentials: true }
      );

      const msg = response.data?.message || response.data;
      if (msg === "Added") {
        toast.success("Product added to cart");
        window.location.reload();
        setAddedToCart((prev) => new Set(prev).add(productId));
      } else if (msg === "Already added") {
        toast("Already in cart", { icon: "ℹ️" });
        setAlreadyInCart((prev) => new Set(prev).add(productId));
      } else {
        toast.error("Unexpected response");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchProductsByCategory = async (searchTerm = "") => {
    try {
    
      setLoading(true);
      const url = searchTerm
        ? import.meta.env.VITE_BACKEND_URL +`/api/admin/products/product/${searchTerm}`
        : import.meta.env.VITE_BACKEND_URL +`/api/customer/products/category/${categoryName}`;

      const res = await axios.get(url,
        
        { withCredentials: true }
 
      );
      setProducts(
        searchTerm ? res.data? [res.data]: []: Array.isArray(res.data)? res.data: []
      );
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Product Not Available");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, []);

  useEffect(() => {
    setSlideIndex(0);
  }, [selectedProduct]);

  useEffect(() => {
    if (!selectedProduct?.images?.length) return;
    const interval = setInterval(() => {
      setSlideIndex(
        (prev) => (prev + 1) % selectedProduct.images.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedProduct]);

  const handleSeeDiscount = () => setShowDiscount(!showDiscount);
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.trim() === "") fetchProductsByCategory("");
  };

  const prevSlide = () =>
    setSlideIndex((prev) => {
      const length = selectedProduct?.images?.length || 1;
      return (prev - 1 + length) % length;
    });

  const nextSlide = () =>
    setSlideIndex((prev) => {
      const length = selectedProduct?.images?.length || 1;
      return (prev + 1) % length;
    });

  return (
  <main className="p-6 bg-green-50 min-h-screen">
    <Toaster position="top-right" />
    <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">
      {categoryName} Plants
    </h1>

    {/* Search bar (only when list view is visible) */}
    {!selectedProduct && (
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md"
        />
        <button
          onClick={() => fetchProductsByCategory(searchTerm)}
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Search
        </button>
      </div>
    )}

    {/* Product Details View */}
    {selectedProduct ? (
      <section className="flex items-center justify-center py-2 max-w-full">
        <article className="w-full bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
          {/* Product Image Slider */}
          <div className="w-full md:w-1/2 h-auto md:h-screen relative">
            <img
              src={
                selectedProduct?.images?.length > 0 &&
                slideIndex < selectedProduct.images.length
                  ? `data:${selectedProduct.images[slideIndex].contentType};base64,${selectedProduct.images[slideIndex].data}`
                  : "https://via.placeholder.com/300"
              }
              alt={`Slide ${slideIndex + 1}`}
              className="w-full rounded-lg object-cover h-auto md:h-screen"
            />

            {/* Image Navigation */}
            {selectedProduct?.images?.length > 1 && (
              <>
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <button
                    onClick={prevSlide}
                    className="bg-green-600 text-white rounded-full px-3 py-1 hover:bg-green-700"
                  >
                    ‹
                  </button>
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <button
                    onClick={nextSlide}
                    className="bg-green-600 text-white rounded-full px-3 py-1 hover:bg-green-700"
                  >
                    ›
                  </button>
                </div>
              </>
            )}

            {/* Dots for slider */}
            {selectedProduct?.images?.length > 1 && (
              <div className="flex justify-center mt-2 gap-2">
                {selectedProduct.images.map((_, i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 rounded-full border-2 ${
                      slideIndex === i
                        ? "bg-green-600 border-green-600"
                        : "bg-white border-gray-400"
                    }`}
                    onClick={() => setSlideIndex(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-green-800">
              {selectedProduct.name}
            </h2>
            <p className="text-green-700 text-lg font-semibold mb-2">
              ₹{selectedProduct.price}
            </p>
            <p className="text-gray-700 mb-2">{selectedProduct.description}</p>
            <p className="text-md mb-1">
              <span className="font-semibold">Category:</span>{" "}
              {selectedProduct?.category?.name || "N/A"}
            </p>
            <p className="text-md mb-1">
              <span className="font-semibold">Status:</span>{" "}
              {selectedProduct.status}
            </p>

            {/* Quantity & Add to Cart */}
            {selectedProduct.status === "AVAILABLE" &&
              !addedToCart.has(selectedProduct.id) &&
              !alreadyInCart.has(selectedProduct.id) && (
                <>
                  <p className="text-md text-green-600 mb-2">
                    <span className="font-semibold">Quantity Available:</span>{" "}
                    {selectedProduct.stockQuantity} Plants
                  </p>

                  <input
                    type="number"
                    min="1001"
                    max={selectedProduct.stockQuantity}
                    value={
                      quantities[selectedProduct.id] !== undefined
                        ? quantities[selectedProduct.id]
                        : ""
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        setQuantities((prev) => ({
                          ...prev,
                          [selectedProduct.id]: "",
                        }));
                        return;
                      }

                      const parsed = parseInt(value);
                      if (!isNaN(parsed)) {
                        setQuantities((prev) => ({
                          ...prev,
                          [selectedProduct.id]: parsed,
                        }));

                        if (parsed < 1001) {
                          toast.error("Minimum quantity is 1001");
                        } else if (
                          parsed > selectedProduct.stockQuantity
                        ) {
                          toast.error(
                            `Maximum available is ${selectedProduct.stockQuantity}`
                          );
                        }
                      }
                    }}
                    className="border border-gray-300 rounded-md px-2 py-1 w-60 mb-2"
                    placeholder="Enter quantity (min 1001)"
                  />

                  {/* Live Validation Message */}
                  {quantities[selectedProduct.id] &&
                    (quantities[selectedProduct.id] < 1001 ||
                      quantities[selectedProduct.id] >
                        selectedProduct.stockQuantity) && (
                      <p className="text-red-500 text-sm">
                        {quantities[selectedProduct.id] < 1001
                          ? "Minimum quantity is 1001"
                          : `Maximum available is ${selectedProduct.stockQuantity}`}
                      </p>
                    )}

                  <div className="flex gap-10 mt-2">

                    <button
                      onClick={() => {
                        const qty = quantities[selectedProduct.id] || 0;
                        if (
                          qty < 1001 ||
                          qty > selectedProduct.stockQuantity
                        ) {
                          toast.error(
                            "Please enter a valid quantity before adding!"
                          );
                          return;
                        }
                        handleAddToCart(selectedProduct.id);
                      }}
                      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-60 flex items-center justify-center gap-2"
                      disabled={
                        isProcessing ||
                        !quantities[selectedProduct.id] ||
                        quantities[selectedProduct.id] < 1001 ||
                        quantities[selectedProduct.id] >
                          selectedProduct.stockQuantity
                      }
                    >
                      {isProcessing ? "Adding..." : "Add to Cart"}
                    </button>
 {/* Back button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="underline text-sm text-gray-500 mt-4"
            >
              ← Back to List
            </button>

            {/* Discount Section */}
            <button
              onClick={handleSeeDiscount}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-4"
            >
              {showDiscount ? "Hide Discount" : "See Discount"}
            </button>

                  </div>
                </>
              )}

            {/* Added / Already in Cart Messages */}
            {addedToCart.has(selectedProduct.id) && (
              <span className="text-green-700 font-semibold py-2 flex items-center">
                ✅ Product added to cart
              </span>
            )}
            {alreadyInCart.has(selectedProduct.id) && (
              <span className="text-yellow-700 font-semibold py-2 flex items-center">
                ⚠️ Already in cart
              </span>
            )}

           

            {showDiscount && (
              <div className="mt-4 bg-gray-100 p-4 rounded border border-green-300">
                <p>1️⃣ Book online and get a 25% discount.</p>
                <p>2️⃣ Order in bulk and enjoy free delivery.</p>
              </div>
            )}

            {/* Rating & Review */}
            <div className="mt-4 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">
                Rate this product
              </h3>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setUserRating(i + 1)}
                    color={
                      (hoverRating || userRating) > i
                        ? "#16a34a"
                        : "#d1d5db"
                    }
                    className="cursor-pointer text-xl"
                  />
                ))}
                {userRating > 0 && (
                  <span className="ml-2 text-green-700">
                    {userRating} star(s)
                  </span>
                )}
              </div>

              {userRating > 0 && (
                <>
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2 mb-2"
                    rows="3"
                    placeholder="Write a comment..."
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                  ></textarea>
                  <div className="flex gap-4">
                    <button
                      onClick={handlepostreview}
                      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-60"
                      disabled={isProcessing1}
                    >
                      {isProcessing1 ? "Submitting..." : "Submit Review"}
                    </button>
                    <button
                      onClick={handleCancelReview}
                      className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                      disabled={isProcessing1}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Customer Reviews */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Customer Reviews
              </h3>
              {productReviews.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No reviews yet.
                </p>
              ) : (
                productReviews.map((review, idx) => (
                  <div key={idx} className="mb-3 border-b pb-2">
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          color={
                            i < review.rating ? "#16a34a" : "#d1d5db"
                          }
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {review.username}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </article>
      </section>
    ) : loading ? (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    ) : products.length === 0 ? (
      <p className="text-center text-gray-600 text-lg mt-10">
        No products available in this category.
      </p>
    ) : (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <article
            key={p.id}
            className="bg-white border border-green-200 rounded-xl shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-green-900">{p.name}</h3>
              <img
                src={
                  p?.images?.length
                    ? `data:${p.images[0].contentType};base64,${p.images[0].data}`
                    : "https://via.placeholder.com/300"
                }
                alt={p.name}
                className="rounded-md mb-4 w-full h-40 object-cover"
              />
              <p className="text-gray-700 mb-3">{p.description}</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-green-800 font-semibold text-lg">₹{p.price}</p>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    color={
                      i < Math.round(p.averageRating || 0)
                        ? "#16a34a"
                        : "#d1d5db"
                    }
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  ({Math.round(p.averageRating || 0)})
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelectedProduct(p)}
              className="bg-green-600 text-gray-800 py-2 px-4 rounded-md hover:bg-yellow-600 "
            >
              View Plant Details
            </button>
          </article>
        ))}
      </section>
    )}
  </main>
  );
};

export default Tomato;
