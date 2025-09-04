// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import logo from "../assests/logo.png"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div
//  className={`bg-gray-900 text-white transition-all duration-300
//       ${isOpen ? "w-48" : "w-16"} flex flex-col`}
//     >
  
//   {/* Logo */}
//   {/* <div
//     className="navbar-logo h-8 w-8 bg-contain bg-center bg-no-repeat"
//     style={{ backgroundImage: `url(${logo})` }}
//     aria-label="App logo"
//   /> */}
//     {/* {isOpen && <span className="text-white font-semibold ml-2"></span>} */}


// {/* Toggle button */}
// <button
//   onClick={() => setIsOpen(!isOpen)}
//   className="p-3 text-center hover:bg-gray-800 rounded-lg"
// >
//   <div
//     className={`bg-contain bg-no-repeat bg-center transition-all duration-300 
//       ${isOpen ? "h-8 w-24" : "h-8 w-8"}`}
//     style={{ backgroundImage: `url(${logo})` }}
//     aria-label="App logo"
//   />
// </button>



//       {/* Nav links */}
//       <nav className="flex-1 mt-4">
//         <ul className="flex flex-col space-y-2">
//           <li>
//             <NavLink
//               to="/"
//               end
//               className={({ isActive }) =>
//                 `block px-4 py-2 rounded-md transition ${
//                   isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
//                 }`
//               }
//             >
//               {isOpen ? "Dashboard" : "D"}
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/analytics"
//               className={({ isActive }) =>
//                 `block px-4 py-2 rounded-md transition ${
//                   isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
//                 }`
//               }
//             >
//               {isOpen ? "Analytics" : "A"}
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/pending-dues"
//               className={({ isActive }) =>
//                 `block px-4 py-2 rounded-md transition ${
//                   isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
//                 }`
//               }
//             >
//               {isOpen ? "Pending Dues" : "P"}
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/complains"
//               className={({ isActive }) =>
//                 `block px-4 py-2 rounded-md transition ${
//                   isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
//                 }`
//               }
//             >
//               {isOpen ? "Complains" : "C"}
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/settings"
//               className={({ isActive }) =>
//                 `block px-4 py-2 rounded-md transition ${
//                   isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
//                 }`
//               }
//             >
//               {isOpen ? "Settings" : "S"}
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// }

//Kriti update navbar

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assests/logo.png";
import { Home, BarChart2, Clock, TrendingUp, Settings } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { to: "/", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { to: "/analytics", label: "Analytics", icon: <BarChart2 className="w-5 h-5" /> },
    { to: "/pending-dues", label: "Pending Dues", icon: <Clock className="w-5 h-5" /> },
    { to: "/profitibility", label: "Profitibility", icon: <TrendingUp className="w-5 h-5" /> },
    { to: "/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

 if (isMobile) {
  // Mobile view: logo fixed top-left,  background, no sidebar
  return (
<div className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-[#001433] shadow-sm z-50">
  <div
    className="h-9 w-28 bg-contain bg-no-repeat bg-left"
    style={{ backgroundImage: `url(${logo})` }}
    aria-label="Rufrent Logo"
  />
  <button
    className="w-7 h-7 flex flex-col justify-between"
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Toggle menu"
  >
    <span className="block w-full h-[2px] bg-white shadow-[0_0_4px_rgba(255,255,255,0.7)]"></span>
    <span className="block w-full h-[2px] bg-white shadow-[0_0_4px_rgba(255,255,255,0.7)]"></span>
    <span className="block w-full h-[2px] bg-white shadow-[0_0_4px_rgba(255,255,255,0.7)]"></span>
  </button>
</div>


  );
}


  // Desktop sidebar
  return (
    <div
      className={`bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? "w-48" : "w-16"
      } flex flex-col`}
      style={{ minHeight: "100vh" }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 text-center hover:bg-gray-800 rounded-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <div
            className="h-8 w-24 bg-contain bg-no-repeat bg-center transition-all duration-300"
            style={{ backgroundImage: `url(${logo})` }}
            aria-label="App logo"
          />
        ) : (
          <div className="flex flex-col justify-center space-y-1 cursor-pointer mt-3">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        )}
      </button>

      {/* Nav links */}
      <nav className="flex-1 mt-2 overflow-auto">
        <ul className="flex flex-col space-y-2">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                    isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800"
                  }`
                }
              >
                <span className="text-white">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}