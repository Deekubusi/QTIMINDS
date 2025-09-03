import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assests/logo.png"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
 className={`bg-gray-900 text-white transition-all duration-300
      ${isOpen ? "w-48" : "w-16"} flex flex-col`}
    >
  
  {/* Logo */}
  {/* <div
    className="navbar-logo h-8 w-8 bg-contain bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${logo})` }}
    aria-label="App logo"
  /> */}
    {/* {isOpen && <span className="text-white font-semibold ml-2"></span>} */}


{/* Toggle button */}
<button
  onClick={() => setIsOpen(!isOpen)}
  className="p-3 text-center hover:bg-gray-800 rounded-lg"
>
  <div
    className={`bg-contain bg-no-repeat bg-center transition-all duration-300 
      ${isOpen ? "h-8 w-24" : "h-8 w-8"}`}
    style={{ backgroundImage: `url(${logo})` }}
    aria-label="App logo"
  />
</button>



      {/* Nav links */}
      <nav className="flex-1 mt-4">
        <ul className="flex flex-col space-y-2">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
                }`
              }
            >
              {isOpen ? "Dashboard" : "D"}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
                }`
              }
            >
              {isOpen ? "Analytics" : "A"}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pending-dues"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
                }`
              }
            >
              {isOpen ? "Pending Dues" : "P"}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/complains"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
                }`
              }
            >
              {isOpen ? "Complains" : "C"}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md transition ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
                }`
              }
            >
              {isOpen ? "Settings" : "S"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}