import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function OccupancyDashboard() {
  const totalBeds = 53;
  const occupiedBeds = 44;
  const occupancyPercent = Math.round((occupiedBeds / totalBeds) * 100);

  const forecast = {
    percent: 82,
    booked: 44,
    total: 53,
    changePercent: 10,
  };

  const roomsData = [
    { name: "Single Sharing", value: 50, color: "#4F6BE3" },
    { name: "Double sharing", value: 30, color: "#FFD66B" },
    { name: "Triple sharing", value: 20, color: "#FF6F61" },
  ];

  const [selectedDuration, setSelectedDuration] = useState("monthly");

  const dataSets = {
    monthly: [
      { week: "Week 1", value: 12 },
      { week: "Week 2", value: 34 },
      { week: "Week 3", value: 26 },
      { week: "Week 4", value: 27 },
    ],
    quarterly: [
      { month: "Jan", value: 15 },
      { month: "Feb", value: 30 },
      { month: "Mar", value: 25 },
      { month: "Apr", value: 40 },
      { month: "May", value: 50 },
      { month: "Jun", value: 60 },
    ],
    yearly: [
      { month: "Jan", value: 10 },
      { month: "Feb", value: 20 },
      { month: "Mar", value: 30 },
      { month: "Apr", value: 40 },
      { month: "May", value: 50 },
      { month: "Jun", value: 60 },
      { month: "Jul", value: 55 },
      { month: "Aug", value: 65 },
      { month: "Sep", value: 70 },
      { month: "Oct", value: 75 },
      { month: "Nov", value: 80 },
      { month: "Dec", value: 90 },
    ],
  };

  const occupancyTableData = [
    {
      roomId: 101,
      bedId: "A",
      status: "Occupied",
      guest: "Rohan Gupta",
      in: "01 Jul, 2025",
      out: "20 Sep, 2025",
      rent: "₹ 8,000",
    },
    {
      roomId: 101,
      bedId: "B",
      status: "Vacant",
      guest: "-",
      in: "-",
      out: "-",
      rent: "₹ 8,000",
    },
    {
      roomId: 101,
      bedId: "A",
      status: "Occupied",
      guest: "Rohan Gupta",
      in: "01 Jul, 2025",
      out: "20 Sep, 2025",
      rent: "₹ 8,000",
    },
    {
      roomId: 101,
      bedId: "A",
      status: "Occupied",
      guest: "Rohan Gupta",
      in: "01 Jul, 2025",
      out: "20 Sep, 2025",
      rent: "₹ 8,000",
    },
    {
      roomId: 101,
      bedId: "A",
      status: "Occupied",
      guest: "Rohan Gupta",
      in: "01 Jul, 2025",
      out: "20 Sep, 2025",
      rent: "₹ 8,000",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 p-3 rounded shadow-md text-gray-700">
          <p className="font-semibold mb-1">{label}</p>
          <p className="text-purple-400">Value: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  // Reusable Donut Card
  const DonutCard = ({ title, pieData, children }) => (
    <div
      className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-6 hover:shadow-xl transition-shadow duration-300"
      style={{ minHeight: 130 }}
    >
      <div style={{ width: 120, height: 120 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={55}
              paddingAngle={4}
              stroke="none"
            >
              {pieData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col flex-grow justify-center">
        <h3 className="font-semibold mb-2 text-lg">{title}</h3>
        {children}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1
        className="font-extrabold text-black"
        style={{ fontSize: "clamp(1rem, 2.6vw, 1.6rem)" }}
      >
        Occupancy
      </h1>

      {/* Donut Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DonutCard
          title="Current Occupancy"
          pieData={[
            { name: "Occupied", value: occupancyPercent, color: "#4057BD" },
            { name: "Vacant", value: 100 - occupancyPercent, color: "#FFC107" },
          ]}
        >
          <p className="text-3xl font-bold">{occupancyPercent}%</p>
          <p className="text-gray-600 mt-1">
            {occupiedBeds} of {totalBeds} beds occupied
          </p>
        </DonutCard>

        <DonutCard
          title="Next Month Forecast"
          pieData={[
            { name: "Booked", value: forecast.percent, color: "#4057BD" },
            { name: "Available", value: 100 - forecast.percent, color: "#FFC107" },
          ]}
        >
          <p className="text-3xl font-bold text-purple-700">
            {forecast.percent}%
          </p>
          <p className="text-gray-600 mt-1">
            {forecast.booked} out of {forecast.total} beds booked
          </p>
          <div
            className={`mt-2 flex items-center gap-2 ${
              forecast.changePercent >= 0 ? "text-green-600" : "text-red-600"
            } font-semibold`}
          >
            {forecast.changePercent >= 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
            <span>{Math.abs(forecast.changePercent)}% vs last month</span>
          </div>
        </DonutCard>

        <DonutCard title="Category Occupancy" pieData={roomsData}>
          <div className="flex flex-col space-y-1">
            {roomsData.map(({ name, value, color }, i) => (
              <div key={i} className="flex items-center space-x-3">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="font-medium text-gray-700">
                  {name} - {value}%
                </span>
              </div>
            ))}
          </div>
        </DonutCard>
      </div>

      {/* Occupancy by Duration */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
          <h3
            className="font-semibold flex items-center gap-2 text-lg"
            style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
          >
            Occupancy by Duration
          </h3>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:space-x-4 sm:gap-0">
            {[
              { label: "Monthly", value: "monthly" },
              { label: "Quarterly", value: "quarterly" },
              { label: "Yearly", value: "yearly" },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setSelectedDuration(value)}
                className={`px-4 py-1 rounded-md font-semibold text-sm border transition-colors ${
                  selectedDuration === value
                    ? "bg-[#1449BE] text-white border-[#1449BE]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div
          style={{ width: "100%", height: 250, transform: "translateX(-30px)" }}
          className="flex justify-end"
        >
          <ResponsiveContainer>
            <LineChart data={dataSets[selectedDuration]}>
              <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
              <XAxis
                dataKey={selectedDuration === "monthly" ? "week" : "month"}
                stroke="#6b7280"
                style={{ fontSize: 12, fontWeight: 500 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: 12, fontWeight: 500 }}
                domain={[0, 80]}
                tickCount={9}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4057BD"
                strokeWidth={3}
                dot={{
                  r: 6,
                  stroke: "#4057BD",
                  strokeWidth: 2,
                  fill: "white",
                }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Table with mobile slider */}
        <div className="mt-8 rounded-lg">
          <div className="overflow-x-auto sm:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            <table className="w-full text-sm text-left text-gray-700 min-w-[600px]">
              <thead className="text-xs text-white uppercase bg-[#0041BA] border border-gray-200">
                <tr>
                  <th className="py-3 px-4">Room</th>
                  <th className="py-3 px-4">Bed</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">In</th>
                  <th className="py-3 px-4">Out</th>
                  <th className="py-3 px-4">Rent</th>
                </tr>
              </thead>
              <tbody>
                {occupancyTableData.map(
                  ({ roomId, bedId, status, guest, in: checkIn, out, rent }, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-purple-50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium">{roomId}</td>
                      <td className="py-3 px-4">{bedId}</td>
                      <td
                        className={`py-3 px-4 font-semibold ${
                          status === "Occupied"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {status}
                      </td>
                      <td className="py-3 px-4">{guest}</td>
                      <td className="py-3 px-4">{checkIn}</td>
                      <td className="py-3 px-4">{out}</td>
                      <td className="py-3 px-4">{rent}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
