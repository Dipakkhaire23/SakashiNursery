import { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// const token = localStorage.getItem('token');

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing1, setIsProcessing1] = useState(false);

  const handleCheckoutClick = () => {
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
      setIsProcessing1(true)
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL+`/api/carts/deleteBy-ProductID/${id}`,
        {
          // headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, // ✅ Send cookies with the request
        }
      );
      toast.success("Removed from cart");
      //  window.location.reload();
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    } finally{
      setIsProcessing1(false)
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
      console.log(totalAmount);
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL+"/api/payment/create-order",
        { amount: totalAmount },
        {
          headers: {
            // Authorization: `Bearer ${token}`,

            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ Send cookies with the request
        }
      );
      return res.data;
    } catch (err) {
      toast.error("Amount Should be In Integer");
      console.log(err);
    }
  };

 const handlePayment = async () => {
  setIsProcessing(true); // Start spinner

  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    toast.error(
      "Failed to load Razorpay SDK. Check your internet connection."
    );
    setIsProcessing(false); // Stop spinner
    return;
  }

  try {
    const order = await createOrder();
    const options = {
      key: "rzp_test_chm9NHqwqlrr1z",
      amount: order.amount,
      currency: order.currency,
      name: "Sakshi Nursery",
      description: "Plant Order Payment",
      order_id: order.id,
      handler: async function (response) {
        try {
          const res = await axios.post(
            import.meta.env.VITE_BACKEND_URL+"/api/payment/verify",
            {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              address,
              deliveryDate,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          toast.success(res.data || "Payment Successful!");
          fetchCartItems();
          setShowModal(false); // ✅ Close modal after payment success
        } catch (err) {
          toast.error("Payment verification failed!");
          console.error(err);
        } finally {
          setIsProcessing(false); // Stop spinner after verification
        }
      },
      theme: { color: "#0e9f6e" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    // Stop spinner once Razorpay popup is opened
    rzp.on("payment.failed", function () {
      toast.error("Payment Failed!");
      setIsProcessing(false); // Stop spinner
    });
  } catch (error) {
    toast.error("Something went wrong during payment.");
    console.error(error);
    setIsProcessing(false); // Stop spinner
  }
};
  const navigate = useNavigate();
const handleClick = () => {
    navigate("/vegetable", ); 
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // if (loading) return <div className="p-6">Loading...</div>;

  return (
    <main className="p-6 bg-green-50 min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4 text-center text-green-800">
        Cart Items Added
      </h1>

      {loading ? (
  // 🌀 Spinner while loading
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
  </div>
) :cartItems.length === 0 ? (
       <>
         <p className="text-center text-gray-600">Now your cart is empty.</p>
      <h4 className="text-center text-gray-600">
        If you added a product but it went out of stock, it won’t show here.
        <span
          onClick={handleClick}
          className="text-green-600 underline cursor-pointer"
        >
          Click here
        </span>{" "}
        to view its status.
      </h4></>
      ) : (
        <div className="grid gap-4 max-w-sm mx-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg p-5 mb-4 transition-all duration-300"
            >
              <div className="flex justify-between items-start gap-4">
                {/* Left: Product Info */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-green-800 mb-1">
                    {item.productName}
                  </h2>
                  <p className="text-gray-700 text-sm mb-2">
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
                        className="border border-gray-300 rounded-md px-3 py-1 w-20 focus:outline-none focus:ring focus:ring-green-300"
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
                        className="text-gray-500 underline text-sm hover:text-gray-700"
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
                  <div className="flex flex-col gap-2 items-end">
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
      className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-60 flex items-center justify-center gap-2"
      disabled={isProcessing1}
    >
      {isProcessing1 ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
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
                <div className="mt-4 border-t pt-3">
                  <p className="text-green-700 font-medium text-sm">
                    💰 25% Booking Amount: ₹
                    {(item.price * item.quantity * 0.25).toFixed(2)}
                  </p>
                  <p className="text-gray-500 text-xs italic">
                    * This amount must be paid upfront to confirm booking.
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Checkout Button */}
<div className="mt-4 text-center">
  <p className="text-lg font-semibold text-green-900">
    Total Amount: ₹{totalAmount.toFixed(2)}
  </p>
  
  <div className="mt-2 flex justify-center">
    <button
      onClick={handleCheckoutClick}
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-60 flex items-center justify-center gap-2"
      disabled={isProcessing}
    >
      {isProcessing ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-green-200 bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-green-700">
              Enter Delivery Details
            </h2>

            <label className="block mb-2 text-sm font-medium">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />

            <label className="block mb-2 text-sm font-medium">
              Delivery Date:
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
        onClick={handlePayment}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60 flex items-center justify-center gap-2"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
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
