import React from "react";
import man from "../../assests/ManOnDesk.png";
import { ChartBar, FileText, CreditCard, Users, ChevronRight } from "lucide-react";

function ToolCard({ icon: Icon, title }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 flex flex-col items-center justify-between text-center min-h-[180px] sm:min-h-[200px] hover:shadow-md transition h-full">
      <div className="grid place-items-center">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 grid place-items-center mb-3 sm:mb-4">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-700" aria-hidden="true" />
        </div>
        <h3 className="text-[13px] sm:text-sm md:text-[15px] font-medium text-gray-800 leading-snug max-w-[240px]">
          {title}
        </h3>
      </div>

      <button
        type="button"
        aria-label={`Open ${title}`}
        className="mt-4 sm:mt-5 inline-flex items-center justify-center w-8 h-8 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ToolsSection() {
  return (
    <section className="w-full bg-white">
      {/* Heading centered */}
      <div className="px-4 sm:px-6 md:px-0 pt-10 sm:pt-14 md:pt-16">
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 font-poppins">
          Powerful Tools Included
        </h1>
      </div>

      {/* Content row */}
      <div className="flex flex-col md:flex-row md:items-start items-center justify-center gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 md:pl-0 md:pr-16 lg:pr-24 pb-10 sm:pb-14 md:pb-16 pt-6 sm:pt-8 font-poppins ">
        {/* Left illustration */}
        <div className="flex justify-start md:w-1/2 md:pl-0">
          <img
            src={man}
            alt="Dashboard discussion illustration"
            className="max-w-full w-[300px] sm:w-[360px] md:w-[420px] lg:w-[460px] object-contain"
          />
        </div>

        {/* Right grid */}
        <div className="md:w-1/2 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-7 auto-rows-fr mt-10">
            <ToolCard icon={ChartBar} title="Occupancy & Room Status Overview" />
            <ToolCard icon={FileText} title="Financial Snapshots & Reports" />
            <ToolCard icon={CreditCard} title="Automated Billing & Rent Reminders" />
            <ToolCard icon={Users} title="Guest Self-Service Portal" />
          </div>
        </div>
      </div>
    </section>
  );
}
