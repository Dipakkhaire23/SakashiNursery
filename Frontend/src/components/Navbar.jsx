import { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  Home as HomeIcon, 
  Sprout, 
  Building2, 
  Info, 
  Package 
} from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import LanguageTranslator from "./LanguageTranslator";

// eslint-disable-next-line react/prop-types
const Navbar = ({ cartItemCoun, authenticated }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShowShop, setMobileShowShop] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsAuthenticated(authenticated);
    if (token) {
      setIsAuthenticated(true);
    }
  }, [authenticated, token]);

  useEffect(() => {
    const syncCartItemCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItemCount(cart.length);
    };

    syncCartItemCount();
    window.addEventListener("storage", syncCartItemCount);
    return () => window.removeEventListener("storage", syncCartItemCount);
  }, []);

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
    setMobileShowShop(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 px-3 py-2.5 sm:px-6 sm:py-3.5 text-white glass-header shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
          
          {/* Logo */}
          <Link to="/home" className="flex items-center shrink-0">
            <svg 
              className="w-48 h-10 sm:w-64 sm:h-12 md:w-72 md:h-14 transition-transform hover:scale-105" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 320 80"
            >
              <g transform="translate(10, 10)">
                <path d="M 10 60 C 10 20, 35 5, 60 5 C 60 30, 35 60, 10 60 Z" fill="#2E7D32"/>
                <path d="M 60 5 L 35 30 L 50 55" stroke="#81C784" strokeWidth="2.5" fill="none" />
                <path d="M 35 30 L 15 45" stroke="#81C784" strokeWidth="2.5" fill="none" />
                <circle cx="35" cy="30" r="3" fill="#81C784" />
                <circle cx="60" cy="5" r="3" fill="#81C784" />
                <circle cx="50" cy="55" r="3" fill="#81C784" />
              </g>
              <text x="85" y="35" fontFamily="system-ui, sans-serif" fontSize="34" fontWeight="bold" fill="#FACC15">
                Sakshi HiTech
              </text>
              <text x="85" y="60" fontFamily="system-ui, sans-serif" fontSize="25" fontWeight="600" letterSpacing="3" fill="#FFFFFF">
                NURSERY
              </text>
            </svg>
          </Link>

          {/* Desktop Navigation Links (Shifted Right) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base font-semibold ml-auto mr-4">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-0.5"
                  : "hover:text-yellow-300 transition-colors"
              }
            >
              Home
            </NavLink>

            {/* Available Plants Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowShopDropdown(true)}
              onMouseLeave={() => setShowShopDropdown(false)}
            >
              <button
                onClick={() => setShowShopDropdown(!showShopDropdown)}
                className="flex items-center gap-1 hover:text-yellow-300 transition-colors py-1 cursor-pointer"
              >
                <span>Available Plants</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${showShopDropdown ? "rotate-180 text-yellow-300" : ""}`} />
              </button>

              {showShopDropdown && (
                <div className="absolute left-0 top-full pt-2 w-72 z-50">
                  <div className="bg-green-950/95 backdrop-blur-md border border-green-700/60 rounded-2xl shadow-2xl p-3 grid grid-cols-2 gap-1.5 text-xs font-medium">
                    {vegetableList.map((veg, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const vegPath = `/vegetable/${veg.toLowerCase().replace(/\s+/g, "-")}`;
                          navigate(vegPath);
                          setShowShopDropdown(false);
                        }}
                        className="px-2.5 py-1.5 rounded-lg text-left text-green-100 hover:text-yellow-300 hover:bg-green-800/60 transition-all truncate"
                      >
                        🌱 {veg}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-0.5"
                  : "hover:text-yellow-300 transition-colors"
              }
            >
              Plants
            </NavLink>

            <NavLink
              to="/infrastructure"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-0.5"
                  : "hover:text-yellow-300 transition-colors"
              }
            >
              Infrastructure
            </NavLink>

            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 border-b-2 border-yellow-300 pb-0.5"
                  : "hover:text-yellow-300 transition-colors"
              }
            >
              About Us
            </NavLink>

            
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Language Translator (Desktop Only) */}
            <div className="hidden lg:block">
              <LanguageTranslator />
            </div>

         

           

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-xl bg-green-900/80 hover:bg-green-800 text-white border border-green-700/50 transition-all"
              aria-label="Open Mobile Menu"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer (Sidebar) */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-gradient-to-b from-green-950 via-green-900 to-green-950 text-white transform transition-transform duration-300 ease-in-out z-50 shadow-2xl flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-green-800/80 bg-green-950/60">
          <div className="flex items-center gap-2">
            <Sprout size={22} className="text-yellow-400" />
            <span className="font-bold text-lg text-white">Navigation Menu</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close Mobile Menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 px-4 py-5 overflow-y-auto space-y-2 text-base font-medium">
          
          {/* Mobile Language Translator Inside Drawer */}
          <div className="px-3 py-2.5 mb-3 rounded-xl bg-green-950/80 border border-yellow-400/30 flex items-center justify-between shadow-inner">
            
           
          </div>
          <NavLink
            to="/home"
            onClick={handleMobileLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-yellow-400 text-green-950 font-bold shadow-md"
                  : "text-gray-100 hover:bg-white/10"
              }`
            }
          >
            <HomeIcon size={20} />
            <span>Home</span>
          </NavLink>

          {/* Available Plants Accordion */}
          <div className="rounded-xl overflow-hidden border border-green-800/50 bg-green-900/30">
            <button
              onClick={() => setMobileShowShop(!mobileShowShop)}
              className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-100 hover:bg-white/5 transition-all font-medium"
            >
              <div className="flex items-center gap-3">
                <Sprout size={20} className="text-yellow-400" />
                <span>Available Plants</span>
              </div>
              <ChevronDown size={18} className={`transition-transform duration-200 ${mobileShowShop ? "rotate-180 text-yellow-400" : ""}`} />
            </button>

            {mobileShowShop && (
              <div className="p-3 bg-green-950/70 border-t border-green-800/50 grid grid-cols-2 gap-1.5 text-xs font-semibold">
                {vegetableList.map((veg, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const vegPath = `/vegetable/${veg.toLowerCase().replace(/\s+/g, "-")}`;
                      navigate(vegPath);
                      handleMobileLinkClick();
                    }}
                    className="p-2 rounded-lg text-left text-green-200 hover:text-yellow-300 hover:bg-green-800/60 transition-all truncate"
                  >
                    🌱 {veg}
                  </button>
                ))}
              </div>
            )}
          </div>

          <NavLink
            to="/products"
            onClick={handleMobileLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-yellow-400 text-green-950 font-bold shadow-md"
                  : "text-gray-100 hover:bg-white/10"
              }`
            }
          >
            <Sprout size={20} />
            <span>Plants</span>
          </NavLink>

          <NavLink
            to="/infrastructure"
            onClick={handleMobileLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-yellow-400 text-green-950 font-bold shadow-md"
                  : "text-gray-100 hover:bg-white/10"
              }`
            }
          >
            <Building2 size={20} />
            <span>Infrastructure</span>
          </NavLink>

          <NavLink
            to="/about-us"
            onClick={handleMobileLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-yellow-400 text-green-950 font-bold shadow-md"
                  : "text-gray-100 hover:bg-white/10"
              }`
            }
          >
            <Info size={20} />
            <span>About Us</span>
          </NavLink>

           <LanguageTranslator />
        </nav>
      </aside>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
