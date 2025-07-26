

import { useEffect, useState } from "react";
import { Bell, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";


// eslint-disable-next-line react/prop-types
const Header = ({ sidebarCollapsed, setSidebarCollapsed}) => {


   const [adminData, setAdminName] = useState("Admin User");
     useEffect(() => {
    // const token = localStorage.getItem("token");

    axios
      .get(import.meta.env.VITE_BACKEND_URL+"/api/admin/dashboard/CountAndName", {
        // headers: { Authorization: `Bearer ${token}` },
         withCredentials: true // ✅ Send cookies with the request
      })
      .then((res) => {
        setAdminName(res.data || "Admin");
      })
      .catch((err) => {
        console.error("Failed to load admin profile", err);
      });
  }, []);
   return (
    <header className="sticky top-0 z-40 px-4 py-3 bg-white border-b border-gray-200 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 transition rounded-lg lg:hidden hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-bold text-green-700 sm:text-2xl whitespace-nowrap">
            Sakshi Hi-tech Nursery
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 sm:space-x-4">

   {/* Notification Bell with Order Count */}
          <Link to="/admin/orders" className="relative p-2 transition rounded-lg hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
            {adminData.count > 0 && (
              <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                {adminData.count}
              </span>
            )}
          </Link>


          <Link to="/admin/profile" className="flex items-center space-x-2 cursor-pointer hover:opacity-80">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
              <User size={18} className="text-white" />
            </div>
            <span className="hidden text-sm font-medium text-gray-700 sm:inline">
              {adminData.name}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;