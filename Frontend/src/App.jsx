import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Common and Customer Components (Eagerly loaded for landing page)
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import ProductCard from "./components/ProductCard";
import Customer from "./components/Customer";
import Award from "./components/AwardCard";
import UniqueFeature from "./components/UniqueFeature";
import WhatsAppChat from "./components/WhatsAppChat";

// Lazy Loaded Informational/Customer pages
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Infrastructure = lazy(() => import("./pages/Infrastructure"));
const BookingPhase = lazy(() => import("./pages/phases/BookingPhase"));
const SowingPhase = lazy(() => import("./pages/phases/SowingPhase"));
const PlantPreparation = lazy(() => import("./pages/phases/PlantPreparation"));
const CustomerVisitPhase = lazy(() => import("./pages/phases/CustomerVisitPhase"));
const PlantDelivery = lazy(() => import("./pages/phases/PlantDelivery"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductPage = lazy(() => import("./pages/Productpage"));
const ScrollToTop = lazy(() => import("./pages/ScrollToTop"));

// Lazy Loaded Vegetable Pages
const Cauliflower = lazy(() => import("./pages/vegetables/Cauliflower"));
const Papaya = lazy(() => import("./pages/vegetables/Papaya"));
const Brinjal = lazy(() => import("./pages/vegetables/Brinjal"));
const LadyFinger = lazy(() => import("./pages/vegetables/LadyFinger"));
const Cabbage = lazy(() => import("./pages/vegetables/Cabbage"));
const BottleGourd = lazy(() => import("./pages/vegetables/BottleGourd"));
const BitterGourd = lazy(() => import("./pages/vegetables/BitterGourd"));
const Tomato = lazy(() => import("./pages/vegetables/Tomato"));
const Chilli = lazy(() => import("./pages/vegetables/Chilli"));
const Capsicum = lazy(() => import("./pages/vegetables/Capsicum"));
const Watermelon = lazy(() => import("./pages/vegetables/Watermelon"));
const Muskmelon = lazy(() => import("./pages/vegetables/Muskmelon"));
const Cucumber = lazy(() => import("./pages/vegetables/Cucumber"));
const Drumstick = lazy(() => import("./pages/vegetables/Drumstick"));
const SmallCucumber = lazy(() => import("./pages/vegetables/SmallCucumber"));
const Merigold = lazy(() => import("./pages/vegetables/Merigold"));

const App = () => {
  const [cartItemCoun, setCartItemCoun] = useState(0);

  // Sync initial cart count from localStorage on load
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItemCoun(localCart.length);
  }, []);

  const HomeLayout = () => (
    <>
      <Home />
      <ProductCard />
      <Award />
      {/* <Customer /> */}
      <UniqueFeature />
      <ContactUs />
      <WhatsAppChat />
    </>
  );

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-16 h-16 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
    </div>
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <>
        <Navbar cartItemCoun={cartItemCoun} />
        <ScrollToTop />
        <Routes>
          <Route path="/home" element={<HomeLayout />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/infrastructure" element={<Infrastructure />} />

          {/* Phases */}
          <Route path="/phases/booking" element={<BookingPhase />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/phases/sowing" element={<SowingPhase />} />
          <Route path="/phases/preparing" element={<PlantPreparation />} />
          <Route path="/phases/visit" element={<CustomerVisitPhase />} />
          <Route path="/phases/delivered" element={<PlantDelivery />} />

          {/* Cart & Success */}
          <Route path="/cart" element={<CartPage setCartItemCoun={setCartItemCoun} />} />

          {/* Vegetables */}
          <Route path="/vegetable/cauliflower" element={<Cauliflower setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/papaya" element={<Papaya setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/brinjal" element={<Brinjal setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/lady-finger" element={<LadyFinger setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/cabbage" element={<Cabbage setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/bottle-gourd" element={<BottleGourd setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/bitter-gourd" element={<BitterGourd setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/tomato" element={<Tomato setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/chilli" element={<Chilli setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/capsicum" element={<Capsicum setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/watermelon" element={<Watermelon setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/muskmelon" element={<Muskmelon setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/cucumber" element={<Cucumber setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/small-cucumber" element={<SmallCucumber setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/drumstick" element={<Drumstick setCartItemCoun={setCartItemCoun} />} />
          <Route path="/vegetable/merigold" element={<Merigold setCartItemCoun={setCartItemCoun} />} />
          
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
        <Footer />
      </>
    </Suspense>
  );
};

export default App;
