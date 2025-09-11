import { useMemo, useState } from "react";

const STATUS = ["All", "Open", "In Progress", "Resolved", "Overdue"];
const CATEGORY = [
  "All",
  "Electricity",
  "Plumbing",
  "WiFi/Internet",
  "Housekeeping",
];

// ---- Mock Data ----
const initialAlerts = [
  {
    id: 1,
    message: "PG lease agreement is expiring on 15th September 2025",
    date: "2025-09-15",
    severity: "medium",
  },
  {
    id: 2,
    message: "PG lease agreement is expiring on 15th September 2025",
    date: "2025-09-15",
    severity: "high",
  },
  {
    id: 3,
    message: "PG lease agreement is expiring on 15th September 2025",
    date: "2025-09-15",
    severity: "medium",
  },
  {
    id: 4,
    message: "PG lease agreement is expiring on 15th September 2025",
    date: "2025-09-15",
    severity: "low",
  },
];

const initialRequests = [
  {
    id: 101,
    date: "2025-07-12",
    category: "Electricity",
    status: "Open",
    assigned: "Ramesh (Tech)",
    sla: "within 24hrs",
    rating: 3,
  },
  {
    id: 102,
    date: "2025-07-12",
    category: "WiFi/Internet",
    status: "Resolved",
    assigned: "Suresh (IT)",
    sla: "within 48hrs",
    rating: 2,
  },
  {
    id: 103,
    date: "2025-07-12",
    category: "Electricity",
    status: "In Progress",
    assigned: "Arya (Vendor)",
    sla: "Overdue",
    rating: 4,
  },
  {
    id: 104,
    date: "2025-07-12",
    category: "Plumbing",
    status: "Open",
    assigned: "Nithya",
    sla: "Overdue",
    rating: 3,
  },
];

const badgeClasses = (status) => {
  switch (status) {
    case "Open":
      return "bg-rose-100 text-rose-600";
    case "Resolved":
      return "bg-emerald-100 text-emerald-700";
    case "In Progress":
      return "bg-amber-100 text-amber-700";
    case "Overdue":
      return "bg-rose-100 text-rose-700 border border-rose-300";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const categoryDot = (cat) => {
  const map = {
    Electricity: "bg-yellow-400",
    Plumbing: "bg-sky-500",
    "WiFi/Internet": "bg-indigo-500",
    Housekeeping: "bg-emerald-400",
  };
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full mr-2 ${
        map[cat] || "bg-gray-400"
      }`}
    />
  );
};

export default function MaintenanceAlertsDashboard() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [requests, setRequests] = useState(initialRequests);

  // Filters
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const severityOrder = { high: 0, medium: 1, low: 2 };

  // Modals & fields
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [newAlertMsg, setNewAlertMsg] = useState("");
  const [newAlertDate, setNewAlertDate] = useState("");
  const [newAlertSeverity, setNewAlertSeverity] = useState("medium");

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analyticsRange, setAnalyticsRange] = useState("weekly");

  const [showNewReqModal, setShowNewReqModal] = useState(false);
  const [nrTitle, setNrTitle] = useState("");
  const [nrCategory, setNrCategory] = useState("Electricity");
  const [nrStatus, setNrStatus] = useState("Open");
  const [nrDate, setNrDate] = useState("");
  const [nrAssignee, setNrAssignee] = useState("");
  const [nrNotes, setNrNotes] = useState("");

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      const textOk = `${r.id} ${r.category} ${r.status} ${r.assigned}`
        .toLowerCase()
        .includes(q.toLowerCase());
      const statusOk = status === "All" || r.status === status;
      const catOk = category === "All" || r.category === category;
      const dateOk = (() => {
        const t = new Date(r.date).getTime();
        const fOk = from ? t >= new Date(from).getTime() : true;
        const tOk = to ? t <= new Date(to).getTime() : true;
        return fOk && tOk;
      })();
      return textOk && statusOk && catOk && dateOk;
    });
  }, [requests, q, status, category, from, to]);

  const addAlert = () => {
    if (!newAlertMsg.trim() || !newAlertDate) return;
    const item = {
      id: Math.max(0, ...alerts.map((a) => a.id)) + 1,
      message: newAlertMsg.trim(),
      date: newAlertDate,
      severity: newAlertSeverity,
    };
    setAlerts((cur) => [item, ...cur]);
    setNewAlertMsg("");
    setNewAlertDate("");
    setNewAlertSeverity("medium");
    setShowAlertModal(false);
  };

  const addNewRequest = () => {
    if (!nrTitle.trim() || !nrDate) return;
    const item = {
      id: Math.max(0, ...requests.map((r) => r.id)) + 1,
      date: nrDate,
      category: nrCategory,
      status: nrStatus,
      assigned: nrAssignee || "Unassigned",
      sla: "within 24hrs",
      rating: 0,
    };
    setRequests((cur) => [item, ...cur]);
    setNrTitle("");
    setNrCategory("Electricity");
    setNrStatus("Open");
    setNrDate("");
    setNrAssignee("");
    setNrNotes("");
    setShowNewReqModal(false);
  };

  // Analytics datasets
  const analyticsData = {
    weekly: [
      { day: "Mon", value: 23 },
      { day: "Tue", value: 15 },
      { day: "Wed", value: 30 },
      { day: "Thu", value: 21 },
      { day: "Fri", value: 10 },
      { day: "Sat", value: 23.4 },
      { day: "Sun", value: 5 },
    ],
    monthly: Array.from({ length: 12 }).map((_, i) => ({
      day: `M${i + 1}`,
      value: 10 + (i % 6) * 4,
    })),
    yearly: Array.from({ length: 5 }).map((_, i) => ({
      day: `${2021 + i}`,
      value: 100 + i * 18,
    })),
  };
  const chartData = analyticsData[analyticsRange] || analyticsData.weekly;

  return (
    <div className="w-full min-h-screen bg-[#F7F9FC] p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Critical Alerts */}
        <section className="bg-white rounded-xl shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Critical Alerts &amp; Reminder
            </h2>
            <button
              onClick={() => setShowAlertModal(true)}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
            >
              + Add Alert
            </button>
          </div>
          <div className="border rounded-lg p-4 sm:p-5">
            <ul className="space-y-3">
              {alerts
                .slice()
                .sort(
                  (a, b) =>
                    severityOrder[a.severity] - severityOrder[b.severity]
                )
                .map((a) => (
                  <li key={a.id} className="flex items-start text-gray-700">
                    <span
                      className={`mt-2 mr-3 inline-block h-2.5 w-2.5 rounded-full ${
                        a.severity === "high"
                          ? "bg-rose-500"
                          : a.severity === "medium"
                          ? "bg-amber-400"
                          : "bg-yellow-300"
                      }`}
                    />
                    <span>{a.message}</span>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* Heading with right-aligned buttons */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Maintenance &amp; Service Requests
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAnalytics(true)}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200"
            >
              Analytics &amp; Reporting
            </button>
            <button
              onClick={() => setShowNewReqModal(true)}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              New Request
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,1fr)_200px_200px_repeat(2,180px)] gap-3">
          <div className="bg-white rounded-lg shadow px-3 py-2 flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-white rounded-lg shadow px-3 py-2 text-sm text-gray-700"
          >
            {STATUS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white rounded-lg shadow px-3 py-2 text-sm text-gray-700"
          >
            {CATEGORY.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-white rounded-lg shadow px-3 py-2 text-sm text-gray-700"
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-white rounded-lg shadow px-3 py-2 text-sm text-gray-700"
          />
        </div>

        {/* Table */}
        <section className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="text-left font-semibold px-6 py-3">ID</th>
                  <th className="text-left font-semibold px-6 py-3">Date</th>
                  <th className="text-left font-semibold px-6 py-3">
                    Category
                  </th>
                  <th className="text-left font-semibold px-6 py-3">Status</th>
                  <th className="text-left font-semibold px-6 py-3">
                    Assigned
                  </th>
                  <th className="text-left font-semibold px-6 py-3">SLA</th>
                  <th className="text-left font-semibold px-6 py-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-6 py-4 text-gray-900">{r.id}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(r.date).toLocaleDateString(undefined, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <span className="inline-flex items-center">
                        {categoryDot(r.category)}
                        {r.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badgeClasses(
                          r.status
                        )}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{r.assigned}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badgeClasses(
                          r.sla === "Overdue" ? "Overdue" : r.status
                        )}`}
                      >
                        {r.sla}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Stars value={r.rating} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Add Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowAlertModal(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Critical Alert
            </h3>
            <input
              value={newAlertMsg}
              onChange={(e) => setNewAlertMsg(e.target.value)}
              placeholder="Describe the alert"
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            <input
              type="date"
              value={newAlertDate}
              onChange={(e) => setNewAlertDate(e.target.value)}
              className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            <select
              value={newAlertSeverity}
              onChange={(e) => setNewAlertSeverity(e.target.value)}
              className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowAlertModal(false)}
                className="px-3 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={addAlert}
                className="px-3 py-2 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Add Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {showAnalytics && <AnalyticsModal onClose={() => setShowAnalytics(false)} />}

      {/* New Request Modal */}
      {showNewReqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowNewReqModal(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              New Maintenance Request
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm text-gray-700">Title</span>
                <input
                  value={nrTitle}
                  onChange={(e) => setNrTitle(e.target.value)}
                  placeholder="Short title"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-700">Date</span>
                <input
                  type="date"
                  value={nrDate}
                  onChange={(e) => setNrDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-700">Category</span>
                <select
                  value={nrCategory}
                  onChange={(e) => setNrCategory(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                >
                  {CATEGORY.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-gray-700">Status</span>
                <select
                  value={nrStatus}
                  onChange={(e) => setNrStatus(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                >
                  {STATUS.filter((s) => s !== "All").map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm text-gray-700">Assign To</span>
                <input
                  value={nrAssignee}
                  onChange={(e) => setNrAssignee(e.target.value)}
                  placeholder="Person or vendor"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm text-gray-700">Notes</span>
                <textarea
                  value={nrNotes}
                  onChange={(e) => setNrNotes(e.target.value)}
                  rows={3}
                  placeholder="Optional details"
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowNewReqModal(false)}
                className="px-3 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={addNewRequest}
                className="px-3 py-2 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Stars component (fixed) ----
function Stars({ value = 0 }) {
  const full = Math.max(0, Math.min(5, Math.floor(value)));
  const empty = 5 - full;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#f59e0b"
          className="h-4 w-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.176 0l-2.802 2.035c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#e5e7eb"
          className="h-4 w-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.176 0l-2.802 2.035c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}
function Modal({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-xl p-6">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        )}
        {children}
      </div>
    </div>
  );
}

/* ---------- Analytics Modal with tabs + bar chart (CSS only) ---------- */
function AnalyticsModal({ onClose }) {
  const [range, setRange] = useState("weekly"); // 'weekly' | 'monthly' | 'yearly'
const data = {
  weekly: [
    { label: "Mon", open: 23, resolved: 12 },
    { label: "Tue", open: 15, resolved: 30 },
    { label: "Wed", open: 10, resolved: 21 },
    { label: "Thu", open: 7, resolved: 18 },
    { label: "Fri", open: 12, resolved: 23 },
    { label: "Sat", open: 5, resolved: 8 },
    { label: "Sun", open: 3, resolved: 5 },
  ],
  monthly: Array.from({ length: 12 }).map((_, i) => ({
    label: `M${i + 1}`,
    open: 10 + (i % 5) * 4,
    resolved: 12 + ((i + 2) % 6) * 3,
  })),
  yearly: Array.from({ length: 5 }).map((_, i) => ({
    label: `${2021 + i}`,
    open: 100 + i * 20,
    resolved: 120 + i * 18,
  })),
};


  const rows = data[range];
  const max = Math.max(...rows.flatMap((r) => [r.open, r.resolved])) || 1;

  return (
    <Modal onClose={onClose} title="Analytics & Reporting">
      {/* Range Toggle */}
      <div className="flex items-center gap-2 mb-4">
        {["weekly", "monthly", "yearly"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1.5 rounded-full text-sm border ${
              range === r
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            {r[0].toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <KPI
          title="Open requests"
          value={rows.reduce((a, b) => a + b.open, 0)}
          hint="Needs attention"
          tone="rose"
        />
        <KPI
          title="In Progress"
          value={rows.reduce((a, b) => a + Math.round(b.open * 0.4), 0)}
          hint="Being worked on"
          tone="amber"
        />
        <KPI
          title="Resolved this period"
          value={rows.reduce((a, b) => a + b.resolved, 0)}
          hint="Great job team"
          tone="emerald"
        />
      </div>

      {/* Bar “chart” (CSS only) */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-800">Avg Resolution Time</div>
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3">
            <div className="w-10 shrink-0 text-xs text-gray-600">{r.label}</div>
            <div className="flex-1">
              <div className="h-2 rounded-full bg-gray-100 mb-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${(r.open / max) * 100}%`,
                    background: "#fb923c",
                  }}
                />
              </div>
              <div className="h-2 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${(r.resolved / max) * 100}%`,
                    background: "#60a5fa",
                  }}
                />
              </div>
            </div>
            <div className="w-12 text-right text-xs text-gray-600">{r.resolved}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-3 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

function KPI({ title, value, hint, tone = "rose" }) {
  const bg = { rose: "bg-rose-100", amber: "bg-amber-100", emerald: "bg-emerald-100" }[tone] || "bg-gray-100";
  return (
    <div className={`rounded-xl ${bg} p-4`}>
      <div className="text-gray-800 font-medium">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      <div className="text-xs text-gray-600 mt-1">{hint}</div>
    </div>
  );
}