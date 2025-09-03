import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import PendingDues from "./Components/Pending"; 
import "./App.css";
// import Practice from "./Components/Practice";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <div className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pending-dues" element={<PendingDues />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  );
}
// import React from "react";
// import Practice from "./Components/Practice";

// export default function App() {
//   return (
//     <Practice />
//   );
// }
