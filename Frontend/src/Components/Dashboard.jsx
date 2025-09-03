import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

/* icons */
import add from "../assests/add.png";
import bell from "../assests/bell.png";
import screw from "../assests/screw.png";
import room from "../assests/room.png";
import ruppee from "../assests/ruppee.png";

/* recharts */
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
} from "recharts";

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

      <section className="dash-cards">
     

        {/* ===== Occupancy ===== */}
        <div className="profit-card">
          <h2 className="profit-title">Occupancy</h2>
          <div className="profit-visual">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                <Pie
                  data={[
                    { name: "Occupied", value: 82 },
                    { name: "Vacant", value: 18 },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={95}
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                >
                  <Cell fill="#16A34A" />
                  <Cell fill="#EF4444" />
                  <Label
                    value="82%"
                    position="center"
                    fill="#000"
                    style={{ fontWeight: 700, fontSize: 18 }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="occ-strong">45/53 beds occupied</p>
          <p className="occ-note">+10% since last month</p>
          <button type="button" className="profit-view">View Details →</button>
        </div>
        {/* ===== Profitability ===== */}
<div className="profit-card">
  <h2 className="profit-title">Profitability</h2>

  <div className="profit-visual">
    <ResponsiveContainer width="100%" height={220}>
      <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
        <Pie
          data={profitData}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={95}
          startAngle={90}
          endAngle={450}
          stroke="none"
        >
          {profitData.map((_, idx) => (
            <Cell
              key={`cell-${idx}`}
              fill={COLORS[idx % COLORS.length]}
            />
          ))}
          <Label
            value={`₹${formatINR(net)}`}
            position="center"
            dy={-4}
            fill="#000"
            style={{ fontWeight: 700, fontSize: 18 }}
          />
          <Label
            value="Net Profit"
            position="center"
            dy={16}
            fill="#6B7280"
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Subtext like in Pending Dues */}
  <p className="pending-text">
    Revenue ₹{formatINR(revenue)} – Expenses ₹{formatINR(expenses)}
  </p>

  {/* Legend section like Pending Dues */}
  <div className="pending-legend">
    {profitData.map((item, idx) => (
      <div key={idx} className="legend-item">
        <span
          className="legend-swatch"
          style={{ backgroundColor: COLORS[idx % COLORS.length] }}
        />
        <span className="legend-text">
          <strong>{item.value}</strong> {item.name}
        </span>
      </div>
    ))}
  </div>

  {/* Button */}
  <button
    type="button"
    className="profit-view"
    onClick={() => navigate("/profitability")}
  >
    View Details →
  </button>
</div>


        {/* ===== Pending Dues ===== */}
        <div className="profit-card">
          <h2 className="profit-title">Pending Dues</h2>
          <div className="profit-visual">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                <Pie
                  data={[
                    { name: "Collected", value: 68 },
                    { name: "Due", value: 32 },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={95}
                  startAngle={90}
                  endAngle={450}
                  stroke="none"
                >
                  <Cell fill="#16A34A" />
                  <Cell fill="#EF4444" />
                  <Label
                    value="₹1,20,000"
                    position="center"
                    dy={-4}
                    fill="#000"
                    style={{ fontWeight: 700, fontSize: 18 }}
                  />
                  <Label value="Due" position="center" dy={16} fill="#6B7280" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="pending-text">12 Guests with overdue payments</p>

          <div className="pending-legend">
            <div className="legend-item">
              <span className="legend-swatch legend-green" />
              <span className="legend-text"><strong>68%</strong> Collected</span>
            </div>
            <div className="legend-item">
              <span className="legend-swatch legend-red" />
              <span className="legend-text">Due</span>
            </div>
          </div>

          {/* only this one navigates */}
          <button
            type="button"
            className="profit-view"
            onClick={() => navigate("/pending-dues")}
          >
            View Details →
          </button>
        </div>
      </section>

      {/* ACTION BUTTONS (outside grid) */}
      <section className="dash-actions">
        <button type="button" className="action-btn">
          <img src={add} alt="" className="action-icon" />
          <span>Add Guest</span>
        </button>
        <button type="button" className="action-btn">
          <img src={ruppee} alt="" className="action-icon" />
          <span>Record Payment</span>
        </button>
        <button type="button" className="action-btn">
          <img src={room} alt="" className="action-icon" />
          <span>Assign Room</span>
        </button>
        <button type="button" className="action-btn">
          <img src={screw} alt="" className="action-icon" />
          <span>Log Maintenance</span>
        </button>
        <button type="button" className="action-btn">
          <img src={bell} alt="" className="action-icon" />
          <span>Send Reminder</span>
        </button>
      </section>
    </main>
  );
}