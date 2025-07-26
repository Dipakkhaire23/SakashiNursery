import React, { useEffect, useState } from "react";
import { Package, ShoppingCart, Users,Eye } from "lucide-react";
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
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
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
     <div className="p-4 space-y-6 sm:p-6">
      {/* Top Title */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-6 transition-shadow bg-green-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
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

      {/* Orders Table */}
      <div className="p-6 bg-green-50 rounded-lg shadow-lg overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-green-900">Recent 24hr Ago Orders</h2>
        <table className="min-w-full table-auto bg-white border border-gray-300 rounded">
          <thead className="bg-green-100 text-green-900 hidden sm:table-header-group">
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
              <tr key={order.orderId} className="sm:table-row flex flex-col sm:flex-row border-t">
                <td className="px-4 py-2 text-sm truncate">{order.orderId.slice(0, 8)}...</td>
                <td className="px-4 py-2 text-sm">{order.username}</td>
                <td className="px-4 py-2 text-sm">{order.phoneNumber}</td>
                <td className="px-4 py-2 text-sm">{order.deliveryDate}</td>
                <td className="px-4 py-2 text-sm">
                  ₹{order.pricePaid} / ₹{order.totalPrice}
                </td>
                <td className={`px-4 py-2 text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
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
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onRequestClose={() => setSelectedOrder(null)}
        contentLabel="Order Details"
        className="bg-white p-6 w-full max-w-lg mx-auto mt-20 rounded shadow-lg sm:max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-green-200 bg-opacity-40 z-50"
      >
        {selectedOrder && (
          <>
            <h2 className="text-xl font-bold text-green-700 mb-2">Order Details</h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Customer Name:</strong> {selectedOrder.username}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.useremail}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.address}
              </p>
              <p>
                <strong>Booking:</strong> {selectedOrder.bookingDate}
              </p>
              <p>
                <strong>Delivery:</strong> {selectedOrder.deliveryDate}
              </p>
              <p>
                <strong>Total:</strong> ₹{selectedOrder.totalPrice} | <strong>Paid:</strong> ₹{selectedOrder.pricePaid}
              </p>
              <div>
                <strong className="text-green-700">Products:</strong>
                <ul className="list-disc list-inside mt-1">
                  {selectedOrder.products.map((p, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{p.name}</span> – ₹{p.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 text-right">
              <button
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
