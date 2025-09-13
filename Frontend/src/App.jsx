//last code
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Dashboard from "./Components/Dashboard";
// import Occupancy from "./Components/Occupancy"; 
// import PendingDues from "./Components/Pending"; 
// import Profitibility from "./Components/Profitibility"; 
// import "./App.css";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className="app-shell">
//         <Navbar />
//         <div className="app-main pt-8 sm:pt-0">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/pending-dues" element={<PendingDues />} />
//             < Route path="/Profitibility" element={<Profitibility/>} />
//             < Route path="/Occupancy" element={<Occupancy/>} />
          
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

//updated code

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Occupancy from "./Components/Occupancy";
import PendingDues from "./Components/Pending";
import Profitibility from "./Components/Profitibility";
import "./App.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <div className="flex app-shell">
        {/* Navbar always present, but it decides mobile vs desktop */}
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main content */}
        <main
          className={`transition-all duration-300 flex-1 app-main ${
            isMobile ? "pt-16 ml-0" : isOpen ? "ml-48" : "ml-16"
          }`}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Pending-dues" element={<PendingDues />} />
            <Route path="/Profitibility" element={<Profitibility />} />
            <Route path="/Occupancy" element={<Occupancy />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
