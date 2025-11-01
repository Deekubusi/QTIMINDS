import { useEffect, useState } from "react";
// Import useLocation from react-router-dom
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Landingpage } from "./Components/landingPage";
import Navbar from "./Components/Navbar"; // This is your VERTICAL dashboard nav
import Occupancy from "./Components/Occupancy";
import GuestInsights from "./Components/pages/GuestInsights";
import PendingDues from "./Components/Pending";
import Profitibility from "./Components/Profitibility";

// We create this new component because useLocation() must be inside <BrowserRouter>
function AppContent() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Get the current URL path
  const location = useLocation();
  // Check if we are on the home/landing page
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // This logic makes the <main> tag full-width on the landing page
  // but keeps the correct margins for your dashboard pages.
  const mainClassName = isLandingPage
    ? "flex-1 app-main" // Class for landing page (no margins)
    : `transition-all duration-300 flex-1 app-main ${ // Class for dashboard
        isMobile ? "pt-16 ml-0" : isOpen ? "ml-48" : "ml-16"
      }`;

  return (
    <div className="flex app-shell">
      
      {/* === THIS IS THE FIX === */}
      {/* Only show the VERTICAL Navbar if it's NOT the landing page */}
      {!isLandingPage && <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />}

      {/* Main content area */}
      <main className={mainClassName}>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/Pending-dues" element={<PendingDues />} />
          <Route path="/Profitibility" element={<Profitibility />} />
          <Route path="/Occupancy" element={<Occupancy />} />
          <Route path="/GuestInsights" element={<GuestInsights />} />
        </Routes>
      </main>
    </div>
  );
}

// Your main App component just sets up the Router
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
