import  { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import axios from "axios";
import { CSVLink } from "react-csv";

const CustomerTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const transactionsPerPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      // const token = localStorage.getItem("token");
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL+"/api/admin/orders/payment-info/all",
        {
          // headers: { Authorization: `Bearer ${token}` },
                   withCredentials: true // ✅ Send cookies with the request

        }
      );

      const transformed = res.data.map((txn, index) => ({
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
      }));

      setTransactions(transformed);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
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
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        💳 Customer Transactions
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/3"
        />
        <CSVLink
          data={filtered}
          filename={"transactions.csv"}
          className="px-4 py-2 bg-blue-600 text-white rounded text-center w-full sm:w-auto"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Table */}
      <div className="overflow-x-auto text-sm">
        <table className="min-w-full border rounded bg-white shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Receipt</th>
              <th className="p-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((txn) => (
              <tr key={txn.id} className="hover:bg-gray-50 text-xs sm:text-sm">
                <td className="p-2 border">{txn.customerName}</td>
                <td className="p-2 border break-all">{txn.email}</td>
                <td className="p-2 border">₹{txn.amount}</td>
                <td className="p-2 border">{txn.status}</td>
                <td className="p-2 border break-all">{txn.receipt}</td>
                <td className="p-2 border text-center">
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

      {/* Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 flex items-center justify-center bg-green-200 bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                🧾 Payment Details
              </h3>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-2xl text-gray-500 hover:text-red-500 font-bold"
              >
                &times;
              </button>
            </div>

            {/* Detail Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
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
                <p className="text-green-700 font-semibold">₹{selectedTxn.amount}</p>
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
                <p className="break-all text-gray-900">{selectedTxn.receipt}</p>
              </div>
              <div>
                <span className="font-medium">🆔 Razorpay Order:</span>
                <p className="break-all text-gray-900">{selectedTxn.razorpayOrderId}</p>
              </div>
              <div>
                <span className="font-medium">🆔 Payment ID:</span>
                <p className="break-all text-gray-900">{selectedTxn.razorpayPaymentId}</p>
              </div>
              <div className="sm:col-span-2">
                <span className="font-medium">🔐 Signature:</span>
                <p className="break-all text-gray-900">
                  {selectedTxn.razorpaySignature}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedTxn(null)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
