import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const OAuthSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      // Save the token (you can also store in cookies or use a context)
      localStorage.setItem("token", token);
      window.location.reload();
       
      
      

      // Redirect to saved path or default to "/products"
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/products";
      navigate(redirectPath, { replace: true });
       
      
    } else {
      // If token is missing, go to login
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Logging in...</div>;
};

export default OAuthSuccessPage;
