import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";



const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
const [updatedAddress, setUpdatedAddress] = useState("");
const [updatedDeliveryDate, setUpdatedDeliveryDate] = useState("");
 const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
       setLoading(true)
      // const token = localStorage.getItem("token");
      const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/Customer/orders/customerAllBooking", {
        // headers: { Authorization: `Bearer ${token}` },
        withCredentials: true // ✅ Send cookies with the request
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.success("Not Ordered Yet");
    } finally{
      setLoading(false)
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleupdate= async () => {
            try {
              // const token = localStorage.getItem("token");
              await axios.put(import.meta.env.VITE_BACKEND_URL+`/api/Customer/orders/upadateorder`, {
                orderId:editingOrder.orderId,
                editedaddress: updatedAddress,
                dileverydate: updatedDeliveryDate,
              },{
              withCredentials: true // ✅ Send cookies with the request
              }
            
            );
              // optionally refresh orders list
              setEditingOrder(null);
              toast.success("Order updated successfully");
              fetchOrders();
            } catch (error) {
              console.error(error);
              toast.error("Failed to update order");
            }
          }

  return loading ? (
  // 🌀 Spinner while loading
  <div className="flex justify-center items-center min-h-[200px]">
    <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
  </div>
) :(
    <div className="p-6 min-h-screen bg-green-50">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
          

      <div className="grid gap-4 w-full max-w-md mx-auto px-4">

        {/* handle Edit model */}
      {editingOrder && (
 <div className="fixed inset-0 flex items-center justify-center bg-green-200 bg-opacity-40 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4 text-green-800">Edit Order</h2>

      <label className="block mb-2 text-sm font-medium">🏠 Address:</label>
      <input
        value={updatedAddress}
        onChange={(e) => setUpdatedAddress(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2 text-sm font-medium">🚚 Delivery Date:</label>
      <input
        type="date"
        value={updatedDeliveryDate}
        onChange={(e) => setUpdatedDeliveryDate(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="flex justify-end gap-3">
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          onClick={() => setEditingOrder(null)}
        >
          Cancel
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleupdate}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

{/* //show orders card */}

{orders.map((order) => (
  <div
    key={order.orderId}
    className="group bg-white border border-gray-200 p-5 rounded-2xl shadow-sm hover:shadow-xl hover:border-green-500 transition-all duration-300 ease-in-out transform hover:scale-[1.01]"
  >
    <div className="flex justify-between items-start">
      {/* LEFT: Order Details */}
      <div className="space-y-1 text-sm text-gray-700">
        <p className="font-semibold text-green-700 text-base">🆔 Order ID: <span className="text-gray-900">{order.orderId}</span></p>
        <p>📅 <span className="text-gray-500">Booking:</span> <span className="text-gray-800">{order.bookingDate}</span></p>
        <p>🚚 <span className="text-gray-500">Delivery:</span> <span className="text-gray-800">{order.deliveryDate}</span></p>
        <p>🏠 <span className="text-gray-500">Address:</span> <span className="text-gray-800">{order.address}</span></p>
        <p>📦 <span className="text-gray-500">Status:</span> 
          <span className="ml-1 font-semibold text-yellow-600 animate-pulse">{order.orderStatus}</span>
        </p>
        <p>💰 <span className="text-gray-500">Total:</span> <span className="text-green-700 font-medium">₹{order.totalPrice}</span></p>
        <p>✅ <span className="text-gray-500">Paid:</span> <span className="text-green-800 font-semibold">₹{order.pricePaid}</span></p>
      </div>

      {/* RIGHT: Action Buttons */}
      <div className="flex flex-col items-end gap-3">
        <button
          className="text-green-600 hover:text-green-800 transition-transform transform hover:scale-110"
          onClick={() => handleViewDetails(order)}
          title="View Details"
        >
          <Eye className="w-6 h-6" />
        </button>

        <button
          className="text-blue-600 hover:text-blue-800 text-xs underline font-medium transition duration-200"
          onClick={() => {
            setEditingOrder(order);
            setUpdatedAddress(order.address);
            setUpdatedDeliveryDate(order.deliveryDate);
          }}
        >
          ✏️ Edit
        </button>
      </div>
    </div>
  </div>
))}


</div>

      )}








      {/* Modal for Order Details */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-green-200 bg-opacity-40 z-50">

          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-green-800">Order Details</h3>
            <p className="mb-2 text-sm font-medium">Products:</p>
            <ul className="list-disc pl-6 text-sm">
              {selectedOrder.products.map((p, idx) => (
                            <li key={idx} className="bg-green-50 border border-green-300 rounded p-3 mb-2 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-green-900">🌿 {p.name}</span>
                  <span className="text-sm text-gray-700">₹{p.price.toFixed(2)}</span>
                </div>
              </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
