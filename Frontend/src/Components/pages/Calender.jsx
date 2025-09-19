import { Calendar, ChevronRight, ChevronLeft, X } from "lucide-react";
import { useState, useEffect } from "react";

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
     
         <div className="w-full max-w-md bg-white rounded-2xl  border-bg-[#073C9E] shadow-lg p-6 relative">
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
            <label className="block text-sm font-medium mb-1">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#073C9E] focus:outline-none"
            />
          </div>

          {/* Event Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Title</label>
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
  const [daysToShow, setDaysToShow] = useState(3);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setDaysToShow(1);
      else setDaysToShow(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  // ⬅️ added: remove event handler
  const handleRemoveEvent = (date, title) => {
    setEvents((prev) => prev.filter((e) => !(e.date === date && e.title === title)));
  };

  return (
    <div className="w-full max-w-[85rem] mx-auto px-4 ">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-3 mt-8">
        <h2 className="flex items-center text-xl px-2 font-semibold">
          <Calendar className="w-6 h-6 mr-2" />
          Upcoming Events Panel
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#073C9E] text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add Event
        </button>
      </div>

      {/* Cards */}
      <div className="w-full bg-[#073C9E] rounded-3xl shadow-lg px-6">
        <div className="relative flex items-center  bg-white">
          {/* Left Arrow */}
          {visibleStart > 0 && (
            <button
              onClick={() => setVisibleStart((prev) => Math.max(0, prev - 1))}
              className="absolute left-[-20px] bg-white border border-gray-200 p-3 rounded-full shadow-md hover:bg-gray-100 z-20"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <ChevronLeft className="w-6 h-6 text-[#073C9E]" />
            </button>
          )}

          {/* Cards Row */}
          <div className="flex gap-3 flex-1 overflow-x-hidden">
            {dates
              .slice(visibleStart, visibleStart + daysToShow)
              .map((date, idx) => {
                const dayEvents = events.filter((e) => e.date === date);
                const formatted = new Date(date).toDateString();
                return (
                  <div
                    key={idx}
                    className="flex-1 min-w-[240px] bg-white border border-solid  rounded-2xl shadow-sm m-4 p-4 text-center"
                  >
                    <h3 className="font-bold">{formatted}</h3>
                    {dayEvents.length > 0 ? (
                      <ul className="mt-2 space-y-1">
                        {dayEvents.map((ev, i) => (
                          <li
                            key={i}
                            className="flex items-center justify-between text-sm bg-blue-50 rounded px-2 py-1"
                          >
                            <span>{ev.title}</span>
                            {/* ⬅️ added remove button */}
                            <button
                              onClick={() => handleRemoveEvent(ev.date, ev.title)}
                              className="text-[#073C9E] hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 mt-2 font-Poppins">No events</p>
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
                  Math.min(prev + 1, dates.length - daysToShow)
                )
              }
              className="absolute right-[-20px] bg-white border border-gray-200 p-3 rounded-full shadow-md hover:bg-gray-100 z-20"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <ChevronRight className="w-6 h-6 text-[#073C9E]" />
            </button>
          )}
        </div>
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
