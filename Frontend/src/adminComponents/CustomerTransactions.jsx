import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { Eye, Loader } from "lucide-react"; // Ensure you're importing icons

const CustomerTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [loading, setLoading] = useState(true);
  const transactionsPerPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/admin/orders/payment-info/all",
        {
          withCredentials: true,
        }
      );

      const sorted = res.data
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 🆕 Sort by date

      const transformed = sorted.map((txn, index) => ({
        id: index + 1,
        customerName: txn.customername,
        email: txn.email,
        amount: txn.amount,
        status: txn.status,
        receipt: txn.receipt,
        razorpayOrderId: txn.razorpayOrderId,
        razorpayPaymentId: txn.razorpayPaymentId,
        razorpaySignature: txn.razorpaySignature,
        mobile: txn.mobileno,
        createdAt: new Date(txn.createdAt).toLocaleString(), // 🆕 Human-readable date
      }));

      setTransactions(transformed);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = transactions.filter((txn) =>
    (txn.customerName?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (txn.email?.toLowerCase() || "").includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  return (
    <div className="p-4 sm:p-6">
      <h2 className="mb-4 text-xl font-bold text-center sm:text-2xl sm:text-left">
        💳 Customer Transactions
      </h2>

      {/* Filters */}
      <div className="flex flex-col gap-3 mb-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 border rounded sm:w-1/3"
        />
        <CSVLink
          data={filtered}
          filename={"transactions.csv"}
          className="w-full px-4 py-2 text-center text-white bg-blue-600 rounded sm:w-auto"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Loader className="w-6 h-6 text-blue-500 animate-spin" />
          <span className="ml-3 text-gray-600">Loading Transaction...</span>
        </div>
      ) : (
        <div className="overflow-x-auto text-sm">
          <table className="min-w-full bg-white border rounded shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Receipt</th>
                {/* <th className="p-2 border">Date</th> */}
                <th className="p-2 text-center border">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((txn) => (
                <tr key={txn.id} className="text-xs hover:bg-gray-50 sm:text-sm">
                  <td className="p-2 border">{txn.customerName}</td>
                  <td className="p-2 break-all border">{txn.email}</td>
                  <td className="p-2 border">₹{txn.amount}</td>
                  <td className="p-2 border">{txn.status}</td>
                  <td className="p-2 break-all border">{txn.receipt}</td>
                  {/* <td className="p-2 border">{txn.createdAt}</td> */}
                  <td className="p-2 text-center border">
                    <button
                      onClick={() => setSelectedTxn(txn)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-200 bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                🧾 Payment Details
              </h3>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-2xl font-bold text-gray-500 hover:text-red-500"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 sm:grid-cols-2">
              <div>
                <span className="font-medium">👤 Name:</span>
                <p className="text-gray-900">{selectedTxn.customerName}</p>
              </div>
              <div>
                <span className="font-medium">📧 Email:</span>
                <p className="text-gray-900">{selectedTxn.email}</p>
              </div>
              <div>
                <span className="font-medium">📱 Mobile:</span>
                <p className="text-gray-900">{selectedTxn.mobile}</p>
              </div>
              <div>
                <span className="font-medium">💰 Amount:</span>
                <p className="font-semibold text-green-700">₹{selectedTxn.amount}</p>
              </div>
              <div>
                <span className="font-medium">📦 Status:</span>
                <p
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    selectedTxn.status === "ADVANCEPAID"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {selectedTxn.status}
                </p>
              </div>
              <div>
                <span className="font-medium">🧾 Receipt ID:</span>
                <p className="text-gray-900 break-all">{selectedTxn.receipt}</p>
              </div>
              <div>
                <span className="font-medium">🆔 Razorpay Order:</span>
                <p className="text-gray-900 break-all">{selectedTxn.razorpayOrderId}</p>
              </div>
              <div>
                <span className="font-medium">🆔 Payment ID:</span>
                <p className="text-gray-900 break-all">{selectedTxn.razorpayPaymentId}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="font-medium">🔐 Signature:</span>
                <p className="text-gray-900 break-all">
                  {selectedTxn.razorpaySignature}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedTxn(null)}
                className="px-5 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTransactions;
