import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="bg-green-600 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Saylani Beneficiary App
          </Link>

          {/* Hamburger Icon for small screens (opens sidebar) */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Navbar Links (visible on larger screens) */}
          <ul className={`lg:flex space-x-4 ${isMenuOpen ? "block" : "hidden"} lg:block`}>
            <li>
              <Link to="/AdminLogin" className="hover:underline">
                Admin
              </Link>
            </li>
            <li>
              <Link to="/DepartmentLogin" className="hover:underline">
                Department
              </Link>
            </li>
            <li>
              <Link to="/form" className="hover:underline">
                User Form
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-green-700 bg-opacity-90 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-white text-3xl">
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-10">
          <Link
            to="AdminLogin"
            className="text-white text-2xl hover:underline"
            onClick={toggleSidebar}
          >
            Admin
          </Link>
          <Link
            to="/DepartmentLogin"
            className="text-white text-2xl hover:underline"
            onClick={toggleSidebar}
          >
            Department
          </Link>
          <Link
            to="/form"
            className="text-white text-2xl hover:underline"
            onClick={toggleSidebar}
          >
            User Form
          </Link>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-green-500 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Beneficiary App</h1>
        <p className="text-xl">Manage your beneficiaries with ease</p>
      </div>
    </>
  );
}
