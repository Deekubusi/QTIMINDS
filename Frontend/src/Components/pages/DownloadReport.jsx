// DownloadReport.jsx
import { useEffect, useRef, useState } from "react";

export default function DownloadReportModal({ open, onClose, onSubmit }) {
  // state
  const [period, setPeriod] = useState("monthly"); // monthly | weekly | custom
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [include, setInclude] = useState({
    occupancy: false,
    guests: false,
    revenue: false,
    overdue: false,
  });
  const [format, setFormat] = useState("pdf"); // pdf | excel
  const [loading, setLoading] = useState(false);

  const fromRef = useRef(null);

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

  useEffect(() => {
    if (period === "custom" && fromRef.current) {
      // focus first date input when custom selected
      fromRef.current.focus();
    }
  }, [period]);

  if (!open) return null;

  const toggleInclude = (k) => setInclude((s) => ({ ...s, [k]: !s[k] }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (period === "custom" && (!customFrom || !customTo)) {
      alert("Please select both start and end dates for custom range.");
      return;
    }

    const payload = {
      period,
      customFrom: period === "custom" ? customFrom : null,
      customTo: period === "custom" ? customTo : null,
      include,
      format,
    };

    try {
      setLoading(true);
      const res = onSubmit ? onSubmit(payload) : null;
      if (res && typeof res.then === "function") await res;
      onClose?.();
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setLoading(false);
    }
  };

  // small presentational SVG components to match specs
  const RadioDot = ({ checked }) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <circle cx="6" cy="6" r="5.25" fill={checked ? "#605BFF" : "#FFF"} stroke="#B7B4B4" strokeWidth="1" />
    </svg>
  );

  const CheckboxBox = ({ checked }) => (
    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M3 0.5H10C11.3807 0.5 12.5 1.61929 12.5 3V9C12.5 10.3807 11.3807 11.5 10 11.5H3C1.61929 11.5 0.5 10.3807 0.5 9V3C0.5 1.61929 1.61929 0.5 3 0.5Z" fill={checked ? "#605BFF" : "#FFF"} stroke="#B7B4B4" />
      {checked && <path d="M3.6 6.2L5.2 7.8L9.2 3.8" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );

  const SectionTitle = ({ children }) => (
    <h3 className="text-sm font-semibold text-gray-900 mb-3">{children}</h3>
  );

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Download Report"
    >
      <form onSubmit={handleSubmit} className="w-full max-w-4xl rounded-2xl bg-white shadow-xl">
        {/* Header (same as AddManagerModal styling) */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Download Report</h2>
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
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5 space-y-6">
          {/* Report Period */}
          <section>
            <SectionTitle>Report Period</SectionTitle>

            <div className="mt-1 flex flex-wrap items-center gap-6">
              <label
                className="inline-flex items-center gap-3 cursor-pointer select-none"
                onClick={() => setPeriod("monthly")}
              >
                <RadioDot checked={period === "monthly"} />
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15, color: "#000", fontWeight: 400 }}>
                  Monthly
                </span>
              </label>

              <label
                className="inline-flex items-center gap-3 cursor-pointer select-none"
                onClick={() => setPeriod("weekly")}
              >
                <RadioDot checked={period === "weekly"} />
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15, color: "#000", fontWeight: 400 }}>
                  Weekly
                </span>
              </label>

              {/* Either show Custom Range button OR the date inputs (only when custom selected) */}
              {period !== "custom" ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPeriod("custom")}
                    className="relative flex items-center justify-center w-[96px] h-[31px] rounded-md"
                    aria-pressed={period === "custom"}
                    style={{
                      background: "#F7F7F8",
                      border: "1px solid #B3B3BF",
                      filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.01))",
                    }}
                  >
                    <span
                      style={{
                        color: "#767575",
                        fontFamily: "Nunito, sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: "normal",
                        pointerEvents: "none",
                      }}
                    >
                      Custom Range
                    </span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 ml-2">
                  <input
                    ref={fromRef}
                    type="date"
                    value={customFrom}
                    onChange={(e) => setCustomFrom(e.target.value)}
                    className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3D63EA]"
                    aria-label="Custom from date"
                  />
                  <span className="text-sm text-gray-400">—</span>
                  <input
                    type="date"
                    value={customTo}
                    onChange={(e) => setCustomTo(e.target.value)}
                    className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3D63EA]"
                    aria-label="Custom to date"
                  />
                </div>
              )}
            </div>
          </section>

          {/* Include (no colon) */}
          <section>
            <SectionTitle>Include</SectionTitle>

            <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="inline-flex items-center gap-3 cursor-pointer select-none" onClick={() => toggleInclude("occupancy")}>
                <CheckboxBox checked={include.occupancy} />
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15, color: "#000", fontWeight: 400 }}>Occupancy</span>
              </label>

              <label className="inline-flex items-center gap-3 cursor-pointer select-none" onClick={() => toggleInclude("guests")}>
                <CheckboxBox checked={include.guests} />
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15, color: "#000", fontWeight: 400 }}>Active Guests</span>
              </label>

              <label className="inline-flex items-center gap-3 cursor-pointer select-none" onClick={() => toggleInclude("revenue")}>
                <CheckboxBox checked={include.revenue} />
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15, color: "#000", fontWeight: 400 }}>Revenue</span>
              </label>

              <label className="inline-flex items-center gap-3 cursor-pointer select-none" onClick={() => toggleInclude("overdue")}>
                <CheckboxBox checked={include.overdue} />
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15, color: "#000", fontWeight: 400 }}>Overdue</span>
              </label>
            </div>
          </section>

          {/* File Format */}
          <section>
            <SectionTitle>File Format</SectionTitle>

            <div className="mt-1 flex items-center gap-6">
              <label className="inline-flex items-center gap-3 cursor-pointer select-none" onClick={() => setFormat("pdf")}>
                <RadioDot checked={format === "pdf"} />
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15, color: "#000", fontWeight: 400 }}>PDF</span>
              </label>

              <label className="inline-flex items-center gap-3 cursor-pointer select-none" onClick={() => setFormat("excel")}>
                <RadioDot checked={format === "excel"} />
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: 15, color: "#000", fontWeight: 400 }}>Excel</span>
              </label>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 88,
              height: 33,
              background: "#EBEBEF",
              border: "1px solid #B3B3BF",
              fontFamily: "Nunito, sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "#404040",
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center rounded-md text-white"
            style={{
              width: 100,
              height: 33,
              background: loading ? "#9b95ff" : "#605BFF",
              borderRadius: 4,
              fontFamily: "Nunito, sans-serif",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {loading ? "Preparing..." : "Download"}
          </button>
        </div>
      </form>
    </div>
  );
}
