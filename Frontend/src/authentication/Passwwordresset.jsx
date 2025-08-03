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
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-green-50">
      <Toaster position="top-center" />

      {loading ? (
        <div className="flex flex-col items-center justify-center h-full">
          {/* Orbit animation (same as Login) */}
          <div className="relative w-32 h-32">
            <div className="absolute top-0 transform -translate-x-1/2 left-1/2 animate-orbit">
              <img    loading="lazy" src={Logo} alt="Loading..." className="w-12 h-12" />
            </div>
          </div>
          <p className="mt-4 font-semibold text-green-700">Processing...</p>
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg lg:flex-row">
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2 h-[75%]">
            <img   loading="lazy"
              src={FarmerImage}
              alt="Farmer"
              className="object-cover object-top w-full h-full"
            />
          </div>

          {/* Right Side - Form */}
          <div className="w-full p-6 lg:w-1/2">
            <h1 className="mb-2 text-2xl font-bold text-center text-green-700">
              Reset Your Password
            </h1>
            <p className="mb-4 text-sm text-center text-gray-600">
              Enter a new password to secure your account.
            </p>

            {message && (
              <p className="mb-3 text-sm text-center text-green-600">
                {message}
              </p>
            )}
            {error && (
              <p className="mb-3 text-sm text-center text-red-600">
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
                  className="w-full p-3 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Reset Password
              </button>
            </form>

            <div className="mt-4 text-sm text-center">
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
