// import React, { useEffect, useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
// } from "recharts";

// export default function Profitibility() {
//   // Data for Rooms Sharing Pie
//   const roomsData = [
//     { name: "Single Sharing", value: 60, color: "#4f8ef7" }, // Blue
//     { name: "Double Sharing", value: 45, color: "#f3cb5a" }, // Yellow
//     { name: "Triple Sharing", value: 30, color: "#f8957b" }, // Orange
//   ];

//   // Data for Expenses Pie
//   const expensesData = [
//     { name: "Maintenance", value: 6, color: "#4f8ef7" }, // Blue
//     { name: "Food", value: 34, color: "#f3cb5a" },       // Yellow
//     { name: "Salaries", value: 42, color: "#f8957b" },   // Orange
//     { name: "Utilities", value: 12, color: "#7aff6c" },  // Green
//     { name: "Other", value: 6, color: "#d8d2cd" },       // Grey
//   ];

// //nextMonthForecast
// const [nextMonthForecast, setNextMonthForecast] = useState("₹3,10,000");
// const [utilityExceededPercent, setUtilityExceededPercent] = useState(20);


//   // Line chart data
//   const lineData = [
//     { month: "Jan", value: 12 },
//     { month: "Feb", value: 34 },
//     { month: "Mar", value: 26 },
//     { month: "Apr", value: 27 },
//     { month: "May", value: 58 },
//     { month: "Jun", value: 48 },
//     { month: "Jul", value: 42 },
//     { month: "Aug", value: 46 },
//     { month: "Sep", value: 65 },
//     { month: "Oct", value: 66 },
//   ];

//   // Recent revenue table data
//   const revenueData = [
//     {
//       month: "March 2025",
//       collected: "₹5,20,000",
//       expected: "₹2,35,000",
//       profitPercent: "54%",
//       netProfit: "$1,46,660",
//     },
//     {
//       month: "April 2025",
//       collected: "₹4,80,000",
//       expected: "₹2,50,000",
//       profitPercent: "48%",
//       netProfit: "$46,660",
//     },
//     {
//       month: "May 2025",
//       collected: "₹5,20,000",
//       expected: "₹2,35,000",
//       profitPercent: "54%",
//       netProfit: "$3,46,676",
//     },
//     {
//       month: "June 2025",
//       collected: "₹5,20,000",
//       expected: "₹2,35,000",
//       profitPercent: "54%",
//       netProfit: "$3,46,981",
//     },
//   ];

//   return (
//     <div className="flex flex-row gap-8 p-8 w-full bg-[#f7f9fc] min-h-screen">
//       {/* Left Side: Line Chart and Table */}
//       <div className="flex flex-col flex-1 space-y-10 bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-xl font-semibold mb-4">Profitability</h1>

//         {/* Line Chart */}
//         <div className="w-full h-64">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={lineData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" tick={{ fill: "#999", fontSize: 12 }} />
//               <YAxis tick={{ fill: "#999", fontSize: 12 }} />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#a58bfb"
//                 strokeWidth={3}
//                 dot={{ stroke: "#4f8ef7", strokeWidth: 2, r: 5 }}
//                 activeDot={{ r: 7 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Recent Monthly Revenue Table */}
//         <div>
//           <h2 className="text-sm font-semibold text-gray-700 mb-2">Recent Monthly Revenue</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm text-left border border-gray-200">
//               <thead className="bg-gray-50 text-gray-500">
//                 <tr>
//                   <th className="py-2 px-3 border-r border-gray-200">Monthly</th>
//                   <th className="py-2 px-3 border-r border-gray-200">Revenue Collected</th>
//                   <th className="py-2 px-3 border-r border-gray-200">Revenue Expected</th>
//                   <th className="py-2 px-3 border-r border-gray-200">Net Profit</th>
//                   <th className="py-2 px-3">Profit %</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {revenueData.map((row, idx) => (
//                   <tr
//                     key={idx}
//                     className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
//                   >
//                     <td className="py-2 px-3 border-r border-gray-200">{row.month}</td>
//                     <td className="py-2 px-3 border-r border-gray-200">{row.collected}</td>
//                     <td className="py-2 px-3 border-r border-gray-200">{row.expected}</td>
//                     <td className="py-2 px-3 border-r border-gray-200 text-cyan-500 font-semibold">{row.profitPercent}</td>
//                     <td className="py-2 px-3">{row.netProfit}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Right Side: Cards */}
//       <div className="flex flex-col gap-8 w-96">
//         {/* Profit Forecast */}
//         <div className="bg-white p-6 rounded-lg shadow-md text-center">
//           <p className="text-sm font-semibold text-gray-500 mb-1">Next month profit forecast:</p>
//           <p className="text-3xl font-extrabold mb-1">{nextMonthForecast}</p>
//           <p className="text-xs text-gray-600">Utility expenses exceeded by {utilityExceededPercent}%</p>
//         </div>

//         {/* Analytics By Rooms Sharing */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <p className="text-sm font-semibold text-gray-500 mb-4">Analytics By Rooms Sharing</p>
//           <div className="flex items-center justify-between">
//             <ResponsiveContainer width={120} height={120}>
//               <PieChart>
//                 <Pie
//                   data={roomsData}
//                   dataKey="value"
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={35}
//                   outerRadius={50}
//                   paddingAngle={4}
//                   stroke="none"
//                 >
//                   {roomsData.map((entry, idx) => (
//                     <Cell key={`room-${idx}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>

//             {/* Legend */}
//             <div className="flex flex-col space-y-2 ml-4 text-sm">
//               {roomsData.map(({ name, value, color }) => (
//                 <div key={name} className="flex items-center space-x-2">
//                   <div
//                     style={{ backgroundColor: color }}
//                     className="w-3.5 h-3.5 rounded-full"
//                   />
//                   <span className="text-gray-700 opacity-70">{name} - {value}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Expenses Breakdown */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <p className="text-sm font-semibold text-gray-500 mb-4">Expenses Breakdown</p>
//           <div className="flex items-center justify-between">
//             <ResponsiveContainer width={120} height={120}>
//               <PieChart>
//                 <Pie
//                   data={expensesData}
//                   dataKey="value"
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={35}
//                   outerRadius={50}
//                   paddingAngle={4}
//                   stroke="none"
//                 >
//                   {expensesData.map((entry, idx) => (
//                     <Cell key={`expense-${idx}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>

//             {/* Legend */}
//             <div className="flex flex-col space-y-2 ml-4 text-sm">
//               {expensesData.map(({ name, value, color }) => (
//                 <div key={name} className="flex items-center space-x-2">
//                   <div
//                     style={{ backgroundColor: color }}
//                     className="w-3.5 h-3.5 rounded-full"
//                   />
//                   <span className="text-gray-700 opacity-70">{name} - {value}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Profitibility() {
  const roomsData = [
    { name: "Single Sharing", value: 60, color: "#4f8ef7" },
    { name: "Double Sharing", value: 45, color: "#f3cb5a" },
    { name: "Triple Sharing", value: 30, color: "#f8957b" },
  ];

  const expensesData = [
    { name: "Maintenance", value: 6, color: "#4f8ef7" },
    { name: "Food", value: 34, color: "#f3cb5a" },
    { name: "Salaries", value: 42, color: "#f8957b" },
    { name: "Utilities", value: 12, color: "#7aff6c" },
    { name: "Other", value: 6, color: "#d8d2cd" },
  ];

  const [nextMonthForecast] = useState("₹3,10,000");
  const [utilityExceededPercent] = useState(20);

  const lineData = [
    { month: "Jan", value: 12 },
    { month: "Feb", value: 34 },
    { month: "Mar", value: 26 },
    { month: "Apr", value: 27 },
    { month: "May", value: 58 },
    { month: "Jun", value: 48 },
    { month: "Jul", value: 42 },
    { month: "Aug", value: 46 },
    { month: "Sep", value: 65 },
    { month: "Oct", value: 66 },
  ];

  const revenueData = [
    {
      month: "March 2025",
      collected: "₹5,20,000",
      expected: "₹2,35,000",
      profitPercent: "54%",
      netProfit: "$1,46,660",
    },
    {
      month: "April 2025",
      collected: "₹4,80,000",
      expected: "₹2,50,000",
      profitPercent: "48%",
      netProfit: "$46,660",
    },
    {
      month: "May 2025",
      collected: "₹5,20,000",
      expected: "₹2,35,000",
      profitPercent: "54%",
      netProfit: "$3,46,676",
    },
    {
      month: "June 2025",
      collected: "₹5,20,000",
      expected: "₹2,35,000",
      profitPercent: "54%",
      netProfit: "$3,46,981",
    },
  ];

// ... (keep your imports and data)


  // same data...

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 w-full bg-[#f7f9fc] min-h-screen max-w-screen-xl mx-auto">
      
      {/* Left Side */}
      <div className="flex flex-col flex-1 space-y-10 bg-white p-6 rounded-lg shadow-md min-w-0">
        <h1 className="text-xl font-semibold mb-4">Profitability</h1>

        {/* Mobile: Donuts stacked vertically */}
        <div className="space-y-6 md:hidden mb-6">
          {/* Rooms Donut */}
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">
              Analytics By Rooms Sharing
            </p>
            <div className="flex items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={roomsData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {roomsData.map((entry, idx) => (
                      <Cell key={`room-mobile-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="ml-4 text-xs flex flex-col justify-center space-y-1 max-w-[100px]">
                {roomsData.map(({ name, color }) => (
                  <div key={name} className="flex items-center space-x-1">
                    <div
                      style={{ backgroundColor: color }}
                      className="w-3.5 h-3.5 rounded-full"
                    />
                    <span className="text-gray-700 opacity-70">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expenses Donut */}
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">
              Expenses Breakdown
            </p>
            <div className="flex items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={expensesData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {expensesData.map((entry, idx) => (
                      <Cell key={`expense-mobile-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="ml-4 text-xs flex flex-col justify-center space-y-1 max-w-[100px]">
                {expensesData.map(({ name, color }) => (
                  <div key={name} className="flex items-center space-x-1">
                    <div
                      style={{ backgroundColor: color }}
                      className="w-3.5 h-3.5 rounded-full"
                    />
                    <span className="text-gray-700 opacity-70">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        
    {/* Line Chart */}
<div className="w-full h-72">
  <h2 className="text-sm font-semibold text-gray-700 mb-3">Monthly Revenue Trend</h2>
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      data={lineData}
      margin={{ top: 5, right: 30, left: -32, bottom: 20 }} 
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" tick={{ fill: "#999", fontSize: 12 }} />
      <YAxis tick={{ fill: "#999", fontSize: 12 }} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#a58bfb"
        strokeWidth={3}
        dot={{ stroke: "#4f8ef7", strokeWidth: 2, r: 5 }}
        activeDot={{ r: 7 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

        {/* Recent Monthly Revenue Table */}
        <div className="overflow-x-auto">
          <h2 className="text-sm font-semibold text-gray-700 mb-2 ml-1">
            Recent Monthly Revenue
          </h2>
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="py-2 px-3 border-r border-gray-200">Monthly</th>
                <th className="py-2 px-3 border-r border-gray-200">
                  Revenue Collected
                </th>
                <th className="py-2 px-3 border-r border-gray-200">
                  Revenue Expected
                </th>
                <th className="py-2 px-3 border-r border-gray-200">Net Profit</th>
                <th className="py-2 px-3">Profit %</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((row, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-2 px-3 border-r border-gray-200">{row.month}</td>
                  <td className="py-2 px-3 border-r border-gray-200">{row.collected}</td>
                  <td className="py-2 px-3 border-r border-gray-200">{row.expected}</td>
                  <td className="py-2 px-3 border-r border-gray-200 text-cyan-500 font-semibold">
                    {row.profitPercent}
                  </td>
                  <td className="py-2 px-3">{row.netProfit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side - desktop only */}
      <div className="hidden md:flex flex-col gap-10 w-96">
        {/* Profit Forecast - HIDDEN on mobile */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-sm font-semibold text-gray-500 mb-1">
            Next month profit forecast:
          </p>
          <p className="text-3xl font-extrabold mb-1">{nextMonthForecast}</p>
          <p className="text-xs text-gray-600">
            Utility expenses exceeded by {utilityExceededPercent}%
          </p>
        </div>

        {/* Donuts shown on desktop on right */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm font-semibold text-gray-500 mb-2">
            Analytics By Rooms Sharing
          </p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={roomsData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                stroke="none"
              >
                {roomsData.map((entry, idx) => (
                  <Cell key={`room-desktop-${idx}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {roomsData.map(({ name, color }) => (
              <div key={name} className="flex items-center space-x-1 text-xs">
                <div
                  style={{ backgroundColor: color }}
                  className="w-3 h-3 rounded-full"
                />
                <span className="text-gray-700 opacity-70">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm font-semibold text-gray-500 mb-2">
            Expenses Breakdown
          </p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={expensesData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                stroke="none"
              >
                {expensesData.map((entry, idx) => (
                  <Cell key={`expense-desktop-${idx}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {expensesData.map(({ name, color }) => (
              <div key={name} className="flex items-center space-x-1 text-xs">
                <div
                  style={{ backgroundColor: color }}
                  className="w-3 h-3 rounded-full"
                />
                <span className="text-gray-700 opacity-70">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}