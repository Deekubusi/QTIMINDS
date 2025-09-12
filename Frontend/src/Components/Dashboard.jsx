import { useNavigate } from "react-router-dom";
// import "./Dashboard.css"; // optional: keep for global fonts if needed
import Calendar1 from "./pages/Calender";
import MaintenanceAlertsDashboard from "./pages/Mantainence";
import Upcoming from "./pages/Upcoming";
import RecentActivityFeed from "./pages/Recent_Activity";

export default function Dashboard() {
  const navigate = useNavigate();

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
              className="bg-white rounded-2xl p-8 flex flex-col border shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02] h-[450px]"
              style={{
                borderColor: "#E5EEFF",
                color: "#001433",
                fontFamily:
                  "Poppins, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                fontFeatureSettings: "'liga' off, 'clig' off",
                fontSize: "17px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "-0.154px",
              }}
            >
              {/* Header */}
              <header className="flex flex-col items-center gap-2 mb-3">
                <div className="w-7 h-7">
                  <svg viewBox="0 0 29 29" className="w-full h-full">
                    <path
                      d="M26.5834 15.3057C26.4774 15.3063 26.3723 15.286 26.2742 15.2459C26.176 15.2058 26.0868 15.1467 26.0115 15.0721L14.5001 3.55262L2.98871 15.0721C2.83461 15.204 2.63638 15.273 2.43364 15.2652C2.2309 15.2573 2.03859 15.1733 1.89512 15.0298C1.75166 14.8864 1.66761 14.694 1.65978 14.4913C1.65195 14.2886 1.72091 14.0903 1.85288 13.9362L13.9362 1.8529C14.0871 1.70287 14.2913 1.61865 14.5041 1.61865C14.7169 1.61865 14.9211 1.70287 15.072 1.8529L27.1554 13.9362C27.2662 14.0493 27.3413 14.1926 27.3712 14.3481C27.4011 14.5036 27.3845 14.6645 27.3234 14.8106C27.2624 14.9567 27.1597 15.0816 27.0281 15.1697C26.8964 15.2577 26.7418 15.305 26.5834 15.3057Z"
                      fill="#4057BD"
                    />
                    <path
                      d="M14.5002 6.27539L4.8335 15.9743V25.7779C4.8335 26.2052 5.00324 26.615 5.30538 26.9171C5.60752 27.2193 6.01731 27.389 6.44461 27.389H12.0835V19.3334H16.9168V27.389H22.5557C22.983 27.389 23.3928 27.2193 23.6949 26.9171C23.9971 26.615 24.1668 26.2052 24.1668 25.7779V15.9179L14.5002 6.27539Z"
                      fill="#4057BD"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold text-center"
                  style={{ fontSize: "clamp(1rem, 1.9vw, 1.25rem)" }}
                >
                  Occupancy Rate
                </h3>
              </header>

              {/* Donut Chart */}
              <div className="flex-1 flex flex-col items-center pt-6">
                <div className="relative w-[150px] sm:w-[160px] md:w-[170px] transition-transform duration-300 hover:scale-105">
                  <svg viewBox="0 0 230 205" className="w-full h-auto">
                    {/* Track */}
                    <path
                      d="M230 102.5C230 159.109 178.513 205 115 205C51.4873 205 0 159.109 0 102.5C0 45.8908 51.4873 0 115 0C178.513 0 230 45.8908 230 102.5ZM31.1649 102.5C31.1649 143.768 68.6991 177.223 115 177.223C161.301 177.223 198.835 143.768 198.835 102.5C198.835 61.2319 161.301 27.7774 115 27.7774C68.6991 27.7774 31.1649 61.2319 31.1649 102.5Z"
                      fill="#FFC107"
                    />
                    {/* Progress */}
                    <path
                      d="M115 13.6319C115 6.10322 121.12 -0.0752011 128.607 0.719895C149.032 2.88911 168.521 9.91392 184.976 21.16C205.055 34.8826 219.496 54.1242 226.061 75.9036C232.626 97.683 230.95 120.784 221.291 141.628C211.632 162.472 194.531 179.895 172.636 191.198C150.741 202.5 125.275 207.051 100.184 204.146C75.0925 201.24 51.7768 191.04 33.849 175.126C15.9213 159.212 4.38231 138.473 1.01995 116.121C-1.68847 98.1165 1.03027 79.8755 8.77112 63.2374C11.9853 56.3289 20.4185 54.1346 27.2026 57.6037V57.6037C35.0102 61.5962 37.4979 71.454 34.553 79.714C30.8021 90.2346 29.672 101.427 31.3374 112.498C33.8054 128.905 42.2751 144.128 55.4343 155.809C68.5935 167.49 85.7074 174.976 104.125 177.109C122.542 179.242 141.234 175.901 157.305 167.605C173.376 159.309 185.929 146.52 193.019 131.221C200.108 115.921 201.339 98.9643 196.52 82.978C191.701 66.9916 181.102 52.8681 166.364 42.7956C155.255 35.2036 142.263 30.2325 128.585 28.2445C121.135 27.1616 115 21.1606 115 13.6319V13.6319Z"
                      fill="#4057BD"
                    />
                  </svg>

                  {/* Center % */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="text-center"
                      style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
                    >
                      82%
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 text-center p-2">
                  <div className="font-semibold">44/53 beds occupied</div>
                  <div className="mt-2 flex items-center justify-center gap-2 text-sm">
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path
                        d="M7 10H11V18.92L13.01 18.95V10H17L12 5L7 10Z"
                        fill="#10BA2A"
                      />
                    </svg>
                    <span>10% vs last month</span>
                  </div>
                </div>
              </div>

              {/* Footer link */}
              <div className="mt-4 text-right">
                <button
                  className="font-medium transition-colors duration-300 hover:underline hover:text-[#2A3EBE]"
                  style={{
                    color: "#4057BD",
                    fontSize: "clamp(0.78rem, 1.4vw, 0.95rem)",
                  }}
                >
                  View Details →
                </button>
              </div>
            </article>

            {/* Active Guests */}
            <article className="bg-white border border-[#4F6BE3] rounded-lg p-4 flex flex-col shadow-sm">
              <header className="flex items-center justify-center gap-2 mb-3">
                <div className="w-8 h-8" aria-hidden>
                  <svg viewBox="0 0 31 31" className="w-full h-full">
                    <path
                      d="M9.6875 8.396C9.6875 11.6006 12.2954 14.2085 15.5 14.2085C18.7046 14.2085 21.3125 11.6006 21.3125 8.396C21.3125 5.19137 18.7046 2.5835 15.5 2.5835C12.2954 2.5835 9.6875 5.19137 9.6875 8.396ZM25.8333 27.1252H27.125V25.8335C27.125 20.849 23.0679 16.7918 18.0833 16.7918H12.9167C7.93083 16.7918 3.875 20.849 3.875 25.8335V27.1252H25.8333Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold"
                  style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)" }}
                >
                  Active Guests
                </h3>
              </header>

              <div className="flex-1 flex flex-col items-center">
                {/* svg chart container centered and responsive */}
                <div className="w-full max-w-[340px]">
                  <svg
                    viewBox="0 0 270 210"
                    className="w-full h-auto"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      fontFamily="Nunito"
                      fontSize="11"
                      fill="#000"
                      textAnchor="end"
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

                    <rect
                      x="50"
                      y="158"
                      width="190"
                      height="4"
                      fill="rgba(3,2,41,0.08)"
                    />

                    {/* bars */}
                    <rect
                      x="70"
                      y={158 - (25 / 80) * 110}
                      width="16"
                      height={(25 / 80) * 110}
                      fill="#4F6BE3"
                      rx="2"
                    />
                    <rect
                      x="95"
                      y={158 - (20 / 80) * 110}
                      width="16"
                      height={(20 / 80) * 110}
                      fill="#FFD66B"
                      rx="2"
                    />

                    <rect
                      x="135"
                      y={158 - (50 / 80) * 110}
                      width="16"
                      height={(50 / 80) * 110}
                      fill="#4F6BE3"
                      rx="2"
                    />
                    <rect
                      x="160"
                      y={158 - (35 / 80) * 110}
                      width="16"
                      height={(35 / 80) * 110}
                      fill="#FFD66B"
                      rx="2"
                    />

                    <rect
                      x="200"
                      y={158 - (75 / 80) * 110}
                      width="16"
                      height={(75 / 80) * 110}
                      fill="#4F6BE3"
                      rx="2"
                    />
                    <rect
                      x="225"
                      y={158 - (55 / 80) * 110}
                      width="16"
                      height={(55 / 80) * 110}
                      fill="#FFD66B"
                      rx="2"
                    />

                    {/* values above bars */}
                    <g
                      fontFamily="Nunito"
                      fontSize="11"
                      fill="#000"
                      textAnchor="middle"
                    >
                      <text x="78" y={158 - (25 / 80) * 110 - 6}>
                        25
                      </text>
                      <text x="103" y={158 - (20 / 80) * 110 - 6}>
                        20
                      </text>
                      <text x="143" y={158 - (50 / 80) * 110 - 6}>
                        50
                      </text>
                      <text x="168" y={158 - (35 / 80) * 110 - 6}>
                        35
                      </text>
                      <text x="208" y={158 - (75 / 80) * 110 - 6}>
                        75
                      </text>
                      <text x="233" y={158 - (55 / 80) * 110 - 6}>
                        55
                      </text>
                    </g>

                    {/* x-axis labels */}
                    <g
                      fontFamily="Nunito"
                      fontSize="11"
                      fill="#000"
                      textAnchor="middle"
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

                {/* legend */}
                <div className="flex gap-6 mt-3 items-center justify-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 block bg-[#4F6BE3]" />
                    <span style={{ fontSize: "clamp(0.78rem,1.4vw,0.95rem)" }}>
                      Capacity
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 block bg-[#FFD66B]" />
                    <span style={{ fontSize: "clamp(0.78rem,1.4vw,0.95rem)" }}>
                      Active Guests
                    </span>
                  </div>
                </div>

                <div
                  className="mt-3 flex items-center gap-2"
                  style={{ fontSize: "clamp(0.78rem,1.4vw,0.95rem)" }}
                >
                  <svg viewBox="0 0 10 14" className="w-3 h-3">
                    <path
                      d="M0 5H4V13.92L6.01 13.95V5H10L5 0L0 5Z"
                      fill="#10BA2A"
                    />
                  </svg>
                  <div>7% vs last month</div>
                </div>
              </div>

              <div className="mt-3 text-right">
                <button
                  className="text-[#0F45A9] font-medium"
                  style={{ fontSize: "clamp(0.78rem, 1.4vw, 0.95rem)" }}
                >
                  View Details →
                </button>
              </div>
            </article>

            {/* Revenue */}
            <article className="bg-white border border-[#4F6BE3] rounded-lg p-4 flex flex-col shadow-sm">
              <header className="flex items-center justify-center gap-3 mb-2">
                <div className="w-7 h-7" aria-hidden>
                  <svg viewBox="0 0 28 28" className="w-full h-full">
                    <path
                      d="M23.625 14.2837C24.5811 13.5274 25.3231 12.5345 25.7775 11.4032C26.0913 12.3109 26.2488 13.3329 26.25 14.4692C26.25 17.1852 25.291 19.0892 24.3075 20.3142C23.8573 20.8776 23.3335 21.3779 22.75 21.8017V23.6252C22.75 24.3214 22.4734 24.9891 21.9812 25.4814C21.4889 25.9737 20.8212 26.2502 20.125 26.2502H19.25C18.7859 26.2502 18.3408 26.0659 18.0126 25.7377C17.6844 25.4095 17.5 24.9644 17.5 24.5002H14C14 24.9644 13.8156 25.4095 13.4874 25.7377C13.1592 26.0659 12.7141 26.2502 12.25 26.2502H11.375C10.6788 26.2502 10.0111 25.9737 9.51884 25.4814C9.02656 24.9891 8.75 24.3214 8.75 23.6252V23.2525C7.63265 22.8958 6.61803 22.2744 5.7925 21.4412C4.75825 20.3895 4.17725 19.0752 3.885 18.251C3.85094 18.1375 3.79055 18.0336 3.70874 17.9478C3.62694 17.8621 3.52604 17.7969 3.41425 17.7575C2.93598 17.6212 2.515 17.3331 2.2148 16.9366C1.9146 16.5401 1.75146 16.0568 1.75 15.5595V14.17C1.75 13.162 2.4185 12.2765 3.38625 12C3.56825 11.9475 3.76425 11.7707 3.8605 11.4785C4.09675 10.7662 4.55 9.71274 5.383 8.86924C6.09941 8.15141 6.91935 7.54501 7.8155 7.07024V3.78549C7.81653 3.51951 7.89728 3.25994 8.04733 3.04033C8.19739 2.82071 8.40984 2.65113 8.65725 2.55349C8.89775 2.45268 9.16234 2.42382 9.41892 2.47042C9.6755 2.51701 9.91305 2.63705 10.1027 2.81599C10.5455 3.23424 11.1265 3.73299 11.7477 4.14074C12.3865 4.55899 12.985 4.82324 13.4732 4.87224H13.482C12.5437 6.26138 12.1351 7.94109 12.3305 9.60599C12.5422 11.4067 13.9352 12.4882 15.1042 12.973L19.2868 14.7037C20.454 15.1885 22.204 15.4072 23.6268 14.2837M8.3125 13.1252C8.6606 13.1252 8.99444 12.987 9.24058 12.7408C9.48672 12.4947 9.625 12.1608 9.625 11.8127C9.625 11.4646 9.48672 11.1308 9.24058 10.8847C8.99444 10.6385 8.6606 10.5002 8.3125 10.5002C7.9644 10.5002 7.63056 10.6385 7.38442 10.8847C7.13828 11.1308 7 11.4646 7 11.8127C7 12.1608 7.13828 12.4947 7.38442 12.7408C7.63056 12.987 7.9644 13.1252 8.3125 13.1252ZM14.4025 6.86024C14.6992 6.11137 15.1642 5.4408 15.7615 4.90044C16.3588 4.36007 17.0725 3.9644 17.8473 3.74405C18.622 3.5237 19.4371 3.48457 20.2294 3.6297C21.0217 3.77483 21.77 4.10033 22.4163 4.58099C23.0627 5.06165 23.5898 5.6846 23.9568 6.40161C24.3238 7.11862 24.5209 7.91047 24.5329 8.71586C24.5448 9.52126 24.3713 10.3186 24.0257 11.0462C23.6802 11.7738 23.1718 12.4121 22.54 12.9117C21.812 13.4857 20.8127 13.442 19.9552 13.0867L15.7727 11.3542C14.9152 11.0007 14.1767 10.3235 14.0682 9.40299C14.0168 8.95724 14.0227 8.50674 14.0857 8.06249L14.4025 6.86024Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold"
                  style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)" }}
                >
                  Revenue
                </h3>
              </header>

              <div
                className="text-center mt-1"
                style={{ fontSize: "clamp(0.78rem,1.4vw,0.95rem)" }}
              >
                INR in K
              </div>

              <div className="flex-1 flex items-center justify-center mt-3">
                {/* revenue bars centered */}
                <div className="w-full max-w-[360px]">
                  <div className="flex items-start">
                    <div className="w-1/3">
                      <div className="flex flex-col justify-between h-[110px]">
                        <div className="text-[0.95rem] font-medium">Profit</div>
                        <div className="text-[0.95rem] font-medium">
                          Expense
                        </div>
                        <div className="text-[0.95rem] font-medium">
                          Revenue
                        </div>
                      </div>
                    </div>

                    <div className="w-2/3 pl-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1">
                          <div className="h-3 rounded-md w-[40%] bg-[#FF8F6B]" />
                        </div>
                        <div className="w-12 text-right text-[0.95rem] font-medium">
                          200
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1">
                          <div className="h-3 rounded-md w-[60%] bg-[#FFD66B]" />
                        </div>
                        <div className="w-12 text-right text-[0.95rem] font-medium">
                          300
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="h-3 rounded-md w-[95%] bg-[#4F6BE3]" />
                        </div>
                        <div className="w-12 text-right text-[0.95rem] font-medium">
                          500
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mt-4 flex items-center justify-center gap-2"
                style={{ fontSize: "clamp(0.78rem,1.4vw,0.95rem)" }}
              >
                <svg viewBox="0 0 11 15" className="w-3 h-3">
                  <path
                    d="M10.1371 8.94884L6.13761 9.01061L5.99985 0.0916788L3.98963 0.0927244L4.12785 9.04166L0.138328 9.10328L5.21495 14.0255L10.1371 8.94884Z"
                    fill="#D11A2A"
                  />
                </svg>
                <div>
                  <span className="font-semibold text-[#D11A2A] mr-1">8%</span>{" "}
                  vs last month
                </div>
              </div>

              <div className="mt-4 text-right">
                <button
                  className="text-[#0F45A9] font-medium"
                  style={{ fontSize: "clamp(0.78rem,1.4vw,0.95rem)" }}
                >
                  View Details →
                </button>
              </div>
            </article>

            {/* Overdue */}
            <article className="bg-white border border-[#4F6BE3] rounded-lg p-4 flex flex-col shadow-sm">
              <header className="flex items-center justify-center gap-3 mb-2">
                <div className="w-7 h-7" aria-hidden>
                  <svg viewBox="0 0 30 30" className="w-full h-full">
                    <path
                      d="M16.0825 3.74994L27.99 24.3749C28.0997 24.565 28.1575 24.7805 28.1575 24.9999C28.1575 25.2194 28.0997 25.4349 27.99 25.6249C27.8803 25.815 27.7225 25.9728 27.5325 26.0825C27.3425 26.1922 27.1269 26.2499 26.9075 26.2499H3.0925C2.87308 26.2499 2.65753 26.1922 2.46751 26.0825C2.27749 25.9728 2.1197 25.815 2.00999 25.6249C1.90028 25.4349 1.84253 25.2194 1.84253 24.9999C1.84253 24.7805 1.90029 24.565 2.01 24.3749L13.9175 3.74994C14.0272 3.55994 14.185 3.40215 14.375 3.29245C14.565 3.18275 14.7806 3.125 15 3.125C15.2194 3.125 15.435 3.18275 15.625 3.29245C15.815 3.40215 15.9728 3.55994 16.0825 3.74994ZM13.75 19.9999V22.4999H16.25V19.9999H13.75ZM13.75 11.2499V17.4999H16.25V11.2499H13.75Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <h3
                  className="font-semibold"
                  style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.25rem)" }}
                >
                  Overdue
                </h3>
              </header>

              <div className="flex-1 flex flex-col items-center">
                <div className="relative w-[180px] sm:w-[200px] md:w-[220px]">
                  <div className="w-full">
                    <svg viewBox="0 0 211 204" className="w-full h-auto">
                      <path
                        d="M211 102C211 158.333 163.766 204 105.5 204C47.234 204 0 158.333 0 102C0 45.667 47.234 0 105.5 0C163.766 0 211 45.667 211 102ZM30.7413 102C30.7413 141.918 64.2119 174.279 105.5 174.279C146.788 174.279 180.259 141.918 180.259 102C180.259 62.0816 146.788 29.7214 105.5 29.7214C64.2119 29.7214 30.7413 62.0816 30.7413 102Z"
                        fill="#FFD66B"
                      />
                      <path
                        d="M67.9963 182.053C64.6444 189.208 56.131 192.472 49.3781 188.371C31.7011 177.634 17.6174 162.003 9.06476 143.365C0.622604 124.968 -1.95662 104.674 1.46884 85.037C2.86656 77.0246 11.2585 72.7769 19.027 75.1858C27.0141 77.6625 31.2395 86.2377 30.358 94.5534C29.0255 107.124 31.0815 119.907 36.4547 131.616C41.9185 143.523 50.5354 153.716 61.3194 161.235C68.0372 165.919 71.4705 174.637 67.9963 182.053Z"
                        fill="#FF8F6B"
                      />
                      <path
                        d="M105.5 15.217C105.5 6.81289 112.345 -0.109322 120.668 1.05967C132.087 2.66359 143.191 6.07278 153.526 11.1814C168.394 18.5306 181.245 29.187 191.022 42.2741C200.8 55.3613 207.225 70.5055 209.769 86.4613C212.312 102.417 210.903 118.729 205.655 134.055C200.407 149.382 191.471 163.285 179.583 174.621C167.694 185.958 153.192 194.404 137.269 199.266C121.345 204.127 104.456 205.265 87.9893 202.585C76.8182 200.767 66.0582 197.228 56.109 192.132C48.3672 188.166 46.9411 178.142 52.2439 171.246C57.3099 164.659 66.6487 163.45 74.2247 166.864C80.2395 169.575 86.6249 171.501 93.214 172.573C104.767 174.453 116.617 173.655 127.79 170.244C138.962 166.833 149.137 160.907 157.478 152.953C165.82 144.999 172.089 135.244 175.771 124.491C179.453 113.738 180.443 102.293 178.658 91.0977C176.873 79.9026 172.365 69.277 165.505 60.0947C158.645 50.9124 149.628 43.4356 139.196 38.2792C133.303 35.3659 127.052 33.2404 120.617 31.9423C112.379 30.2807 105.5 23.6211 105.5 15.217Z"
                        fill="#5B93FF"
                      />
                    </svg>
                  </div>

                  {/* center amount */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="text-center font-bold"
                      style={{ fontSize: "clamp(0.95rem, 1.9vw, 1.2rem)" }}
                    >
                      ₹1,15,000
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col items-start gap-2 w-full px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-sm bg-[#5B93FF]" />
                    <div style={{ fontSize: "clamp(0.78rem,1.4vw,0.95rem)" }}>
                      &lt; 15 Days - 55%
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-sm bg-[#FF8F6B]" />
                    <div style={{ fontSize: "clamp(0.78rem,1.4vw,0.95rem)" }}>
                      15-30 Days - 25%
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-sm bg-[#FFD66B]" />
                    <div style={{ fontSize: "clamp(0.78rem,1.4vw,0.95rem)" }}>
                      &gt; 30 Days - 20%
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="mt-4 text-center"
                style={{ fontSize: "clamp(0.78rem,1.4vw,0.95rem)" }}
              >
                <svg viewBox="0 0 11 15" className="inline-block w-3 h-3 mr-2">
                  <path
                    d="M10.1371 8.94884L6.13761 9.01061L5.99985 0.0916788L3.98963 0.0927244L4.12785 9.04166L0.138328 9.10328L5.21495 14.0255L10.1371 8.94884Z"
                    fill="#D11A2A"
                  />
                </svg>
                <span className="font-semibold text-[#D11A2A] mr-2">5%</span>
                <span>vs last month</span>
              </div>

              <div className="mt-4 text-right">
                <button
                  className="text-[#0F45A9] font-medium"
                  style={{ fontSize: "clamp(0.78rem,1.4vw,0.95rem)" }}
                >
                  View Details →
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Add Manager",
              "Download Report",
              "Send Announcement",
              "Add new PG",
            ].map((label, idx) => (
              <button
                key={idx}
                className="w-full h-20 rounded-xl border border-[#4F6BE3] bg-white shadow-md flex items-center justify-center text-[#043163] font-extrabold"
                style={{ fontSize: "clamp(0.9rem,1.8vw,1.375rem)" }}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

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
