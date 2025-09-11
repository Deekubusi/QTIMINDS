// Upcoming.jsx (or CheckInOutSection.jsx)


import { useMemo, useState } from "react";
import {
    CalendarDaysIcon,
  UserCircleIcon,
  HomeModernIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  PlusIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";

/* ---------- Seed Data ---------- */
const IN_SEED = [
  ["Rohan Gupta","101-A","2 Aug 2025","✅ Paid","Prefers AC room"],
  ["Sneha Reddy","201-A","23 Aug 2025","⚠ Partial","Prefers Non-AC room"],
  ["Sree","106-B","2 Aug 2025","❌ Due","IIT-H Student"],
  ["Ria Shetty","203-B","25 Aug 2025","⚠ Partial","Employee"],
  ["Aman Verma","305-A","28 Aug 2025","✅ Paid","Night shift"],
  ["Niharika","402-B","29 Aug 2025","❌ Due","Allergic to dust"],
  ["Vikram","110-A","30 Aug 2025","⚠ Partial","Veg meals"],
  ["Meera","212-C","31 Aug 2025","✅ Paid","Near lift"],
];

const OUT_SEED = [
  ["Arjun Mehta","101-A","4 Aug 2025","₹2,000","✅"],
  ["Priya Singh","201-A","24 Aug 2025","₹0","⚠"],
  ["Sreemayi","106-B","3 Aug 2025","₹1,000","❌"],
  ["Keerthi Naidu","203-B","27 Aug 2025","₹1,000","✅"],
  ["Naveen","305-B","28 Aug 2025","₹0","✅"],
  ["Rashmi","402-A","29 Aug 2025","₹500","⚠"],
  ["Harsha","110-C","30 Aug 2025","₹0","✅"],
  ["Anita","212-A","31 Aug 2025","₹750","❌"],
];

/* ---------- Helpers ---------- */
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const ddmmyyyy = (txt) => {
  const [d, mon, y] = txt.split(" ");
  const day = String(parseInt(d, 10)).padStart(2, "0");
  const m = String(months.indexOf(mon) + 1).padStart(2, "0");
  return `${day}/${m}/${y}`;
};

const toDisplayDate = (iso) => {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
};

const HeaderCell = ({ icon: Icon, text, withIcon = true }) => (
  <th className="px-4 font-extrabold">
    <div className="flex items-center gap-2 text-[#0A1E4A]">
      {withIcon ? <Icon className="h-5 w-5 text-[#0041BA]" /> : null}
      <span className="uppercase text-xs tracking-wide">{text}</span>
    </div>
  </th>
);

const DateChip = ({ value }) => (
  <div className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 ring-1 ring-[#0041BA]/20 bg-[#0041BA]/10">
    <CalendarDaysIcon className="h-4 w-4 text-[#0041BA]" />
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

const PayBadge = ({ value }) => {
  const paid = value.includes("Paid");
  const partial = value.includes("Partial");
  const Icon = paid ? CheckCircleIcon : partial ? ExclamationTriangleIcon : XCircleIcon;
  const pill =
    paid
      ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
      : partial
      ? "bg-amber-50 text-amber-800 ring-amber-200"
      : "bg-rose-50 text-rose-800 ring-rose-200";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${pill}`}>
      <Icon className="h-4 w-4" />
      {value.replace(/[✅⚠❌]/g,"").trim()}
    </span>
  );
};

const FeedbackBadge = ({ mark }) => {
  const Icon = mark === "✅" ? CheckCircleIcon : mark === "⚠" ? ExclamationTriangleIcon : XCircleIcon;
  const pill =
    mark === "✅"
      ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
      : mark === "⚠"
      ? "bg-amber-50 text-amber-800 ring-amber-200"
      : "bg-rose-50 text-rose-800 ring-rose-200";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${pill}`}>
      <Icon className="h-4 w-4" />
      {mark}
    </span>
  );
};

/* ---------- Main ---------- */
export default function Upcoming() {
  const [inRows] = useState(IN_SEED);
  const [outRows] = useState(OUT_SEED);
  const [showAllIn, setShowAllIn] = useState(false);
  const [showAllOut, setShowAllOut] = useState(false);
  const [expandedIn, setExpandedIn] = useState({});
  const [expandedOut, setExpandedOut] = useState({});

  const headerGradient = useMemo(() => "bg-gradient-to-r from-[#0041BA] to-[#00308F]", []);

  return (
    <section className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CHECK-IN CARD */}
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm border-[#0041BA]/25">
          <div className={`flex items-center justify-between px-5 py-3 text-white ${headerGradient}`}>
            <div className="flex items-center gap-2 font-semibold">
              <CalendarDaysIcon className="h-5 w-5" />
              <span>Upcoming Check-Ins</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-[#0041BA]/10">
                <tr className="h-14">
                  <HeaderCell icon={UserCircleIcon} text="Guest" />
                  <HeaderCell icon={HomeModernIcon} text="Room/Bed" />
                  <HeaderCell icon={CalendarDaysIcon} text="Date" />
                  <HeaderCell text="Payment" withIcon={false} />
                  <HeaderCell icon={DocumentTextIcon} text="Notes" />
                  <th className="px-4" />
                </tr>
              </thead>

              <tbody className="text-sm">
                {(showAllIn ? inRows : inRows.slice(0, 4)).map((row, i) => {
                  const expanded = !!expandedIn[i];
                  return (
                    <>
                      <tr
                        key={`in-${i}`}
                        className="border-b last:border-0 odd:bg-white even:bg-[#0041BA]/5 hover:bg-[#0041BA]/10 transition-colors"
                      >
                        <td className="px-4 py-4 font-medium text-gray-900">{row[0]}</td>
                        <td className="px-4 py-4 text-gray-800">{row[1]}</td>
                        <td className="px-4 py-4"><DateChip value={ddmmyyyy(row[2])} /></td>
                        <td className="px-4 py-4"><PayBadge value={row[3]} /></td>
                        <td className="px-4 py-4 text-gray-700">{row[4]}</td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => setExpandedIn((s) => ({ ...s, [i]: !s[i] }))}
                            className="inline-flex items-center gap-1 text-[#0041BA] font-medium"
                          >
                            {expanded ? "View less" : "View more"}
                            {expanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                          </button>
                        </td>
                      </tr>
                      {expanded && (
                        <tr className="bg-[#0041BA]/5">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="rounded-xl bg-white ring-1 ring-[#0041BA]/20 p-4 shadow-sm">
                              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div><div className="text-xs text-gray-500">Guest</div><div className="font-semibold">{row[0]}</div></div>
                                <div><div className="text-xs text-gray-500">Room</div><div className="font-semibold">{row[1]}</div></div>
                                <div><div className="text-xs text-gray-500">Date</div><div className="font-semibold">{ddmmyyyy(row[2])}</div></div>
                                <div><div className="text-xs text-gray-500">Payment</div><PayBadge value={row[3]} /></div>
                                <div className="sm:col-span-4"><div className="text-xs text-gray-500">Notes</div><div>{row[4]}</div></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 flex items-center justify-end">
            <button className="text-[#0041BA] font-medium hover:underline" onClick={() => setShowAllIn(v => !v)}>
              {showAllIn ? "Show top 4 ↑" : `Show all (${inRows.length}) →`}
            </button>
          </div>
        </div>

        {/* CHECK-OUT CARD */}
        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm border-[#0041BA]/25">
          <div className={`flex items-center justify-between px-5 py-3 text-white ${headerGradient}`}>
            <div className="flex items-center gap-2 font-semibold">
              <CalendarDaysIcon className="h-5 w-5" />
              <span>Upcoming Check-Outs</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-[#0041BA]/10">
                <tr className="h-14">
                  <HeaderCell icon={UserCircleIcon} text="Guest" />
                  <HeaderCell icon={HomeModernIcon} text="Room/Bed" />
                  <HeaderCell icon={CalendarDaysIcon} text="Date" />
                  <HeaderCell text="Due" withIcon={false} />
                  <HeaderCell icon={ChatBubbleLeftRightIcon} text="Feedback" />
                  <th className="px-4" />
                </tr>
              </thead>

              <tbody className="text-sm">
                {(showAllOut ? outRows : outRows.slice(0, 4)).map((row, i) => {
                  const expanded = !!expandedOut[i];
                  return (
                    <>
                      <tr key={`out-${i}`} className="border-b last:border-0 odd:bg-white even:bg-[#0041BA]/5 hover:bg-[#0041BA]/10 transition-colors">
                        <td className="px-4 py-4 font-medium text-gray-900">{row[0]}</td>
                        <td className="px-4 py-4 text-gray-800">{row[1]}</td>
                        <td className="px-4 py-4"><DateChip value={ddmmyyyy(row[2])} /></td>
                        <td className="px-4 py-4 font-semibold">{row[3]}</td>
                        <td className="px-4 py-4 font-semibold"><FeedbackBadge mark={row[4]} /></td>
                        <td className="px-4 py-4 text-right">
                          <button
                            onClick={() => setExpandedOut((s) => ({ ...s, [i]: !s[i] }))}
                            className="inline-flex items-center gap-1 text-[#0041BA] font-medium"
                          >
                            {expanded ? "View less" : "View more"}
                            {expanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                          </button>
                        </td>
                      </tr>
                      {expanded && (
                        <tr className="bg-[#0041BA]/5">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="rounded-xl bg-white ring-1 ring-[#0041BA]/20 p-4 shadow-sm">
                              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div><div className="text-xs text-gray-500">Guest</div><div className="font-semibold">{row[0]}</div></div>
                                <div><div className="text-xs text-gray-500">Room</div><div className="font-semibold">{row[1]}</div></div>
                                <div><div className="text-xs text-gray-500">Date</div><div className="font-semibold">{ddmmyyyy(row[2])}</div></div>
                                <div><div className="text-xs text-gray-500">Due</div><div className="font-semibold">{row[3]}</div></div>
                                <div className="sm:col-span-4"><div className="text-xs text-gray-500">Feedback</div><FeedbackBadge mark={row[4]} /></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 flex items-center justify-end">
            <button className="text-[#0041BA] font-medium hover:underline" onClick={() => setShowAllOut(v => !v)}>
              {showAllOut ? "Show top 4 ↑" : `Show all (${outRows.length}) →`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
