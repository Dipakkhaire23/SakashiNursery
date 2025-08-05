import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import Logo from "../images/logo.png";


// eslint-disable-next-line react/prop-types
const Navbar = ({ cartItemCoun, authenticated }) => {
  const navigate = useNavigate();
  

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let [cartItemCount, setCartItemCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [showPages, setShowPages] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [mobileShowPages, setMobileShowPages] = useState(false);
  const [mobileShowShop, setMobileShowShop] = useState(false);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   // if (token) {
  //   //   axios
  //   //     .get(import.meta.env.VITE_BACKEND_URL + "/api/users/UserRole", {
  //   //       withCredentials: true,
  //   //     })
  //   //     .then(() => setIsAuthenticated(true))
  //   //     .catch(() => setIsAuthenticated(false));
  //   // }
  // }, []);

  useEffect(() => {
    setIsAuthenticated(authenticated);
    if (token) {
      setIsAuthenticated(true);
    }
  }, [authenticated, token]); // runs ONLY when `authenticated` prop changes

  // 🔄 Fetch cart count from backend when authenticated
  useEffect(() => {
    const fetchCartItemCount = async () => {
      if (!isAuthenticated) return;
      try {
        const res = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/api/carts/CartItemCount",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const countData = await res.json();
        setCartItemCount(countData || 0); // assuming backend returns { count: X }
      } catch (err) {
        console.error("Cart count error:", err);
        setCartItemCount(0);
      }
    };

    fetchCartItemCount();
  }, [isAuthenticated]);

  // 🆕 Update from props when passed (on add to cart)
  useEffect(() => {
    if (cartItemCoun !== undefined) {
      setCartItemCount(cartItemCoun);
    }
  }, [cartItemCoun]);

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
    // setMobileShowPages(false);
    setMobileShowShop(false);
  };

  return (
    <nav className="sticky top-0 z-50 px-4 py-4 text-white bg-green-800 shadow-md md:px-6">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="mr-7">
          <img src={Logo} alt="Logo" className="w-30 h-14" />
        </div>

        <div className="flex items-center space-x-6">
          {/* Desktop Navigation */}
          <div className="items-center justify-center flex-1 hidden gap-5 text-base font-medium md:flex">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 font-semibold"
                      : "hover:text-yellow-300"
                  }
                >
                  Plants
                </NavLink>
                {/* Add more authenticated links here */}
              </>
            ) : (
              <>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 font-semibold"
                      : "hover:text-yellow-300"
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/infrastructure"
                  onClick={() => setShowPages(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-600 font-semibold"
                      : "block px-4 py-2 hover:text-green-600"
                  }
                >
                  Infrastructure
                </NavLink>

                <NavLink
                  to="/about-us"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-300 font-semibold"
                      : "hover:text-yellow-300"
                  }
                >
                  About Us
                </NavLink>
              </>
            )}

            <div className="relative">
              <button
                onClick={() => setShowShopDropdown(!showShopDropdown)}
                className="flex items-center justify-between w-full font-semibold text-left hover:text-yellow-200 blink"
              >
                Book Now ▾
              </button>
              {showShopDropdown && (
                <div
                  className="absolute z-10 w-64 mt-2 text-black transform -translate-x-1/2 bg-white border shadow-2xl left-1/2 top-full rounded-xl"
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
                        className="font-semibold text-left hover:text-green-700"
                      >
                        {veg}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* <Link to="/team" className="hover:text-yellow-300">
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
          </Link> */}
            <div className="flex items-center justify-start space-x-6">
              {/* Show My Orders only when authenticated */}
              {isAuthenticated && (
                <>
                  <NavLink
                    to="/my-orders"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-semibold"
                        : "hover:text-yellow-300"
                    }
                  >
                    My Orders
                  </NavLink>

                  {/* <NavLink
  to="/products"
  className={({ isActive }) =>
    isActive ? 'text-yellow-300 font-semibold' : 'hover:text-yellow-300'
  }
>
  Products
</NavLink> */}
                </>
              )}

              {/* Pages Dropdown
  <div className="relative">
    <button
      onClick={() => setShowPages(!showPages)}
      className="hover:text-yellow-300"
    >
      Pages ▾
    </button>

    {showPages && (
      <div
        className="absolute z-10 w-56 mt-2 text-black transform -translate-x-1/2 bg-white shadow-2xl left-1/2 top-full rounded-xl"
        onMouseLeave={() => setShowPages(false)}
      >
       
        <Link
          to="/phases"
          onClick={() => setShowPages(false)}
          className="block px-4 py-2 hover:text-green-600"
        >
          Phases
        </Link>
        <Link
          to="/about-us"
          onClick={() => setShowPages(false)}
          className="block px-4 py-2 hover:text-green-600"
        >
          About Us
        </Link>
        <Link
          to="/contact-us"
          onClick={() => setShowPages(false)}
          className="block px-4 py-2 hover:text-green-600"
        >
          Contact Us
        </Link>
        <Link
          to="/team"
          onClick={() => setShowPages(false)}
          className="block px-4 py-2 hover:text-green-600"
        >
          Team
        </Link>
      </div>
    )}
  </div> */}
            </div>
          </div>

          {/* Right Side (Mobile and Desktop) */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Desktop Cart & Profile */}
            <div className="items-center hidden gap-4 md:flex">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    className="relative p-2 transition rounded-full group hover:bg-yellow-200"
                    title="Cart"
                  >
                    <ShoppingCart
                      size={26}
                      className="text-yellow-300 group-hover:text-green-700"
                    />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/profile"
                    className="p-2 transition rounded-full group hover:bg-yellow-200"
                    title="Profile"
                  >
                    <User
                      size={28}
                      className="text-white group-hover:text-green-700"
                    />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="relative inline-block px-5 py-2 overflow-hidden font-semibold transition border-2 border-yellow-300 rounded-lg text-white-700 group hover:text-white"
                  >
                    <span className="absolute top-0 left-0 z-0 w-full h-0 transition-all duration-300 ease-in-out bg-yellow-300 group-hover:h-full"></span>
                    <span className="relative z-10">Login</span>
                  </Link>
                  {/* <Link
                to="/register"
                className="relative inline-block px-5 py-2 overflow-hidden font-semibold transition border-2 border-yellow-300 rounded-lg text-white-700 group hover:text-white"
              >
                <span className="absolute top-0 left-0 z-0 w-full h-0 transition-all duration-300 ease-in-out bg-yellow-300 group-hover:h-full"></span>
                <span className="relative z-10">Register</span>
              </Link> */}
                </>
              )}
            </div>

            {/* Mobile Auth Buttons or Cart/Profile */}
            <div className="flex items-center gap-3 md:hidden">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/cart"
                    title="Cart"
                    className="relative text-yellow-300"
                  >
                    <ShoppingCart size={24} />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                  <Link to="/profile" title="Profile">
                    <User size={24} className="text-white" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-1 font-medium text-yellow-300 border border-yellow-300 rounded"
                  >
                    Login
                  </Link>
                  {/* <Link
                to="/register"
                className="px-3 py-1 font-medium text-yellow-300 border border-yellow-300 rounded"
              >
                Register
              </Link> */}
                </>
              )}
            </div>

            {/* Hamburger Menu (Mobile Only) */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(true)}>
                <Menu size={28} className="text-white" />
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
              {isAuthenticated ? (
                <div className="flex flex-col space-y-3">
                  {/* Mobile Shop */}
                  <div>
                    <button
                      onClick={() => setMobileShowShop(!mobileShowShop)}
                      className="flex items-center justify-between w-full font-semibold text-left hover:text-yellow-200 blink"
                    >
                      Book Now ▾
                    </button>

                    {mobileShowShop && (
                      <div className="pr-2 mt-4 ml-4 overflow-y-auto max-h-48">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                          {vegetableList.map((veg, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                const vegPath = `/vegetable/${veg
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`;
                                if (!isAuthenticated) {
                                  localStorage.setItem(
                                    "redirectAfterLogin",
                                    vegPath
                                  );
                                  navigate("/login");
                                } else {
                                  navigate(vegPath);
                                }
                                setShowShopDropdown(false);
                              }}
                              className="p-1 text-sm font-semibold text-center text-green-900 transition-transform duration-300 transform bg-green-100 shadow-md hover:bg-green-200 rounded-xl hover:shadow-xl hover:scale-105 sm:text-base"
                            >
                              {veg}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* product */}
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-300 font-semibold"
                        : "hover:text-yellow-300"
                    }
                  >
                    Plants
                  </NavLink>

                  <Link
                    to="/my-orders"
                    onClick={handleMobileLinkClick}
                    className="font-semibold hover:text-yellow-200"
                  >
                    My Orders
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/home"
                    className="hover:text-yellow-200"
                    onClick={handleMobileLinkClick}
                  >
                    Home
                  </Link>
                  {/* Mobile Shop */}
                  <div>
                    <button
                      onClick={() => setMobileShowShop(!mobileShowShop)}
                      className="flex items-center justify-between w-full font-semibold text-left hover:text-yellow-200 blink"
                    >
                      Book Now ▾
                    </button>

                    {mobileShowShop && (
                      <div className="pr-2 mt-4 ml-4 overflow-y-auto max-h-48">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                          {vegetableList.map((veg, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                const vegPath = `/vegetable/${veg
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`;
                                if (!isAuthenticated) {
                                  localStorage.setItem(
                                    "redirectAfterLogin",
                                    vegPath
                                  );
                                  navigate("/login");
                                } else {
                                  navigate(vegPath);
                                }
                                setShowShopDropdown(false);
                              }}
                              className="p-1 text-sm font-semibold text-center text-green-900 transition-transform duration-300 transform bg-green-100 shadow-md hover:bg-green-200 rounded-xl hover:shadow-xl hover:scale-105 sm:text-base"
                            >
                              {veg}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/infrastructure"
                    className="font-semibold hover:text-yellow-200"
                    onClick={handleMobileLinkClick}
                  >
                    Infrastructure
                  </Link>

                  {/* <Link
            to="/team"
            className="font-semibold hover:text-yellow-200"
            onClick={handleMobileLinkClick}
          >
            Team
          </Link> */}

                  <Link
                    to="/about-us"
                    className="font-semibold hover:text-yellow-200"
                    onClick={handleMobileLinkClick}
                  >
                    About Us
                  </Link>
                  {/* <Link
            to="/contact-us"
            className="font-semibold hover:text-yellow-200"
            onClick={handleMobileLinkClick}
          >
            Contact us
          </Link> */}

                  {/* <Link
            to="/phases"
            className="font-semibold hover:text-yellow-200"
            onClick={handleMobileLinkClick}
          >
            Phases
          </Link> */}
                </>
              )}
            </nav>
          </div>

          {/* Backdrop */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-10 bg-black opacity-50"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
