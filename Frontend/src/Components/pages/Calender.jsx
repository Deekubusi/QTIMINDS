import { useMemo, useState } from "react";

// ---- date helpers ----
const iso = (d) => d.toISOString().slice(0, 10); // YYYY-MM-DD
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const sameDay = (a, b) => iso(a) === iso(b);
const dNum = (d) => d.toLocaleDateString(undefined, { day: "numeric" });
const dWk = (d) => d.toLocaleDateString(undefined, { weekday: "short" });
const dMon = (d) => d.toLocaleDateString(undefined, { month: "short" });
const human = (d) =>
  d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

export default function EventsAndActivity() {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const WINDOW = 7;
  const [startDate, setStartDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  // events: { "YYYY-MM-DD": ["Event A", "Event B"] }
  const [events, setEvents] = useState({
    [iso(today)]: ["Overhead Tank Cleaning"],
    [iso(addDays(today, 1))]: ["Fire drill"],
  });

  // recent activity: newest first
const [activity, setActivity] = useState([
  `Water leakage ticket is closed on ${human(today)}`,
  `₹25K Payment received from Candidate 3 on ${human(today)}`,
  `Candidate2 checked-out on ${human(today)}`,
  `Candidate1 check-in recorded on ${human(today)}`,
]);


  const days = Array.from({ length: WINDOW }, (_, i) => addDays(startDate, i));

  const moveWindow = (step) => {
    const next = addDays(startDate, step * WINDOW);
    setStartDate(next);
    const end = addDays(next, WINDOW - 1);
    if (selectedDate < next || selectedDate > end) setSelectedDate(next);
  };

  // --- add event modal state ---
  const [showForm, setShowForm] = useState(false);
  const [formDate, setFormDate] = useState(iso(selectedDate));
  const [formTitle, setFormTitle] = useState("");

  const openAddForm = (d = selectedDate) => {
    setFormDate(iso(d));
    setFormTitle("");
    setShowForm(true);
  };

  const addEvent = (e) => {
    e.preventDefault();
    const title = formTitle.trim();
    if (!title) return;

    setEvents((prev) => {
      const list = prev[formDate] ? [...prev[formDate]] : [];
      list.push(title);
      return { ...prev, [formDate]: list };
    });

setActivity((prev) => [
  `Event added: "${title}" on ${human(when)}`,
  ...prev,
]);


    setShowForm(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-10 bg-[#f7f8fb]">
      {/* UPCOMING EVENTS */}
      <section className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openAddForm(selectedDate)}
              className="px-3 py-2 text-sm rounded-lg bg-[#3D63EA] text-white hover:bg-blue-600"
            >
              + Add Event
            </button>
          </div>
        </div>

        <div className="relative rounded-xl bg-white shadow-lg">
          {/* header with month span + pager */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="text-sm text-gray-500">
              {dMon(days[0])} {days[0].getFullYear()} – {dMon(days[days.length - 1])}{" "}
              {days[days.length - 1].getFullYear()}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => moveWindow(-1)}
                className="h-8 w-8 grid place-items-center rounded-full border border-gray-200 hover:bg-gray-50"
                aria-label="Previous dates"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4">
                  <path d="M12 15L7 10l5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
              <button
                onClick={() => moveWindow(1)}
                className="h-8 w-8 grid place-items-center rounded-full border border-gray-200 hover:bg-gray-50"
                aria-label="Next dates"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4">
                  <path d="M8 15l5-5-5-5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          {/* blue strip of days */}
          <div className="bg-[#3D63EA] text-white text-[12px]">
            <div className="grid grid-cols-7">
              {days.map((d) => (
                <div key={iso(d)} className="px-4 py-2 text-center font-semibold">
                  {String(d.getDate()).padStart(2, "0")}/
                  {String(d.getMonth() + 1).padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>

          {/* events below each day */}
          <div className="px-2 py-3">
            <div className="grid grid-cols-7 gap-y-2 text-[12px]">
              {days.map((d) => {
                const key = iso(d);
                const isToday = sameDay(d, today);
                const isSelected = sameDay(d, selectedDate);
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(d)}
                    className={[
                      "min-h-[64px] rounded-md px-2 py-2 text-left transition",
                      isSelected ? "ring-2 ring-[#3D63EA] bg-blue-50/60" : "hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="font-medium">{dWk(d)}</span>
                      {isToday && (
                        <span className="ml-2 inline-block text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                          Today
                        </span>
                      )}
                    </div>

                    <div className="mt-1 space-y-1">
                      {(events[key] || []).map((t, i) => (
                        <div
                          key={i}
                          className="truncate rounded bg-gray-100 px-2 py-1 text-gray-800"
                          title={t}
                        >
                          {t}
                        </div>
                      ))}
                      <div className="pt-1">
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            openAddForm(d);
                          }}
                          className="cursor-pointer text-[11px] text-[#3D63EA] hover:underline"
                        >
                          + add
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* RECENT ACTIVITY FEED */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity Feed</h2>

        <div className="bg-white rounded-xl shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)] border border-gray-100">
          <ul className="p-5 md:p-6 space-y-4">
            {activity.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-800">
                <span className="mt-1 h-3 w-3 rounded-full bg-black" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ADD EVENT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4">
          <form
            onSubmit={addEvent}
            className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl space-y-4"
          >
            <h3 className="text-base font-semibold text-gray-900">Add Event</h3>

            <label className="block text-sm">
              <span className="text-gray-600">Date</span>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#3D63EA]"
                required
              />
            </label>

            <label className="block text-sm">
              <span className="text-gray-600">Occasion / Title</span>
              <input
                type="text"
                placeholder="e.g., Electrical Maintenance"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#3D63EA]"
                required
              />
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#3D63EA] text-white hover:bg-blue-600"
              >
                Save Event
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}