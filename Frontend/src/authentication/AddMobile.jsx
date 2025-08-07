import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddMobile = ({ setAuthenticated, setUserRole }) => {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from query param
    const urlParams = new URLSearchParams(window.location.search);
    const newToken = urlParams.get("token");
       localStorage.setItem("token", newToken);
    
   
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/add-mobile",
        { mobile },
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials:true
        }
      );

      // Store new token if returned (optional)
      const role = response.data.role;
      setUserRole(role);
      setAuthenticated(true);
      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "CUSTOMER") {
        const redirectPath =
          localStorage.getItem("redirectAfterLogin") || "/products";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath, { replace: true });
      }
      
    } catch (error) {
      console.error("Error submitting mobile number:", error);
      alert("Failed to submit mobile number. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Complete Your Registration
        </h2>
        <p className="mb-6 text-sm text-center text-gray-500">
          Please enter your mobile number to proceed.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMobile;
