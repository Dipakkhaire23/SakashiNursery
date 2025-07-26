

// import  from "react";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Sidebar({ sidebarCollapsed }) {
  const linkClass =
    "block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition";

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-full bg-white border-r shadow transform transition-transform duration-300 ease-in-out
      ${sidebarCollapsed ? "-translate-x-full" : "translate-x-0"}
      lg:translate-x-0`}
    >
      <h2 className="p-4 text-xl font-bold text-gray-800 border-b">
        Admin Panel
      </h2>
      <nav className="flex flex-col gap-3 px-2 mt-4">
        <NavLink 
  to="/admin" 
  className={({ isActive }) => 
    `${linkClass} flex items-center gap-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`
  }
>
  🏠 Dashboard
</NavLink>

<NavLink 
  to="/admin/products" 
  className={({ isActive }) => 
    `${linkClass} flex items-center gap-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`
  }
>
  🛍 Products
</NavLink>

<NavLink 
  to="/admin/orders" 
  className={({ isActive }) => 
    `${linkClass} flex items-center gap-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`
  }
>
  📦 Orders
</NavLink>

<NavLink 
  to="/admin/users" 
  className={({ isActive }) => 
    `${linkClass} flex items-center gap-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`
  }
>
  👤 Users
</NavLink>

<NavLink 
  to="/admin/transactions" 
  className={({ isActive }) => 
    `${linkClass} flex items-center gap-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`
  }
>
  💸 Transactions
</NavLink>

<NavLink 
  to="/admin/review" 
  className={({ isActive }) => 
    `${linkClass} flex items-center gap-2 ${isActive ? "text-blue-600 font-bold" : "text-gray-700"}`
  }
>
  ⭐ Review
</NavLink>


      </nav>
    </aside>
  );
}

export default Sidebar;