import React, { useState } from "react";
import { ArrowLeft, Maximize2, X } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function OccupancyPage() {
  const navigate = useNavigate();
  const [showFullTable, setShowFullTable] = useState(false);

  // Data
  const occupancyByDuration = [
    { month: "April", value: 55 },
    { month: "May", value: 60 },
    { month: "June", value: 75 },
    { month: "July", value: 65 },
    { month: "Aug", value: 72 },
    { month: "Sep", value: 80 },
  ];

  const categoryData = [
    { name: "Single", value: 50, color: "#3b82f6" },
    { name: "Double sharing", value: 20, color: "#f59e0b" },
    { name: "Triple sharing", value: 10, color: "#ef4444" },
  ];

  const tableData = [
    {
      roomId: "101",
      bedId: "A",
      status: "Occupied",
      guest: "Rohan Gupta",
      checkIn: "01 July, 2025",
      checkOut: "20 Sep, 2025",
      rent: "₹ 8,000",
    },
    {
      roomId: "101",
      bedId: "B",
      status: "Vacant",
      guest: "-",
      checkIn: "-",
      checkOut: "-",
      rent: "₹ 8,000",
    },
    {
      roomId: "102",
      bedId: "A",
      status: "Reserved",
      guest: "Sharath Kumar",
      checkIn: "01 Aug, 2025",
      checkOut: "-",
      rent: "₹ 8,000",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-7 md:mt-0">
      {/* Header with Back */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Occupancy</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* Top Occupancy Card (centered) */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-6 w-full md:w-2/3">
          <div className="relative w-28 h-28">
            <svg className="absolute inset-0" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-500"
                strokeWidth="4"
                strokeDasharray="56, 100"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="flex items-center justify-center h-full">
              <span className="text-lg font-bold">30/53</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">30 of 53 beds occupied</p>
            <p className="text-3xl font-bold text-gray-800">56%</p>
            <p className="text-green-600 text-sm">5% since last month</p>
          </div>
        </div>
      </div>

      {/* Middle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Forecast */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
            Occupancy by Forecast
          </span>
          <p className="mt-4 text-lg text-gray-700">
            Next month projected Occupancy:
          </p>
          <p className="text-4xl font-bold text-gray-900">90%</p>
          <p className="text-gray-500 text-sm">48 out of 53 beds booked</p>
        </div>

        {/* Duration (Attractive Area Chart) */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <span className="px-3 py-1 text-sm  rounded-full bg-gray-100 text-gray-700">
            Occupancy by Duration
          </span>
          <div className="mt-4">
          <ResponsiveContainer width="100%" height={150} >
            <AreaChart data={occupancyByDuration} margin={{ left: -20, right: 10, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorBlue)"
              />
            </AreaChart>
          </ResponsiveContainer>
          </div>
        </div>

        {/* Category (Donut) */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
            Occupancy by Category
          </span>
          <div className="flex items-center justify-between mt-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  innerRadius={35} // 🔑 makes it donut
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 text-sm">
              {categoryData.map((cat, idx) => (
                <p key={idx} className="flex items-center gap-2 text-gray-700">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  ></span>
                  {cat.name} - {cat.value}%
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table with Fullscreen option */}
      <div className="bg-white rounded-2xl shadow-md p-6 relative">
        <div className="flex justify-between items-center">
          <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
            Occupancy by Bed/Room
          </span>
          <button
            onClick={() => setShowFullTable(true)}
            className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
          >
            <Maximize2 size={16} /> Full Screen
          </button>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-600">
                <th className="p-3 text-left">Room ID</th>
                <th className="p-3 text-left">Bed ID</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Guest Name</th>
                <th className="p-3 text-left">Check-in Date</th>
                <th className="p-3 text-left">Check-out Date</th>
                <th className="p-3 text-left">Rent</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className="border-b last:border-none text-sm">
                  <td className="p-3">{row.roomId}</td>
                  <td className="p-3">{row.bedId}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === "Occupied"
                          ? "bg-green-100 text-green-600"
                          : row.status === "Vacant"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3">{row.guest}</td>
                  <td className="p-3">{row.checkIn}</td>
                  <td className="p-3">{row.checkOut}</td>
                  <td className="p-3">{row.rent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fullscreen Modal for Table */}
      {showFullTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 h-5/6 overflow-auto relative">
            <button
              onClick={() => setShowFullTable(false)}
              className="fixed top-4 right-4 bg-white text-black p-2 rounded-full shadow z-50"
            >
              <X size={20}  />
            </button>
            

        
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Occupancy by Bed/Room (Full Screen)
            </h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-sm text-gray-600">
                  <th className="p-3 text-left">Room ID</th>
                  <th className="p-3 text-left">Bed ID</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Guest Name</th>
                  <th className="p-3 text-left">Check-in Date</th>
                  <th className="p-3 text-left">Check-out Date</th>
                  <th className="p-3 text-left">Rent</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, i) => (
                  <tr key={i} className="border-b last:border-none text-sm">
                    <td className="p-3">{row.roomId}</td>
                    <td className="p-3">{row.bedId}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === "Occupied"
                            ? "bg-green-100 text-green-600"
                            : row.status === "Vacant"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3">{row.guest}</td>
                    <td className="p-3">{row.checkIn}</td>
                    <td className="p-3">{row.checkOut}</td>
                    <td className="p-3">{row.rent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
