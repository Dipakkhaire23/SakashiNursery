import  { useState } from "react";
import Google from "../images/google.png";
// import FarmerImage from "../images/Registration.jpg";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
// import Logo from "../images/logo.png";
// import Navbar from "../components/Navbar";

import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const Register = ({ setAuthenticated, setUserRole }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword || !phoneNumber || !address) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
   const firebaseToken = localStorage.getItem("currentFCMToken");

    const data = {
      name: fullName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
       firebasetoken: firebaseToken, // Include FCM token
    };

    try {
      
      setRegisterLoading(true)
      const response = await fetch(import.meta.env.VITE_BACKEND_URL+"/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
         credentials: "include",
        body: JSON.stringify(data)
      });

      if (response.ok) {
       const data = await response.json();
      
        toast.success("Welcome to Sakshi Nursery " +data.name);

         localStorage.setItem("userId", data.id);
        localStorage.setItem("token", data.token);
        
          setAuthenticated(true); // 🔁 Update state here
  setUserRole(data.role); // 🔁 Update role here
   toast.success("Welcome to Sakshi Nursery " + data.name);
    const redirectPath = localStorage.getItem("redirectAfterLogin") || "/products";
    localStorage.removeItem("redirectAfterLogin");
    navigate(redirectPath, { replace: true });
   
      } else {
        const resData = await response.json();
        setError(resData.message || "Registration failed.");
      }
    } catch (err) {
      setError("Error connecting to server."+{err});
    } finally{
      
      setRegisterLoading(false);
    }
  };
  
     const handleGoogleLogin = () => {
  

  // Show spinner immediately (for a short moment)
  setLoading(true);

  // Start OAuth login
  setTimeout(() => {
    window.location.href =
      import.meta.env.VITE_BACKEND_URL + "/oauth2/authorization/google";
  }, 100); // allow React to render loading spinner before leaving page
};

  return (
  <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-green-100 via-green-50 to-green-200">
    <Toaster position="top-center" />
      {loading ? (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">
  <div className="z-10 flex flex-col items-center justify-center gap-4">
    {/* Name above loader */}
    <p className="text-lg font-bold text-green-700">SAKSHI HITECH NURSERY</p>

    {/* Circular loader */}
    <div className="w-12 h-12 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
  </div>
</div>



      ) : (
    
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white shadow-xl rounded-2xl">
        <div className="w-full p-8 sm:p-10">
          <h1 className="mb-2 text-3xl font-bold text-center text-green-700">Sakshi Nursery</h1>
          <p className="mb-6 text-sm text-center text-gray-600">
            Create your account and start your nursery journey!
          </p>

          {error && (
            <p className="mb-3 text-sm text-center text-red-600">{error}</p>
          )}

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full px-3 py-2 mb-4 text-sm transition border border-gray-300 rounded-md hover:border-green-500"
          >
            <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="9876543210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={registerLoading}
              className={`w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm ${
                registerLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {registerLoading ? (
                <svg
                  className="w-5 h-5 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Register"
              )}
            </button>
          </form>

          <div className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">Login</a>
          </div>
        </div>
      </div>
    </motion.div>)}
  </div>
);

};

export default Register;
