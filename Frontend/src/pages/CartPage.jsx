import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
// const token = localStorage.getItem('token');

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
 const [processingItemId, setProcessingItemId] = useState(null);
   const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckoutClick = () => {
  if (!isAgreed) {
    alert("Please agree to the terms and conditions before proceeding.");
    return;
  }

  setIsProcessing(true); // Start processing
  setTimeout(() => {
    setIsProcessing(false); // Stop processing
    setShowModal(true); // Show modal after 1 second
  }, 1000);
};


  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL+"/api/carts/GetCarts",
        {
          // headers: {
          //   //  Authorization: `Bearer ${token}`

          //  },
          withCredentials: true, // ✅ Send cookies with the request
        }
      );
      const itemsWithEditFlag = response.data.map((item) => ({
        ...item,
        isEditing: false,
      }));
      setCartItems(itemsWithEditFlag || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.success("No Cart Added Yet");
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

  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.put(
        import.meta.env.VITE_BACKEND_URL+`/api/carts/update-quantity`,
        { productId, quantity },
        // { headers: { Authorization: `Bearer ${token}` } }
        {
          withCredentials: true, // ✅ Send cookies with the request
        }
      );
      toast.success("Quantity updated");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

 const removeFromCart = async (id) => {
  try {
    setProcessingItemId(id); // ✅ Only mark this item as processing
    await axios.delete(
      import.meta.env.VITE_BACKEND_URL + `/api/carts/deleteBy-ProductID/${id}`,
      {
        withCredentials: true,
      }
    );
    toast.success("Removed from cart");
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  } catch (error) {
    console.error("Error removing item:", error);
    toast.error("Failed to remove item");
  } finally {
    setProcessingItemId(null); // ✅ Clear after operation
  }
};


  const loadRazorpayScript = () => {
   

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
      
    });
  };

  const createOrder = async () => {
  try {
    console.log("Sending amount:", totalAmount); // confirm value
    const res = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/api/payment/create-order",
      { amount: totalAmount }, // ✅ Can be double
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log("Order created:", res.data); // ✅ check if res has amount
    return res.data;
  } catch (err) {
    console.error("Create order failed:", err);
    toast.error("Error creating order: " + (err.response?.data || err.message));
    return null;
  }
};


const handlePayment = async () => {
  setIsProcessing(true); // ⏳ Start loading

  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    toast.error("Failed to load Razorpay SDK. Check your internet connection.");
    setIsProcessing(false);
    return;
  }
   

  try {
    
    // Step 1: Create order on backend
    const order = await createOrder(); // should return: { id, amount, currency }
    if (!order || !order.amount || !order.id) {
  toast.error("Order creation failed. Please try again.");
  setIsProcessing(false);
  return;
}

    const options = {
      key: "rzp_live_MHCWVpI4r7gNl1", // ✅ Live Razorpay key    rzp_live_MHCWVpI4r7gNl1
      amount: order.amount,
      currency: order.currency,
      name: "Sakshi Nursery",
      description: "Plant Order Payment",
      order_id: order.id,
      theme: { color: "#0e9f6e" },

      handler: async (response) => {
        try {
          navigate("/congratulations");
          // Step 2: Verify payment with backend
          const verifyRes = await axios.post(
            import.meta.env.VITE_BACKEND_URL + "/api/payment/verify",
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              address,
              deliveryDate,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );

          toast.success(verifyRes.data || "Payment Successful!");

          // ✅ Close modal first
          setShowModal(false);

          // ✅ Delay navigation slightly to ensure modal closes before page change
          setTimeout(() => {
            navigate("/congratulations", {
              state: {
                amount: order.amount / 100,
                orderId: order.id,
              },
            });
          }, 300);
        } catch (err) {
          console.error("Verification failed:", err);
          toast.error("Payment verification failed.");
        } finally {
          setIsProcessing(false);
        }
      },
    };

    const rzp = new window.Razorpay(options);

    // Open Razorpay payment modal
    rzp.open();

    // Handle payment failure
    rzp.on("payment.failed", function (response) {
      console.error("Payment failed:", response);
      toast.error("Payment failed. Please try again.");
      setIsProcessing(false);
    });
  } catch (error) {
    console.error("Payment error:", error);
    toast.error("Something went wrong during payment.");
    setIsProcessing(false);
  }
};


  const navigate = useNavigate();
// const handleClick = () => {
//     navigate("/vegetable", ); 
//   };

  // useEffect(() => {
  //   fetchCartItems();
  // }, []);

  // if (loading) return <div className="p-6">Loading...</div>;

  return (
    <main className="min-h-screen p-6 bg-green-50">
      <Toaster position="top-right" />
      <h1 className="mb-4 text-2xl font-bold text-center text-green-800">
        Cart Items Added
      </h1>

      {loading ? (
  <div className="flex items-center justify-center py-10">
          <LoaderCircle className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-3 text-gray-600">Loading CartItems...</span>
        </div>
) :cartItems.length === 0 ? (
     <>
  <p className="text-center text-gray-600">Now your cart is empty.</p>
  {/* <h4 className="text-center text-gray-600">
    If you added a product but it went out of stock, it won’t show here.{" "}
    <span
      onClick={handleClick}
      className="text-green-600 underline cursor-pointer"
    >
      Click here
    </span>{" "}
    to view its status.
  </h4> */}

  <div className="flex justify-center mt-6">
    <button
      onClick={() => navigate('/products')}
      className="px-6 py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
    >
      Continue Shopping
    </button>
  </div>
</>

      
      ) : (
        <div className="grid max-w-sm gap-4 mx-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-5 mb-4 transition-all duration-300 bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: Product Info */}
                <div className="flex-1">
                  <h2 className="mb-1 text-xl font-semibold text-green-800">
                    {item.productName}
                  </h2>
                  <p className="mb-2 text-sm text-gray-700">
                    Price per unit: ₹{item.price.toFixed(2)}
                  </p>

                  {/* Quantity Section */}
                  {item.isEditing ? (
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-20 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                      />
                      <button
                        onClick={() => {
                          updateQuantity(item.id, item.quantity);
                          setCartItems((prev) =>
                            prev.map((p) =>
                              p.id === item.id ? { ...p, isEditing: false } : p
                            )
                          );
                        }}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-all text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() =>
                          setCartItems((prev) =>
                            prev.map((p) =>
                              p.id === item.id ? { ...p, isEditing: false } : p
                            )
                          )
                        }
                        className="text-sm text-gray-500 underline hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-800">
                      Quantity:{" "}
                      <span className="font-medium">{item.quantity}</span>
                    </p>
                  )}
                </div>

                {/* Right: Action Buttons */}
                {!item.isEditing && (
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() =>
                        setCartItems((prev) =>
                          prev.map((p) =>
                            p.id === item.id ? { ...p, isEditing: true } : p
                          )
                        )
                      }
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1.5 rounded-md text-sm transition-all"
                    >
                      ✏️ Edit
                    </button>
                    
                    <button
  onClick={() => removeFromCart(item.id)}
  className="flex items-center justify-center gap-2 px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-60"
  disabled={processingItemId === item.id}
>
  {processingItemId === item.id ? (
    <>
      <svg
        className="w-5 h-5 text-white animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
        ></path>
      </svg>
      Removing...
    </>
  ) : (
    "Remove"
  )}
</button>

                  </div>
                )}
              </div>

              {/* Bottom Info: Booking Amount */}
              {!item.isEditing && (
                <div className="pt-3 mt-4 border-t">
                  <p className="text-sm font-medium text-green-700">
                    💰 25% Booking Amount: ₹
                    {(item.price * item.quantity * 0.25).toFixed(2)}
                  </p>
                  <p className="text-xs italic text-gray-500">
                    * This amount must be paid upfront to confirm booking.
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Checkout Button */}
 <div className="mt-4 text-center">
      <p className="mb-2 text-sm text-gray-700">
        Once you book and your booking is cancelled, we will not refund your money.
      </p>

      <div className="flex items-center justify-center mb-3">
        <input
          type="checkbox"
          id="agree"
          className="mr-2"
          checked={isAgreed}
          onChange={() => setIsAgreed(!isAgreed)}
        />
        <label htmlFor="agree" className="text-sm text-gray-800">
          I agree to the terms and conditions.
        </label>
      </div>

      <p className="text-lg font-semibold text-green-900">
        Total Amount: ₹{totalAmount.toFixed(2)}
      </p>

      <div className="flex justify-center mt-2">
        <button
          onClick={handleCheckoutClick}
          className="flex items-center justify-center gap-2 px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-60"
          disabled={isProcessing || !isAgreed}
        >
          {isProcessing ? (
            <>
              <svg
                className="w-5 h-5 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Proceed to Checkout"
          )}
        </button>
      </div>
    </div>

        </div>
      )}

      {/* Modal */}
      {showModal && !isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-200 bg-opacity-40">
          <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
            <h2 className="mb-4 text-xl font-bold text-green-700">
              Enter Delivery Details
            </h2>

            <label className="block mb-2 text-sm font-medium">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded"
            />

            <label className="block mb-2 text-sm font-medium">
              Delivery Date:
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
        onClick={handlePayment}
        className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-60"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <svg
              className="w-5 h-5 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          <>Confirm & Pay ₹{totalAmount.toFixed(2)}</>
        )}
      </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CartPage;
