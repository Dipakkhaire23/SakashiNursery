import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye,LoaderCircle } from "lucide-react";
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
 <div className="flex items-center justify-center py-10">
          <LoaderCircle className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-3 text-gray-600">Loading Orders...</span>
        </div>
) :(
    <div className="min-h-screen p-6 bg-green-50">
      <Toaster position="top-right" />
      <h2 className="mb-6 text-2xl font-bold text-center text-green-800">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
          

      <div className="grid w-full max-w-md gap-4 px-4 mx-auto">

        {/* handle Edit model */}
      {editingOrder && (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-200 bg-opacity-40">
    <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-green-800">Edit Order</h2>

      <label className="block mb-2 text-sm font-medium">🏠 Address:</label>
      <input
        value={updatedAddress}
        onChange={(e) => setUpdatedAddress(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2 text-sm font-medium">🚚 Delivery Date:</label>
      <input
        type="date"
        value={updatedDeliveryDate}
        onChange={(e) => setUpdatedDeliveryDate(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <div className="flex justify-end gap-3">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setEditingOrder(null)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
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
    <div className="flex items-start justify-between">
      {/* LEFT: Order Details */}
      <div className="space-y-1 text-sm text-gray-700">
        <p className="text-base font-semibold text-green-700">🆔 Order ID: <span className="text-gray-900">{order.orderId}</span></p>
        <p>📅 <span className="text-gray-500">Booking:</span> <span className="text-gray-800">{order.bookingDate}</span></p>
        <p>🚚 <span className="text-gray-500">Delivery:</span> <span className="text-gray-800">{order.deliveryDate}</span></p>
        <p>🏠 <span className="text-gray-500">Address:</span> <span className="text-gray-800">{order.address}</span></p>
        <p>📦 <span className="text-gray-500">Status:</span> 
          <span className="ml-1 font-semibold text-yellow-600 animate-pulse">{order.orderStatus}</span>
        </p>
        <p>💰 <span className="text-gray-500">Total:</span> <span className="font-medium text-green-700">₹{order.totalPrice}</span></p>
        <p>✅ <span className="text-gray-500">Paid:</span> <span className="font-semibold text-green-800">₹{order.pricePaid}</span></p>
      </div>

      {/* RIGHT: Action Buttons */}
      <div className="flex flex-col items-end gap-3">
        <button
          className="text-green-600 transition-transform transform hover:text-green-800 hover:scale-110"
          onClick={() => handleViewDetails(order)}
          title="View Details"
        >
          <Eye className="w-6 h-6" />
        </button>

        <button
          className="text-xs font-medium text-blue-600 underline transition duration-200 hover:text-blue-800"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-200 bg-opacity-40">

          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-green-800">Order Details</h3>
            <p className="mb-2 text-sm font-medium">Products:</p>
            <ul className="pl-6 text-sm list-disc">
              {selectedOrder.products.map((p, idx) => (
                            <li key={idx} className="p-3 mb-2 border border-green-300 rounded shadow-sm bg-green-50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-green-900">🌿 {p.name}</span>
                  <span className="text-sm text-gray-700">₹{p.price.toFixed(2)}</span>
                </div>
              </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 mt-6 text-white bg-green-600 rounded hover:bg-green-700"
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
