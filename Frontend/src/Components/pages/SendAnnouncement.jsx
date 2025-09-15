// SendAnnouncement.jsx
import { useEffect, useRef, useState } from "react";

export default function SendAnnouncementModal({ open, onClose, onSubmit }) {
  const [audience, setAudience] = useState("managers"); // managers | guests | both
  const categoryOptions = [
    "Maintenance",
    "Events",
    "Compliance & Legal",
    "General Notices",
    "Emergency",
  ];
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const dropdownRef = useRef(null);
  const textareaRef = useRef(null);

  // close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // prevent background scroll while modal open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  // close category dropdown on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (!categoryOpen) return;
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [categoryOpen]);

  if (!open) return null;

  const SectionTitle = ({ children }) => (
    <h3 className="text-sm font-semibold text-gray-900 mb-3">{children}</h3>
  );

  const handleSend = (e) => {
    e.preventDefault();
    const payload = {
      audience,
      category,
      message,
    };
    try {
      const res = onSubmit ? onSubmit(payload) : null;
      if (res && typeof res.then === "function") {
        // if returned a promise, await it
        res.finally(() => onClose?.());
      } else {
        onClose?.();
      }
    } catch (err) {
      console.error("Send announcement error", err);
    }
  };

  const audienceButtonClass = (value) =>
    [
      "inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5",
      "text-sm font-semibold",
      "transition-colors duration-150",
      value === audience
        ? "bg-[#605BFF] text-white border-none"
        : "bg-[#F7F7F8] text-[#404040] border border-[#B3B3BF]",
    ].join(" ");

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Send announcement"
    >
      <form
        onSubmit={handleSend}
        className="w-full max-w-4xl rounded-2xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Send Announcement</h2>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100"
            aria-label="Close"
            title="Close"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5 space-y-7">
          {/* Audience */}
          <section>
            <SectionTitle>Audience</SectionTitle>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setAudience("managers")}
                className={audienceButtonClass("managers")}
                aria-pressed={audience === "managers"}
              >
                All Managers
              </button>

              <button
                type="button"
                onClick={() => setAudience("guests")}
                className={audienceButtonClass("guests")}
                aria-pressed={audience === "guests"}
              >
                All Guests
              </button>

              <button
                type="button"
                onClick={() => setAudience("both")}
                className={audienceButtonClass("both")}
                aria-pressed={audience === "both"}
              >
                Managers + Guests
              </button>
            </div>
          </section>

          {/* Category */}
          <section>
            <SectionTitle>Category</SectionTitle>

            <div className="flex flex-col gap-3">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setCategoryOpen((s) => !s)}
                  className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-left"
                  aria-haspopup="listbox"
                  aria-expanded={categoryOpen}
                >
                  <div>
                    <div
                      style={{
                        color: category ? "#000" : "#A09898",
                        fontFamily: "Nunito, sans-serif",
                        fontSize: 13,
                        fontWeight: category ? 500 : 300,
                      }}
                    >
                      {category || "Category Type"}
                    </div>
                  </div>

                  {/* caret */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                    className="flex-shrink-0"
                  >
                    <path
                      opacity="0.5"
                      d="M1 1L7 8L13 1"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Dropdown list */}
                {categoryOpen && (
                  <ul
                    role="listbox"
                    aria-label="Category options"
                    className="absolute z-40 mt-2 w-full rounded-md border bg-white shadow-lg"
                  >
                    {categoryOptions.map((opt) => {
                      const selected = category === opt;
                      return (
                        <li
                          key={opt}
                          role="option"
                          aria-selected={selected}
                          onClick={() => {
                            setCategory(opt);
                            setCategoryOpen(false);
                            // focus message textarea after picking category
                            requestAnimationFrame(() => textareaRef.current?.focus());
                          }}
                          className={[
                            "cursor-pointer px-4 py-2",
                            "hover:bg-[#EFF5FF]",
                            selected ? "bg-[#EFF5FF]" : "",
                          ].join(" ")}
                        >
                          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 15 }}>
                            {opt}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* message box */}
              <div>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Upcoming Fire Drill"
                  className={[
                    "w-full rounded-lg border border-gray-300 px-3 py-3",
                    "outline-none focus:ring-2 focus:ring-[#3D63EA]",
                  ].join(" ")}
                  style={{ minHeight: 120 }}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50"
            aria-label="Cancel"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#605BFF] text-white hover:bg-[#5048e6]"
            aria-label="Send"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
