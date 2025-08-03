// src/pages/Congratulations.jsx
import { useLocation, Link } from "react-router-dom";

const Congratulations = () => {
  const { state } = useLocation();
  const amount = state?.amount || "N/A";
  const orderId = state?.orderId || "N/A";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-green-100">
      <h1 className="mb-4 text-4xl font-bold text-green-700">🎉 Congratulations!</h1>
      <p className="mb-2 text-xl text-gray-700">Your payment was successful.</p>
      <p className="text-lg">Amount Paid: ₹{amount}</p>
      <p className="text-gray-600 text-md">Order ID: {orderId}</p>
      <Link to="/" className="px-4 py-2 mt-6 text-white bg-green-600 rounded hover:bg-green-700">
        Go to Home
      </Link>
    </div>
  );
};

export default Congratulations;
