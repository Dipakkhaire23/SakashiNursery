import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";

const OAuthSuccessPage = ({ setAuthenticated, setUserRole }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const role = queryParams.get("role");

    if (token) {
      // // Save the token (you can also store in cookies or use a context)
      localStorage.setItem("token", token);



      setAuthenticated(true); // 🔁 Update state here
      setUserRole(role); // 🔁 Update role here

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "CUSTOMER") {
        const redirectPath =
          localStorage.getItem("redirectAfterLogin") || "/products";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath, { replace: true });
      }
      
    } else {
      
      navigate("/login");
    }
  }, [location, navigate,setAuthenticated,setUserRole]);

  return <div>Logging in...</div>;
};

export default OAuthSuccessPage;
