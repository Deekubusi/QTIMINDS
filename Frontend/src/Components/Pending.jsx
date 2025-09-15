// Pending.jsx
import { ArrowLeft, ChevronsDown, ChevronsUp } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from "recharts";

export default function Pending({
  byDays = [
    { name: "< 15 Days", value: 55, color: "#FACC15" },
    { name: "15-30 Days", value: 25, color: "#F472B6" },
    { name: "> 30 Days", value: 20, color: "#60A5FA" },
  ],
  byRoom = [
    { name: "Triple Sharing", value: 55, color: "#4F80FF" },
    { name: "Double Sharing", value: 25, color: "#FACC15" },
    { name: "Single Sharing", value: 20, color: "#FF8A65" },
  ],
  trend = [
    { m: "JAN", v: 20 }, { m: "FEB", v: 32 }, { m: "MAR", v: 45 },
    { m: "APR", v: 78 }, { m: "MAY", v: 60 }, { m: "JUN", v: 35 }, { m: "JUL", v: 48 },
  ],
  rows = [],
}) {
  const [expanded, setExpanded] = useState(false);

  const Card = ({ children, className = "" }) => (
    <div
      className={`bg-white rounded-2xl p-6 shadow-[8px_8px_8px_0px_rgba(0,0,0,0.25)] border-[0.7px] border-gray-200 hover:border-[#FF8F6B] transition-colors ${className}`}
    >
      {children}
    </div>
  );

  const CardTitle = ({ children }) => (
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-sky-600 opacity-10 rounded-[10px]" />
      <h2 className="relative text-lg font-semibold text-gray-800 px-3 py-1">{children}</h2>
    </div>
  );

  const CardHeaderSmall = ({ children }) => <div className="mb-6">{children}</div>;

  const Pill = ({ children }) => (
    <span className="inline-block rounded-xl bg-[#E9F2FF] px-4 py-2 text-[#0B63F6] font-semibold">
      {children}
    </span>
  );

  const LegendCompact = ({ items }) => (
    <ul className="space-y-3">
      {items.map(i => (
        <li key={i.name} className="flex items-center gap-3 text-slate-700 whitespace-nowrap">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: i.color }} />
          <span className="text-sm">{i.name} - {i.value}%</span>
        </li>
      ))}
    </ul>
  );

  const Legend = ({ items }) => (
    <ul className="space-y-3">
      {items.map(i => (
        <li key={i.name} className="flex items-center gap-3 text-slate-700">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: i.color }} />
          <span className="text-sm">{i.name} - {i.value}%</span>
        </li>
      ))}
    </ul>
  );

  const rupee = n => n?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

  const defaultDefaulters = [
    {
      guest: "Arrora Gaur",
      room: "101-A",
      rent: 8000,
      due: 8000,
      date: "12 July, 2025",
      overdue: "12 Days",
      phone: "+910000000001",
      email: "arora@example.com",
    },
    {
      guest: "Priya Sharma",
      room: "102-B",
      rent: 7500,
      due: 7500,
      date: "05 July, 2025",
      overdue: "20 Days",
      phone: "+910000000002",
      email: "priya@example.com",
    },
    {
      guest: "Rahul Verma",
      room: "103-A",
      rent: 9000,
      due: 4500,
      date: "01 Aug, 2025",
      overdue: "8 Days",
      phone: "+910000000003",
      email: "rahul@example.com",
    },
    {
      guest: "Sneha Reddy",
      room: "104-C",
      rent: 8500,
      due: 8500,
      date: "20 June, 2025",
      overdue: "28 Days",
      phone: "+910000000004",
      email: "sneha@example.com",
    },
    {
      guest: "Karthik Dixith",
      room: "105-B",
      rent: 8000,
      due: 4000,
      date: "28 July, 2025",
      overdue: "6 Days",
      phone: "+910000000005",
      email: "karthik@example.com",
    },
  ];

  const inRows = rows.length ? rows : defaultDefaulters;
  const visibleRows = expanded ? inRows : inRows.slice(0, 2);
  const remaining = Math.max(inRows.length - 2, 0);

  return (
    <div className="min-h-screen bg-[#E7EFF7] p-6 lg:p-10">
      {/* header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Pending Dues</h1>
        <button onClick={() => window.history.back()}
          className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* top cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeaderSmall>
            <CardTitle>Pending By Days</CardTitle>
          </CardHeaderSmall>

          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <div className="h-48 md:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byDays} dataKey="value" innerRadius="60%" outerRadius="85%"
                       strokeWidth={0} startAngle={90} endAngle={-270}>
                    {byDays.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Legend items={byDays} />
          </div>
        </Card>

        <Card>
          <CardHeaderSmall>
            <CardTitle>Pending Dues By Room Category</CardTitle>
          </CardHeaderSmall>

          {/* Adjust layout so legend stays single-line: legend left (fixed width), pie right */}
          <div className="flex items-center gap-6">
            <div className="max-w-[240px] flex-shrink-0">
              {/* Force no-wrap on legend items so they remain single-line */}
              <LegendCompact items={byRoom} />
            </div>
            <div className="flex-1 h-48 md:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byRoom} dataKey="value" innerRadius="60%" outerRadius="85%"
                       strokeWidth={0} startAngle={90} endAngle={-270}>
                    {byRoom.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeaderSmall>
            <CardTitle>Monthly Trend Analysis</CardTitle>
          </CardHeaderSmall>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ left: -20, right: 10, top: 10 }}>
                <CartesianGrid vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="m" tickLine={false} axisLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }}/>
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }}/>
                <Tooltip cursor={{ strokeDasharray: "3 3" }}
                         contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", boxShadow: "0 10px 20px rgba(0,0,0,0.06)" }}/>
                <Line type="monotone" dataKey="v" stroke="#FF5A67" strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2, fill: "#FF5A67" }} activeDot={{ r: 6 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Defaulter list card (no hover effect) */}
      <div className="mt-10">
        <div className="relative bg-white rounded-[20px] p-6 border-[0.7px] border-gray-200 shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Defaulter List</h2>
          </div>

          {/* table wrapper */}
          <div className="overflow-x-auto">
            <div className="overflow-hidden rounded-[20px] shadow-[0_10px_20px_rgba(0,0,0,0.04)]">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-blue-600 text-white text-left px-6 py-3">Guest Name</th>
                    <th className="bg-blue-600 text-white text-left px-6 py-3">Room/Bed</th>
                    <th className="bg-blue-600 text-white text-left px-6 py-3">Rent Amount</th>
                    <th className="bg-blue-600 text-white text-left px-6 py-3">Pending Amount</th>
                    <th className="bg-blue-600 text-white text-left px-6 py-3">Due Date</th>
                    <th className="bg-blue-600 text-white text-left px-6 py-3">Days Overdue</th>
                    <th className="bg-blue-600 text-white text-left px-6 py-3">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((r, i) => (
                    <tr key={r.guest + i} className="border-t border-slate-100 text-slate-700 hover:bg-slate-50/60">
                      <td className="px-6 py-4">{r.guest}</td>
                      <td className="px-6 py-4">{r.room}</td>
                      <td className="px-6 py-4">{rupee(r.rent)}</td>
                      <td className="px-6 py-4">{rupee(r.due)}</td>
                      <td className="px-6 py-4">{r.date}</td>
                      <td className="px-6 py-4">{r.overdue}</td>
                      <td className="px-6 py-4">{r.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* view more / less button positioned bottom-left (slightly left of table) */}
          {inRows.length > 2 && (
            <div className="absolute left-6 bottom-4">
              <button
                onClick={() => setExpanded(v => !v)}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                {expanded ? (
                  <>
                    View less
                    <ChevronsUp className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                ) : (
                  <>
                    View more ({remaining})
                    <ChevronsDown className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
