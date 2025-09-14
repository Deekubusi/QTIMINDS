// Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../assests/logo.png";
import {
  Home,
  BarChart2,
  Clock,
  TrendingUp,
  Settings,
  LogOut,
  Megaphone,
  PlusCircle,
  MapPin,
  Snowflake,
  Bath,
  Bed,
} from "lucide-react";

/* ----------------------------------------------- */
/* Navbar                                          */
/* ----------------------------------------------- */
export default function Navbar({ isOpen, setIsOpen }) {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { to: "/", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { to: "/occupancy", label: "Occupancy", icon: <BarChart2 className="w-5 h-5" /> },
    { to: "/pending-dues", label: "Pending Dues", icon: <Clock className="w-5 h-5" /> },
    { to: "/profitibility", label: "Profitibility", icon: <TrendingUp className="w-5 h-5" /> },

    // ⭐ Emphasized Ads entry (gets attention even when collapsed)
    {
      to: "/ads",
      label: "PG Ads",
      icon: <Megaphone className="w-5 h-5" />,
      emphasis: true,
    },

    { to: "/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  /* ------------------------ Mobile top bar ------------------------ */
  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-[#001433] shadow-sm z-50">
        <div
          className="h-9 w-28 bg-contain bg-no-repeat bg-left"
          style={{ backgroundImage: `url(${logo})` }}
          aria-label="Rufrent Logo"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/ads/new")}
            className="text-xs px-3 py-1 rounded-full border border-white/30 hover:bg-white/10 active:scale-[0.98] transition"
            aria-label="List My PG"
          >
            List
          </button>
          <button
            className="w-7 h-7 flex flex-col justify-between"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-full h-[2px] bg-white"></span>
            <span className="block w-full h-[2px] bg-white"></span>
            <span className="block w-full h-[2px] bg-white"></span>
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------ Desktop sidebar ------------------------ */
  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-white transition-all duration-300 ${
        isOpen ? "w-56" : "w-16"
      } flex flex-col`}
    >
      {/* Toggle / Logo */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 text-center hover:bg-gray-800 rounded-lg"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <div
            className="h-8 w-28 bg-contain bg-no-repeat bg-center transition-all duration-300"
            style={{ backgroundImage: `url(${logo})` }}
            aria-label="App logo"
            onClick={() => navigate("/")}
          />
        ) : (
          <div className="flex flex-col justify-center space-y-1 cursor-pointer mt-3">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        )}
      </button>

      {/* Links + Embedded Card */}
      <nav className="mt-2 overflow-auto">
        <ul className="flex flex-col space-y-2 px-0.5">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.to || (item.to === "/" && location.pathname === "/");
            const base =
              "relative flex items-center gap-3 px-4 py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
            const normal = isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-800";
            const emphasized =
              "bg-gradient-to-r from-amber-400/20 to-orange-500/20 hover:from-amber-400/30 hover:to-orange-500/30";

            return (
              <li key={idx}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={`${base} ${item.emphasis ? emphasized : normal}`}
                  title={item.label}
                >
                  <span className="text-white relative">
                    {item.icon}
                    {/* tiny ping to draw attention when collapsed or not active */}
                    {item.emphasis && !isOpen && !isActive && (
                      <>
                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-400 rounded-full animate-ping"></span>
                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-amber-500 rounded-full"></span>
                      </>
                    )}
                  </span>
                  {isOpen && <span>{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Golden ad card (desktop, expanded only) */}
        {isOpen && (
          <div className="px-3 pt-3 pb-2">
            <PromoPGCard
              img="https://picsum.photos/seed/pgx/400/280"
              name="Sunrise Comfort PG"
              location="Madhapur, Hyderabad"
              amenities={["AC"]}
              roomTypes={["Triple", "Double"]}
              onList={() => navigate("/ads/new")}
            />
          </div>
        )}
      </nav>

      {/* Bottom actions */}
      <div className="mt-auto p-4 space-y-2 border-t border-gray-800">
     

        <button
          onClick={() => alert("Logging out...")}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-gray-800 transition justify-start"
        >
          <LogOut className="w-6 h-6 text-white flex-shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

/* ----------------------------------------------- */
/* Compact golden ad card with chips + “List My PG” */
/* ----------------------------------------------- */
function PromoPGCard({
  img = "https://picsum.photos/seed/pgx/400/280",
  name = "Sunrise Comfort PG",
  location = "Madhapur, Hyderabad",
  amenities = ["AC"],
  roomTypes = ["Triple", "Double"],
  onList = () => {},
}) {
  const amenityIcon = (label) => {
    const k = label.toLowerCase();
    if (k.includes("ac")) return <Snowflake className="w-4 h-4" />;
    if (k.includes("washroom") || k.includes("bath")) return <Bath className="w-4 h-4" />;
    return <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />;
  };

  // unified two-column chip grid to avoid stacking
  const chips = [
    ...amenities.map((a) => ({ label: a, tone: "emerald", icon: amenityIcon(a) })),
    ...roomTypes.map((r) => ({ label: r, tone: "slate", icon: <Bed className="w-3.5 h-3.5" /> })),
  ];
  const toneClasses = (tone) =>
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : "bg-slate-100 text-slate-800 border-slate-200";

  return (
    <article className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-300 bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500">
      <div className="absolute inset-[1.5px] rounded-[14px] bg-gradient-to-br from-amber-100/70 to-yellow-100/60 pointer-events-none" />
      <div className="relative p-2">
        <div className="rounded-xl overflow-hidden border border-amber-300/70 shadow">
          <img src={img} alt={name} className="h-28 w-full object-cover" loading="lazy" />
        </div>

        <h3 className="mt-2 text-sm font-extrabold text-[#1f2a37] leading-tight">{name}</h3>
        <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-[#334155]">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{location}</span>
        </p>

        <div className="mt-2 grid grid-cols-2 gap-2">
          {chips.map((c, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium border ${toneClasses(
                c.tone
              )}`}
              title={c.label}
            >
              {c.icon}
              <span className="truncate">{c.label}</span>
            </span>
          ))}
        </div>

        <button
          onClick={onList}
          className="mt-3 w-full px-3 py-2 rounded-xl font-semibold text-gray-900 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow active:scale-[0.98] transition"
        >
          List My PG
        </button>
      </div>
    </article>
  );
}
