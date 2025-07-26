import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Cookies from "js-cookie";
import { messaging, generateAndSyncToken } from "./pages/firebase/FCM";
import { onMessage } from "firebase/messaging";
import axios from "axios";

import { toast } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

// Auth pages
import Login from "./authentication/Login";
import Register from "./authentication/Registration";
import ForgotPassword from "./authentication/ForgotPassword";
import ResetPassword from "./authentication/Passwwordresset";

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
import UniqueFeature from "./components/UniqueFeature";
import WhatsAppChat from "./components/WhatsAppChat";

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
import Team from "./pages/Team";
import Phases from "./pages/Phases";
import BookingPhase from "./pages/phases/BookingPhase";
import SowingPhase from "./pages/phases/SowingPhase";
import PlantPreparation from "./pages/phases/PlantPreparation";
import CustomerVisitPhase from "./pages/phases/CustomerVisitPhase";
import PlantDelivery from "./pages/phases/PlantDelivery";
import Profile from "./pages/Profile";
import CartPage from "./pages/CartPage";
import MyOrders from "./pages/Myorders";

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

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
      toast.success(payload.notification?.body || "New notification");
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [userId]);

  const authPaths = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];
  // const publicPaths = [
  //   "/",
  //   "/about-us",
  //   "/contact-us",
  //   "/infrastructure",
  //   "/team",
  //   "/phases",
  //   "/vegetable/cauliflower",
  //   "/vegetable/papaya",
  //   "/vegetable/brinjal",
  //   "/vegetable/lady-finger",
  //   "/vegetable/cabbage",
  //   "/vegetable/bottle-gourd",
  //   "/vegetable/bitter-gourd",
  //   "/vegetable/tomato",
  //   "/vegetable/chilli",
  //   "/vegetable/capsicum",
  //   "/vegetable/watermelon",
  //   "/vegetable/muskmelon",
  //   "/vegetable/cucumber",
  //   "/vegetable/small-cucumber",
  //   "/vegetable/drumstick",
  //   "/vegetable/merigold",
  // ];

  const isAuthPath = authPaths.includes(location.pathname);
  // const isPublicPath = publicPaths.includes(location.pathname);

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
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            // Not logged in or token expired
            setUserRole(null);
          } else {
            console.error("Failed to fetch role", err);
          }
          // setUserRole(null)
          setAuthenticated(false);
        });
    }
    setLoadingAuth(false);
    //   const token = localStorage.getItem("token"); // ✅ Get token from cookie
    //  const cookieRole = localStorage.getItem("role");

    //   if (token && cookieRole) {
    //     // setTimeout(()=>{

    //     // },10000)
    //      setAuthenticated(true);
    //     setUserRole(cookieRole);
    // } else {
    //     setAuthenticated(false);
    //     setUserRole(null);
    //   }
  }, []);

  const HomeLayout = () => (
    <>
      <Home />
      <ProductCard />
      <Customer />
      <UniqueFeature />
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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AnimatePresence>
    );
  }

  // if (!authenticated && !isPublicPath) {
  //   const alreadySetPath = localStorage.getItem("redirectAfterLogin");
  //   if (!alreadySetPath || alreadySetPath === "/login") {
  //     // localStorage.setItem("redirectAfterLogin", location.pathname);
  //   }
  //   return <Navigate to="/login" replace />;
  // }

  if (authenticated && userRole === "ADMIN") {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        {!sidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}
        <div className="flex-1 lg:ml-64 transition-all duration-300">
          <Header
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
          <main className="p-6">
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

  if (authenticated && userRole === "CUSTOMER") {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/team" element={<Team />} />
          <Route path="/phases" element={<Phases />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/my-orders" element={<MyOrders />} />

          {/* Veg */}
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

          {/* Phases */}
          <Route path="/phases/booking" element={<BookingPhase />} />
          <Route path="/phases/sowing" element={<SowingPhase />} />
          <Route path="/phases/preparing" element={<PlantPreparation />} />
          <Route path="/phases/visit" element={<CustomerVisitPhase />} />
          <Route path="/phases/delivered" element={<PlantDelivery />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </>
    );
  }

  // Default public view
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/team" element={<Team />} />
        <Route path="/phases" element={<Phases />} />
        {/* Phases */}
          <Route path="/phases/booking" element={<BookingPhase />} />
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
