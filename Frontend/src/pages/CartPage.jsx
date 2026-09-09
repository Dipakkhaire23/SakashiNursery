import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

// eslint-disable-next-line react/prop-types
const CartPage = ({ setCartItemCoun }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingItemId, setProcessingItemId] = useState(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const fetchCartItems = () => {
    setLoading(true);
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const itemsWithEditFlag = cart.map((item) => ({
        ...item,
        isEditing: false,
      }));
      setCartItems(itemsWithEditFlag);
    } catch (error) {
      console.error("Error loading local cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity * 0.25,
    0
  );

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const updateQuantity = (productId, quantity) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Quantity updated");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const removeFromCart = (id) => {
    try {
      setProcessingItemId(id);
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      
      if (typeof setCartItemCoun === "function") {
        setCartItemCoun(updatedCart.length);
      }
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    } finally {
      setProcessingItemId(null);
    }
  };

  const handleCheckoutClick = () => {
    if (!isAgreed) {
      alert("Please agree to the terms and conditions before proceeding.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowModal(true);
    }, 600);
  };

  const handleWhatsAppCheckout = () => {
    if (!address.trim() || !deliveryDate) {
      toast.error("Please enter a valid delivery address and date!");
      return;
    }

    setIsProcessing(true);

    // Build the detailed WhatsApp order summary
    let orderMessage = `*NEW ORDER - SAKSHI HI-TECH NURSERY*\n\n`;
    orderMessage += `*Customer Details:*\n`;
    orderMessage += `- *Delivery Address:* ${address}\n`;
    orderMessage += `- *Requested Date:* ${deliveryDate}\n\n`;
    orderMessage += `*Order Items:*\n`;

    cartItems.forEach((item, index) => {
      orderMessage += `${index + 1}. *${item.productName}* (${item.category})\n`;
      orderMessage += `   - Quantity: ${item.quantity} Plants\n`;
      orderMessage += `   - Price: ₹${item.price.toFixed(2)} / unit\n`;
      orderMessage += `   - Booking Downpayment (25%): ₹${(item.price * item.quantity * 0.25).toFixed(2)}\n`;
    });

    orderMessage += `\n*Total Downpayment Amount:* ₹${totalAmount.toFixed(2)}\n\n`;
    orderMessage += `Please confirm my order and share nursery bank details. Thank you!`;

    const whatsappNumber = "917972456090";
    const textUrl = encodeURIComponent(orderMessage);

    setTimeout(() => {
      setIsProcessing(false);
      setShowModal(false);

      // Clear local storage cart on success
      localStorage.removeItem("cart");
      setCartItems([]);
      if (typeof setCartItemCoun === "function") {
        setCartItemCoun(0);
      }

      window.open(`https://wa.me/${whatsappNumber}?text=${textUrl}`, "_blank");
      
      navigate("/congratulations", {
        state: {
          amount: totalAmount,
          orderId: "SN-" + Math.floor(100000 + Math.random() * 900000),
        },
      });
    }, 1000);
  };

  return (
    <main className="min-h-screen p-6 bg-green-50">
      <Toaster position="top-left" />
      <h1 className="mb-8 text-3xl font-extrabold text-center text-green-800 font-sans tracking-tight">
        Your Shopping Cart
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <LoaderCircle className="w-10 h-10 text-green-600 animate-spin" />
          <p className="mt-4 text-green-700 font-semibold">Loading Cart Items...</p>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-20 max-w-md mx-auto">
          <p className="text-lg text-gray-600 mb-6 italic">Your cart is currently empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div className="grid gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white border border-green-100 shadow-md rounded-2xl flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-green-950 mb-1">
                      {item.productName}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2 font-medium">
                      Category: {item.category} | Price per unit: ₹{item.price.toFixed(2)}
                    </p>

                    {item.isEditing ? (
                      <div className="flex items-center gap-3 mt-2">
                        <input
                          type="number"
                          min="500"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value) || 500
                            )
                          }
                          className="w-24 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                          onClick={() => {
                            if (item.quantity < 500) {
                              toast.error("Minimum order quantity is 500");
                              return;
                            }
                            updateQuantity(item.id, item.quantity);
                            setCartItems((prev) =>
                              prev.map((p) =>
                                p.id === item.id ? { ...p, isEditing: false } : p
                              )
                            );
                          }}
                          className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            // Reset local modifications
                            fetchCartItems();
                          }}
                          className="text-sm text-gray-500 underline hover:text-gray-700 font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-800 font-semibold">
                        Quantity: <span className="text-green-700 font-bold">{item.quantity} Plants</span>
                      </p>
                    )}
                  </div>

                  {!item.isEditing && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setCartItems((prev) =>
                            prev.map((p) =>
                              p.id === item.id ? { ...p, isEditing: true } : p
                            )
                          )
                        }
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-bold px-3 py-1.5 rounded-lg text-xs transition duration-200"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3 py-1.5 rounded-lg text-xs transition duration-200"
                        disabled={processingItemId === item.id}
                      >
                        {processingItemId === item.id ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  )}
                </div>

                {!item.isEditing && (
                  <div className="pt-3 mt-4 border-t border-gray-100 flex justify-between items-center text-sm">
                    <p className="font-semibold text-green-800">
                      💰 25% Downpayment: ₹
                      {(item.price * item.quantity * 0.25).toFixed(2)}
                    </p>
                    <p className="text-[11px] text-gray-400 italic">
                      * Required booking deposit
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Checkout controls */}
          <div className="p-6 bg-white border border-green-100 shadow-md rounded-2xl text-center">
            <p className="mb-4 text-xs text-gray-500 italic max-w-sm mx-auto">
              Please note: downpayment fees secure your tray production and seed allocation, and are non-refundable upon cancellation.
            </p>

            <div className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                id="agree"
                className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mr-2.5 cursor-pointer"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
              />
              <label htmlFor="agree" className="text-sm text-gray-700 font-semibold cursor-pointer select-none">
                I agree to the terms and downpayment policies
              </label>
            </div>

            <p className="text-2xl font-extrabold text-green-950 mb-4">
              Total Downpayment: <span className="text-green-700 font-black">₹{totalAmount.toFixed(2)}</span>
            </p>

            <button
              onClick={handleCheckoutClick}
              className="w-full sm:w-auto px-8 py-3 text-white bg-green-600 font-bold rounded-lg hover:bg-green-700 transition disabled:opacity-60 shadow-md"
              disabled={isProcessing || !isAgreed}
            >
              {isProcessing ? "Processing..." : "Proceed to Order"}
            </button>
          </div>
        </div>
      )}

      {/* Details Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative bg-white w-full max-w-md p-6 bg-white rounded-2xl border border-green-100 shadow-2xl">
            <h2 className="mb-4 text-xl font-bold text-green-800">
              Delivery Details
            </h2>

            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Delivery Address:
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Full address where seedlings should be shipped"
            />

            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Expected Delivery Date:
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleWhatsAppCheckout}
                className="px-5 py-2 text-white bg-green-600 font-bold rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                Send Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
