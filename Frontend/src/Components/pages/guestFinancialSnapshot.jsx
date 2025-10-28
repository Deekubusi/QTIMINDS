import { ChevronsDown, ChevronsUp, ClipboardList } from 'lucide-react';
import { useMemo, useState } from 'react';

// --- SVG Icons ---

const FilterArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M6 9L12 15L18 9" stroke="#073C9E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

// --- REMOVED StatusArrowPaid SVG definition ---
// const StatusArrowPaid = () => ( ... );

// --- REMOVED StatusArrowPending SVG definition ---
// const StatusArrowPending = () => ( ... );

// --- Mock Data ---
const transactionsData = [
    { id: 1, date: "15/04/2025", description: "Rent", amount: 20000, lateFee: 0, total: 20000, status: "Paid" },
    { id: 2, date: "15/04/2025", description: "Misc. fee", amount: 1000, lateFee: 0, total: 1000, status: "Paid" },
    { id: 3, date: "15/04/2025", description: "Rent", amount: 20000, lateFee: 1000, total: 21000, status: "Pending" },
    { id: 4, date: "15/04/2025", description: "Rent", amount: 20000, lateFee: 1000, total: 21000, status: "Pending" },
    { id: 5, date: "14/03/2025", description: "Mess fee", amount: 3000, lateFee: 0, total: 3000, status: "Paid" },
    { id: 6, date: "10/03/2025", description: "Electricity bill", amount: 500, lateFee: 0, total: 500, status: "Paid" },
    { id: 7, date: "15/02/2025", description: "Rent", amount: 20000, lateFee: 0, total: 20000, status: "Paid" },
    { id: 8, date: "15/01/2025", description: "Rent", amount: 20000, lateFee: 0, total: 20000, status: "Paid" },
    { id: 9, date: "10/12/2024", description: "Laundry", amount: 300, lateFee: 0, total: 300, status: "Paid" },
];

// --- Helper Function ---
function parseDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
}

// --- Sub-components ---

// --- UPDATED StatusBadge: Removed icon components ---
function StatusBadge({ status }) {
  // Adjusted padding slightly, removed gap class
  const baseClasses = "inline-flex items-center justify-center rounded-full py-1 px-3 whitespace-nowrap";
  const textClasses = "font-poppins text-xs font-medium";
  if (status === "Paid") {
    return (
      <div className={`${baseClasses} bg-green-200 text-green-800`}>
        <span className={`${textClasses}`}>Paid</span>
        {/* <StatusArrowPaid /> */} {/* REMOVED */}
      </div>
    );
  }
  if (status === "Pending") {
    return (
      <div className={`${baseClasses} bg-red-200 text-red-800`}>
        <span className={`${textClasses}`}>Pending</span>
        {/* <StatusArrowPending /> */} {/* REMOVED */}
      </div>
    );
  }
  // Fallback for other statuses
  return (
    <div className={`${baseClasses} bg-gray-200 text-gray-800`}>
        <span className={`${textClasses}`}>{status}</span>
    </div>
    );
}


function PaymentFilterDropdown({ onSelect }) {
  const items = ["All Payments", "miscellaneous fee", "Laundry", "Mess fee", "Electricity bill", "Rent"];
  return (
    <div className="absolute top-full mt-1 w-full sm:w-auto min-w-[180px] rounded-xl bg-white shadow-lg overflow-hidden z-10 left-0 border border-gray-200">
      {items.map((item) => (
        <div
          key={item}
          onClick={() => onSelect(item)}
          className="flex cursor-pointer items-center justify-start font-poppins text-sm font-normal text-gray-700 px-4 py-2 whitespace-nowrap hover:bg-gray-100"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function TimeFilterDropdown({ onSelect }) {
  const items = ["Last month", "Last 3 months", "Last 6 months"];
  return (
    <div className="absolute top-full mt-1 w-auto rounded-xl bg-white shadow-lg overflow-hidden z-10 right-0 border border-gray-200">
      {items.map((item) => (
        <div
          key={item}
          onClick={() => onSelect(item)}
          className="flex cursor-pointer items-center justify-start font-poppins text-sm font-normal text-gray-700 px-4 py-2 whitespace-nowrap hover:bg-gray-100"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

// --- Main Component ---
export default function GuestFinancialSnapshot() {
  const [paymentFilterOpen, setPaymentFilterOpen] = useState(false);
  const [timeFilterOpen, setTimeFilterOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("All Payments");
  const [selectedTime, setSelectedTime] = useState("Time Range");
  const [showAllRows, setShowAllRows] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);

  // Filtering Logic
  const filteredTransactions = useMemo(() => {
    const currentDate = new Date(2025, 3, 17);
    return transactionsData.filter(tx => {
      let paymentMatch = selectedPayment === "All Payments" ||
                         (selectedPayment.toLowerCase() === "miscellaneous fee"
                           ? tx.description.toLowerCase() === "misc. fee"
                           : tx.description.toLowerCase() === selectedPayment.toLowerCase());
      let timeMatch = true;
      if (selectedTime !== "Time Range") {
        const txDate = parseDate(tx.date);
        let startDate = new Date(currentDate);
        if (selectedTime === "Last month") startDate.setMonth(currentDate.getMonth() - 1);
        else if (selectedTime === "Last 3 months") startDate.setMonth(currentDate.getMonth() - 3);
        else if (selectedTime === "Last 6 months") startDate.setMonth(currentDate.getMonth() - 6);
        timeMatch = txDate >= startDate && txDate <= currentDate;
      }
      return paymentMatch && timeMatch;
    });
  }, [selectedPayment, selectedTime]);

  const transactionsToDisplay = showAllRows ? filteredTransactions : filteredTransactions.slice(0, 3);
  const remaining = Math.max(filteredTransactions.length - 3, 0);

  const handlePaymentSelect = (item) => {
    setSelectedPayment(item);
    setPaymentFilterOpen(false);
    setShowAllRows(false);
  };
  const handleTimeSelect = (item) => {
    setSelectedTime(item);
    setTimeFilterOpen(false);
    setShowAllRows(false);
  };
  const handleViewReceipt = (transaction) => {
    setCurrentReceipt(transaction);
    setShowReceipt(true);
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow-xl p-4 sm:p-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
         <h2 className="flex items-center text-lg font-bold text-gray-900 gap-2">
            <ClipboardList className="h-5 w-5 text-indigo-600" />
            Financial Snapshot
         </h2>
        <div className="flex gap-2 sm:gap-4 flex-wrap w-full sm:w-auto">
          {/* Filters */}
          <div className="relative flex-shrink-0 w-1/2 sm:w-auto">
            <button
                onClick={() => { setPaymentFilterOpen(!paymentFilterOpen); setTimeFilterOpen(false); }}
                className="flex w-full h-[40px] items-center justify-between whitespace-nowrap rounded-xl bg-white px-4 shadow-md gap-2 border border-[#073C9E] text-[#073C9E]"
            >
              <span className="font-poppins text-sm font-medium truncate">{selectedPayment}</span>
              <FilterArrowIcon />
            </button>
            {paymentFilterOpen && <PaymentFilterDropdown onSelect={handlePaymentSelect} />}
          </div>
          <div className="relative flex-shrink-0 w-1/2 sm:w-auto">
            <button
                onClick={() => { setTimeFilterOpen(!timeFilterOpen); setPaymentFilterOpen(false); }}
                 className="flex w-full h-[40px] items-center justify-between whitespace-nowrap rounded-xl bg-white px-4 shadow-md gap-2 border border-[#073C9E] text-[#073C9E]"
             >
              <span className="font-poppins text-sm font-medium truncate">{selectedTime}</span>
              <FilterArrowIcon />
            </button>
            {timeFilterOpen && <TimeFilterDropdown onSelect={handleTimeSelect} />}
          </div>
        </div>
      </header>

      {/* Financial Table Container */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#073C9E] text-white uppercase text-xs font-semibold tracking-wider">
                {["Payment date", "Description", "Amount", "Late fee", "Total", "Status", "View Receipt"].map((header) => (
                  <th key={header} className="py-3 px-4 text-left">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredTransactions.length === 0 ? (
                 <tr>
                    <td colSpan="7" className="text-center py-6 px-4 text-gray-500">
                        No transactions found for the selected filters.
                    </td>
                 </tr>
              ) : (
                transactionsToDisplay.map((tx, index) => (
                    <tr key={tx.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-b border-gray-200`}>
                    <td className="py-3 px-4 whitespace-nowrap">{tx.date}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{tx.description}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{tx.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{tx.lateFee.toLocaleString()}</td>
                    <td className="py-3 px-4 whitespace-nowrap">{tx.total.toLocaleString()}</td>
                    <td className="py-3 px-4 whitespace-nowrap"><StatusBadge status={tx.status} /></td>
                    <td className="py-3 px-4 whitespace-nowrap">
                        <button onClick={() => handleViewReceipt(tx)} className="font-poppins text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline">View Receipt</button>
                    </td>
                    </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* View More / View Less */}
        {filteredTransactions.length > 3 && (
          <div className="mt-4 px-1">
            <button onClick={() => setShowAllRows((v) => !v)} className="inline-flex items-center gap-1 text-sm font-medium text-[#073C9E] hover:underline">
              {showAllRows ? (
                <>View less <ChevronsUp className="h-4 w-4" /></>
              ) : (
                <>View more ({remaining}) <ChevronsDown className="h-4 w-4" /></>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Receipt Popup */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowReceipt(false)}>
          <div className="bg-white p-8 sm:p-10 rounded-lg shadow-xl font-poppins max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Receipt Details</h3>
            <div className="space-y-2 text-base sm:text-lg">
                <p><strong>Date:</strong> {currentReceipt?.date}</p>
                <p><strong>Description:</strong> {currentReceipt?.description}</p>
                <p><strong>Amount:</strong> ₹{currentReceipt?.amount.toLocaleString()}</p>
                <p><strong>Late Fee:</strong> ₹{currentReceipt?.lateFee.toLocaleString()}</p>
                <p><strong>Total Paid:</strong> ₹{currentReceipt?.total.toLocaleString()}</p>
                <p><strong>Status:</strong> {currentReceipt?.status}</p>
            </div>
            <button onClick={() => setShowReceipt(false)} className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}