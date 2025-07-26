import { useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import FarmerImage from "../images/LoginImage.jpg"; // Same image as Login page
import Logo from "../images/logo.png"; // Optional (if you want branding)
import { Toaster, toast } from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/reset-password`,
        { token, newPassword }
      );

      toast.success("Password reset successfully! Please log in.");
      setNewPassword("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-10">
      <Toaster position="top-center" />

      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          {/* Orbit animation (same as Login) */}
          <div className="relative w-32 h-32">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-orbit">
              <img src={Logo} alt="Loading..." className="w-12 h-12" />
            </div>
          </div>
          <p className="mt-4 text-green-700 font-semibold">Processing...</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 max-w-4xl w-full">
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2 h-[75%]">
            <img
              src={FarmerImage}
              alt="Farmer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full lg:w-1/2 p-6">
            <h1 className="text-center text-2xl font-bold text-green-700 mb-2">
              Reset Your Password
            </h1>
            <p className="text-center text-gray-600 mb-4 text-sm">
              Enter a new password to secure your account.
            </p>

            {message && (
              <p className="text-green-600 text-center mb-3 text-sm">
                {message}
              </p>
            )}
            {error && (
              <p className="text-red-600 text-center mb-3 text-sm">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm"
              >
                Reset Password
              </button>
            </form>

            <div className="text-center mt-4 text-sm">
              <a href="/login" className="text-green-600 hover:underline">
                Back to Login
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
