// GdashboardGuest.jsx
import FirstGuest from "./pages/FirstGuest.jsx";
import GActionCard from "./pages/GActionCard.jsx";
import GuestFinancialSnapshot from "./pages/guestFinancialSnapshot.jsx";
import GuestMaintenance from "./pages/GuestMaintenance.jsx";
import GuestupcomingEvents from "./pages/GuestupcomingEvents.jsx";


export default function GdashboardGuest() {
  return (
    // --- ADDED space-y-* for vertical spacing ---
    <main className="min-h-screen bg-[#E7EFF7] p-6 lg:p-10 space-y-6 sm:space-y-10">
      <FirstGuest />
      <GActionCard />
      <GuestFinancialSnapshot/>
      <GuestMaintenance/>
      <GuestupcomingEvents/>
    </main>
  );
}