import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./Dashboard.css"; // optional: keep for global fonts if needed
import Calendar1 from "./pages/Calender";
import MaintenanceAlertsDashboard from "./pages/Mantainence";
import Upcoming from "./pages/Upcoming";
import RecentActivityFeed from "./pages/Recent_Activity";
import AddManagerModal from "./pages/AddManagerModal";
import AddNewPGModal from "./pages/AddNewPG.jsx";
import DownloadReportModal from "./pages/DownloadReport.jsx";
import SendAnnouncementModal from "./pages/SendAnnouncement.jsx";
import AddGuestModal from "./pages/AddGuest";



export default function Dashboard() {
  const navigate = useNavigate();

  // ← paste the state + body-scroll effect block right here
  const [isAddManagerOpen, setIsAddManagerOpen] = useState(false);

  // prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isAddManagerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAddManagerOpen]);

  // Download Report
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

    // Send Announcement modal state + success dialog flag
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [announcementSuccess, setAnnouncementSuccess] = useState(false);

  // Add New PG
  const [isAddNewPGOpen, setIsAddNewPGOpen] = useState(false);

  //AddGuest
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);



  return (
    <main className="min-h-screen bg-[#E7EFF7] px-4 py-8">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1
            className="font-extrabold text-black"
            style={{
              fontSize: "clamp(1rem, 2.6vw, 1.6rem)",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Abhishek's Dashboard
          </h1>
          <div
            className="mt-2 text-[#615F5F] font-extrabold truncate max-w-full,"
            style={{
              fontSize: "clamp(0.78rem, 1.6vw, 1rem)",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Hamsa PG, TNGO Colony, Gachibowli, Hyderabad, 25 rooms with 50 beds,
            Owner: Mohan-923456781
          </div>
        </header>

        {/* Cards Grid */}
        <section className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
{/* Occupancy */}
<article
  className="rounded-[20px] flex-shrink-0"
  style={{
    width: "261px",
    height: "487px",
    border: "1px solid rgba(79, 107, 227, 0.00)",
    background: "#FFF",
    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.10)",
  }}
>
  <div
    className="h-full rounded-[20px] p-6 flex flex-col shadow-sm transition-transform duration-200"
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      color: "#001433",
      fontFamily:
        "Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      fontFeatureSettings: "'liga' off, 'clig' off",
    }}
  >
    {/* Header */}
    <header className="flex flex-col items-center gap-3">
      <div
        className="flex-shrink-0"
        style={{ width: "48px", height: "48px", aspectRatio: "1/1" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" className="w-full h-full" fill="none">
          <path d="M38 14H22V28H6V10H2V40H6V34H42V40H46V22C46 19.8783 45.1571 17.8434 43.6569 16.3431C42.1566 14.8429 40.1217 14 38 14ZM14 26C15.5913 26 17.1174 25.3679 18.2426 24.2426C19.3679 23.1174 20 21.5913 20 20C20 18.4087 19.3679 16.8826 18.2426 15.7574C17.1174 14.6321 15.5913 14 14 14C12.4087 14 10.8826 14.6321 9.75736 15.7574C8.63214 16.8826 8 18.4087 8 20C8 21.5913 8.63214 23.1174 9.75736 24.2426C10.8826 25.3679 12.4087 26 14 26Z" fill="#0B2595" />
        </svg>
      </div>

      <h3
        className="font-semibold text-center"
        style={{
          color: "#001433",
          fontSize: "23px",
          fontWeight: 600,
          letterSpacing: "-0.154px",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Occupancy Rate
      </h3>
    </header>

    {/* Donut + stats column */}
    <div className="flex-1 flex flex-col items-center justify-center">
      {/* Donut with hover pop (slight) */}
      <div
        className="relative transition-transform duration-300"
        style={{ width: "164px", height: "159px", flexShrink: 0 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="164" height="159" viewBox="0 0 164 159" className="w-full h-full donut" fill="none">
          <path d="M164 79.5C164 123.407 127.287 159 82 159C36.7127 159 0 123.407 0 79.5C0 35.5934 36.7127 0 82 0C127.287 0 164 35.5934 164 79.5ZM22.2219 79.5C22.2219 111.508 48.9855 137.456 82 137.456C115.015 137.456 141.778 111.508 141.778 79.5C141.778 47.492 115.015 21.5444 82 21.5444C48.9855 21.5444 22.2219 47.492 22.2219 79.5Z" fill="#FFC107"/>
          <path d="M82 10.742C82 4.80935 86.8287 -0.0705119 92.7135 0.681347C106.909 2.49503 120.435 7.89141 131.896 16.4119C146.213 27.0553 156.51 41.9793 161.191 58.8716C165.873 75.7639 164.677 93.6815 157.79 109.848C150.903 126.015 138.709 139.528 123.097 148.295C107.485 157.061 89.3264 160.591 71.4353 158.337C53.5442 156.084 36.9191 148.173 24.1358 135.83C11.3526 123.487 3.12477 107.401 0.727264 90.0647C-1.18184 76.26 0.69075 62.2761 6.06602 49.4913C8.37482 44 15.0223 42.2449 20.2281 45.1405C25.6345 48.1477 27.381 55.0094 25.3363 60.8482C22.3862 69.2728 21.4571 78.2925 22.6903 87.2097C24.4399 99.861 30.4443 111.6 39.773 120.607C49.1017 129.615 61.2341 135.388 74.2903 137.032C87.3465 138.677 100.598 136.101 111.991 129.704C123.384 123.306 132.283 113.445 137.309 101.647C142.335 89.8491 143.207 76.7735 139.791 64.4462C136.375 52.1188 128.86 41.2279 118.412 33.4608C110.824 27.8197 101.996 24.0551 92.6881 22.4168C86.8452 21.3885 82 16.6746 82 10.742Z" fill="#4057BD"/>
        </svg>

        {/* center % */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            style={{
              fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
              fontSize: "22px",
              fontWeight: 600,
              color: "#000",
            }}
          >
            82%
          </div>
        </div>
      </div>

      {/* Stats + percent row - placed lower so it lines up with other cards */}
      <div className="mt-6 text-center p-2" style={{ width: "100%" }}>
        <div
          className="font-semibold"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "17px", color: "#000" }}
        >
          44/53 beds occupied
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          <div style={{ width: "24px", height: "24px" }} className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-full h-full" fill="none">
              <path d="M7 10H11V18.92L13.01 18.95V10H17L12 5L7 10Z" fill="#10BA2A" />
            </svg>
          </div>

          <div
            style={{
              color: "#000",
              fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
              fontSize: "15px",
              fontWeight: 400,
              letterSpacing: "-0.154px",
            }}
          >
            <span className="text-[#10BA2A] font-semibold mr-1">10%</span> vs last month
          </div>
        </div>
      </div>
    </div>

    {/* Footer link */}
    <div className="mt-4 text-right">
      <a
        href="#"
        className="text-[#0F45A9] font-medium inline-block hover:underline"
        style={{
          fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
          fontSize: "15px",
          fontWeight: 500,
          lineHeight: "12.612px",
          textDecoration: "none",
        }}
      >
        View Details →
      </a>
    </div>
  </div>

  {/* local hover behaviour: whole card pop, donut slight pop and link underline on hover */}
  <style>{`
    /* card hover pop - moves whole inner wrapper (keeps text sticky inside card) */
    article:hover > div {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 6px 8px 12px rgba(0,0,0,0.12);
    }

    /* donut slight pop when hovered directly */
    article .donut {
      transition: transform 220ms ease;
      transform-origin: center center;
    }
    article .donut:hover {
      transform: scale(1.03);
    }

    /* ensure the "View Details" gets underlined on hover */
    article a:hover { text-decoration: underline; }
  `}</style>
</article>


{/* Active Guests */}
<article
  className="rounded-[20px] flex-shrink-0"
  style={{
    width: "261px",
    height: "487px",
    border: "1px solid rgba(79, 107, 227, 0.00)",
    background: "#FFF",
    boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.10)",
  }}
>
  <div
    className="h-full rounded-[20px] p-4 flex flex-col shadow-sm transition-transform duration-200"
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      color: "#001433",
    }}
  >
    {/* Header */}
    <header className="flex flex-col items-center justify-center gap-3 mb-4">
      <div
        className="flex-shrink-0"
        style={{ width: "42px", height: "42px", aspectRatio: "1/1" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          className="w-full h-full"
        >
          <path
            d="M13.125 11.375C13.125 15.7168 16.6582 19.25 21 19.25C25.3417 19.25 28.875 15.7168 28.875 11.375C28.875 7.03325 25.3417 3.5 21 3.5C16.6582 3.5 13.125 7.03325 13.125 11.375ZM35 36.75H36.75V35C36.75 28.2467 31.2533 22.75 24.5 22.75H17.5C10.745 22.75 5.25 28.2467 5.25 35V36.75H35Z"
            fill="#0B2595"
          />
        </svg>
      </div>

      <h3
        className="font-semibold text-center"
        style={{
          color: "#001433",
          fontFamily:
            "Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          fontFeatureSettings: "'liga' off, 'clig' off",
          fontSize: "23px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "normal",
          letterSpacing: "-0.154px",
        }}
      >
        Active Guests
      </h3>
    </header>

    {/* Body (chart + legend + trend) */}
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full max-w-[340px]">
        <svg
          viewBox="0 0 270 210"
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* left axis labels */}
          <g
            fontFamily="Nunito"
            fontSize="13"
            fill="#000"
            textAnchor="end"
            fontWeight="500"
          >
            <text x="35" y="35">
              80
            </text>
            <text x="35" y="60">
              60
            </text>
            <text x="35" y="90">
              40
            </text>
            <text x="35" y="120">
              20
            </text>
            <text x="35" y="150">
              0
            </text>
          </g>

          {/* horizontal baseline width 210px */}
          <rect
            x="50"
            y="158"
            width="210"
            height="3"
            fill="#030229"
            opacity="0.08"
            rx="1"
          />

          {/* Group 1: Single */}
          <g className="bar-group" data-label="Single">
            <rect
              x="70"
              y={158 - (25 / 80) * 110}
              width="16"
              height={(25 / 80) * 110}
              fill="#4057BD"
              rx="2"
            />
            <rect
              x="95"
              y={158 - (20 / 80) * 110}
              width="16"
              height={(20 / 80) * 110}
              fill="#FFC107"
              rx="2"
            />
            <text
              x="78"
              y={158 - (25 / 80) * 110 - 6}
              fontFamily="Nunito"
              fontSize="12"
              fontWeight={500}
              fill="#000"
              textAnchor="middle"
            >
              25
            </text>
            <text
              x="103"
              y={158 - (20 / 80) * 110 - 6}
              fontFamily="Nunito"
              fontSize="12"
              fontWeight={500}
              fill="#000"
              textAnchor="middle"
            >
              20
            </text>
          </g>

          {/* Group 2: Double */}
          <g className="bar-group" data-label="Double">
            <rect
              x="135"
              y={158 - (50 / 80) * 110}
              width="16"
              height={(50 / 80) * 110}
              fill="#4057BD"
              rx="2"
            />
            <rect
              x="160"
              y={158 - (35 / 80) * 110}
              width="16"
              height={(35 / 80) * 110}
              fill="#FFC107"
              rx="2"
            />
            <text
              x="143"
              y={158 - (50 / 80) * 110 - 6}
              fontFamily="Nunito"
              fontSize="12"
              fontWeight={500}
              fill="#000"
              textAnchor="middle"
            >
              50
            </text>
            <text
              x="168"
              y={158 - (35 / 80) * 110 - 6}
              fontFamily="Nunito"
              fontSize="12"
              fontWeight={500}
              fill="#000"
              textAnchor="middle"
            >
              35
            </text>
          </g>

          {/* Group 3: Total */}
          <g className="bar-group" data-label="Total">
            <rect
              x="200"
              y={158 - (75 / 80) * 110}
              width="16"
              height={(75 / 80) * 110}
              fill="#4057BD"
              rx="2"
            />
            <rect
              x="225"
              y={158 - (55 / 80) * 110}
              width="16"
              height={(55 / 80) * 110}
              fill="#FFC107"
              rx="2"
            />
            <text
              x="208"
              y={158 - (75 / 80) * 110 - 6}
              fontFamily="Nunito"
              fontSize="12"
              fontWeight={500}
              fill="#000"
              textAnchor="middle"
            >
              75
            </text>
            <text
              x="233"
              y={158 - (55 / 80) * 110 - 6}
              fontFamily="Nunito"
              fontSize="12"
              fontWeight={500}
              fill="#000"
              textAnchor="middle"
            >
              55
            </text>
          </g>

          {/* x-axis labels */}
          <g
            fontFamily="Nunito"
            fontSize="13"
            fill="#000"
            textAnchor="middle"
            fontWeight="500"
          >
            <text x="90" y="185">
              Single
            </text>
            <text x="160" y="185">
              Double
            </text>
            <text x="230" y="185">
              Total
            </text>
          </g>
        </svg>
      </div>

      {/* Legend - outside SVG */}
      <div className="flex gap-8 mt-3 items-center justify-center">
        {/* Capacity */}
        <div className="flex items-center gap-2">
          <div
            className="flex-shrink-0"
            style={{ width: "10px", height: "10px", transform: "rotate(-90.749deg)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              className="w-full h-full"
            >
              <path
                d="M5.14354 10.0133C2.38212 10.0198 0.114272 7.78676 0.0781494 5.02557C0.0420271 2.26439 2.25131 0.0206852 5.01273 0.0141261C7.77415 0.00756694 10.042 2.24063 10.0781 5.00182C10.1142 7.76301 7.90496 10.0067 5.14354 10.0133Z"
                fill="#475EC4"
              />
            </svg>
          </div>
          <span
            style={{
              color: "#000",
              fontFamily: "Nunito, sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            Capacity
          </span>
        </div>

        {/* Active Guests */}
        <div className="flex items-center gap-2">
          <div
            className="flex-shrink-0"
            style={{ width: "10px", height: "10px", transform: "rotate(-90.749deg)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              className="w-full h-full"
            >
              <path
                d="M5.13085 10.0111C2.36943 10.0176 0.101576 7.78456 0.0654541 5.02338C0.0293318 2.26219 2.23862 0.0184879 5.00003 0.0119288C7.76145 0.00536968 10.0293 2.23844 10.0654 4.99962C10.1015 7.76081 7.89226 10.0045 5.13085 10.0111Z"
                fill="#FFD66B"
              />
            </svg>
          </div>
          <span
            style={{
              color: "#000",
              fontFamily: "Nunito, sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            Active Guests
          </span>
        </div>
      </div>

      {/* Percent row */}
<div className="mt-6 flex items-center justify-center gap-2">
  <div
    className="flex-shrink-0"
    style={{ width: "24px", height: "24px", aspectRatio: "1/1" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="w-full h-full"
    >
      <path d="M7 10H11V18.92L13.01 18.95V10H17L12 5L7 10Z" fill="#10BA2A" />
    </svg>
  </div>

  <div
    style={{
      color: "#000",
      fontFamily:
        "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      fontSize: "15px",
      fontWeight: 400,
      letterSpacing: "-0.154px",
      fontFeatureSettings: "'liga' off, 'clig' off",
    }}
  >
    7% vs last month
  </div>
</div>
</div>

    {/* Footer link */}
    <div className="mt-3 text-right">
      <a
        href="#"
        className="font-medium"
        style={{
          color: "#0F45A9",
          fontFamily:
            "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          fontSize: "15px",
          fontWeight: 500,
          lineHeight: "12.612px",
          textDecoration: "none",
        }}
      >
        View Details →
      </a>
    </div>
  </div>

  {/* local styles for hover pop and bar hover movement */}
  <style>{`
    /* card hover pop */
    article:hover > div {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 6px 8px 12px rgba(0,0,0,0.12);
    }

    /* bar-group hover: raises both bars slightly */
    svg .bar-group:hover rect {
      transform: translateY(-8px);
      transition: transform 200ms ease;
    }

    /* ensure numeric labels follow the bars slightly on hover */
    svg .bar-group:hover text {
      transform: translateY(-8px);
      transition: transform 200ms ease;
    }

    /* underline the link on hover in same color */
    a:hover { text-decoration: underline; }
  `}</style>
</article>



           {/* Revenue */}
<article
  className="rounded-[30px] flex-shrink-0"
  style={{
    width: "261px",
    height: "487px",
    border: "1px solid rgba(79, 107, 227, 0.00)",
    background: "#FFF",
    boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.10)",
  }}
>
  <div className="h-full rounded-[30px] p-6 flex flex-col shadow-sm transition-transform duration-200"
    style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#001433" }}
  >
    {/* Header: piggy icon + title + subtitle */}
    <header className="flex flex-col items-center justify-center gap-2">
      <div
        className="flex-shrink-0"
        style={{ width: "36.75px", height: "35.702px", aspectRatio: "36.75/35.702" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="37" viewBox="0 0 38 37" fill="none" className="w-full h-full">
          <path d="M33.4375 18.4252C34.8716 17.2907 35.9846 15.8013 36.6662 14.1045C37.137 15.466 37.3733 16.999 37.375 18.7035C37.375 22.7775 35.9365 25.6335 34.4613 27.471C33.786 28.316 33.0002 29.0665 32.125 29.7022V32.4375C32.125 33.4818 31.7102 34.4833 30.9717 35.2217C30.2333 35.9601 29.2318 36.375 28.1875 36.375H26.875C26.1788 36.375 25.5111 36.0984 25.0188 35.6061C24.5266 35.1139 24.25 34.4462 24.25 33.75H19C19 34.4462 18.7234 35.1139 18.2312 35.6061C17.7389 36.0984 17.0712 36.375 16.375 36.375H15.0625C14.0182 36.375 13.0167 35.9601 12.2783 35.2217C11.5398 34.4833 11.125 33.4818 11.125 32.4375V31.8784C9.44898 31.3433 7.92705 30.4113 6.68875 29.1615C5.13737 27.5839 4.26588 25.6125 3.8275 24.3761C3.77641 24.2058 3.68582 24.05 3.56312 23.9214C3.44041 23.7928 3.28905 23.6949 3.12137 23.6359C2.40397 23.4314 1.77249 22.9993 1.32219 22.4046C0.871893 21.8098 0.627193 21.0848 0.625 20.3389V18.2546C0.625 16.7426 1.62775 15.4144 3.07937 14.9996C3.35237 14.9209 3.64638 14.6557 3.79075 14.2174C4.14513 13.149 4.825 11.5687 6.0745 10.3035C7.14911 9.22675 8.37902 8.31715 9.72325 7.60499V2.67786C9.72479 2.27889 9.84593 1.88955 10.071 1.56012C10.2961 1.2307 10.6148 0.976326 10.9859 0.829863C11.3466 0.67865 11.7435 0.635365 12.1284 0.705256C12.5133 0.775148 12.8696 0.955214 13.1541 1.22361C13.8182 1.85099 14.6897 2.59911 15.6216 3.21074C16.5797 3.83811 17.4775 4.23449 18.2099 4.30799H18.223C16.8156 6.3917 16.2027 8.91127 16.4958 11.4086C16.8134 14.1097 18.9029 15.732 20.6564 16.4591L26.9301 19.0552C28.681 19.7824 31.306 20.1105 33.4401 18.4252Z" fill="#0B2595"/>
        </svg>
      </div>
      <h3 className="font-semibold text-center"
        style={{ color: "#001433", fontFamily: "Poppins, sans-serif", fontSize: "23px", fontWeight: 600, letterSpacing: "-0.154px" }}>
        Revenue
      </h3>
      <div style={{ color: "#000", fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 400, letterSpacing: "-0.154px" }}>
        INR in K
      </div>
    </header>

{/* Body: Chart (bars now align to axis numbers) */}
<div className="flex-1 flex items-center justify-center">
  <div className="relative w-full max-w-[220px]"> {/* control overall chart width here */}
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      {/* Labels column (left of vertical line) */}
      <div style={{ width: 80, paddingTop: 6 }}>
        <div style={{ height: 40, display: "flex", alignItems: "center", fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 500, color: "#000" }}>Profit</div>
        <div style={{ height: 40, display: "flex", alignItems: "center", fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 500, color: "#000" }}>Expense</div>
        <div style={{ height: 40, display: "flex", alignItems: "center", fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 500, color: "#000" }}>Revenue</div>
      </div>

      {/* Vertical thin line (between labels and bars) */}
      <div style={{ width: 2, height: 144, background: "#030229", opacity: 0.08, marginTop: 4 }} />

      {/* Chart column (bars + axis) */}
      <div style={{ width: 140 /* axisWidth: tweak this to fit */ }}>
        {/* Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {(() => {
            const axisMax = 600;
            const axisWidth = 140; // px - keep <= container's available width
            const rows = [
              { value: 200, color: "#FF794E" }, // Profit
              { value: 300, color: "#FFC107" }, // Expense
              { value: 500, color: "#4057BD" }, // Revenue
            ];
            return rows.map((r, i) => {
              const w = Math.max(8, Math.round((r.value / axisMax) * axisWidth)); // at least 8px visible
              return (
                <div key={i} className="flex items-center" style={{ gap: 12 }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                    {/* bar (div) */}
                    <div
                      className="rounded-md transition-transform duration-200"
                      style={{
                        width: w,
                        height: 16, // matches your ~15.68px
                        background: r.color,
                        transform: "rotate(-1deg)", // slight tilt to match visuals
                      }}
                    />
                    {/* value on right of bar (keeps inside chart area) */}
                    <div style={{ width: 36, textAlign: "right", fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 500, color: "#000" }}>
                      {r.value}
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>

        {/* X axis numbers (aligned to same axisWidth) */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", fontFamily: "Nunito, sans-serif", fontSize: 15, fontWeight: 500, color: "#000" }}>
            <span>0</span>
            <span>200</span>
            <span>400</span>
            <span>600</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


    {/* Percent row */}
    <div className="mt-4 flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="15" viewBox="0 0 10 15" fill="none"
        style={{ width: "9.126px", height: "13.95px" }}>
        <path d="M9.25082 8.94896L5.6009 9.01074L5.47519 0.0918012L3.64068 0.0928472L3.76682 9.04178L0.126033 9.1034L4.7589 14.0256L9.25082 8.94896Z" fill="#D11A2A"/>
      </svg>
      <div style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 400, letterSpacing: "-0.154px" }}>
        <span className="text-[#D11A2A] font-semibold mr-1">8%</span> vs last month
      </div>
    </div>

    {/* Footer link */}
    <div className="mt-4 text-right">
      <a href="#" className="font-medium transition-colors duration-300 hover:underline"
        style={{ color: "#0F45A9", fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 500, lineHeight: "12.612px" }}>
        View Details →
      </a>
    </div>
  </div>

  {/* Hover animation */}
  <style>{`
    article:hover > div {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 6px 8px 12px rgba(0,0,0,0.12);
    }
  `}</style>
</article>


       {/* Overdue */}
<article
  className="rounded-[30px] flex-shrink-0"
  style={{
    width: "261px",
    height: "487px",
    border: "1px solid rgba(79, 107, 227, 0.00)",
    background: "#FFF",
    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.10)",
  }}
>
  <div
    className="h-full rounded-[30px] p-6 flex flex-col shadow-sm transition-transform duration-300"
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      color: "#001433",
      fontFamily: "Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      fontFeatureSettings: "'liga' off, 'clig' off",
    }}
  >
    {/* Header: alert icon + title */}
    <header className="flex flex-col items-center gap-3">
      <div
        className="flex-shrink-0"
        style={{ width: "42px", height: "42px", aspectRatio: "1/1" }}
      >
        {/* Alert SVG (provided) */}
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none" className="w-full h-full">
          <path d="M22.5151 5.25004L39.1856 34.125C39.3392 34.3911 39.42 34.6929 39.42 35C39.42 35.3072 39.3392 35.609 39.1856 35.875C39.032 36.1411 38.8111 36.362 38.545 36.5156C38.279 36.6692 37.9772 36.75 37.6701 36.75H4.32906C4.02187 36.75 3.7201 36.6692 3.45407 36.5156C3.18805 36.362 2.96714 36.1411 2.81355 35.875C2.65996 35.609 2.5791 35.3072 2.5791 35C2.5791 34.6929 2.65996 34.3911 2.81356 34.125L19.4841 5.25004C19.6377 4.98403 19.8586 4.76314 20.1246 4.60956C20.3906 4.45597 20.6924 4.37512 20.9996 4.37512C21.3067 4.37512 21.6085 4.45597 21.8745 4.60956C22.1405 4.76314 22.3615 4.98403 22.5151 5.25004ZM19.2496 28V31.5H22.7496V28H19.2496ZM19.2496 15.75V24.5H22.7496V15.75H19.2496Z" fill="#0B2595"/>
        </svg>
      </div>

      <h3
        className="font-semibold text-center"
        style={{
          fontSize: "23px",
          fontWeight: 600,
          letterSpacing: "-0.154px",
          color: "#001433",
        }}
      >
        Overdue
      </h3>
    </header>

    {/* Pie (donut) + center value */}
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="relative" style={{ width: "163px", height: "162px", flexShrink: 0 }}>
        {/* Provided pie SVG scaled into 163x162 box */}
        <svg xmlns="http://www.w3.org/2000/svg" width="163" height="162" viewBox="0 0 163 162" fill="none" className="w-full h-full">
          <path d="M163 81C163 125.735 126.511 162 81.5 162C36.4888 162 0 125.735 0 81C0 36.2649 36.4888 0 81.5 0C126.511 0 163 36.2649 163 81ZM23.748 81C23.748 112.7 49.6045 138.398 81.5 138.398C113.396 138.398 139.252 112.7 139.252 81C139.252 49.3001 113.396 23.6023 81.5 23.6023C49.6045 23.6023 23.748 49.3001 23.748 81Z" fill="#FFD66B"/>
          <path d="M52.7342 144.119C50.0462 150.017 43.036 152.703 37.5669 149.224C24.1823 140.711 13.5161 128.44 7.00264 113.849C0.505234 99.2934 -1.49663 83.243 1.10536 67.7034C2.18144 61.2768 8.9149 57.8628 15.1232 59.8417C21.363 61.8307 24.665 68.5269 23.9819 75.0403C22.9409 84.9657 24.5117 95.0621 28.6391 104.308C32.7793 113.583 39.2839 121.536 47.4215 127.435C52.7038 131.265 55.4398 138.182 52.7342 144.119Z" fill="#FF794E"/>
          <path d="M81.5 12.0841C81.5 5.41023 86.939 -0.0912485 93.5405 0.88882C102.248 2.18155 110.714 4.87206 118.601 8.87934C130.086 14.7155 140.014 23.1779 147.567 33.5706C155.12 43.9634 160.084 55.9897 162.049 68.6605C164.014 81.3313 162.925 94.2848 158.871 106.456C154.817 118.627 147.914 129.667 138.73 138.67C129.546 147.673 118.342 154.38 106.042 158.24C93.7407 162.101 80.6935 163.004 67.9728 160.876C59.2777 159.422 50.9049 156.579 43.1704 152.483C37.2352 149.339 36.144 141.624 40.1675 136.246C44.1575 130.913 51.6759 129.941 57.7408 132.694C62.2696 134.75 67.065 136.217 72.0089 137.044C80.9341 138.537 90.0884 137.903 98.719 135.194C107.35 132.485 115.21 127.779 121.654 121.463C128.098 115.146 132.941 107.4 135.785 98.8604C138.63 90.321 139.394 81.2325 138.015 72.3423C136.636 63.4521 133.154 55.0141 127.854 47.7223C122.555 40.4304 115.589 34.493 107.531 30.3982C103.075 28.134 98.3551 26.4689 93.4955 25.4327C86.9684 24.0409 81.5 18.758 81.5 12.0841Z" fill="#4057BD"/>
        </svg>

        {/* center amount */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "18px", fontWeight: 700, color: "#000" }}>
            ₹1,15,000
          </div>
        </div>
      </div>

      {/* Legend: three lines */}
      <div className="mt-4 flex flex-col items-start gap-3 w-full px-6">
        <div className="flex items-center gap-3">
          <div style={{ width: "10px", height: "10px", borderRadius: 9999 }} className="bg-[#5B93FF]" />
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 500, color: "#030229", opacity: 0.7 }}>
            &lt; 15 Days - 55%
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div style={{ width: "10px", height: "10px", borderRadius: 9999 }} className="bg-[#FF8F6B]" />
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 500, color: "#030229", opacity: 0.7 }}>
            15–30 Days - 25%
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div style={{ width: "10px", height: "10px", borderRadius: 9999 }} className="bg-[#FFD66B]" />
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: 13, fontWeight: 500, color: "#030229", opacity: 0.7 }}>
            &gt; 30 Days - 20%
          </div>
        </div>
      </div>
    </div>

    {/* percent row: red down arrow + text */}
    <div className="mt-4 text-center" style={{ fontSize: "15px", fontFamily: "Inter, sans-serif", letterSpacing: "-0.154px", color: "#000" }}>
      <svg viewBox="0 0 11 15" className="inline-block w-3 h-3 mr-2 align-middle" style={{ verticalAlign: "middle" }}>
        <path d="M10.1371 8.94884L6.13761 9.01061L5.99985 0.0916788L3.98963 0.0927244L4.12785 9.04166L0.138328 9.10328L5.21495 14.0255L10.1371 8.94884Z" fill="#D11A2A" />
      </svg>
      <span className="font-semibold text-[#D11A2A] mr-2">5%</span>
      <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>vs last month</span>
    </div>

    {/* footer link */}
    <div className="mt-4 text-right">
      <a href="#"
         className="text-[#0F45A9] font-medium inline-block"
         style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 500, lineHeight: "12.612px", textDecoration: "none" }}>
        View Details →
      </a>
    </div>
  </div>

  {/* hover pop + link underline on hover */}
  <style>{`
    article:hover > div {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 6px 8px 12px rgba(0,0,0,0.12);
    }
    a:hover { text-decoration: underline; }
  `}</style>
</article>
</div>
</section>


        {/* ----------------------
  ACTION BUTTONS (paste here)
  ---------------------- */}
{/* Ensure Poppins is loaded globally for exact typography */}
<div className="w-full px-4 py-6">
  <div className="mx-auto max-w-screen-xl">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
      {/* cards data inlined */}
      {/* Card: Add Manager */}
      <button
        aria-label="Add Manager"
        onClick={() => setIsAddManagerOpen(true)}
        className="group w-[220px] h-[171px] flex-shrink-0 rounded-[25px] bg-white shadow-[6px_6px_6px_0_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 transition-transform duration-200 hover:-translate-y-2 focus:outline-none"
      >
        {/* hover-border element */}
        <span
          aria-hidden="true"
          className="absolute -inset-[1px] rounded-[25px] border-[0px] border-transparent pointer-events-none transition-all duration-200 ease-out group-hover:border-[0.7px] group-hover:border-[#FF8F6B] group-hover:opacity-100"
        />

        {/* icon */}
        <div className="w-[42px] h-[42px] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M23.1 18.9V10.5H18.9V18.9H10.5V23.1H18.9V31.5H23.1V23.1H31.5V18.9H23.1ZM21 42C15.4305 42 10.089 39.7875 6.15076 35.8492C2.21249 31.911 0 26.5695 0 21C0 15.4305 2.21249 10.089 6.15076 6.15076C10.089 2.21249 15.4305 0 21 0C26.5695 0 31.911 2.21249 35.8492 6.15076C39.7875 10.089 42 15.4305 42 21C42 26.5695 39.7875 31.911 35.8492 35.8492C31.911 39.7875 26.5695 42 21 42Z" fill="#0B2595"/>
          </svg>
        </div>

        {/* title */}
        <div className="text-center font-poppins font-semibold text-[20px] leading-none" style={{ color: "#073C9E" }}>
          Add Manager
        </div>
      </button>

      {/* Card: Download Report */}
      <button
        aria-label="Download Report"
        onClick={() => setIsDownloadOpen(true)}
        className="group w-[220px] h-[171px] flex-shrink-0 rounded-[25px] bg-white shadow-[6px_6px_6px_0_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 transition-transform duration-200 hover:-translate-y-2 focus:outline-none"
      >
        <span
          aria-hidden="true"
          className="absolute -inset-[1px] rounded-[25px] border-[0px] border-transparent pointer-events-none transition-all duration-200 ease-out group-hover:border-[0.7px] group-hover:border-[#FF8F6B] group-hover:opacity-100"
        />

        <div className="w-[42px] h-[42px] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M29.2373 12.957C28.9065 12.628 28.4533 12.4618 28 12.4618C27.5467 12.4618 27.0935 12.628 26.7628 12.957L22.75 16.9697V5.25C22.75 4.78587 22.5656 4.34075 22.2374 4.01256C21.9092 3.68437 21.4641 3.5 21 3.5C20.5359 3.5 20.0908 3.68437 19.7626 4.01256C19.4344 4.34075 19.25 4.78587 19.25 5.25V16.9697L15.2372 12.957C15.0751 12.7939 14.8823 12.6645 14.67 12.5762C14.4577 12.4879 14.23 12.4424 14 12.4424C13.77 12.4424 13.5423 12.4879 13.33 12.5762C13.1177 12.6645 12.9249 12.7939 12.7628 12.957C12.4347 13.2852 12.2504 13.7302 12.2504 14.1943C12.2504 14.6583 12.4347 15.1033 12.7628 15.4315L21 23.625L29.2407 15.428C29.5673 15.0995 29.7503 14.655 29.7496 14.1918C29.749 13.7286 29.5647 13.2846 29.2373 12.957ZM36.7272 28C36.7342 27.8132 36.7111 27.6265 36.659 27.447L33.159 16.947C33.043 16.5987 32.8204 16.2957 32.5226 16.0808C32.2249 15.866 31.8671 15.7503 31.5 15.75H31.1168C30.9522 16.079 30.7492 16.394 30.4745 16.6687L27.881 19.25H30.24L33.1573 28H8.8445L11.7618 19.25H14.1208L11.5255 16.6687C11.2634 16.399 11.0466 16.0888 10.8832 15.75H10.5C10.1329 15.7503 9.77511 15.866 9.47738 16.0808C9.17965 16.2957 8.95702 16.5987 8.841 16.947L5.341 27.447C5.28886 27.6265 5.26582 27.8132 5.27275 28C5.25 28 5.25 36.75 5.25 36.75C5.25 37.2141 5.43437 37.6592 5.76256 37.9874C6.09075 38.3156 6.53587 38.5 7 38.5H35C35.4641 38.5 35.9093 38.3156 36.2374 37.9874C36.5656 37.6592 36.75 37.2141 36.75 36.75C36.75 36.75 36.75 28 36.7272 28Z" fill="#0B2595"/>
          </svg>
        </div>

        <div className="text-center font-poppins font-semibold text-[20px] leading-none" style={{ color: "#073C9E" }}>
          Download Report
        </div>
      </button>

      {/* Card: Send Announcement (wider 220px) */}
      <button
        aria-label="Send Announcement"
        onClick={() => setIsSendOpen(true)}
        className="group w-[230px] h-[171px] flex-shrink-0 rounded-[25px] bg-white shadow-[6px_6px_6px_0_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 transition-transform duration-200 hover:-translate-y-2 focus:outline-none"
      >
        <span
          aria-hidden="true"
          className="absolute -inset-[1px] rounded-[25px] border-[0px] border-transparent pointer-events-none transition-all duration-200 ease-out group-hover:border-[0.7px] group-hover:border-[#FF8F6B] group-hover:opacity-100"
        />

        <div className="w-[42px] h-[42px] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.10359 3.92874C4.36481 3.70183 4.68743 3.55744 5.03069 3.51383C5.37395 3.47022 5.72243 3.52935 6.03209 3.68375L37.5321 19.4337C37.8233 19.5789 38.0683 19.8023 38.2395 20.079C38.4108 20.3557 38.5015 20.6746 38.5015 21C38.5015 21.3254 38.4108 21.6443 38.2395 21.921C38.0683 22.1977 37.8233 22.4211 37.5321 22.5662L6.03209 38.3162C5.72245 38.4712 5.37382 38.5308 5.03029 38.4875C4.68677 38.4442 4.36381 38.3 4.10227 38.0732C3.84072 37.8463 3.65236 37.5469 3.56101 37.2129C3.46966 36.879 3.47944 36.5254 3.58909 36.197L8.07259 22.75H17.4998C17.964 22.75 18.4091 22.5656 18.7373 22.2374C19.0655 21.9092 19.2498 21.4641 19.2498 21C19.2498 20.5359 19.0655 20.0907 18.7373 19.7626C18.4091 19.4344 17.964 19.25 17.4998 19.25H8.07259L3.58734 5.80299C3.47825 5.47472 3.4689 5.12147 3.56048 4.78788C3.65205 4.45429 3.84219 4.15532 4.10359 3.92874Z" fill="#0B2595"/>
          </svg>
        </div>

        <div className="text-center font-poppins font-semibold text-[20px] leading-none" style={{ color: "#073C9E" }}>
          Send Announcement
        </div>
      </button>

      {/* Card: Add New PG */}
      <button
        aria-label="Add New PG"
        onClick={() => setIsAddNewPGOpen(true)}
        className="group w-[220px] h-[171px] flex-shrink-0 rounded-[25px] bg-white shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 transition-transform duration-200 hover:-translate-y-2 focus:outline-none"
      >
        <span
          aria-hidden="true"
          className="absolute -inset-[1px] rounded-[25px] border-[0px] border-transparent pointer-events-none transition-all duration-200 ease-out group-hover:border-[0.7px] group-hover:border-[#FF8F6B] group-hover:opacity-100"
        />

        <div className="w-[42px] h-[42px] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M16.1962 5.00593C17.5733 3.94589 19.2622 3.37109 21 3.37109C22.7378 3.37109 24.4267 3.94589 25.8037 5.00593L34.9912 12.0751C35.947 12.8108 36.7211 13.7564 37.2536 14.8387C37.7861 15.9209 38.0628 17.1111 38.0625 18.3173V30.1876C38.0625 32.2761 37.2328 34.2792 35.756 35.756C34.2791 37.2329 32.2761 38.0626 30.1875 38.0626H11.8125C9.72392 38.0626 7.72088 37.2329 6.24403 35.756C4.76719 34.2792 3.9375 32.2761 3.9375 30.1876V18.3173C3.93718 17.1111 4.21395 15.9209 4.74645 14.8387C5.27895 13.7564 6.05295 12.8108 7.00875 12.0751L16.1962 5.00593ZM18.375 21.0001C16.5638 21.0001 15.0938 22.4701 15.0938 24.2813V34.1251H26.9062V24.2813C26.9062 22.4701 25.4363 21.0001 23.625 21.0001H18.375Z" fill="#0B2595"/>
          </svg>
        </div>

        <div className="text-center font-poppins font-semibold text-[20px] leading-none" style={{ color: "#073C9E" }}>
          Add New PG
        </div>
      </button>

      {/* Card: Add Guest */}
      <button
        aria-label="Add Guest"
        onClick={() => setIsAddGuestOpen(true)}
        className="group w-[220px] h-[171px] flex-shrink-0 rounded-[25px] bg-white shadow-[6px_6px_6px_0_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 transition-transform duration-200 hover:-translate-y-2 focus:outline-none"
      >
        <span
          aria-hidden="true"
          className="absolute -inset-[1px] rounded-[25px] border-[0px] border-transparent pointer-events-none transition-all duration-200 ease-out group-hover:border-[0.7px] group-hover:border-[#FF8F6B] group-hover:opacity-100"
        />

        <div className="w-[42px] h-[42px] flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M13.125 11.375C13.125 15.7168 16.6582 19.25 21 19.25C25.3417 19.25 28.875 15.7168 28.875 11.375C28.875 7.03325 25.3417 3.5 21 3.5C16.6582 3.5 13.125 7.03325 13.125 11.375ZM35 36.75H36.75V35C36.75 28.2467 31.2533 22.75 24.5 22.75H17.5C10.745 22.75 5.25 28.2467 5.25 35V36.75H35Z" fill="#0B2595"/>
          </svg>
        </div>

        <div className="text-center font-poppins font-semibold text-[20px] leading-none" style={{ color: "#073C9E" }}>
          Add Guest
        </div>
      </button>
    </div>
  </div>
</div>
{/* ----------------------
  END ACTION BUTTONS
  ---------------------- */}

{/* Add Manager modal */}
<AddManagerModal
  open={isAddManagerOpen}
  onClose={() => setIsAddManagerOpen(false)}
  onSubmit={(payload) => {
    // handle payload (call API etc). example:
    console.log("Add Manager payload:", payload);
    // close modal after handling
    setIsAddManagerOpen(false);
  }}
/>

<DownloadReportModal
  open={isDownloadOpen}
  onClose={() => setIsDownloadOpen(false)}
  onSubmit={async (payload) => {
    // call backend to generate / return file (payload contains period, customFrom, customTo, include, format)
    // return a promise if async so modal shows loading state
    console.log("Download payload:", payload);
    // example: await api.downloadReport(payload);
  }}
/>

{/* Send Announcement modal */}
<SendAnnouncementModal
  open={isSendOpen}
  onClose={() => setIsSendOpen(false)}
  onSubmit={async (payload) => {
    // payload = { audience, category, message }
    // TODO: call your API to send announcement here, e.g. await api.sendAnnouncement(payload);
    console.log("Send announcement payload:", payload);

    try {
      // simulate network work (remove in production)
      // await new Promise((r) => setTimeout(r, 600));

      // close modal and show success popup
      setIsSendOpen(false);
      setAnnouncementSuccess(true);
    } catch (err) {
      console.error("Failed to send announcement", err);
      // optionally show an error toast / message
    }
  }}
/>

{/* Announcement Success small dialog */}
        {announcementSuccess && (
          <div className="fixed inset-0 z-60 grid place-items-center bg-black/30 p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Announcement Sent</h3>
                <button
                  type="button"
                  onClick={() => setAnnouncementSuccess(false)}
                  className="h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100"
                >
                  <svg viewBox="0 0 20 20" className="h-5 w-5">
                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              <div className="px-6 py-5">
                <p className="text-sm text-gray-700">Your announcement was sent successfully to the selected audience.</p>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
                <button
                  onClick={() => setAnnouncementSuccess(false)}
                  className="px-4 py-2 rounded-lg bg-[#605BFF] text-white hover:bg-[#5048e6]"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}

        <AddNewPGModal
  open={isAddNewPGOpen}
  onClose={() => setIsAddNewPGOpen(false)}
  onSubmit={async (payload) => {
    // handle payload here (create PG or save draft)
    // payload contains pgName, shortDescription, fullDescription, totalRooms, totalBeds, amenities, assignManager, defaultRent, bedsAvailable, photos (names), complianceFiles (names)
    console.log("Create PG payload:", payload);

    try {
      // e.g. await api.createPG(payload);
      // show toast / UI feedback as needed
      setIsAddNewPGOpen(false);
    } catch (err) {
      console.error("Failed to create PG", err);
    }
  }}
/>

<AddGuestModal
  open={isAddGuestOpen}
  onClose={() => setIsAddGuestOpen(false)}
  onSubmit={async (payload) => {
    // payload contains the guest data; send to backend
    console.log("Create guest payload:", payload);

    try {
      // Example: await api.createGuest(payload);
      setIsAddGuestOpen(false);
    } catch (err) {
      console.error("Failed to create guest", err);
    }
  }}
/>


        {/* Tables */}
        <Upcoming/>
        

        {/* original components kept */}
        <MaintenanceAlertsDashboard />
        <Calendar1 />
        <RecentActivityFeed/>
      </div>
    </main>
  );
}
