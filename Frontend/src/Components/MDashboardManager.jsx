import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Dashboard.css"; // optional: keep for global fonts if needed
import Calendar1 from "./pages/Calender.jsx";
import MaintenanceAlertsDashboard from "./pages/Mantainence.jsx";
import RecentActivityFeed from "./pages/Recent_Activity.jsx";
import Upcoming from "./pages/Upcoming.jsx";
import First from "./pages/FirstManager.jsx";
import ActionButtons from "./pages/MActionCard.jsx";  




export default function Dashboard() {
  const navigate = useNavigate();

  // ← paste the state + body-scroll effect block right here
  const [isAddManagerOpen, setIsAddManagerOpen] = useState(false);

  // prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isAddManagerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAddManagerOpen]);

  // Download Report
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

    // Send Announcement modal state + success dialog flag
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [announcementSuccess, setAnnouncementSuccess] = useState(false);

  // Add New PG
  const [isAddNewPGOpen, setIsAddNewPGOpen] = useState(false);

  //AddGuest
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);



  return (
    <main className="min-h-screen bg-[#E7EFF7] p-6 lg:p-10">
      
        {/* Header */}
   <First/>


        {/* ----------------------
  ACTION BUTTONS (paste here)
  ---------------------- */}
<ActionButtons/>


        {/* Tables */}
        <div className="mt-14">
          <Upcoming/>
        </div>
        
        

        {/* original components kept */}
        <MaintenanceAlertsDashboard />
        <Calendar1 />
        <RecentActivityFeed/>
    
    </main>
  );
}
