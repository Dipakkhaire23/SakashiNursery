import  { useState } from "react";
import Google from "../images/google.png";
import FarmerImage from "../images/Registration.jpg";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Logo from "../images/logo.png";
import { generateAndSyncToken } from "../pages/firebase/FCM"; // import the function
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const Register = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


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
     const firebaseToken = await generateAndSyncToken();

    const data = {
      name: fullName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
       firebasetoken: firebaseToken, // Include FCM token
    };

    try {
      setLoading(true)
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
        
         const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
  localStorage.removeItem("redirectAfterLogin");
   
  navigate(redirectPath,{replace:true});
  window.location.reload();
       
        console.log(data.role)
      navigate("/");
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
        setAddress("");
      } else {
        const resData = await response.json();
        setError(resData.message || "Registration failed.");
      }
    } catch (err) {
      setError("Error connecting to server."+{err});
    } finally{
      setLoading(false)
    }
  };
     const handleGoogleLogin = () => {
  // Store redirect path before navigating away
  const currentPath = location.pathname;
  localStorage.setItem("redirectAfterLogin", currentPath);

  // Show spinner immediately (for a short moment)
  setLoading(true);

  // Start OAuth login
  setTimeout(() => {
    window.location.href =
      import.meta.env.VITE_BACKEND_URL + "/oauth2/authorization/google";
  }, 100); // allow React to render loading spinner before leaving page
};

  return (

    
       <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex items-center justify-center px-4">
      <Toaster position="top-center" />
       {loading ? (
            // 👇 Loading Logo (No Animation)
      <div className="flex flex-col items-center justify-center h-full">
        <img
          src={Logo} // ✅ Use your actual logo import or path
          alt="Loading..."
          className="w-24 h-24"
        />
        <p className="mt-4 text-green-700 font-semibold">Logging in...</p>
      </div>
      
          ) : (
             <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      initial={{ opacity: 0, y: -50 }}   // Start invisible and slightly up
      animate={{ opacity: 1, y: 0 }}    // Fade in + slide down
      exit={{ opacity: 0, y: 50 }}      // Fade out + slide down on exit
      transition={{ duration: 0.5, ease: "easeOut" }}
    >

        <div className="flex flex-col lg:flex-row bg-white shadow-xl rounded-2xl overflow-hidden max-w-4xl w-full">

        <div className="hidden lg:block lg:w-1/2">
          <img src={FarmerImage} alt="Farmer" className="w-full h-full object-cover" />
        </div>

        <div className="w-full lg:w-1/2 p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-green-700 text-center mb-2">Sakshi Nursery</h1>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Create your account and start your nursery journey!
          </p>

          {error && <p className="text-red-600 text-center mb-3 text-sm">{error}</p>}

         <button
               onClick={handleGoogleLogin}
               className="w-full flex items-center justify-center border border-gray-300 py-2 px-3 rounded-md hover:border-green-500 transition mb-4 text-sm"
             >
               <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
               Sign in with Google
             </button>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="9876543210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm transition"
            >
              Register
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">Login</a>
          </div>
        </div>
      </div>
 </motion.div>
      )}
    </div>
   
   
  );
};

export default Register;
