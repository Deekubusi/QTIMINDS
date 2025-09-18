// SendAnnouncement.jsx
import { useEffect, useRef, useState } from "react";

// --- Helper Components (Defined outside for consistency and performance) ---
const SectionTitle = ({ children }) => (
  <h3 className="text-sm font-semibold text-gray-900 mb-3">{children}</h3>
);

const CharacterCounter = ({ value, maxLength }) => (
  <div className="text-xs text-right text-gray-500 mt-1">
    {value.length} / {maxLength}
  </div>
);

// --- Main Modal Component ---
export default function SendAnnouncementModal({ open, onClose, onSubmit }) {
  const [audience, setAudience] = useState("managers");
  const categoryOptions = [
    "Maintenance", "Events", "Compliance & Legal", "General Notices", "Emergency",
  ];
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const dropdownRef = useRef(null);
  const textareaRef = useRef(null);
  
  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setAudience("managers");
      setCategory("");
      setMessage("");
      setCategoryOpen(false);
    }
  }, [open]);

  // Handle ESC key and background scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow || "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Close category dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCategoryOpen(false);
      }
    };
    if (categoryOpen) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [categoryOpen]);

  if (!open) return null;

  const isFormValid = category && message.trim() !== "";

  const handleMessageChange = (e) => {
    // Enforce 150 character limit
    if (e.target.value.length <= 150) {
      setMessage(e.target.value);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!isFormValid) return; // Safeguard validation
    
    const payload = { audience, category, message };
    onSubmit?.(payload);
  };

  const audienceButtonClass = (value) =>
    [
      "inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5",
      "text-sm font-semibold transition-colors duration-150",
      value === audience
        ? "bg-[#605BFF] text-white"
        : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200",
    ].join(" ");

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog">
      <form onSubmit={handleSend} className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Send Announcement</h2>
          <button type="button" onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100" aria-label="Close">
            <svg viewBox="0 0 20 20" className="h-5 w-5"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" /></svg>
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5 space-y-6">
          {/* Audience */}
          <section>
            <SectionTitle>Audience</SectionTitle>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => setAudience("managers")} className={audienceButtonClass("managers")}>All Managers</button>
              <button type="button" onClick={() => setAudience("guests")} className={audienceButtonClass("guests")}>All Guests</button>
              <button type="button" onClick={() => setAudience("both")} className={audienceButtonClass("both")}>Managers + Guests</button>
            </div>
          </section>

          {/* Category & Message */}
          <section>
            <div className="mb-4">
              <SectionTitle>Category *</SectionTitle>
              <div className="relative" ref={dropdownRef}>
                <button type="button" onClick={() => setCategoryOpen(s => !s)} className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-left" aria-haspopup="listbox" aria-expanded={categoryOpen}>
                  <span className={category ? 'text-gray-900' : 'text-gray-400'}>{category || "Select Category Type"}</span>
                  <svg width="14" height="9" viewBox="0 0 14 9" fill="none" className={`transition-transform duration-200 ${categoryOpen ? 'rotate-180' : ''}`}><path d="M1 1L7 8L13 1" stroke="currentColor" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {categoryOpen && (
                  <ul role="listbox" className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
                    {categoryOptions.map(opt => (
                      <li key={opt} role="option" aria-selected={category === opt} onClick={() => { setCategory(opt); setCategoryOpen(false); requestAnimationFrame(() => textareaRef.current?.focus()); }} className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-blue-50">
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <SectionTitle>Message *</SectionTitle>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleMessageChange}
                placeholder="Type your announcement here..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[#605BFF]"
                style={{ minHeight: 120 }}
              />
              <CharacterCounter value={message} maxLength={150} />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" disabled={!isFormValid} className="px-4 py-2 rounded-lg bg-[#605BFF] text-white hover:bg-[#5048e6] disabled:bg-gray-300 disabled:cursor-not-allowed">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
