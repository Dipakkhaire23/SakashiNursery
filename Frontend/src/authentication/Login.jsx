import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Google from "../images/google.png";
import FarmerImage from "../images/LoginImage.jpg";
import { Toaster, toast } from "react-hot-toast";
import Logo from "../images/logo.png";
import { generateAndSyncToken } from "../pages/firebase/FCM";
import { motion } from "framer-motion";

//

// eslint-disable-next-line react/prop-types
const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (useremail === "" || password === "") {
      setError("Please fill in both fields.");
      return;
    }
     const firebaseToken = await generateAndSyncToken();
   const loginData = {
      email: useremail,
      password: password,
      firebasetoken: firebaseToken, // Include FCM token
    };
    
setLoading(true); // Start loading
    try {

       
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
 

         },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
          localStorage.setItem("userId", data.id);
       
        localStorage.setItem("token", data.token);
     
      // window.location.reload()
 

  toast.success("Welcome to Sakshi Nursery" + data.name);

  const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
  localStorage.removeItem("redirectAfterLogin");
   
  navigate(redirectPath,{replace:true});
  window.location.reload();
      } else {
        const err = await response.json();
        alert(err.message || "Login failed");
      }
    } catch (err) {
      toast.error("Invalid Credentials");
      console.error("Login error:", err);
    }
    finally {
    setLoading(false); // Stop loading
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
  
     <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-10">
    <Toaster position="top-center" />

    {loading ? (
<div className="flex flex-col items-center justify-center h-full w-full">
  {/* Orbit container */}
  <div className="relative w-56 h-56">
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-orbit">
    <img
      src={Logo}
      alt="Loading..."
      className="w-40 h-32"  
    />
  </div>
  </div>
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

      
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 max-w-4xl w-full">
        {/* Left: Image */}
        <div className="w-full lg:w-1/2 h-[75%]">
          <img
            src={FarmerImage}
            alt="Farmer"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Right: Login Form */}
        <div className="w-full lg:w-1/2 p-6">
          <h1 className="text-center text-2xl font-bold text-green-700 mb-2">
            Sakshi Nursery
          </h1>
          <p className="text-center text-gray-600 mb-4 text-sm">
            Login to continue your journey with us.
          </p>

          {error && (
            <p className="text-red-600 text-center mb-3 text-sm">{error}</p>
          )}

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border border-gray-300 py-2 px-3 rounded-md hover:border-green-500 transition mb-4 text-sm"
          >
            <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="useremail"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="useremail"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm"
                placeholder="admin@sakshinursery.com"
                value={useremail}
                onChange={(e) => setUseremail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center text-sm mb-3">
              <a
                href="/forgot-password"
                className="text-green-600 hover:underline"
              >
                Forgot?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-3 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-green-600 hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
       </motion.div>
    )}
  </div>
   
  
);

};

export default Login;
