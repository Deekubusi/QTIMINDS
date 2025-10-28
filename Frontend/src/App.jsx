import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
// import Dashboard from "./Components/ODashboardOwner";
// import Dashboard from "./Components/MDashboardManager";
import Dashboard from "./Components/GDashboardGuest";
import Occupancy from "./Components/Occupancy";
import GuestInsights from "./Components/pages/GuestInsights";
import PendingDues from "./Components/Pending";
import Profitibility from "./Components/Profitibility";


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
  <Route path="/GuestInsights" element={<GuestInsights />} /> {/* <-- Already added */}

</Routes>

        </main>
      </div>
    </BrowserRouter>
  );
}
