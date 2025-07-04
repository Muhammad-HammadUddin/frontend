import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import CloseIcon from "@mui/icons-material/Close"; // Close icon for the close button

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { to: "/", icon: <HomeIcon />, label: "HOMEPAGE" },
    { to: "/beneficiaries", icon: <GroupIcon />, label: "BENEFICIARIES" },
    // Add more menu items here as needed
  ];

  return (
    <div>
      {/* Sidebar for large screens */}
      <aside
        className={`lg:block hidden bg-gradient-to-b bg-green-500 text-white p-6 w-64 h-screen fixed top-0 left-0 z-40`}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Admin</h2>
        </div>
        <nav className="space-y-4">
          {menuItems.map(({ to, icon, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-white/10" : "hover:bg-white/10"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Hamburger menu for small screens */}
      <div className="lg:hidden fixed top-0 right-0 p-4 z-50">
        <button
          className="text-black p-2 rounded-lg bg-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <MenuIcon fontSize="large" />
        </button>
      </div>

      {/* Sidebar for small screens (slide in/out) */}
      {isSidebarOpen && (
        <aside className="lg:hidden fixed top-0 left-0 bg-gradient-to-b bg-green-500 text-white p-6 w-64 h-screen z-50">
          {/* Close button */}
          <div className="flex justify-end">
            <button
              className="text-white p-2"
              onClick={() => setIsSidebarOpen(false)}
            >
              <CloseIcon fontSize="large" />
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold">Admin</h2>
          </div>
          <nav className="space-y-4">
            {menuItems.map(({ to, icon, label }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-white/10" : "hover:bg-white/10"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}
