import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";
import { messaging, generateAndSyncToken } from "./pages/firebase/FCM";
import { onMessage } from "firebase/messaging";
import axios from "axios";
import AddMobile from "./authentication/AddMobile"

import { toast } from "react-hot-toast";

// Auth pages
import Login from "./authentication/Login";
import Register from "./authentication/Registration";
import ForgotPassword from "./authentication/ForgotPassword";
import ResetPassword from "./authentication/Passwwordresset";
import OAuthSuccess from "./authentication/OAuthSuccess";

// Admin Components
import Sidebar from "./adminComponents/Sidebar";
import Header from "./adminComponents/Header";
import Dashboard from "./adminComponents/Dashboard";
import ProductManagement from "./adminComponents/ProductManagement";
import OrderManagement from "./adminComponents/OrderManagement";
import UserManagement from "./adminComponents/UserManagement";
import CustomerTransactions from "./adminComponents/CustomerTransactions";
import AdminProfile from "./adminComponents/AdminProfile";
import AdminReviewList from "./adminComponents/AdminReviewList";

// Common and Customer Components
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import ProductCard from "./components/ProductCard";
import Customer from "./components/Customer";
import Award from "./components/AwardCard";
import UniqueFeature from "./components/UniqueFeature";
import WhatsAppChat from "./components/WhatsAppChat";
import Congratulations from "./pages/congratulations";

// Vegetable Pages
import Cauliflower from "./pages/vegetables/Cauliflower";
import Papaya from "./pages/vegetables/Papaya";
import Brinjal from "./pages/vegetables/Brinjal";
import LadyFinger from "./pages/vegetables/LadyFinger";
import Cabbage from "./pages/vegetables/Cabbage";
import BottleGourd from "./pages/vegetables/BottleGourd";
import BitterGourd from "./pages/vegetables/BitterGourd";
import Tomato from "./pages/vegetables/Tomato";
import Chilli from "./pages/vegetables/Chilli";
import Capsicum from "./pages/vegetables/Capsicum";
import Watermelon from "./pages/vegetables/Watermelon";
import Muskmelon from "./pages/vegetables/Muskmelon";
import Cucumber from "./pages/vegetables/Cucumber";
import Drumstick from "./pages/vegetables/Drumstick";
import SmallCucumber from "./pages/vegetables/SmallCucumber";
import Merigold from "./pages/vegetables/Merigold";

// Informational Pages
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Infrastructure from "./pages/Infrastructure";

import BookingPhase from "./pages/phases/BookingPhase";
import SowingPhase from "./pages/phases/SowingPhase";
import PlantPreparation from "./pages/phases/PlantPreparation";
import CustomerVisitPhase from "./pages/phases/CustomerVisitPhase";
import PlantDelivery from "./pages/phases/PlantDelivery";
import Profile from "./pages/Profile";
import CartPage from "./pages/CartPage";
import MyOrders from "./pages/Myorders";
import ProductPage from "./pages/Productpage";
import ScrollToTop from "./pages/ScrollToTop";

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [cartItemCoun, setCartItemCoun] = useState(0);

  const [loadingAuth, setLoadingAuth] = useState(true); // 🟡 Add this
  const userId = localStorage.getItem("userId"); // Or get from auth state
  const location = useLocation();

  useEffect(() => {
    // Initial token fetch & sync
    generateAndSyncToken(userId);

    // Refresh token every 6 hours
    const interval = setInterval(() => {
      generateAndSyncToken(userId);
    }, 6 * 60 * 60 * 1000); // 6 hours

    // Listen for foreground notifications
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Notification received:", payload.notification);
      toast.success( "Notification has been send");
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [userId]);

  //  useEffect(() => {
  //   const hasRefreshed = sessionStorage.getItem("hasRefreshed");

  //   if (!hasRefreshed) {
  //     sessionStorage.setItem("hasRefreshed", "true");
  //     window.location.reload();
  //   }
  // }, []);

  const authPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const isAuthPath = authPaths.includes(location.pathname);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/UserRole", {
          withCredentials: true,
        })
        .then((res) => {
          setUserRole(res.data.userrole);
          setAuthenticated(true);
          setLoadingAuth(false); // ✅ Moved here
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            setUserRole(null);
          } else {
            console.error("Failed to fetch role", err);
          }
          setAuthenticated(false);
          setLoadingAuth(false); // ✅ Also here in error
        });
    } else {
      setLoadingAuth(false); // ✅ Token not present case
    }
  }, [token]);

  //  useEffect(() => {
  //   // Disable right-click
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //   };

  //   // Disable F12, Ctrl+Shift+I, Ctrl+U, etc.
  //   const handleKeyDown = (e) => {
  //     if (
  //       e.key === "F12" ||
  //       (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
  //       (e.ctrlKey && e.key === "U")
  //     ) {
  //       e.preventDefault();
  //     }
  //   };

  //   document.addEventListener("contextmenu", handleContextMenu);
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("contextmenu", handleContextMenu);
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  const HomeLayout = () => (
    <>
      <Home />
      <ProductCard />
      <Award />
      <Customer />
      <UniqueFeature />
      <ContactUs />

      <WhatsAppChat />
    </>
  );
  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthPath) {
    return (
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            <Login
              setAuthenticated={setAuthenticated}
              setUserRole={setUserRole}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setAuthenticated={setAuthenticated}
              setUserRole={setUserRole}
            />
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }
  if (location.pathname === "/oauth-success") {
    return (
      <Routes>
        <Route
          path="/oauth-success"
          element={
            <OAuthSuccess
              setAuthenticated={setAuthenticated}
              setUserRole={setUserRole}
            />
          }
        />
        <Route path="*" element={<Navigate to="/oauth-success" />} />
      </Routes>
    );
  }
    if (location.pathname === "/add-mobile") {
    return (
      <Routes>
        <Route
          path="/add-mobile"
          element={
            <AddMobile 
              setAuthenticated={setAuthenticated}
              setUserRole={setUserRole}
            />
          }
        />
        <Route path="*" element={<Navigate to="/add-mobile" />} />
      </Routes>
    );
  }


  if (authenticated && userRole === "ADMIN") {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        {!sidebarCollapsed && (
          <div
            className="fixed inset-0 z-30 bg-black opacity-30 lg:hidden"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}
        <div className="flex-1 transition-all duration-300 lg:ml-64">
          <Header
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
          <main className="p-6">
            <ScrollToTop />
            <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route
                path="/admin/transactions"
                element={<CustomerTransactions />}
              />
              <Route
                path="/admin/profile"
                element={
                  <AdminProfile
                    setAuthenticated={setAuthenticated}
                    setUserRole={setUserRole}
                  />
                }
              />

              <Route path="/admin/review" element={<AdminReviewList />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  }

  if (authenticated && userRole == "CUSTOMER") {
    return (
      <>
        <Navbar cartItemCoun={cartItemCoun} authenticated={authenticated} />
        <ScrollToTop />
        <Routes>
          <Route path="/products" element={<ProductPage />} />

          <Route path="/profile" element={<Profile />} />
          <Route
            path="/cart"
            element={<CartPage setCartItemCoun={setCartItemCoun} />}
          />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/congratulations" element={<Congratulations />} />

          {/* Veg */}
          <Route
            path="/vegetable/cauliflower"
            element={<Cauliflower setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/papaya"
            element={<Papaya setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/brinjal"
            element={<Brinjal setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/lady-finger"
            element={<LadyFinger setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/cabbage"
            element={<Cabbage setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/bottle-gourd"
            element={<BottleGourd setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/bitter-gourd"
            element={<BitterGourd setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/tomato"
            element={<Tomato setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/chilli"
            element={<Chilli setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/capsicum"
            element={<Capsicum setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/watermelon"
            element={<Watermelon setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/muskmelon"
            element={<Muskmelon setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/cucumber"
            element={<Cucumber setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/small-cucumber"
            element={<SmallCucumber setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/drumstick"
            element={<Drumstick setCartItemCoun={setCartItemCoun} />}
          />
          <Route
            path="/vegetable/merigold"
            element={<Merigold setCartItemCoun={setCartItemCoun} />}
          />

          {/* Phases */}
          {/* <Route path="/phases/booking" element={<BookingPhase />} />
          <Route path="/phases/sowing" element={<SowingPhase />} />
          <Route path="/phases/preparing" element={<PlantPreparation />} />
          <Route path="/phases/visit" element={<CustomerVisitPhase />} />
          <Route path="/phases/delivered" element={<PlantDelivery />} /> */}
          <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
        <Footer />
      </>
    );
  }

  // Default public view
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/home" element={<HomeLayout />} />
        <Route path="/about-us" element={<AboutUs />} />
        {/* <Route path="/contact-us" element={<ContactUs />} /> */}
        <Route path="/infrastructure" element={<Infrastructure />} />
        {/* <Route path="/team" element={<Team />} />
        <Route path="/phases" element={<Phases />} /> */}

        {/* Phases */}
        <Route path="/phases/booking" element={<BookingPhase />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/phases/sowing" element={<SowingPhase />} />
        <Route path="/phases/preparing" element={<PlantPreparation />} />
        <Route path="/phases/visit" element={<CustomerVisitPhase />} />
        <Route path="/phases/delivered" element={<PlantDelivery />} />

        <Route path="/vegetable/cauliflower" element={<Cauliflower />} />
        <Route path="/vegetable/papaya" element={<Papaya />} />
        <Route path="/vegetable/brinjal" element={<Brinjal />} />
        <Route path="/vegetable/lady-finger" element={<LadyFinger />} />
        <Route path="/vegetable/cabbage" element={<Cabbage />} />
        <Route path="/vegetable/bottle-gourd" element={<BottleGourd />} />
        <Route path="/vegetable/bitter-gourd" element={<BitterGourd />} />
        <Route path="/vegetable/tomato" element={<Tomato />} />
        <Route path="/vegetable/chilli" element={<Chilli />} />
        <Route path="/vegetable/capsicum" element={<Capsicum />} />
        <Route path="/vegetable/watermelon" element={<Watermelon />} />
        <Route path="/vegetable/muskmelon" element={<Muskmelon />} />
        <Route path="/vegetable/cucumber" element={<Cucumber />} />
        <Route path="/vegetable/small-cucumber" element={<SmallCucumber />} />
        <Route path="/vegetable/drumstick" element={<Drumstick />} />
        <Route path="/vegetable/merigold" element={<Merigold />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
