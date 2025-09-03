// Pending.jsx (drop-in, prop-based)
import React from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
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
  rows = [], // [{guest, room, rent, due, date, overdue, phone, email}]
}) {
  const Pill = ({ children }) => (
    <span className="inline-block rounded-xl bg-[#E9F2FF] px-4 py-2 text-[#0B63F6] font-semibold">
      {children}
    </span>
  );
  const Legend = ({ items }) => (
    <ul className="space-y-3">
      {items.map(i => (
        <li key={i.name} className="flex items-center gap-3 text-slate-700">
          <span className="inline-block size-3 rounded-full" style={{ background: i.color }} />
          <span>{i.name} - {i.value}%</span>
        </li>
      ))}
    </ul>
  );
  const rupee = n => n?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen w-full bg-[#F7F9FC] px-6 pb-10 pt-6 lg:px-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Pending Dues</h1>
        <button onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50">
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          Back
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6"><Pill>Pending By Days</Pill></div>
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
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6"><Pill>Pending Dues By Room Category</Pill></div>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <Legend items={byRoom} />
            <div className="h-48 md:h-56">
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
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6"><Pill>Monthly Trend Analysis</Pill></div>
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
        </div>
      </div>

      <div className="mt-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Defaulter List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="px-4 py-3 font-semibold">Guest Name</th>
                <th className="px-4 py-3 font-semibold">Room/Bed</th>
                <th className="px-4 py-3 font-semibold">Rent Amount</th>
                <th className="px-4 py-3 font-semibold">Pending Amount</th>
                <th className="px-4 py-3 font-semibold">Due Date</th>
                <th className="px-4 py-3 font-semibold">Days Overdue</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
              </tr>
            </thead>
            <tbody>
              {(rows.length ? rows : [{
                guest:"Arrora gaur", room:"101-A", rent:8000, due:8000,
                date:"12 July, 2025", overdue:"12 Days", phone:"+910000000000", email:"guest@example.com"
              }]).map((r, i) => (
                <tr key={r.guest + i} className="border-t border-slate-100 text-slate-700 hover:bg-slate-50/60">
                  <td className="px-4 py-4">{r.guest}</td>
                  <td className="px-4 py-4">{r.room}</td>
                  <td className="px-4 py-4">{rupee(r.rent)}</td>
                  <td className="px-4 py-4">{rupee(r.due)}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" className="text-[#0B63F6]">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v13a3 3 0 003 3h12a3 3 0 003-3V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5z"
                              fill="currentColor"/>
                      </svg>
                      {r.date}
                    </span>
                  </td>
                  <td className="px-4 py-4">{r.overdue}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <a className="rounded-full p-2 ring-1 ring-slate-200 hover:bg-slate-100" href="#" title="Profile">
                        <svg width="16" height="16" viewBox="0 0 24 24">
                          <path d="M12 12a5 5 0 10-5-5 5 5 0 005 5zm0 2c-4.33 0-8 2.17-8 5v1h16v-1c0-2.83-3.67-5-8-5z" fill="currentColor"/>
                        </svg>
                      </a>
                      <a className="rounded-full p-2 ring-1 ring-slate-200 hover:bg-slate-100"
                         href={r.phone ? `tel:${r.phone}` : "#"} title="Call">
                        <svg width="16" height="16" viewBox="0 0 24 24">
                          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.25 1.01z"
                                fill="currentColor"/>
                        </svg>
                      </a>
                      <a className="rounded-full p-2 ring-1 ring-slate-200 hover:bg-slate-100"
                         href={r.email ? `mailto:${r.email}` : "#"} title="Mail">
                        <svg width="16" height="16" viewBox="0 0 24 24">
                          <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5z"
                                fill="currentColor"/>
                        </svg>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
