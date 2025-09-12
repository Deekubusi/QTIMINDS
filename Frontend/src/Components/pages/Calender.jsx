import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Calendar, Plus, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export default function Calendar1() {
  const [startDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [events, setEvents] = useState({
    "2025-09-12": ["Workshop", "Meeting"],
  });

  const [open, setOpen] = useState(false);
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventText, setNewEventText] = useState("");

  const [visibleStart, setVisibleStart] = useState(0);
  const [daysToShow, setDaysToShow] = useState(3);

  useEffect(() => {
    const updateDaysToShow = () => {
      if (window.innerWidth < 640) setDaysToShow(1);
      else if (window.innerWidth < 1024) setDaysToShow(2);
      else setDaysToShow(3);
    };
    updateDaysToShow();
    window.addEventListener("resize", updateDaysToShow);
    return () => window.removeEventListener("resize", updateDaysToShow);
  }, []);

  useEffect(() => {
    setVisibleStart(0);
  }, [daysToShow]);

  const formatLocalYMD = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const parseLocalYMD = (ymd) => {
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const dates = Array.from({ length: 60 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    return formatLocalYMD(d);
  });

  const addEvent = () => {
    if (!newEventDate || !newEventText) return;
    setEvents((prev) => ({
      ...prev,
      [newEventDate]: [...(prev[newEventDate] || []), newEventText],
    }));
    setOpen(false);
    setNewEventDate("");
    setNewEventText("");
  };

  const removeEvent = (date, index) => {
    setEvents((prev) => {
      const updated = { ...prev };
      updated[date].splice(index, 1);
      if (updated[date].length === 0) delete updated[date];
      return updated;
    });
  };

  return (
    <div className="relative w-full max-w-[1290px] mx-auto p-6 bg-[#EAF3FF] rounded-[24px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Upcoming Events Panel
        </h2>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {/* Calendar as cards */}
      <div className="relative bg-white rounded-[24px] shadow-lg p-6 overflow-visible">
        {/* Left Arrow */}
        {visibleStart > 0 && (
          <button
            onClick={() =>
              setVisibleStart((prev) => Math.max(0, prev - daysToShow))
            }
            className="absolute top-1/2 -translate-y-1/2 left-[-30px] 
                       bg-white border border-gray-200 p-3 rounded-full shadow-md 
                       hover:bg-gray-100 z-20"
          >
            <ChevronLeft className="w-6 h-6 text-blue-600" />
          </button>
        )}

        {/* Right Arrow */}
        {visibleStart + daysToShow < dates.length && (
          <button
            onClick={() =>
              setVisibleStart((prev) =>
                Math.min(prev + daysToShow, dates.length - daysToShow)
              )
            }
            className="absolute top-1/2 -translate-y-1/2 right-[-30px] 
                       bg-white border border-gray-200 p-3 rounded-full shadow-md 
                       hover:bg-gray-100 z-20"
          >
            <ChevronRight className="w-6 h-6 text-blue-600" />
          </button>
        )}

        {/* Card container */}
        <div className="flex gap-5 transition-transform duration-300">
          {dates
            .slice(visibleStart, visibleStart + daysToShow)
            .map((date) => {
              const localDate = parseLocalYMD(date);
              return (
                <div
                  key={date}
                  className="flex-1 min-w-[240px] bg-white border border-gray-200 shadow-md 
                             hover:border-blue-600 hover:shadow-lg transition-all 
                             p-5 rounded-[20px]"
                >
                  {/* Date header */}
                  <div className="text-center font-semibold text-black mb-2">
                    {localDate.toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                  </div>

                  {/* Events */}
                  <div className="space-y-2">
                    {(events[date] || []).length > 0 ? (
                      events[date].map((ev, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center bg-blue-50 px-3 py-1 
                                     text-blue-600 text-sm font-medium rounded border border-blue-100 shadow-sm"
                        >
                          <span className="truncate" title={ev}>
                            {ev}
                          </span>
                          <button
                            onClick={() => removeEvent(date, i)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm text-center">
                        No events
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Add Event Modal */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed top-1/2 left-1/2 bg-white rounded-lg p-6 shadow-lg transform -translate-x-1/2 -translate-y-1/2 w-[400px]">
            <Dialog.Title className="font-bold text-lg mb-4">
              Add New Event
            </Dialog.Title>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Select Date</label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="w-full border rounded p-2"
                  min={formatLocalYMD(startDate)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Event Title</label>
                <input
                  type="text"
                  value={newEventText}
                  onChange={(e) => setNewEventText(e.target.value)}
                  className="w-full border rounded p-2"
                  placeholder="Enter event name"
                />
              </div>
              <button
                onClick={addEvent}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Save Event
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}




