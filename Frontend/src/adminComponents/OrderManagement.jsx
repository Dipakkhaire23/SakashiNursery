import  { useState, useEffect } from "react"
import { Search, Eye, Package, Truck, CheckCircle,Loader  } from "lucide-react"

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false)
   const [loading, setLoading] = useState(true); // Loader state

  const formatDate = dateStr => new Date(dateStr).toLocaleDateString()
  const capitalize = s => s?.charAt(0).toUpperCase() + s?.slice(1).toLowerCase()

  const getStatusColor = status => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "Processing": return "bg-blue-100 text-blue-800"
      case "Shipped": return "bg-purple-100 text-purple-800"
      case "Delivered": return "bg-green-100 text-green-800"
      case "Canceled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = status => {
    switch (status) {
      case "Pending":
      case "Processing": return Package
      case "Shipped": return Truck
      case "Delivered": return CheckCircle
      default: return Package
    }
  }

  useEffect(() => {
  const fetchOrders = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/AllOrders`,
        { credentials: "include" }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      const formatted = data.map(order => ({
        id: order.orderId,
        customer: order.username,
        email: order.useremail,
        phone: order.phoneNumber,
        address: order.address,
        bookingDate: order.bookingDate,
        deliveryDate: order.deliveryDate,
        orderStatus: capitalize(order.orderStatus),
        status: capitalize(order.orderStatus),
        total: parseFloat(order.totalPrice) || 0,
        paidprice: parseFloat(order.pricePaid) || 0,
        paymentStatus:
          parseFloat(order.pricePaid) < parseFloat(order.totalPrice)
            ? "PARTIAL"
            : "PAID",
        products: order.products || [],
      }));

      setOrders(formatted);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false); // Always stop loader, even if error occurs
    }
  };

  fetchOrders();
}, []);


  const filteredOrders = orders.filter(order =>
    [order.id, order.customer, ...order.products.map(p => p.name)].some(field =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // const token = localStorage.getItem("token")
      const payload = {
        orderID: orderId,
        newstatus: newStatus.toUpperCase()
      }

      const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/api/admin/orders/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`
        },
     credentials: "include",
        body: JSON.stringify(payload)
      })

      if (!response.ok) throw new Error(await response.text())

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: capitalize(newStatus) } : order
        )
      )
    } catch (error) {
      console.error("Error updating status:", error)
      alert("Failed to update status. Please try again.")
    }
  }

  const viewOrderDetails = order => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  return (
    <div className="px-4 py-4 space-y-6 sm:px-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <div className="mt-2 text-sm text-gray-500 sm:mt-0">Total Orders: {orders.length}</div>
      </div>

      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
        <div className="relative">
          <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
          <input
            type="text"
            placeholder="Search orders by ID, customer, product..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Responsive Table View */}
       {loading ? (
      <div className="flex items-center justify-center py-10">
        <Loader className="animate-spin text-blue-500" size={40} />
        <span className="ml-3 text-gray-600">Loading Orders...</span>
      </div>
    ) : (<div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Products</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700 divide-y">
            {filteredOrders.map(order => {
              const StatusIcon = getStatusIcon(order.status)
              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-blue-600 font-medium">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.products.map(p => p.name).join(", ")}</td>
                  <td className="px-4 py-2">₹{Number(order.total || 0).toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      <StatusIcon size={12} className="mr-1" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => viewOrderDetails(order)} className="text-blue-600 hover:underline">
                        <Eye size={16} />
                      </button>
                      <select
                        value={order.status.toUpperCase()}
                        onChange={e => updateOrderStatus(order.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELED">CANCELED</option>
                      </select>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>)}

      <div className="md:hidden space-y-4">
  {filteredOrders.map(order => (
    <div key={order.id} className="p-4 bg-white rounded shadow border">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold text-blue-600">Order #{order.id.slice(0, 8)}...</h3>
        <button onClick={() => viewOrderDetails(order)} className="text-blue-600">
          <Eye size={16} />
        </button>
      </div>
      <p><span className="font-medium">Customer:</span> {order.customer}</p>
      <p><span className="font-medium">Products:</span> {order.products.map(p => p.name).join(", ")}</p>
      <p><span className="font-medium">Total:</span> ₹{Number(order.total).toFixed(2)}</p>
      <p><span className="font-medium">Status:</span> {order.status}</p>
    </div>
  ))}
</div>


      {/* Mobile Modal View */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="flex items-center justify-between mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
              <button onClick={() => setShowModal(false)} className="text-2xl text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div className="space-y-6 text-sm text-gray-700">
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="font-medium">Name</label><p>{selectedOrder.customer}</p></div>
                  <div><label className="font-medium">Phone</label><p>{selectedOrder.phone}</p></div>
                  <div><label className="font-medium">Email</label><p>{selectedOrder.email}</p></div>
                  <div><label className="font-medium">Address</label><p>{selectedOrder.address}</p></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="font-medium">Order ID</label><p>{selectedOrder.id}</p></div>
                  <div><label className="font-medium">Booking Date</label><p>{formatDate(selectedOrder.bookingDate)}</p></div>
                  <div><label className="font-medium">Delivery Date</label><p>{formatDate(selectedOrder.deliveryDate)}</p></div>
                  <div><label className="font-medium">Status</label><p>{selectedOrder.status}</p></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Payment Info</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="font-medium">Total</label><p>₹{Number(selectedOrder.total || 0).toFixed(2)}</p></div>
                  <div><label className="font-medium">Advance Paid</label><p>₹{Number(selectedOrder.paidprice || 0).toFixed(2)}</p></div>
                  <div><label className="font-medium">Payment Status</label><p>{selectedOrder.paymentStatus}</p></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Products</h3>
                {selectedOrder.products.map((product, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2 border p-3 mb-3 rounded bg-gray-50">
                    <div><label className="font-medium">Name</label><p>{product.name}</p></div>
                    <div><label className="font-medium">Price</label><p>₹{Number(product.price || 0).toFixed(2)}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderManagement