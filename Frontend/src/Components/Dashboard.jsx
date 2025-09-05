import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

/* icons */

/* recharts */

import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const formatINR = (num) => new Intl.NumberFormat("en-IN").format(num);

export default function Dashboard() {
  const navigate = useNavigate(); // ✅ hook inside the component

  // Numbers
  const revenue = 520000;
  const expenses = 235000;
  const net = revenue - expenses;

  // Donut data
  const profitData = [
    { name: "Expenses", value: expenses },
    { name: "Net Profit", value: net },
  ];
  const COLORS = ["#EF4444", "#16A34A"]; // red, green

  return (
    <main className="dash-wrap">
      <h1 className="dash-heading">Dashboard</h1>
              <div
  className="
    w-full max-w-[790px] h-[27px] flex-shrink-0
    text-[#615F5F] text-[16px] font-extrabold
    leading-[27px] font-nunito
    truncate
  "
>
  Hamsa PG, TNGO Colony, Gachibowli, Hyderabad, 25 rooms with 50 beds, Owner: Mohan-923456781
</div>

      <section className="dash-cards">


{/* Cards row — full code (unchanged card contents) with wrapper forcing equal heights */}
<section className="w-full mt-6 px-6">
  <div className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 items-stretch">

    {/* 1) Occupancy Rate card (unchanged content) */}
    <article
      className="w-full sm:w-[286px] h-[487px] flex-shrink-0 rounded-[4px] border border-[#4F6BE3] bg-white p-6 flex flex-col"
      style={{ boxShadow: "4px 4px 8px rgba(0,0,0,0.10)" }}
      aria-label="Occupancy Rate card"
    >
      {/* Header */}
      <header className="flex items-center gap-3 mb-3 w-full">
        <div
          className="w-[29px] h-[29px] flex-shrink-0"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html: `<svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none"><path d="M26.5834 15.3057C26.4774 15.3063 26.3723 15.286 26.2742 15.2459C26.176 15.2058 26.0868 15.1467 26.0115 15.0721L14.5001 3.55262L2.98871 15.0721C2.83461 15.204 2.63638 15.273 2.43364 15.2652C2.2309 15.2573 2.03859 15.1733 1.89512 15.0298C1.75166 14.8864 1.66761 14.694 1.65978 14.4913C1.65195 14.2886 1.72091 14.0903 1.85288 13.9362L13.9362 1.8529C14.0871 1.70287 14.2913 1.61865 14.5041 1.61865C14.7169 1.61865 14.9211 1.70287 15.072 1.8529L27.1554 13.9362C27.2662 14.0493 27.3413 14.1926 27.3712 14.3481C27.4011 14.5036 27.3845 14.6645 27.3234 14.8106C27.2624 14.9567 27.1597 15.0816 27.0281 15.1697C26.8964 15.2577 26.7418 15.305 26.5834 15.3057Z" fill="black"/><path d="M14.5002 6.27539L4.8335 15.9743V25.7779C4.8335 26.2052 5.00324 26.615 5.30538 26.9171C5.60752 27.2193 6.01731 27.389 6.44461 27.389H12.0835V19.3334H16.9168V27.389H22.5557C22.983 27.389 23.3928 27.2193 23.6949 26.9171C23.9971 26.615 24.1668 26.2052 24.1668 25.7779V15.9179L14.5002 6.27539Z" fill="black"/></svg>`,
          }}
        />
        <h3
          className="text-[22px]"
          style={{
            fontFamily:
              "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            fontWeight: 700,
            letterSpacing: "-0.154px",
          }}
        >
          Occupancy Rate
        </h3>
      </header>

      {/* Donut chart */}
      <div className="relative w-full flex justify-center items-center" style={{ height: 220 }}>
        <div
          className="w-[200px] h-[180px] flex-shrink-0"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="180" viewBox="0 0 230 205" fill="none"><path d="M230 102.5C230 159.109 178.513 205 115 205C51.4873 205 0 159.109 0 102.5C0 45.8908 51.4873 0 115 0C178.513 0 230 45.8908 230 102.5ZM31.1649 102.5C31.1649 143.768 68.6991 177.223 115 177.223C161.301 177.223 198.835 143.768 198.835 102.5C198.835 61.2319 161.301 27.7774 115 27.7774C68.6991 27.7774 31.1649 61.2319 31.1649 102.5Z" fill="#FFD66B"/><path d="M115 13.6319C115 6.10322 121.12 -0.0752011 128.607 0.719895C149.032 2.88911 168.521 9.91392 184.976 21.16C205.055 34.8826 219.496 54.1242 226.061 75.9036C232.626 97.683 230.95 120.784 221.291 141.628C211.632 162.472 194.531 179.895 172.636 191.198C150.741 202.5 125.275 207.051 100.184 204.146C75.0925 201.24 51.7768 191.04 33.849 175.126C15.9213 159.212 4.38231 138.473 1.01995 116.121C-1.68847 98.1165 1.03027 79.8755 8.77112 63.2374C11.9853 56.3289 20.4185 54.1346 27.2026 57.6037V57.6037C35.0102 61.5962 37.4979 71.454 34.553 79.714C30.8021 90.2346 29.672 101.427 31.3374 112.498C33.8054 128.905 42.2751 144.128 55.4343 155.809C68.5935 167.49 85.7074 174.976 104.125 177.109C122.542 179.242 141.234 175.901 157.305 167.605C173.376 159.309 185.929 146.52 193.019 131.221C200.108 115.921 201.339 98.9643 196.52 82.978C191.701 66.9916 181.102 52.8681 166.364 42.7956C155.255 35.2036 142.263 30.2325 128.585 28.2445C121.135 27.1616 115 21.1606 115 13.6319V13.6319Z" fill="#4F6BE3"/></svg>`,
          }}
        />
        <div className="absolute text-center">
          <div
            className="text-[22px] font-semibold"
            style={{
              fontFamily:
                "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              letterSpacing: "-0.154px",
            }}
          >
            82%
          </div>
        </div>
      </div>

      {/* Centered stats below donut */}
      <div className="mt-6 flex flex-col items-center text-center">
        <div
          className="text-[17px] font-semibold mb-2"
          style={{
            fontFamily:
              "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            letterSpacing: "-0.154px",
          }}
        >
          44/53 beds occupied
        </div>

        <div className="flex items-center justify-center gap-2 text-[15px] font-normal text-black">
          <div
            className="w-[24px] h-[24px] flex-shrink-0"
            aria-hidden="true"
            dangerouslySetInnerHTML={{
              __html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 10H11V18.92L13.01 18.95V10H17L12 5L7 10Z" fill="#10BA2A"/></svg>`,
            }}
          />
          <span
            style={{
              fontFamily:
                "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            }}
          >
            10% vs last month
          </span>
        </div>
      </div>

      {/* View Details */}
      <div className="mt-auto pt-4 w-full">
        <div className="text-right">
          <button
            className="text-[#0F45A9] text-[15px] font-medium"
            style={{
              fontFamily:
                "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              lineHeight: "12.612px",
            }}
            aria-label="View Details"
          >
            View Details →
          </button>
        </div>
      </div>
    </article>

    {/* 2) Active Guests card (unchanged content) */}
    <article
      className="w-full sm:w-[286px] h-[487px] flex-shrink-0 rounded-[4px] border border-[#4F6BE3] bg-white p-6 flex flex-col items-center"
      style={{ boxShadow: "4px 4px 8px rgba(0,0,0,0.10)" }}
    >
      {/* Header */}
      <header className="flex items-center justify-center gap-2 mb-4">
        <div
          className="w-[31px] h-[31px] flex-shrink-0"
          dangerouslySetInnerHTML={{
            __html:
              '<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none"><path d="M9.6875 8.396C9.6875 11.6006 12.2954 14.2085 15.5 14.2085C18.7046 14.2085 21.3125 11.6006 21.3125 8.396C21.3125 5.19137 18.7046 2.5835 15.5 2.5835C12.2954 2.5835 9.6875 5.19137 9.6875 8.396ZM25.8333 27.1252H27.125V25.8335C27.125 20.849 23.0679 16.7918 18.0833 16.7918H12.9167C7.93083 16.7918 3.875 20.849 3.875 25.8335V27.1252H25.8333Z" fill="black"/></svg>',
          }}
        />
        <h3
          className="text-[22px] text-black"
          style={{
            fontFamily:
              "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            fontWeight: 700,
            letterSpacing: "-0.154px",
          }}
        >
          Active Guests
        </h3>
      </header>

      {/* Chart area - Bigger and moved down */}
      <div className="flex justify-center items-center w-full mb-8 mt-4">
        <svg width="270" height="210" viewBox="0 0 270 210" xmlns="http://www.w3.org/2000/svg">
          {/* y-axis labels */}
          <g fontFamily="Nunito" fontSize="13" fill="#000" textAnchor="end">
            <text x="35" y="35">80</text>
            <text x="35" y="65">60</text>
            <text x="35" y="95">40</text>
            <text x="35" y="125">20</text>
            <text x="35" y="155">0</text>
          </g>

          {/* x-axis baseline */}
          <rect x="50" y="158" width="190" height="4" fill="rgba(3,2,41,0.08)" />

          {/* Bars (no rounded corners) */}
          <rect x="70" y={158 - (25 / 80) * 110} width="20" height={(25 / 80) * 110} fill="#4F6BE3" />
          <rect x="100" y={158 - (20 / 80) * 110} width="20" height={(20 / 80) * 110} fill="#FFD66B" />

          <rect x="140" y={158 - (50 / 80) * 110} width="20" height={(50 / 80) * 110} fill="#4F6BE3" />
          <rect x="170" y={158 - (35 / 80) * 110} width="20" height={(35 / 80) * 110} fill="#FFD66B" />

          <rect x="210" y={158 - (75 / 80) * 110} width="20" height={(75 / 80) * 110} fill="#4F6BE3" />
          <rect x="240" y={158 - (55 / 80) * 110} width="20" height={(55 / 80) * 110} fill="#FFD66B" />

          {/* Values above bars */}
          <g fontFamily="Nunito" fontSize="12" fill="#000" textAnchor="middle">
            <text x="80" y={158 - (25 / 80) * 110 - 6}>25</text>
            <text x="110" y={158 - (20 / 80) * 110 - 6}>20</text>
            <text x="150" y={158 - (50 / 80) * 110 - 6}>50</text>
            <text x="180" y={158 - (35 / 80) * 110 - 6}>35</text>
            <text x="220" y={158 - (75 / 80) * 110 - 6}>75</text>
            <text x="250" y={158 - (55 / 80) * 110 - 6}>55</text>
          </g>

          {/* x-axis labels */}
          <g fontFamily="Nunito" fontSize="14" fill="#000" textAnchor="middle">
            <text x="90" y="180">Single</text>
            <text x="160" y="180">Double</text>
            <text x="230" y="180">Total</text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-10 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 block bg-[#4F6BE3]" />
          <span className="font-nunito text-[15px]">Capacity</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 block bg-[#FFD66B]" />
          <span className="font-nunito text-[15px]">Active Guests</span>
        </div>
      </div>

      {/* Growth */}
      <div className="flex justify-center items-center gap-2 text-[15px] font-normal text-black mb-4">
        <div
          className="w-[14px] h-[14px] flex-shrink-0"
          dangerouslySetInnerHTML={{
            __html:
              '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none"><path d="M0 5H4V13.92L6.01 13.95V5H10L5 0L0 5Z" fill="#10BA2A"/></svg>',
          }}
        />
        <span style={{ fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto" }}>
          7% vs last month
        </span>
      </div>

      {/* View Details */}
      <div className="mt-auto pt-2 text-right w-full">
        <button
          className="text-[#0F45A9] text-[15px] font-medium"
          style={{ fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto" }}
        >
          View Details →
        </button>
      </div>
    </article>

    {/* 3) Revenue card (unchanged content) */}
    <article
      className="w-full sm:w-[286px] h-[487px] flex-shrink-0 rounded-[4px] border border-[#4F6BE3] bg-white p-6 flex flex-col"
      style={{ boxShadow: "4px 4px 4px rgba(0,0,0,0.10)" }}
      aria-label="Revenue card"
    >
      {/* Header (icon + title) */}
      <header className="flex items-center gap-3 w-full justify-center" style={{ marginTop: 6 }}>
        <div
          className="w-[28px] h-[28px] flex-shrink-0"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M23.625 14.2837C24.5811 13.5274 25.3231 12.5345 25.7775 11.4032C26.0913 12.3109 26.2488 13.3329 26.25 14.4692C26.25 17.1852 25.291 19.0892 24.3075 20.3142C23.8573 20.8776 23.3335 21.3779 22.75 21.8017V23.6252C22.75 24.3214 22.4734 24.9891 21.9812 25.4814C21.4889 25.9737 20.8212 26.2502 20.125 26.2502H19.25C18.7859 26.2502 18.3408 26.0659 18.0126 25.7377C17.6844 25.4095 17.5 24.9644 17.5 24.5002H14C14 24.9644 13.8156 25.4095 13.4874 25.7377C13.1592 26.0659 12.7141 26.2502 12.25 26.2502H11.375C10.6788 26.2502 10.0111 25.9737 9.51884 25.4814C9.02656 24.9891 8.75 24.3214 8.75 23.6252V23.2525C7.63265 22.8958 6.61803 22.2744 5.7925 21.4412C4.75825 20.3895 4.17725 19.0752 3.885 18.251C3.85094 18.1375 3.79055 18.0336 3.70874 17.9478C3.62694 17.8621 3.52604 17.7969 3.41425 17.7575C2.93598 17.6212 2.515 17.3331 2.2148 16.9366C1.9146 16.5401 1.75146 16.0568 1.75 15.5595V14.17C1.75 13.162 2.4185 12.2765 3.38625 12C3.56825 11.9475 3.76425 11.7707 3.8605 11.4785C4.09675 10.7662 4.55 9.71274 5.383 8.86924C6.09941 8.15141 6.91935 7.54501 7.8155 7.07024V3.78549C7.81653 3.51951 7.89728 3.25994 8.04733 3.04033C8.19739 2.82071 8.40984 2.65113 8.65725 2.55349C8.89775 2.45268 9.16234 2.42382 9.41892 2.47042C9.6755 2.51701 9.91305 2.63705 10.1027 2.81599C10.5455 3.23424 11.1265 3.73299 11.7477 4.14074C12.3865 4.55899 12.985 4.82324 13.4732 4.87224H13.482C12.5437 6.26138 12.1351 7.94109 12.3305 9.60599C12.5422 11.4067 13.9352 12.4882 15.1042 12.973L19.2868 14.7037C20.454 15.1885 22.204 15.4072 23.6268 14.2837M8.3125 13.1252C8.6606 13.1252 8.99444 12.987 9.24058 12.7408C9.48672 12.4947 9.625 12.1608 9.625 11.8127C9.625 11.4646 9.48672 11.1308 9.24058 10.8847C8.99444 10.6385 8.6606 10.5002 8.3125 10.5002C7.9644 10.5002 7.63056 10.6385 7.38442 10.8847C7.13828 11.1308 7 11.4646 7 11.8127C7 12.1608 7.13828 12.4947 7.38442 12.7408C7.63056 12.987 7.9644 13.1252 8.3125 13.1252ZM14.4025 6.86024C14.6992 6.11137 15.1642 5.4408 15.7615 4.90044C16.3588 4.36007 17.0725 3.9644 17.8473 3.74405C18.622 3.5237 19.4371 3.48457 20.2294 3.6297C21.0217 3.77483 21.77 4.10033 22.4163 4.58099C23.0627 5.06165 23.5898 5.6846 23.9568 6.40161C24.3238 7.11862 24.5209 7.91047 24.5329 8.71586C24.5448 9.52126 24.3713 10.3186 24.0257 11.0462C23.6802 11.7738 23.1718 12.4121 22.54 12.9117C21.812 13.4857 20.8127 13.442 19.9552 13.0867L15.7727 11.3542C14.9152 11.0007 14.1767 10.3235 14.0682 9.40299C14.0168 8.95724 14.0227 8.50674 14.0857 8.06249L14.4025 6.86024ZM14.4025 6.86024L14.1645 7.62674C14.2242 7.36554 14.3037 7.10929 14.4025 6.86024Z" fill="black"/></svg>`,
          }}
        />
        <h3
          className="text-[22px]"
          style={{
            fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            fontWeight: 700,
            letterSpacing: "-0.154px",
            color: "#000",
          }}
        >
          Revenue
        </h3>
      </header>

      {/* INR in K - centered */}
      <div className="text-center mb-4">
        <div
          style={{
            fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: "-0.154px",
            color: "#000",
          }}
        >
          INR in K
        </div>
      </div>

      {/* Chart area - evenly spaced vertically */}
      <div className="flex flex-col items-center flex-grow justify-center">
        <div className="flex items-start" style={{ width: 248 }}>
          {/* Labels */}
          <div className="flex flex-col justify-between" style={{ height: 144, width: 72 }}>
            <div className="text-[15px]" style={{ fontFamily: "Nunito, sans-serif", fontWeight: 500 }}>Profit</div>
            <div className="text-[15px]" style={{ fontFamily: "Nunito, sans-serif", fontWeight: 500 }}>Expense</div>
            <div className="text-[15px]" style={{ fontFamily: "Nunito, sans-serif", fontWeight: 500 }}>Revenue</div>
          </div>

          {/* Bar area */}
          <div className="relative" style={{ width: 176, height: 144 }}>
            {/* Single vertical guide line on left */}
            <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 2, background: "#030229", opacity: 0.08 }} />

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", paddingLeft: 8 }}>
              {/* Profit */}
              <div className="flex items-center gap-3">
                <div
                  style={{ width: 43.354, height: 16 }}
                  dangerouslySetInnerHTML={{
                    __html: `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="16" viewBox="0 0 44 16" fill="none"><path d="M43.354 15.6807L-1.82155e-05 15.6807L0.167866 0.000192865L43.5219 0.000192865L43.354 15.6807Z" fill="#FF8F6B"/></svg>`,
                  }}
                />
                <div className="text-[13px]" style={{ fontFamily: "Nunito, sans-serif", fontWeight: 500 }}>200</div>
              </div>

              {/* Expense */}
              <div className="flex items-center gap-3">
                <div
                  style={{ width: 66.767, height: 16 }}
                  dangerouslySetInnerHTML={{
                    __html: `<svg xmlns="http://www.w3.org/2000/svg" width="67" height="16" viewBox="0 0 67 16" fill="none"><path d="M66.7668 15.6807L-8.95405e-05 15.6807L0.167794 0.000192865L66.9347 0.000192865L66.7668 15.6807Z" fill="#FFD66B"/></svg>`,
                  }}
                />
                <div className="text-[13px]" style={{ fontFamily: "Nunito, sans-serif", fontWeight: 500 }}>300</div>
              </div>

              {/* Revenue */}
              <div className="flex items-center gap-3">
                <div
                  style={{ width: 119.983, height: 16 }}
                  dangerouslySetInnerHTML={{
                    __html: `<svg xmlns="http://www.w3.org/2000/svg" width="121" height="16" viewBox="0 0 121 16" fill="none"><path d="M119.983 15.6807L-8.55164e-05 15.6807L0.167798 0.000192865L120.151 0.000192865L119.983 15.6807Z" fill="#4F6BE3"/></svg>`,
                  }}
                />
                <div className="text-[13px]" style={{ fontFamily: "Nunito, sans-serif", fontWeight: 500 }}>500</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* % change - moved down for alignment */}
      <div className="flex flex-col items-center mt-8 mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-[11px] h-[15px]"
            dangerouslySetInnerHTML={{
              __html: `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none"><path d="M10.1371 8.94884L6.13761 9.01061L5.99985 0.0916788L3.98963 0.0927244L4.12785 9.04166L0.138328 9.10328L5.21495 14.0255L10.1371 8.94884Z" fill="#D11A2A"/></svg>`,
            }}
          />
          <div style={{ fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", fontSize: 15 }}>
            <span style={{ color: "#D11A2A", marginRight: 6 }}>8%</span>
            <span style={{ color: "#000" }}>vs last month</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto pt-2 w-full">
        <div className="text-right">
          <button
            className="text-[#0F45A9] text-[15px] font-medium"
            style={{
              fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              lineHeight: "12.612px",
            }}
            aria-label="View Details"
          >
            View Details →
          </button>
        </div>
      </div>
    </article>

    {/* 4) Overdue card (unchanged content) */}
    <article
      className="w-full sm:w-[286px] h-[487px] flex-shrink-0 rounded-[4px] border border-[#4F6BE3] bg-white p-6 flex flex-col items-center"
      style={{ boxShadow: "4px 4px 4px rgba(0,0,0,0.10)" }}
      aria-label="Overdue card"
    >
      {/* Header (icon + title) */}
      <header className="flex items-center gap-3 w-full justify-center mb-2">
        <div
          className="w-[30px] h-[30px] flex-shrink-0"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html:
              `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M16.0825 3.74994L27.99 24.3749C28.0997 24.565 28.1575 24.7805 28.1575 24.9999C28.1575 25.2194 28.0997 25.4349 27.99 25.6249C27.8803 25.815 27.7225 25.9728 27.5325 26.0825C27.3425 26.1922 27.1269 26.2499 26.9075 26.2499H3.0925C2.87308 26.2499 2.65753 26.1922 2.46751 26.0825C2.27749 25.9728 2.1197 25.815 2.00999 25.6249C1.90028 25.4349 1.84253 25.2194 1.84253 24.9999C1.84253 24.7805 1.90029 24.565 2.01 24.3749L13.9175 3.74994C14.0272 3.55994 14.185 3.40215 14.375 3.29245C14.565 3.18275 14.7806 3.125 15 3.125C15.2194 3.125 15.435 3.18275 15.625 3.29245C15.815 3.40215 15.9728 3.55994 16.0825 3.74994ZM13.75 19.9999V22.4999H16.25V19.9999H13.75ZM13.75 11.2499V17.4999H16.25V11.2499H13.75Z" fill="black"/></svg>`,
          }}
        />
        <h3
          className="text-[22px]"
          style={{
            fontFamily:
              "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            fontWeight: 700,
            letterSpacing: "-0.154px",
            color: "#000",
          }}
        >
          Overdue
        </h3>
      </header>

      {/* Donut (moved slightly down) */}
      <div className="w-full flex justify-center" style={{ marginTop: 6 }}>
        <div className="relative" style={{ width: 211, height: 204 }}>
          {/* svg donut */}
          <div
            aria-hidden="true"
            dangerouslySetInnerHTML={{
              __html:
                `<svg xmlns="http://www.w3.org/2000/svg" width="211" height="204" viewBox="0 0 211 204" fill="none"><path d="M211 102C211 158.333 163.766 204 105.5 204C47.234 204 0 158.333 0 102C0 45.667 47.234 0 105.5 0C163.766 0 211 45.667 211 102ZM30.7413 102C30.7413 141.918 64.2119 174.279 105.5 174.279C146.788 174.279 180.259 141.918 180.259 102C180.259 62.0816 146.788 29.7214 105.5 29.7214C64.2119 29.7214 30.7413 62.0816 30.7413 102Z" fill="#FFD66B"/><path d="M67.9963 182.053C64.6444 189.208 56.131 192.472 49.3781 188.371C31.7011 177.634 17.6174 162.003 9.06476 143.365C0.622604 124.968 -1.95662 104.674 1.46884 85.037C2.86656 77.0246 11.2585 72.7769 19.027 75.1858C27.0141 77.6625 31.2395 86.2377 30.358 94.5534C29.0255 107.124 31.0815 119.907 36.4547 131.616C41.9185 143.523 50.5354 153.716 61.3194 161.235C68.0372 165.919 71.4705 174.637 67.9963 182.053Z" fill="#FF8F6B"/><path d="M105.5 15.217C105.5 6.81289 112.345 -0.109322 120.668 1.05967C132.087 2.66359 143.191 6.07278 153.526 11.1814C168.394 18.5306 181.245 29.187 191.022 42.2741C200.8 55.3613 207.225 70.5055 209.769 86.4613C212.312 102.417 210.903 118.729 205.655 134.055C200.407 149.382 191.471 163.285 179.583 174.621C167.694 185.958 153.192 194.404 137.269 199.266C121.345 204.127 104.456 205.265 87.9893 202.585C76.8182 200.767 66.0582 197.228 56.109 192.132C48.3672 188.166 46.9411 178.142 52.2439 171.246C57.3099 164.659 66.6487 163.45 74.2247 166.864C80.2395 169.575 86.6249 171.501 93.214 172.573C104.767 174.453 116.617 173.655 127.79 170.244C138.962 166.833 149.137 160.907 157.478 152.953C165.82 144.999 172.089 135.244 175.771 124.491C179.453 113.738 180.443 102.293 178.658 91.0977C176.873 79.9026 172.365 69.277 165.505 60.0947C158.645 50.9124 149.628 43.4356 139.196 38.2792C133.303 35.3659 127.052 33.2404 120.617 31.9423C112.379 30.2807 105.5 23.6211 105.5 15.217Z" fill="#5B93FF"/></svg>`,
            }}
          />
          {/* Center amount absolute in the middle of the donut */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ pointerEvents: "none" }}>
            <div className="text-[20px] font-bold text-center" style={{ fontFamily: "Nunito, sans-serif", color: "#000", lineHeight: 1 }}>
              ₹1,15,000
            </div>
          </div>
        </div>
      </div>

      {/* Legend - placed below donut and centered */}
      <div className="w-full flex flex-col items-center gap-3 mt-2 px-4">
        <div className="flex items-center gap-3">
          <div className="w-[15px] h-[15px] rounded-[5px] flex-shrink-0" style={{ background: "#5B93FF" }} />
          <div className="text-[16px]" style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, color: "#030229", opacity: 0.7 }}>
            &lt; 15 Days - 55%
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-[15px] h-[15px] rounded-[5px] flex-shrink-0" style={{ background: "#FF8F6B" }} />
          <div className="text-[16px]" style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, color: "#030229", opacity: 0.7 }}>
            15-30 Days - 25%
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-[15px] h-[15px] rounded-[5px] flex-shrink-0" style={{ background: "#FFD66B" }} />
          <div className="text-[16px]" style={{ fontFamily: "Nunito, sans-serif", fontWeight: 600, color: "#030229", opacity: 0.7 }}>
            &gt; 30 Days - 20%
          </div>
        </div>
      </div>

      {/* % change - slightly lower, centered */}
      <div className="flex flex-col items-center mt-4">
        <div className="flex items-center gap-2">
          <div
            className="w-[11px] h-[15px] flex-shrink-0"
            aria-hidden="true"
            dangerouslySetInnerHTML={{
              __html:
                `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none"><path d="M10.1371 8.94884L6.13761 9.01061L5.99985 0.0916788L3.98963 0.0927244L4.12785 9.04166L0.138328 9.10328L5.21495 14.0255L10.1371 8.94884Z" fill="#D11A2A"/></svg>`,
            }}
          />
          <div style={{ fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", fontSize: 15, color: "#000" }}>
            <span style={{ color: "#D11A2A", marginRight: 6 }}>5%</span>
            <span>vs last month</span>
          </div>
        </div>
      </div>

      {/* CTA - keep at bottom-right */}
      <div className="mt-auto pt-4 w-full">
        <div className="text-right">
          <button
            className="text-[#0F45A9] text-[15px] font-medium"
            style={{
              fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              lineHeight: "12.612px",
            }}
            aria-label="View Details"
          >
            View Details →
          </button>
        </div>
      </div>
    </article>

  </div>
</section>




      </section>

{/* Action buttons */}
<div className="w-full mt-6 px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
    {/* Button 1 */}
    <div className="w-full sm:w-[286px] flex justify-center">
      <button
        className="w-full h-[80px] rounded-[20px] border border-[#4F6BE3] bg-white flex items-center justify-center"
        style={{ boxShadow: "4px 4px 4px rgba(0,0,0,0.25)" }}
        aria-label="Add Manager"
      >
        <span
          style={{
            color: "#043163",
            fontFamily: "Nunito, sans-serif",
            fontSize: 22,
            fontWeight: 800,
            lineHeight: "normal",
          }}
        >
          Add Manager
        </span>
      </button>
    </div>

    {/* Button 2 */}
    <div className="w-full sm:w-[286px] flex justify-center">
      <button
        className="w-full h-[80px] rounded-[20px] border border-[#4F6BE3] bg-white flex items-center justify-center"
        style={{ boxShadow: "4px 4px 4px rgba(0,0,0,0.25)" }}
        aria-label="Download Report"
      >
        <span
          style={{
            color: "#043163",
            fontFamily: "Nunito, sans-serif",
            fontSize: 22,
            fontWeight: 800,
            lineHeight: "normal",
          }}
        >
          Download Report
        </span>
      </button>
    </div>

    {/* Button 3 */}
    <div className="w-full sm:w-[286px] flex justify-center">
      <button
        className="w-full h-[80px] rounded-[20px] border border-[#4F6BE3] bg-white flex items-center justify-center"
        style={{ boxShadow: "4px 4px 4px rgba(0,0,0,0.25)" }}
        aria-label="Send Announcement"
      >
        <span
          style={{
            color: "#043163",
            fontFamily: "Nunito, sans-serif",
            fontSize: 22,
            fontWeight: 800,
            lineHeight: "normal",
          }}
        >
          Send Announcement
        </span>
      </button>
    </div>

    {/* Button 4 */}
    <div className="w-full sm:w-[286px] flex justify-center">
      <button
        className="w-full h-[80px] rounded-[20px] border border-[#4F6BE3] bg-white flex items-center justify-center"
        style={{ boxShadow: "4px 4px 4px rgba(0,0,0,0.25)" }}
        aria-label="Add new PG"
      >
        <span
          style={{
            color: "#043163",
            fontFamily: "Nunito, sans-serif",
            fontSize: 22,
            fontWeight: 800,
            lineHeight: "normal",
          }}
        >
          Add new PG
        </span>
      </button>
    </div>
  </div>
</div>



{/* ===== Check-In/Out header area (responsive) ===== */}
<section className="mt-6 w-full">
  {/* Row 1: toggle at top-right (stays right on larger screens, moves to left on very small screens) */}
  <div className="w-full flex justify-end mb-3">
    <div className="inline-flex rounded-[10px] overflow-hidden shadow-sm">
      <button
        className="w-[88px] sm:w-[106px] h-8 sm:h-[31px] px-2 sm:px-[4px] py-[5px] rounded-l-[10px] bg-[#4F6BE3] flex items-center justify-center
                   text-white sm:text-black font-nunito text-sm sm:text-[15px] font-medium leading-none"
        style={{ WebkitTextStrokeWidth: "0.1px", WebkitTextStrokeColor: "#000" }}
        aria-pressed="true"
      >
        <span className="select-none">Calendar</span>
      </button>

      <button
        className="w-[88px] sm:w-[106px] h-8 sm:h-[31px] px-2 sm:px-[4px] py-[5px] rounded-r-[10px] bg-[#FBFEFF] border border-black flex items-center justify-center
                   text-black font-nunito text-sm sm:text-[15px] font-medium leading-none -ml-px"
        style={{ WebkitTextStrokeWidth: "0.1px", WebkitTextStrokeColor: "#000" }}
        aria-pressed="false"
      >
        <span className="select-none">List</span>
      </button>
    </div>
  </div>

{/* Row 2: responsive (keeps your original structure, only adds responsive classes) */}
<div className="w-full grid gap-4 md:grid-cols-2">

  {/* Left group (Check-In pill + button) */}
  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
    <div className="min-w-0 w-full sm:w-[286px] h-[50px] flex items-center justify-center rounded-[10px] border border-[#052A88] bg-[#4F6BE3]/10">
      <span className="text-black font-inter text-lg sm:text-[22px] font-bold tracking-[-0.154px] truncate">
        Upcoming Check-In
      </span>
    </div>

    <button className="w-full sm:w-[206px] h-10 sm:h-[42px] rounded-[10px] bg-[#4F6BE3] flex items-center justify-center">
      <span className="text-white font-nunito text-sm sm:text-[16px] font-semibold leading-none whitespace-nowrap">
        Add Upcoming Check-In
      </span>
    </button>
  </div>

  {/* Right group (spacer on md+, stacked on small screens) */}
  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
    <div className="min-w-0 w-full sm:w-[286px] h-[50px] flex items-center justify-center rounded-[10px] border border-[#052A88] bg-[#4F6BE3]/10">
      <span className="text-black font-inter text-lg sm:text-[22px] font-bold tracking-[-0.154px] truncate">
        Upcoming Check-Out
      </span>
    </div>

    <button className="w-full sm:w-[212px] h-10 sm:h-[42px] rounded-[10px] bg-[#4F6BE3] flex items-center justify-center">
      <span className="text-white font-nunito text-sm sm:text-[16px] font-semibold leading-none whitespace-nowrap">
        Add Upcoming Check-Out
      </span>
    </button>
  </div>
</div>

</section>

{/* ===== Upcoming Check-In / Check-Out tables (equal spacing) ===== */}
<section className="mt-6 w-full">
  <div className="grid gap-6 md:grid-cols-2">

    {/* ================== Upcoming Check-In ================== */}
    <div className="w-full rounded-[10px] border border-black bg-white overflow-hidden">
      <table className="w-full table-fixed">
        {/* Equal widths: 20% each */}
        <colgroup>
          <col style={{ width: '20%' }} /> {/* Guest Name */}
          <col style={{ width: '20%' }} /> {/* Room/Bed */}
          <col style={{ width: '20%' }} /> {/* Check-in Date */}
          <col style={{ width: '20%' }} /> {/* Payment Status */}
          <col style={{ width: '20%' }} /> {/* Notes */}
        </colgroup>

        <thead className="bg-black/10">
          <tr className="h-[76px] align-middle">
            <th className="px-4 text-left text-[#030229] font-nunito text-[15px] font-extrabold leading-tight">Guest Name</th>
            <th className="px-4 text-left text-[#030229] font-nunito text-[15px] font-extrabold leading-tight">Room/Bed</th>
            <th className="px-4 text-left text-[#030229] font-nunito text-[15px] font-extrabold leading-tight">Check-in Date</th>
            <th className="px-4 text-left text-[#030229] font-nunito text-[15px] font-extrabold leading-tight">Payment Status</th>
            <th className="px-4 text-left text-[#030229] font-nunito text-[15px] font-extrabold leading-tight">Notes</th>
          </tr>
        </thead>

        <tbody className="text-[#030229] font-nunito">
          <tr className="border-b border-[#030229]/5">
            <td className="px-4"><div className="h-[84px] flex items-center">Rohan Gupta</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">101-A</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">2 Aug 2025</div></td>
            <td className="px-4">
              <div className="h-[84px] flex items-center gap-2">
                <span className="text-green-600 font-bold">✅</span>
                <span className="text-green-600">Paid</span>
              </div>
            </td>
            <td className="px-4"><div className="h-[84px] flex items-center">Prefers AC room</div></td>
          </tr>

          <tr className="border-b border-[#030229]/5">
            <td className="px-4"><div className="h-[84px] flex items-center">Sneha Reddy</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">201-A</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">23 Aug 2025</div></td>
            <td className="px-4">
              <div className="h-[84px] flex items-center gap-2">
                <span className="text-yellow-500 font-bold">⚠</span>
                <span className="text-yellow-500 font-bold">Partial</span>
              </div>
            </td>
            <td className="px-4"><div className="h-[84px] flex items-center">Prefers Non-AC room</div></td>
          </tr>

          <tr className="border-b border-[#030229]/5">
            <td className="px-4"><div className="h-[84px] flex items-center">Sree</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">106-B</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">2 Aug 2025</div></td>
            <td className="px-4">
              <div className="h-[84px] flex items-center gap-2">
                <span className="text-red-500 font-bold">❌</span>
                <span className="text-red-500 font-bold">Due</span>
              </div>
            </td>
            <td className="px-4"><div className="h-[84px] flex items-center">IIT-H Student</div></td>
          </tr>

          <tr>
            <td className="px-4"><div className="h-[84px] flex items-center">Ria Shetty</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">203-B</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">25 Aug 2025</div></td>
            <td className="px-4">
              <div className="h-[84px] flex items-center gap-2">
                <span className="text-yellow-500 font-bold">⚠</span>
                <span className="text-yellow-500 font-bold">Partial</span>
              </div>
            </td>
            <td className="px-4"><div className="h-[84px] flex items-center">Employee</div></td>
          </tr>
        </tbody>
      </table>

      <div className="px-6 py-4 text-right">
        <button className="text-[#0F45A9] font-inter text-[15px] font-medium">View Details →</button>
      </div>
    </div>

    {/* ================== Upcoming Check-Out ================== */}
    <div className="w-full rounded-[10px] border border-black bg-white overflow-hidden">
      <table className="w-full table-fixed">
        {/* Equal widths: 20% each */}
        <colgroup>
          <col style={{ width: '20%' }} /> {/* Guest Name */}
          <col style={{ width: '20%' }} /> {/* Room/Bed */}
          <col style={{ width: '20%' }} /> {/* Check-out Date */}
          <col style={{ width: '20%' }} /> {/* Due Amount */}
          <col style={{ width: '20%' }} /> {/* Feedback Given */}
        </colgroup>

        <thead className="bg-black/10">
          <tr className="h-[76px] align-middle">
            <th className="px-4 text-left text-[#030229] font-nunito text-[15px] font-extrabold leading-tight">Guest Name</th>
            <th className="px-4 text-left text-[#030229] font-nunito text-[15px] font-extrabold leading-tight">Room/Bed</th>
            <th className="px-4 text-left text-[#030229] font-nunito text-[15px] font-extrabold leading-tight">Check-out Date</th>
            <th className="px-4 text-left text-[#030229] font-nunito text-[15px] font-extrabold leading-tight">Due Amount</th>
            <th className="px-4 text-left text-[#030229] font-nunito text-[15px] font-extrabold leading-tight">Feedback Given</th>
          </tr>
        </thead>

        <tbody className="text-[#030229] font-nunito">
          <tr className="border-b border-[#030229]/5">
            <td className="px-4"><div className="h-[84px] flex items-center">Arjun Mehta</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">101-A</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">4 Aug 2025</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">₹2,000</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center font-bold">✅</div></td>
          </tr>

          <tr className="border-b border-[#030229]/5">
            <td className="px-4"><div className="h-[84px] flex items-center">Priya Singh</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">201-A</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">24 Aug 2025</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">₹0</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center font-bold">⚠</div></td>
          </tr>

          <tr className="border-b border-[#030229]/5">
            <td className="px-4"><div className="h-[84px] flex items-center">Sreemayi</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">106-B</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">3 Aug 2025</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">₹1,000</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center font-bold">❌</div></td>
          </tr>

          <tr>
            <td className="px-4"><div className="h-[84px] flex items-center">Keerthi Naidu</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">203-B</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">27 Aug 2025</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center">₹1,000</div></td>
            <td className="px-4"><div className="h-[84px] flex items-center font-bold">✅</div></td>
          </tr>
        </tbody>
      </table>

      <div className="px-6 py-4 text-right">
        <button className="text-[#0F45A9] font-inter text-[15px] font-medium">View Details →</button>
      </div>
    </div>
  </div>
</section>


    </main>
  );
}