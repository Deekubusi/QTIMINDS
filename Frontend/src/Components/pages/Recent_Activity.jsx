import { Clock } from "lucide-react";
import { useState } from "react";

export default function RecentActivityFeed() {
  const activities = [
    { id: 1, text: "Candidate 1 check-in recorded on 3rd Sep 2025" },
    { id: 2, text: "Candidate 2 checked-out on 3rd Sep 2025" },
    { id: 3, text: "₹25K Payment received from Candidate 3 on 3rd Sep 2025" },
    { id: 4, text: "Water leakage ticket is closed on 3rd Sep 2025" },
    { id: 5, text: "Candidate 4 check-in recorded on 4th Sep 2025" },
    { id: 6, text: "Candidate 5 checked-out on 4th Sep 2025" },
  ];

  const [expanded, setExpanded] = useState(false);
  const visibleActivities = expanded ? activities : activities.slice(0, 4);
  const remainingCount = activities.length - 4;

  return (
    <div className="bg-[#eaf2f9] mb-4 flex justify-center">
      <div className="w-[1300px] mt-5">
        {/* Heading OUTSIDE the card */}
        <div className="flex items-center gap-2 mb-4 ml-5">
          <Clock className="text-gray-700" size={22} />
          <h2 className="text-xl font-semibold text-gray-800 ">
            Recent Activity Feed
          </h2>
        </div>

        {/* Card Only for Activities */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <ul className="space-y-2">
            {visibleActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-start gap-3 text-gray-700"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600 mt-2"></span>
                <p className="text-sm">{activity.text}</p>
              </li>
            ))}
          </ul>

          {/* View More / View Less */}
          {activities.length > 4 && (
            <div className="mt-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-[#0041BA] font-medium hover:underline flex items-center"
              >
                {expanded ? (
                  <>
                    View less
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 h-4 w-4 sm:h-5 sm:w-5 rotate-180"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    View more ({remainingCount})
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
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
