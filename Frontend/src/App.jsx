//Deekshita app.jsx
//! import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Dashboard from "./Components/Dashboard";
// import PendingDues from "./Components/Pending"; 
// import "./App.css";
// // import Practice from "./Components/Practice";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className="app-shell">
//         <Navbar />
//         <div className="app-main">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/pending-dues" element={<PendingDues />} />
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
    
//   );
//! }
// import React from "react";
// import Practice from "./Components/Practice";

// export default function App() {
//   return (
//     <Practice />
//   );
// }

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Occupancy from "./Components/Occupancy"; 
import PendingDues from "./Components/Pending"; 
import Profitibility from "./Components/Profitibility"; 
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <div className="app-main pt-8 sm:pt-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pending-dues" element={<PendingDues />} />
            < Route path="/Profitibility" element={<Profitibility/>} />
            < Route path="/Occupancy" element={<Occupancy/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}