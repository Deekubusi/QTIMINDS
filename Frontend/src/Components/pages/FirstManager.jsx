// FirstManager.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------- Icons (consistent navy, thicker strokes) ---------- */
const IconCheckIn = (
  <svg viewBox="0 0 24 24" width="42" height="42" fill="none">
    <rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke="#0B2595" strokeWidth="1.8" />
    <path d="M3 9h18" stroke="#0B2595" strokeWidth="1.8" />
    <path d="M8 3v3M16 3v3" stroke="#0B2595" strokeWidth="1.8" strokeLinecap="round" />
    {/* inward arrow (check-in) */}
    <path d="M17 14h-6m0 0l2-2m-2 2l2 2" stroke="#0B2595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCheckOut = (
  <svg viewBox="0 0 24 24" width="42" height="42" fill="none">
    <rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke="#0B2595" strokeWidth="1.8" />
    <path d="M3 9h18" stroke="#0B2595" strokeWidth="1.8" />
    <path d="M8 3v3M16 3v3" stroke="#0B2595" strokeWidth="1.8" strokeLinecap="round" />
    {/* outward arrow (check-out) */}
    <path d="M11 14h6m0 0l-2-2m2 2l-2 2" stroke="#0B2595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconMaintenance = (
  <img 
    src="/Vector.png" 
    alt="Maintenance Icon" 
    width={42} 
    height={42} 
  />
);



const IconOverdue = (
  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
    <path d="M22.5151 5.25004L39.1856 34.125C39.3392 34.3911 39.42 34.6929 39.42 35C39.42 35.3072 39.3392 35.609 39.1856 35.875C39.032 36.1411 38.8111 36.362 38.545 36.5156C38.279 36.6692 37.9772 36.75 37.6701 36.75H4.32906C4.02187 36.75 3.7201 36.6692 3.45407 36.5156C3.18805 36.362 2.96714 36.1411 2.81355 35.875C2.65996 35.609 2.5791 35.3072 2.5791 35C2.5791 34.6929 2.65996 34.3911 2.81356 34.125L19.4841 5.25004C19.6377 4.98403 19.8586 4.76314 20.1246 4.60956C20.3906 4.45597 20.6924 4.37512 20.9996 4.37512C21.3067 4.37512 21.6085 4.45597 21.8745 4.60956C22.1405 4.76314 22.3615 4.98403 22.5151 5.25004ZM19.2496 28V31.5H22.7496V28H19.2496ZM19.2496 15.75V24.5H22.7496V15.75H19.2496Z" fill="#0B2595"/>
  </svg>
);

/* ---------- Reusable KPI Card ---------- */
function KpiCard({ title, icon, children, footerLabel = "View more", onClick }) {
  return (
    <article
      className="rounded-[30px] flex-shrink-0"
      style={{
        width: 261,
        height: 487,
        border: "1px solid rgba(79, 107, 227, 0.00)",
        background: "#FFF",
        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.10)",
      }}
    >
      <div
        className="h-full rounded-[20px] p-6 flex flex-col items-center justify-between transition-transform duration-200"
        style={{
          color: "#001433",
          fontFamily:
            "Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          background: "transparent",
          textAlign: "center",
        }}
      >
        {/* Header */}
        <header className="flex flex-col items-center gap-3 mt-2">
          <div style={{ width: 48, height: 48 }} className="flex-shrink-0">
            {icon}
          </div>
          <h3
            className="font-semibold"
            style={{ color: "#0F45A9", fontSize: 22, fontWeight: 700, letterSpacing: "-0.2px" }}
          >
            {title}
          </h3>
        </header>

        {/* Body */}
        <div className="px-2" style={{ lineHeight: 1.35 }}>
          {children}
        </div>

        {/* Footer */}
        <div className="w-full flex items-end justify-center mb-2">
          <button
            type="button"
            onClick={onClick}
            className="px-5 py-2 rounded-xl font-medium shadow-md hover:shadow-lg active:translate-y-[1px] transition"
            style={{ background: "#4F6BE3", color: "#FFF", boxShadow: "0px 3px 6px rgba(0,0,0,0.15)" }}
          >
            {footerLabel}
          </button>
        </div>
      </div>

      {/* Hover */}
      <style>{`
        article:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 6px 8px 12px rgba(0,0,0,0.12);
          border: 0.7px solid #FF8F6B !important;
          z-index: 2;
        }
      `}</style>
    </article>
  );
}

/* ---------- Mobile Carousel (1 card, arrows + swipe) ---------- */
function KpiCarousel({ cards }) {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef(null);
  const count = cards.length;

  const go = (n) => setIdx((p) => (n + count) % count);
  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  // Touch swipe
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0;
    const onStart = (e) => (startX = e.touches[0].clientX);
    const onEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) (dx > 0 ? prev() : next());
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [idx, count]);

  return (
    <>
      {/* Mobile: carousel */}
      <div className="sm:hidden relative w-full">
        <div className="overflow-hidden" ref={trackRef}>
          <div
            className="flex transition-transform duration-300"
            style={{
              width: `${count * 100}%`,
              transform: `translateX(-${(100 / count) * idx}%)`,
            }}
          >
            {cards.map((card, i) => (
              <div key={i} className="flex justify-center" style={{ width: `${100 / count}%` }}>
                {card}
              </div>
            ))}
          </div>
        </div>

        {/* arrows */}
     <button
  aria-label="Previous"
  onClick={prev}
  className="
    group absolute   top-1/2 -translate-y-1/2
    grid place-items-center
    w-10 h-10 rounded-full
    bg-white/80 backdrop-blur-md
    border border-black/10 shadow-lg
    hover:bg-white hover:shadow-xl
    active:scale-95
    transition
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6BE3]/60
  "
>
 <ChevronLeft className="w-5 h-5 text-[#0B2595] transition-transform group-hover:-translate-x-0.5" />
</button>

<button
  aria-label="Next"
  onClick={next}
  className="
    group absolute left-78 top-1/2 -translate-y-1/2
    grid place-items-center
    w-10 h-10 rounded-full
    bg-white/80 backdrop-blur-md
    border border-black/10 shadow-lg
    hover:bg-white hover:shadow-xl
    active:scale-95
    transition
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F6BE3]/60
  "
>
  <ChevronRight className="w-5 h-5  text-[#0B2595] transition-transform group-hover:translate-x-0.5" />
</button>  

        {/* dots */}
        <div className="flex justify-center gap-2 mt-3">
          {cards.map((_, i) => (
            <span
              key={i}
              onClick={() => setIdx(i)}
              className={`inline-block w-2.5 h-2.5 rounded-full cursor-pointer ${i === idx ? "bg-[#4F6BE3]" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden sm:grid grid-cols-2 xl:grid-cols-4 gap-6 justify-items-center">
        {cards}
      </div>
    </>
  );
}

/* ---------- Main Component ---------- */
export default function FirstManager() {
  const navigate = useNavigate();

  const cards = [
    /* Today’s Check-in */
    <KpiCard
      key="checkin"
      title="Today’s Check-in"
      icon={IconCheckIn}
      onClick={() => {/* navigate("/checkins") */}}
    >
      <p style={{ fontSize: 20, color: "#000" }}>
        <span style={{ fontWeight: 800, fontSize: 28 }}>5</span> scheduled today
        <br /> 12/09/25
      </p>
    </KpiCard>,

    /* Today’s Check-out */
    <KpiCard
      key="checkout"
      title="Today’s Check-out"
      icon={IconCheckOut}
      onClick={() => {/* navigate("/checkouts") */}}
    >
      <p style={{ fontSize: 20, color: "#000" }}>
        <span style={{ fontWeight: 800, fontSize: 28 }}>3</span> scheduled today as
        <br /> 12/09/25
      </p>
    </KpiCard>,

    /* Maintenance Tickets */
    <KpiCard
      key="tickets"
      title="Maintenance Tickets"
      icon={IconMaintenance}
      onClick={() => {/* navigate("/maintenance") */}}
    >
      <p style={{ fontSize: 20, color: "#000" }}>
        <span style={{ fontWeight: 800, fontSize: 28 }}>7</span> Open Tickets
      </p>
    </KpiCard>,

    /* Overdue (donut + legend) */
    <KpiCard key="overdue" title="Overdue" icon={IconOverdue} onClick={() => {/* navigate("/overdue") */}}>
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Donut */}
        <div className="relative" style={{ width: 163, height: 162 }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="163" height="162" viewBox="0 0 163 162" fill="none" className="w-full h-full">
            <path d="M163 81C163 125.735 126.511 162 81.5 162C36.4888 162 0 125.735 0 81C0 36.2649 36.4888 0 81.5 0C126.511 0 163 36.2649 163 81ZM23.748 81C23.748 112.7 49.6045 138.398 81.5 138.398C113.396 138.398 139.252 112.7 139.252 81C139.252 49.3001 113.396 23.6023 81.5 23.6023C49.6045 23.6023 23.748 49.3001 23.748 81Z" fill="#FFD66B"/>
            <path d="M52.7342 144.119C50.0462 150.017 43.036 152.703 37.5669 149.224C24.1823 140.711 13.5161 128.44 7.00264 113.849C0.505234 99.2934 -1.49663 83.243 1.10536 67.7034C2.18144 61.2768 8.9149 57.8628 15.1232 59.8417C21.363 61.8307 24.665 68.5269 23.9819 75.0403C22.9409 84.9657 24.5117 95.0621 28.6391 104.308C32.7793 113.583 39.2839 121.536 47.4215 127.435C52.7038 131.265 55.4398 138.182 52.7342 144.119Z" fill="#FF794E"/>
            <path d="M81.5 12.0841C81.5 5.41023 86.939 -0.0912485 93.5405 0.88882C102.248 2.18155 110.714 4.87206 118.601 8.87934C130.086 14.7155 140.014 23.1779 147.567 33.5706C155.12 43.9634 160.084 55.9897 162.049 68.6605C164.014 81.3313 162.925 94.2848 158.871 106.456C154.817 118.627 147.914 129.667 138.73 138.67C129.546 147.673 118.342 154.38 106.042 158.24C93.7407 162.101 80.6935 163.004 67.9728 160.876C59.2777 159.422 50.9049 156.579 43.1704 152.483C37.2352 149.339 36.144 141.624 40.1675 136.246C44.1575 130.913 51.6759 129.941 57.7408 132.694C62.2696 134.75 67.065 136.217 72.0089 137.044C80.9341 138.537 90.0884 137.903 98.719 135.194C107.35 132.485 115.21 127.779 121.654 121.463C128.098 115.146 132.941 107.4 135.785 98.8604C138.63 90.321 139.394 81.2325 138.015 72.3423C136.636 63.4521 133.154 55.0141 127.854 47.7223C122.555 40.4304 115.589 34.493 107.531 30.3982C103.075 28.134 98.3551 26.4689 93.4955 25.4327C86.9684 24.0409 81.5 18.758 81.5 12.0841Z" fill="#4057BD"/>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 18, fontWeight: 700, color: "#000" }}>
              ₹1,15,000
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-col items-start gap-3 w-full px-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#5B93FF] w-[10px] h-[10px] rounded-full" />
            <div className="font-semibold text-[14.4px] text-black">&lt; 15 Days - 55%</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#FF8F6B] w-[10px] h-[10px] rounded-full" />
            <div className="font-semibold text-[14.4px] text-black">15–30 Days - 25%</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#FFD66B] w-[10px] h-[10px] rounded-full" />
            <div className="font-semibold text-[14.4px] text-black">&gt; 30 Days - 20%</div>
          </div>
        </div>
      </div>
    </KpiCard>,
  ];

  return (
    <div className="w-full p-4">
      {/* Header */}
      <header className="mb-6">
        <h1
          className="font-extrabold text-black"
          style={{ fontSize: "clamp(1rem, 2.6vw, 1.6rem)", fontFamily: "Poppins, sans-serif" }}
        >
          XY Manager Dashboard
        </h1>
        <div
          className="mt-2 text-[#615F5F] font-extrabold truncate max-w-full"
          style={{ fontSize: "clamp(0.78rem, 1.6vw, 1rem)", fontFamily: "Poppins, sans-serif" }}
        >
          Hamsa PG, TNGO Colony, Gachibowli, Hyderabad, 25 rooms with 50 beds, Owner: Mohan-923456781
        </div>
      </header>

      {/* KPI Cards */}
      <section className="w-full">
        <KpiCarousel cards={cards} />
      </section>
    </div>
  );
}
