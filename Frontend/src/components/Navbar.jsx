import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import axios from "axios";
// import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  //   const token = localStorage.getItem("token"); // ✅ Get token from cookie
  //  const role = localStorage.getItem("role");
  //  console.log(token +" "+ role)

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [cartItemCount, setCartItemCount] = useState(0);
  const [showPages, setShowPages] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShowPages, setMobileShowPages] = useState(false);
  const [mobileShowShop, setMobileShowShop] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/UserRole", {
          withCredentials: true,
        })
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));
    }
  }, []);

  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (!isAuthenticated) return;
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/carts/CartItemCount",
          {
            method: "GET",
            credentials: "include",
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          }
        );

        // if (!res.ok) throw new Error("Failed to fetch cart count");
        const count = await res.json();
        setCartItemCount(count);
      } catch (err) {
        console.error("Cart count error:", err);
        setCartItemCount(0);
      }
    };

    if (isAuthenticated) fetchCartItemCount();
  }, [isAuthenticated]);

  const vegetableList = [
    "Cauliflower",
    "Papaya",
    "Brinjal",
    "Lady Finger",
    "Cabbage",
    "Bottle Gourd",
    "Bitter Gourd",
    "Tomato",
    "Chilli",
    "Capsicum",
    "Watermelon",
    "Muskmelon",
    "Cucumber",
    "Small Cucumber",
    "Drumstick",
    "Merigold",
  ];

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileShowPages(false);
    setMobileShowShop(false);
  };

  return (
    <nav className="sticky top-0 bg-green-700 text-white px-4 md:px-6 py-4 z-50 shadow-md">
      <div className="flex items-center justify-between md:justify-start">
        {/* Logo */}
        <div className="mr-4">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 text-base font-medium">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowShopDropdown(!showShopDropdown)}
              className="w-full text-left hover:text-yellow-200 font-semibold flex justify-between items-center blink"
            >
              Book Now ▾
            </button>
            {showShopDropdown && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white text-black rounded-xl shadow-2xl border z-10 w-64"
                onMouseLeave={() => setShowShopDropdown(false)} // 🔑 This line closes dropdown when mouse leaves
              >
                <div className="grid grid-cols-2 gap-3 px-4 py-3">
                  {vegetableList.map((veg, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const vegPath = `/vegetable/${veg
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`;
                        if (!isAuthenticated) {
                          localStorage.setItem("redirectAfterLogin", vegPath);
                          navigate("/login");
                        } else {
                          navigate(vegPath);
                        }
                        setShowShopDropdown(false);
                      }}
                      className="text-left font-semibold hover:text-green-700"
                    >
                      {veg}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/team" className="hover:text-yellow-300">
            Team
          </Link>
          <Link to="/about-us" className="hover:text-yellow-300">
            About Us
          </Link>
          <Link to="/contact-us" className="hover:text-yellow-300">
            Contact Us
          </Link>
          <Link to="/phases" className="hover:text-yellow-300">
            Phases
          </Link>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowPages(!showPages)}
                className="hover:text-yellow-300"
              >
                Pages ▾
              </button>

              {showPages && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white text-black rounded-xl shadow-2xl z-10 w-56"
                  onMouseLeave={() => setShowPages(false)} // 🔑 Auto-close when mouse leaves
                >
                  <Link
                    to="/infrastructure"
                    onClick={() => setShowPages(false)}
                    className="block px-4 py-2 hover:text-green-600"
                  >
                    Infrastructure
                  </Link>
                  <Link
                    to="/my-orders"
                    onClick={() => setShowPages(false)}
                    className="block px-4 py-2 hover:text-green-600"
                  >
                    My Orders
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/infrastructure" className="hover:text-yellow-300">
              Infrastructure
            </Link>
          )}
        </div>

        {/* Right-side Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/* Cart Icon with Hover and Badge */}
              <Link
                to="/cart"
                className="relative group p-2 rounded-full hover:bg-yellow-200 transition duration-300 ease-in-out"
                title="Cart"
              >
                <ShoppingCart
                  size={26}
                  className="text-yellow-300 group-hover:text-green-700 transition duration-300"
                />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Profile Icon with Tooltip and Glow Effect */}
              <Link
                to="/profile"
                className="group p-2 rounded-full hover:bg-yellow-200 transition duration-300 ease-in-out"
                title="Profile"
              >
                <User
                  size={28}
                  className="text-white group-hover:text-green-700 transition duration-300"
                />
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="relative inline-block px-5 py-2 overflow-hidden font-semibold text-white-700 border-2 border-yellow-300 rounded-lg group hover:text-white transition duration-300 ease-in-out"
              >
                <span className="absolute left-0 top-0 w-full h-0 bg-yellow-300 transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-0 z-0"></span>
                <span className="relative z-10">Login</span>
              </Link>

              <Link
                to="/register"
                className="relative inline-block px-5 py-2 overflow-hidden font-semibold text-white-700 border-2 border-yellow-300 rounded-lg group hover:text-white transition duration-300 ease-in-out"
              >
                <span className="absolute left-0 top-0 w-full h-0 bg-yellow-300 transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-0 z-0"></span>
                <span className="relative z-10">Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Hamburger for Mobile */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-800 text-white transform transition-transform duration-300 z-30 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-green-600">
          <div className="text-xl font-bold">Menu</div>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 px-6 mt-4 text-lg">
          <Link
            to="/"
            className="hover:text-yellow-200"
            onClick={handleMobileLinkClick}
          >
            Home
          </Link>

          {/* Mobile Shop */}
          <div>
            <button
              onClick={() => setMobileShowShop(!mobileShowShop)}
              className="w-full text-left hover:text-yellow-200 font-semibold flex justify-between items-center blink"
            >
              Book Now ▾
            </button>

            {mobileShowShop && (
              <div className="mt-4 ml-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {vegetableList.map((veg, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const vegPath = `/vegetable/${veg
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`;
                      if (!isAuthenticated) {
                        localStorage.setItem("redirectAfterLogin", vegPath);
                        navigate("/login");
                      } else {
                        navigate(vegPath);
                      }
                      setShowShopDropdown(false);
                    }}
                    className="p-1 bg-green-100 hover:bg-green-200 text-green-900 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105 font-semibold text-sm sm:text-base text-center"
                  >
                    {veg}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/team"
            className="hover:text-yellow-200 font-semibold"
            onClick={handleMobileLinkClick}
          >
            Team
          </Link>
          <Link
            to="/about-us"
            className="hover:text-yellow-200 font-semibold"
            onClick={handleMobileLinkClick}
          >
            About Us
          </Link>
          <Link
            to="/contact-us"
            className="hover:text-yellow-200 font-semibold"
            onClick={handleMobileLinkClick}
          >
            Contact us
          </Link>
          <Link
            to="/phases"
            className="hover:text-yellow-200 font-semibold"
            onClick={handleMobileLinkClick}
          >
            Phases
          </Link>

          {isAuthenticated ? (
            // 🔐 Authenticated → show dropdown for Pages
            <div>
              <button
                onClick={() => setMobileShowPages(!mobileShowPages)}
                className="w-full text-left hover:text-yellow-200 font-semibold flex justify-between items-center"
              >
                Pages ▾
              </button>

              {mobileShowPages && (
                <div className="mt-2 ml-4 flex flex-col gap-2">
                  <Link
                    to="/infrastructure"
                    className="hover:text-yellow-200"
                    onClick={handleMobileLinkClick}
                  >
                    Infrastructure
                  </Link>
                  <Link
                    to="/my-orders"
                    className="hover:text-yellow-200"
                    onClick={handleMobileLinkClick}
                  >
                    My Orders
                  </Link>
                </div>
              )}
            </div>
          ) : (
            // 🔓 Not Authenticated → show Infrastructure directly
            <Link
              to="/infrastructure"
              className="hover:text-yellow-200 font-semibold"
              onClick={handleMobileLinkClick}
            >
              Infrastructure
            </Link>
          )}

          {/* Cart and Profile (Mobile) */}
          <div className="flex items-center gap-4 mt-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/cart"
                  className="relative inline-block text-yellow-500"
                >
                  <ShoppingCart size={28} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/profile"
                  className="hover:text-yellow-200"
                  title="Profile"
                >
                  <User size={30} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="relative inline-block px-5 py-2 overflow-hidden font-semibold text-white-700 border-2 border-yellow-300 rounded-lg group hover:text-white transition duration-300 ease-in-out"
                >
                  <span className="absolute left-0 top-0 w-full h-0 bg-yellow-300 transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-0 z-0"></span>
                  <span className="relative z-10">Login</span>
                </Link>

                <Link
                  to="/register"
                  className="relative inline-block px-5 py-2 overflow-hidden font-semibold text-white-700 border-2 border-yellow-300 rounded-lg group hover:text-white transition duration-300 ease-in-out"
                >
                  <span className="absolute left-0 top-0 w-full h-0 bg-yellow-300 transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-0 z-0"></span>
                  <span className="relative z-10">Register</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
