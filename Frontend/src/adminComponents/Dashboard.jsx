import React, { useEffect, useState } from "react";
import { Package, ShoppingCart, Users,Eye ,LoaderCircle} from "lucide-react";
import axios from "axios";

import Modal from "react-modal";
Modal.setAppElement("#root");
const token=localStorage.getItem("token");
const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0 // you can update this when user count API is ready
  });

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
   const [loading, setLoading] = useState(true); // Loader state
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/admin/orders/orders/recent", {
          // headers: {
          //   // Authorization: `Bearer ${token}`,
          //    withCredentials: true // ✅ Send cookies with the request
          // },
          withCredentials: true // ✅ Send cookies with the request
          
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally{
        setLoading(false)
      }
    };

    fetchOrders();
  }, [token]);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL+"/api/admin/dashboard/counts",{
      // headers: {
      //   // Authorization: `Bearer ${token}`,
      //   // DO NOT set Content-Type here; browser will auto-set correct boundary
      //    withCredentials: true // ✅ Send cookies with the request
      // },

      credentials: "include",
      method:"GET",
    })
      .then(res => res.json())
      .then(data => {
        setDashboardStats({
          totalOrders: data.totalOrders,
          totalProducts: data.totalProducts,
          totalUsers:data.totalUsers
        });
      })
      .catch(error => console.error("Error fetching dashboard stats:", error));
  }, []);

  const stats = [
    {
      label: "Total Plants",
      value: dashboardStats.totalProducts.toLocaleString(),
      icon: Package,
      color: "text-blue-600"
    },
    {
      label: "Total Orders",
      value: dashboardStats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "text-purple-600"
    },
    {
      label: "Total Customers",
      value: dashboardStats.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-orange-600"
    }
  ];


 const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "text-yellow-600";
      case "SHIPPED":
        return "text-blue-600";
      case "DELIVERED":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

 return (
    <>
  {/* Title */}
  <div className="p-4 space-y-6 sm:p-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
    </div>

    {/* Stat Cards */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="p-6 transition-shadow border border-gray-200 rounded-lg shadow-sm bg-green-50 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <Icon size={24} className={stat.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Recent Orders */}
    <div className="p-6 overflow-x-auto rounded-lg shadow-md bg-green-50">
      <h2 className="mb-4 text-xl font-semibold text-green-900">Recent 24hr Ago Orders</h2>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <LoaderCircle className="w-5 h-5 text-green-600 animate-spin" />
          <span className="ml-2 text-sm text-gray-700">Loading recent orders...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="py-6 text-sm text-center text-gray-500">
          No recent orders in the last 24 hours.
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded table-auto">
          <thead className="hidden text-green-900 bg-green-100 sm:table-header-group">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Delivery</th>
              <th className="px-4 py-2 text-left">Paid / Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="flex flex-col border-t sm:table-row sm:flex-row">
                <td className="px-4 py-2 text-sm truncate">{order.orderId.slice(0, 8)}...</td>
                <td className="px-4 py-2 text-sm">{order.username}</td>
                <td className="px-4 py-2 text-sm">{order.phoneNumber}</td>
                <td className="px-4 py-2 text-sm">{order.deliveryDate}</td>
                <td className="px-4 py-2 text-sm">
                  ₹{order.pricePaid} / ₹{order.totalPrice}
                </td>
                <td
                  className={`px-4 py-2 text-sm font-medium ${getStatusColor(order.orderStatus)}`}
                >
                  {order.orderStatus}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="text-green-700 hover:text-green-900"
                    title="View Details"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>

  {/* Modal for Order Details */}
  <Modal
    isOpen={!!selectedOrder}
    onRequestClose={() => setSelectedOrder(null)}
    contentLabel="Order Details"
    className="bg-white p-6 w-full max-w-lg mx-auto mt-20 rounded shadow-lg sm:max-h-[90vh] overflow-y-auto"
    overlayClassName="fixed inset-0 flex items-center justify-center bg-green-200 bg-opacity-40 z-50"
  >
    {selectedOrder && (
      <>
        <h2 className="mb-4 text-xl font-bold text-green-700">Order Details</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Customer Name:</strong> {selectedOrder.username}</p>
          <p><strong>Email:</strong> {selectedOrder.useremail}</p>
          <p><strong>Phone:</strong> {selectedOrder.phoneNumber}</p>
          <p><strong>Address:</strong> {selectedOrder.address}</p>
          <p><strong>Booking:</strong> {selectedOrder.bookingDate}</p>
          <p><strong>Delivery:</strong> {selectedOrder.deliveryDate}</p>
          <p>
            <strong>Total:</strong> ₹{selectedOrder.totalPrice} | 
            <strong className="ml-1">Paid:</strong> ₹{selectedOrder.pricePaid}
          </p>
          <div>
            <strong className="text-green-700">Products:</strong>
            <ul className="mt-1 list-disc list-inside">
              {selectedOrder.products.map((p, idx) => (
                <li key={idx}>
                  <span className="font-medium">{p.name}</span> – ₹{p.price}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={() => setSelectedOrder(null)}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </>
    )}
  </Modal>
</>

);


};

export default Dashboard;
