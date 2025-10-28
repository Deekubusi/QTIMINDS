import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

// ---------- Main Upcoming Events Panel Component ----------
export default function UpcomingEventsPanel() {
  // Data States - Initialized with some example data
  const [events, setEvents] = useState([
    { date: '2025-10-18', title: 'Rent Due' }, // Example for today
    { date: '2025-10-20', title: 'Staff Meeting' },
    { date: '2025-10-25', title: 'Inspection' },
    { date: '2025-11-01', title: 'Diwali Party Prep' },
    { date: '2025-11-05', title: 'New Guest Check-in' },
    { date: '2025-11-10', title: 'Pest Control' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI States
  const [visibleStart, setVisibleStart] = useState(0);
  const [daysToShow, setDaysToShow] = useState(7);
  const [scrollStep, setScrollStep] = useState(1);

  // Generate dates for the calendar view
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  // Effect to fetch initial data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // --- REAL API CALL WOULD GO HERE ---
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (err) {
        setError("Failed to load events.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Effect to handle responsive layout changes
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setDaysToShow(isMobile ? 3 : 7); // Show fewer days on mobile
      setScrollStep(isMobile ? 3 : 1); // Scroll more days on mobile
    };
    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRemoveEvent = (date, title) => {
    // Optimistic UI update
    setEvents((prev) =>
      prev.filter((e) => !(e.date === date && e.title === title))
    );
    // --- REAL API CALL TO DELETE THE EVENT WOULD GO HERE ---
    console.log("Removing event from backend (simulated):", { date, title });
  };

  if (loading) {
    return (
      <div className="text-center p-10">Loading Upcoming Events...</div>
    );
  }
  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full px-4 sm:px-6">
      {/* Header Row */}
      <div className="sm:flex sm:justify-between sm:items-center mb-3 mt-8">
        <h2 className="flex items-center text-xl px-2 font-semibold">
          <Calendar className="w-6 h-6 mr-2 text-[#073C9E]" />
          Upcoming Events Panel
        </h2>
        {/* Add Event Button Removed */}
      </div>

      {/* Main Panel */}
      <div className="relative bg-white rounded-3xl shadow-lg p-6 mt-4">
        {/* Left Arrow */}
        {visibleStart > 0 && (
          <button
            onClick={() =>
              setVisibleStart((prev) => Math.max(0, prev - scrollStep))
            }
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-white border border-gray-200 p-1 rounded-full shadow-md hover:bg-gray-100 z-20 sm:left-2 sm:p-2"
          >
            <ChevronLeft className="w-4 h-4 text-[#073C9E] sm:w-5 sm:h-5" />
          </button>
        )}

        {/* Cards Row */}
        <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-4 flex-1 sm:px-8">
          {dates
            .slice(visibleStart, visibleStart + daysToShow)
            .map((date, idx) => {
              const dayEvents = events.filter((e) => e.date === date);
              const d = new Date(date);
              // Adjust for timezone offset
              const adjustedDate = new Date(
                d.valueOf() + d.getTimezoneOffset() * 60000
              );
              const day = adjustedDate.toLocaleDateString('en-US', { weekday: 'short' });
              const dateNum = adjustedDate.getDate();
              const month = adjustedDate.toLocaleDateString('en-US', { month: 'short' });

              return (
                <div
                  key={idx}
                  className="min-w-0 sm:flex-1 sm:min-w-[120px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-[20px] p-3 sm:p-4 text-center transition-all duration-300 hover:scale-105 hover:ring-1 hover:ring-blue-600 flex flex-col"
                >
                  <h3 className="font-bold text-xs sm:text-sm text-gray-700">{day}</h3>
                  <div className="text-lg sm:text-xl font-semibold text-gray-800">{dateNum}</div>
                  <div className="text-xs text-gray-500 mb-2">{month}</div>

                  <div className="flex-grow overflow-y-auto max-h-[100px] space-y-1">
                    {dayEvents.length > 0 ? (
                        dayEvents.map((ev, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between text-xs sm:text-sm bg-blue-50 rounded px-2 py-1 text-left"
                        >
                            <span className="truncate flex-1 mr-1">{ev.title}</span>
                            <button
                            onClick={() =>
                                handleRemoveEvent(ev.date, ev.title)
                            }
                            className="text-[#073C9E] hover:text-red-600 flex-shrink-0"
                            >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                        </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">No events</p>
                    )}
                   </div>
                </div>
              );
            })}
        </div>

        {/* Right Arrow */}
        {visibleStart + daysToShow < dates.length && (
          <button
            onClick={() =>
              setVisibleStart((prev) =>
                Math.min(prev + scrollStep, dates.length - daysToShow)
              )
            }
             className="absolute right-1 top-1/2 -translate-y-1/2 bg-white border border-gray-200 p-1 rounded-full shadow-md hover:bg-gray-100 z-20 sm:right-2 sm:p-2"
          >
            <ChevronRight className="w-4 h-4 text-[#073C9E] sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
      {/* Event Modal Removed */}
    </div>
  );
}