import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Google from "../images/google.png";
import FarmerImage from "../images/LoginImage.jpg";
import { Toaster, toast } from "react-hot-toast";
import Logo from "../images/logo.png";

import { motion } from "framer-motion";

//

// eslint-disable-next-line react/prop-types
const Login = ({ setAuthenticated, setUserRole }) => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (useremail === "" || password === "") {
      setError("Please fill in both fields.");
      return;
    }
    const firebaseToken = localStorage.getItem("currentFCMToken");
    const loginData = {
      email: useremail,
      password: password,
      firebasetoken: firebaseToken, // Include FCM token
    };

    try {
      
      setLoginLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(loginData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("userId", data.id);
        localStorage.setItem("token", data.token);

        setAuthenticated(true); // 🔁 Update state here
        setUserRole(data.role); // 🔁 Update role here
        toast.success("Welcome to Sakshi Nursery " + data.name);
        const redirectPath =
          localStorage.getItem("redirectAfterLogin") || "/products";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath, { replace: true });
      } else {
        const err = await response.json();
        alert(err.message || "Login failed");
      }
    } catch (err) {
      toast.error("Invalid Credentials");
      console.error("Login error:", err);
    } finally {
    
      setLoginLoading(false);
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
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-green-50">
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
          initial={{ opacity: 0, y: -50 }} // Start invisible and slightly up
          animate={{ opacity: 1, y: 0 }} // Fade in + slide down
          exit={{ opacity: 0, y: 50 }} // Fade out + slide down on exit
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg lg:flex-row">
            {/* Left: Image */}
            <div className="w-full lg:w-1/2 h-[75%]">
              <img
                loading="lazy"
                src={FarmerImage}
                alt="Farmer"
                className="object-cover object-top w-full h-full"
              />
            </div>

            {/* Right: Login Form */}
            <div className="w-full p-6 lg:w-1/2">
              <h1 className="mb-2 text-2xl font-bold text-center text-green-700">
                Sakshi Nursery
              </h1>
              <p className="mb-4 text-sm text-center text-gray-600">
                Login to continue your journey with us.
              </p>

              {error && (
                <p className="mb-3 text-sm text-center text-red-600">{error}</p>
              )}

              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full px-3 py-2 mb-4 text-sm transition border border-gray-300 rounded-md hover:border-green-500"
              >
                <img
                  loading="lazy"
                  src={Google}
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
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
                    className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md"
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
                    className="w-full p-2 mt-1 text-sm border border-gray-300 rounded-md"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between mb-3 text-sm">
                  <a
                    href="/forgot-password"
                    className="text-green-600 hover:underline"
                  >
                    Forgot?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className={`w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm ${
                    loading ? "cursor-not-allowed opacity-70" : ""
                  }`}
                >
                  {loginLoading ? (
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
                    "Login"
                  )}
                </button>
              </form>

              <div className="mt-3 text-sm text-center">
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
