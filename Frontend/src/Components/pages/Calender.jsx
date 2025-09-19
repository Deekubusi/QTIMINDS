import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

function CreateEventModal({ onClose, onAddEvent }) {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !title) return;
    onAddEvent({ date, title });
    setDate("");
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-[#073C9E]" />
          Create New Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#073C9E] focus:outline-none"
            />
          </div>

          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Event Title
            </label>
            <input
              type="text"
              placeholder="Eg: Fan not working in 101"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#073C9E] focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#073C9E] text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default function UpcomingEventsPanel() {
  const today = new Date();
  const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const [visibleStart, setVisibleStart] = useState(0);
  const [daysToShow, setDaysToShow] = useState(7);
  const [scrollStep, setScrollStep] = useState(1);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        setDaysToShow(6);
        setScrollStep(6);
      } else {
        setDaysToShow(7);
        setScrollStep(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleRemoveEvent = (date, title) => {
    setEvents((prev) =>
      prev.filter((e) => !(e.date === date && e.title === title))
    );
  };

  return (
    <div className="w-full px-4 sm:px-6">
      {/* Header Row */}
      <div className="sm:flex sm:justify-between sm:items-center mb-3 mt-8">
        <h2 className="flex items-center text-xl px-2 font-semibold">
          <Calendar className="w-6 h-6 mr-2" />
          Upcoming Events Panel
        </h2>
        <div className="mt-4 sm:mt-0 flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#073C9E] text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Event
          </button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="relative bg-white rounded-3xl shadow-lg p-6 mt-4">
        {/* Left Arrow */}
        {visibleStart > 0 && (
          <button
            onClick={() =>
              setVisibleStart((prev) => Math.max(0, prev - scrollStep))
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 p-2 rounded-full shadow-md hover:bg-gray-100 z-20"
          >
            <ChevronLeft className="w-5 h-5 text-[#073C9E]" />
          </button>
        )}

        {/* Cards Row */}
        <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-4 flex-1 sm:px-8">
          {dates
            .slice(visibleStart, visibleStart + daysToShow)
            .map((date, idx) => {
              const dayEvents = events.filter((e) => e.date === date);
              const d = new Date(date);
              // Adjust for timezone offset to prevent date changes
              const adjustedDate = new Date(
                d.valueOf() + d.getTimezoneOffset() * 60000
              );
              const formatted = adjustedDate.toDateString();

              return (
                <div
                  key={idx}
                  className="min-w-0 sm:flex-1 sm:min-w-[140px] bg-white shadow-lg rounded-[20px] p-4 text-center transition-all duration-300 hover:scale-105 hover:ring-1 hover:ring-blue-600"
                >
                  <h3 className="font-bold text-sm">{formatted}</h3>
                  {dayEvents.length > 0 ? (
                    <ul className="mt-2 space-y-1">
                      {dayEvents.map((ev, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between text-sm bg-blue-50 rounded px-2 py-1"
                        >
                          <span>{ev.title}</span>
                          <button
                            onClick={() =>
                              handleRemoveEvent(ev.date, ev.title)
                            }
                            className="text-[#073C9E] hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 mt-2 text-sm font-Poppins">
                      No events
                    </p>
                  )}
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
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 p-2 rounded-full shadow-md hover:bg-gray-100 z-20"
          >
            <ChevronRight className="w-5 h-5 text-[#073C9E]" />
          </button>
        )}
      </div>

      {/* Event Modal */}
      {showModal && (
        <CreateEventModal
          onClose={() => setShowModal(false)}
          onAddEvent={handleAddEvent}
        />
      )}
    </div>
  );
}
