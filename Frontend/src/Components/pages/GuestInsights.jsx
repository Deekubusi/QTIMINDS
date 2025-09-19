// src/components/GuestInsights.jsx
import { ArrowLeft, ChevronsDown, ChevronsUp } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function GuestInsights() {
  /* ---------------- DATA ---------------- */
  const metrics = [
    { value: "44", label: "Total Guests", sub: "(Active)" },
    { value: "7", label: "New Guests", sub: "This month" },
    { value: "5", label: "Expiring leases", sub: "In 30 days" },
    { value: "4.8", label: "Average Guest Tenure", sub: "months" },
    { value: "12%", label: "Repeat Guests", sub: "" },
    { value: "4.3/5", label: "Guest Satisfaction Score", sub: "" },
  ];

  const feedbackData = [
    { guest: "Rahul Mehta 201 - B", issue: "Food quality poor", time: "5 days ago", status: "Escalated", color: "bg-red-100 text-red-600" },
    { guest: "Ria Shetty 202 - A", issue: "WiFi slow speed", time: "1 days ago", status: "Open", color: "bg-yellow-100 text-yellow-700" },
    { guest: "Priya Singh 204 - A", issue: "Maintenance broken chair", time: "2 weeks ago", status: "Resolved", color: "bg-green-100 text-green-600" },
    { guest: "Lara Sharma 103 - C", issue: "Maintenance leak in bathroom", time: "1 weeks ago", status: "Resolved", color: "bg-green-100 text-green-600" },
  ];

  const trend = [
    { month: "Apr", score: 3.5 }, { month: "May", score: 4.0 }, { month: "Jun", score: 4.2 },
    { month: "Jul", score: 3.9 }, { month: "Aug", score: 4.3 }, { month: "Sep", score: 4.1 }, { month: "Oct", score: 4.7 },
  ];

  const staySeg = [
    { name: "Mid-Term (3–6 months)", value: 52, color: "#4F80FF" },
    { name: "Short-Term (<3 months)", value: 28, color: "#FFA053" },
    { name: "Long-Term (>6 months)", value: 20, color: "#F7D25A" },
  ];
  const revenueSeg = [
    { name: "Students", value: 68, color: "#4F80FF" },
    { name: "Working Professionals", value: 32, color: "#F7D25A" },
  ];
  const demo = {
    age: [
      { label: "18–25", pct: 12, color: "bg-blue-500" },
      { label: "25–30", pct: 57, color: "bg-teal-400" },
      { label: "30+", pct: 31, color: "bg-pink-500" },
    ],
    gender: [
      { label: "Female", pct: 20, color: "bg-blue-400" },
      { label: "Male", pct: 77, color: "bg-green-500" },
      { label: "Other", pct: 3, color: "bg-emerald-300" },
    ],
    occupation: [
      { label: "Students", pct: 64, color: "bg-amber-400" },
      { label: "IT professionals", pct: 36, color: "bg-rose-400" },
    ],
    city: [
      { label: "Hyd", pct: 28, color: "bg-rose-400" },
      { label: "Warangal", pct: 18, color: "bg-teal-400" },
      { label: "Others", pct: 54, color: "bg-emerald-400" },
    ],
  };

  const renewalPct = 72;
  const churnTrend = [
    { m: "Apr", v: 0.28 }, { m: "May", v: 0.32 }, { m: "Jun", v: 0.30 },
    { m: "Jul", v: 0.34 }, { m: "Aug", v: 0.31 }, { m: "Sep", v: 0.33 }, { m: "Oct", v: 0.36 },
  ];

  const lifecycle = [
    { name: "Rahul Mehta", room: "Room 201,\nBed 2", in: "01 Jan 2025", out: "30 Jan 2025", pay: "On-time", payColor: "bg-green-500", contract: "", score: 83 },
    { name: "Anjali Kumar", room: "Room 102,\nBed 1", in: "15 Feb 2025", out: "14 Apr 2025", pay: "Delayed", payColor: "bg-red-500", contract: "Renew", score: 76 },
    { name: "Vikram Patel", room: "Room 304,\nBed 2", in: "05 Mar 2025", out: "31 Aug 2025", pay: "Pending", payColor: "bg-red-500", contract: "Expiring soon", score: 91 },
    { name: "Roma Das", room: "Room 208,\nBed 2", in: "20 Jun 2025", out: "19 Oct 2025", pay: "On-time", payColor: "bg-green-500", contract: "Active", score: 62 },
    { name: "Dia Sharma", room: "Room 203,\nBed 1", in: "20 Jun 2025", out: "13 Aug 2025", pay: "On-time", payColor: "bg-green-500", contract: "Active", score: 78 },
  ];

  /* ---------------- MINI UI HELPERS ---------------- */
  const Donut = ({ data }) => (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2}>
          {data.map((e, i) => <Cell key={i} fill={e.color} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );

  const Legend = ({ items }) => (
    <ul className="space-y-1 text-sm w-full">
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: it.color }} />
          <span className="text-gray-700">{it.name} – <span className="font-semibold">{it.value}%</span></span>
        </li>
      ))}
    </ul>
  );

  const MiniBars = ({ title, rows }) => (
    <div>
      <p className="text-gray-600 text-sm mb-2 font-semibold">{title}</p>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i}>
            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
              <span>{r.label}</span><span className="font-medium">{r.pct}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ---------------- LOCAL UI STATE ---------------- */
  const [feedbackExpanded, setFeedbackExpanded] = useState(false);
  const visibleFeedback = feedbackExpanded ? feedbackData : feedbackData.slice(0, 2);

  const [lifecycleExpanded, setLifecycleExpanded] = useState(false);
  const visibleLifecycle = lifecycleExpanded ? lifecycle : lifecycle.slice(0, 2);

  /* ---------------- LAYOUT ---------------- */
  return (
    <div className="min-h-screen bg-[#E7EFF7] px-4 py-8 lg:px-12 lg:py-14">
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* Page heading + back */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Guest Insights</h1>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        {/* ROW 1: Key Metrics & Feedback */}
        <div className="grid gap-6 lg:grid-cols-[455px_minmax(520px,1fr)] grid-cols-1 items-stretch">
          {/* Key Summary Metrics */}
          <div
            className="bg-white rounded-2xl p-4 md:p-6 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] border-[0.7px] border-gray-200 hover:border-blue-600 transition-colors flex flex-col h-full"
            role="region"
            aria-label="Key Summary Metrics"
          >
            <div className="mb-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-sky-600 opacity-10 rounded-[10px]" />
                <h2 className="relative text-lg font-semibold text-gray-800 px-3 py-1">Key Summary Metrics</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 flex-1" style={{ gridAutoRows: "1fr" }}>
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-[20px] bg-white border border-gray-100 p-4 flex flex-col items-center justify-center shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] h-full"
                >
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">{m.value}</p>
                  <p className="mt-2 text-sm font-medium text-gray-700 text-center">{m.label}</p>
                  {m.sub && <p className="mt-1 text-xs text-gray-500 italic">{m.sub}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Guest Feedback & Engagement */}
          <div
            className="bg-white rounded-2xl p-4 md:p-6 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] border-[0.7px] border-gray-200 hover:border-blue-600 transition-colors flex flex-col gap-4 h-full"
            role="region"
            aria-label="Guest Feedback & Engagement"
          >
            <div>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-sky-600 opacity-10 rounded-[10px]" />
                <h2 className="relative text-lg font-semibold text-gray-800 px-3 py-1">Guest Feedback & Engagement</h2>
              </div>
            </div>
            <div className="rounded-[20px] bg-white border border-gray-100 p-0 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] overflow-hidden">
              <div className="p-4 pb-0">
                <div className="relative inline-block mb-3">
                  <div className="absolute inset-0 bg-sky-600 opacity-10 rounded-[8px] " />
                  <h3 className="relative text-xs font-semibold text-gray-700 px-2 py-1">Recent Feedback/Requests</h3>
                </div>
              </div>
              <div className="px-4 pb-3">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-0 rounded-2xl overflow-hidden border border-gray-200">
                    <thead>
                      <tr>
                        <th className="bg-blue-600 text-white text-left px-6 py-3">Guest</th>
                        <th className="bg-blue-600 text-white text-left px-6 py-3">Issue</th>
                        <th className="bg-blue-600 text-white text-left px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleFeedback.map((f, idx) => (
                        <tr key={f.guest + idx} className="border-t border-gray-200 text-gray-800 hover:bg-slate-50/60">
                          <td className="px-6 py-4 whitespace-nowrap">{f.guest}</td>
                          <td className="px-6 py-4">
                            {f.issue}
                            <div className="text-xs text-gray-400">{f.time}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-block text-xs px-3 py-1 rounded-full ${f.color.split(" ").slice(0, 2).join(" ")}`}>
                              {f.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {feedbackData.length > 2 && (
                  <div className="flex justify-end pt-3">
                    <button
                      onClick={() => setFeedbackExpanded((v) => !v)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                      aria-expanded={feedbackExpanded}
                    >
                      {feedbackExpanded ? (<>View less <ChevronsUp className="ml-1 h-4 w-4" /></>) : (<>View more ({Math.max(feedbackData.length - 2, 0)}) <ChevronsDown className="ml-1 h-4 w-4" /></>)}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-[20px] bg-white border border-gray-100 p-4 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)]">
              <div className="mb-2">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-sky-600 opacity-10 rounded-[8px]" />
                  <h3 className="relative text-xs font-semibold text-gray-700 px-2 py-1">Feedback Trends</h3>
                </div>
              </div>
              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trend} barCategoryGap="40%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fill: "#64748b" }} />
                    <YAxis domain={[3, 5]} tick={{ fill: "#64748b" }} />
                    <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                    <Bar
                      dataKey="score"
                      fill="#3b82f6"
                      radius={[6, 6, 0, 0]}
                      barSize={20}
                      activeBar={false}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Common Suggestions</h4>
                <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
                  <span className="text-sm text-gray-600">• Improve WiFi reliability</span>
                  <span className="text-sm text-gray-600">• Better food variety</span>
                  <span className="text-sm text-gray-600">• Noise control measures</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: Profile Analytics & Predictive Insights */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] grid-cols-1 items-stretch">
          {/* LEFT: Guest Profile Analytics */}
          <div
            className="bg-white rounded-2xl p-4 md:p-6 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] border-[0.7px] border-gray-200 hover:border-blue-600 transition-colors flex flex-col gap-4 h-full"
            role="region"
            aria-label="Guest Profile Analytics"
          >
            <div>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-sky-600 opacity-10 rounded-[10px]" />
                <h2 className="relative text-lg font-semibold text-gray-800 px-3 py-1">Guest Profile Analytics</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
              {/* Demographics */}
              <div className="rounded-[20px] bg-white border border-gray-100 p-4 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] lg:col-span-4 flex flex-col">
                <div className="mb-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-sky-600 opacity-10 rounded-[8px]" />
                    <h3 className="relative text-xs font-semibold text-gray-700 px-2 py-1">Demographics</h3>
                  </div>
                </div>
                <div className="space-y-4 flex-1 flex flex-col justify-around">
                  <MiniBars title="Age Group" rows={demo.age} />
                  <MiniBars title="Gender" rows={demo.gender} />
                  <MiniBars title="Occupation" rows={demo.occupation} />
                  <MiniBars title="City" rows={demo.city} />
                </div>
              </div>

              {/* Donut Charts Container */}
              <div className="lg:col-span-8 grid grid-cols-1 gap-6">
                {/* Stay Duration */}
                <div className="rounded-[20px] bg-white border border-gray-100 p-4 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)]">
                  <div className="mb-2">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-sky-600 opacity-10 rounded-[8px]" />
                      <h3 className="relative text-xs font-semibold text-gray-700 px-2 py-1">Stay duration segments</h3>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full max-w-[220px] mx-auto"><Donut data={staySeg} /></div>
                    <div className="flex-1"><Legend items={staySeg} /></div>
                  </div>
                </div>

                {/* Revenue Contribution */}
                <div className="rounded-[20px] bg-white border border-gray-100 p-4 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)]">
                  <div className="mb-2">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-sky-600 opacity-10 rounded-[8px]" />
                      <h3 className="relative text-xs font-semibold text-gray-700 px-2 py-1">Revenue Contribution by Guest Segment</h3>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full max-w-[220px] mx-auto"><Donut data={revenueSeg} /></div>
                    <div className="flex-1"><Legend items={revenueSeg} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Insights & Predictive Analytics */}
          <div
            className="bg-white rounded-2xl p-4 md:p-6 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] border-[0.7px] border-gray-200 hover:border-blue-600 transition-colors flex flex-col gap-4 h-full"
            role="region"
            aria-label="Insights & Predictive Analytics"
          >
            <div>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-sky-600 opacity-10 rounded-[10px]" />
                <h2 className="relative text-lg font-semibold text-gray-800 px-3 py-1">Insights & Predictive Analytics</h2>
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {/* High-Risk Guests */}
              <div className="rounded-[20px] bg-white border border-gray-100 p-4 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] flex-1 flex flex-col justify-center">
                <p className="font-semibold text-gray-800 flex items-center gap-2"><span className="text-xl">⚠️</span> High-Risk Guests</p>
                <p className="text-3xl font-bold mt-1 text-gray-900">8 <span className="text-base font-medium text-gray-500">flagged</span></p>
                <p className="text-xs text-gray-500 mt-1">payment delays, multiple complaints, short stay pattern</p>
              </div>

              {/* Renewal Probability */}
              <div className="rounded-[20px] bg-white border border-gray-100 p-4 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] flex-1 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">Renewal Probability</p>
                  <p className="text-xs text-gray-500">AI Prediction</p>
                </div>
                <div className="relative h-16 w-16 rounded-full grid place-items-center" style={{ background: `conic-gradient(#16a34a ${renewalPct}%, #e5e7eb 0)` }}>
                  <div className="h-12 w-12 rounded-full bg-white grid place-items-center text-gray-900 font-bold">{renewalPct}%</div>
                </div>
              </div>

              {/* Guest Turnover Trend */}
              <div className="rounded-[20px] bg-white border border-gray-100 p-4 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] flex-1 flex flex-col">
                <p className="font-semibold text-gray-800 mb-2">Guest Turnover Trend</p>
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={churnTrend}>
                      <XAxis dataKey="m" hide />
                      <YAxis domain={[0, 0.5]} hide />
                      <Tooltip />
                      <Area type="monotone" dataKey="v" stroke="#F59E0B" fill="#FDE68A" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-gray-500 mt-1">Monthly churn rate</p>
              </div>

              {/* Referral Tracking */}
              <div className="rounded-[20px] bg-white border border-gray-100 p-4 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] flex-1 flex flex-col justify-center">
                <p className="font-semibold text-gray-800">Referral Tracking</p>
                <p className="text-3xl font-bold mt-1 text-gray-900">28 <span className="text-base font-medium text-gray-500">new via referrals</span></p>
                <p className="text-xs text-gray-500 mt-1">How many new guests came via existing ones</p>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: Guest Lifecycle View */}
        <div
          className="bg-white rounded-2xl p-4 md:p-6 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] border-[0.7px] border-gray-200 hover:border-blue-600 transition-colors flex flex-col gap-4"
          role="region"
          aria-label="Guest Lifecycle View"
        >
          <div>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-sky-600 opacity-10 rounded-[10px]" />
              <h2 className="relative text-lg font-semibold text-gray-800 px-3 py-1">Guest Lifecycle View</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[920px] border-separate border-spacing-0 rounded-2xl overflow-hidden border border-gray-200">
              <thead>
                <tr>
                  <th className="bg-blue-600 text-white text-left px-6 py-3">Guest</th>
                  <th className="bg-blue-600 text-white text-left px-6 py-3">Room / Bed</th>
                  <th className="bg-blue-600 text-white text-left px-6 py-3">Check-in / Check-out</th>
                  <th className="bg-blue-600 text-white text-left px-6 py-3">Payment</th>
                  <th className="bg-blue-600 text-white text-left px-6 py-3">Lease</th>
                  <th className="bg-blue-600 text-white text-left px-6 py-3">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {visibleLifecycle.map((r, i) => (
                  <tr key={i} className="border-t border-gray-200 text-gray-800 hover:bg-slate-50/60">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">{r.name?.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase()}</span>
                        <span className="font-semibold text-gray-900">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-pre-line text-gray-700">{r.room}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-900">{r.in}</span>
                        <span className="text-gray-500">{r.out}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${r.payColor}`} />
                        <span className="text-gray-800">{r.pay}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {r.contract ? <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">{r.contract}</span> : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 rounded-full bg-gray-200 overflow-hidden">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.max(0, Math.min(100, Number(r.score))) || 0}%` }} />
                        </div>
                        <span className="text-gray-900 font-semibold tabular-nums">{r.score}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {lifecycle.length > 2 && (
            <div className="flex justify-end pt-3">
              <button
                onClick={() => setLifecycleExpanded((v) => !v)}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                aria-expanded={lifecycleExpanded}
              >
                {lifecycleExpanded ? (<>View less <ChevronsUp className="ml-1 h-4 w-4" /></>) : (<>View more ({Math.max(lifecycle.length - 2, 0)}) <ChevronsDown className="ml-1 h-4 w-4" /></>)}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}