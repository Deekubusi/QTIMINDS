import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";


// Import your modals
import AddManagerModal from "./AddManagerModal";
import DownloadReportModal from "./DownloadReport";
import SendAnnouncementModal from "./SendAnnouncement";
import AddNewPGModal from "./AddNewPG";
import AddGuestModal from "./AddGuest";

export default function ActionButtons() {
  // Modal states
  const [isAddManagerOpen, setIsAddManagerOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [isAddNewPGOpen, setIsAddNewPGOpen] = useState(false);
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);

  // Small success dialog
  const [announcementSuccess, setAnnouncementSuccess] = useState(false);

  return (
    <>
      {/* ----------------------
          ACTION BUTTONS GRID
        ---------------------- */}
      <div className="w-full px-4 py-6">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {/* Card: Add Manager */}
            <button
              aria-label="Add Manager"
              onClick={() => setIsAddManagerOpen(true)}
              className="group w-[220px] h-[171px] rounded-[25px] bg-white shadow-[6px_6px_6px_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 transition-transform duration-200 hover:-translate-y-2"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[1px] rounded-[25px] border-[0.7px] border-transparent pointer-events-none group-hover:border-[#FF8F6B]"
              />
              <div className="w-[42px] h-[42px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                >
                  <path
                    d="M23.1 18.9V10.5H18.9V18.9H10.5V23.1H18.9V31.5H23.1V23.1H31.5V18.9H23.1ZM21 42C15.4305 42 10.089 39.7875 6.15076 35.8492C2.21249 31.911 0 26.5695 0 21C0 15.4305 2.21249 10.089 6.15076 6.15076C10.089 2.21249 15.4305 0 21 0C26.5695 0 31.911 2.21249 35.8492 6.15076C39.7875 10.089 42 15.4305 42 21C42 26.5695 39.7875 31.911 35.8492 35.8492C31.911 39.7875 26.5695 42 21 42Z"
                    fill="#0B2595"
                  />
                </svg>
              </div>
              <div
                className="text-center font-poppins font-semibold text-[20px]"
                style={{ color: "#073C9E" }}
              >
                Guest <br />
                Check-in
              </div>
            </button>

            {/* Card: Download Report */}
            <button
              aria-label="Download Report"
              onClick={() => setIsDownloadOpen(true)}
              className="group w-[220px] h-[171px] rounded-[25px] bg-white shadow-[6px_6px_6px_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 transition-transform duration-200 hover:-translate-y-2"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[1px] rounded-[25px] border-[0.7px] border-transparent pointer-events-none group-hover:border-[#FF8F6B]"
              />
              <div className="w-[42px] h-[42px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                >
                  <path
                    d="M21 42C15.4305 42 10.089 39.7875 6.15076 35.8492C2.21249 31.911 0 26.5695 0 21C0 15.4305 2.21249 10.089 6.15076 6.15076C10.089 2.21249 15.4305 0 21 0C26.5695 0 31.911 2.21249 35.8492 6.15076C39.7875 10.089 42 15.4305 42 21C42 26.5695 39.7875 31.911 35.8492 35.8492C31.911 39.7875 26.5695 42 21 42Z"
                    fill="#0B2595"
                  />
                  <path d="M10.5 18.9H31.5V23.1H10.5V18.9Z" fill="white" />
                </svg>
              </div>
              <div
                className="text-center font-poppins font-semibold text-[20px]"
                style={{ color: "#073C9E" }}
              >
                Guest <br />
                Check-out
              </div>
            </button>

            {/* Card: Send Announcement */}
            <button
              aria-label="Send Announcement"
              onClick={() => setIsSendOpen(true)}
              className="group w-[230px] h-[171px] rounded-[25px] bg-white shadow-[6px_6px_6px_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 transition-transform duration-200 hover:-translate-y-2"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[1px] rounded-[25px] border-[0.7px] border-transparent pointer-events-none group-hover:border-[#FF8F6B]"
              />
              <div className="w-[46px] h-[46px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="46"
                  height="46"
                  viewBox="0 0 512 512"
                  fill="none"
                >
                  <path
                    d="M256 32C278 32 294 52 316 56C338 60 361 44 382 56C403 68 400 92 412 112C424 132 448 138 456 160C464 182 448 202 452 224C456 246 476 262 472 284C468 306 444 318 436 340C428 362 436 386 424 406C412 426 388 428 370 442C352 456 342 480 320 484C298 488 278 472 256 472C234 472 214 488 192 484C170 480 160 456 142 442C124 428 100 426 88 406C76 386 84 362 76 340C68 318 44 306 40 284C36 262 56 246 60 224C64 202 48 182 56 160C64 138 88 132 100 112C112 92 109 68 130 56C151 44 174 60 196 56C218 52 234 32 256 32Z"
                    fill="#0B2595"
                  />

                  <path
                    d="M336 144H192C183.163 144 176 151.163 176 160C176 168.837 183.163 176 192 176H336C344.837 176 352 168.837 352 160C352 151.163 344.837 144 336 144ZM336 208H192C183.163 208 176 215.163 176 224C176 232.837 183.163 240 192 240H304.5C286.8 272 244.8 288 192 288H176V320H213.5L304 416H344L258.5 320C312.5 317 357.2 285.2 368 240H336Z"
                    fill="white"
                  />
                </svg>
              </div>

              <div
                className="text-center font-poppins font-semibold text-[20px]"
                style={{ color: "#073C9E" }}
              >
                Add Payment / Reminder
              </div>
            </button>

            {/* Card: Add New PG */}
            <button
              aria-label="Add New PG"
              onClick={() => setIsAddNewPGOpen(true)}
              className="group w-[220px] h-[171px] rounded-[25px] bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 transition-transform duration-200 hover:-translate-y-2"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[1px] rounded-[25px] border-[0.7px] border-transparent pointer-events-none group-hover:border-[#FF8F6B]"
              />
              <div className="w-[52px] h-[52px] flex items-center justify-center mr-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="52"
                  viewBox="0 0 512 512"
                  fill="none"
                >
                  <path
                    d="M481.608 336.262L356.262 210.916C364.715 177.463 356.642 141.173 331.657 116.188C301.513 86.044 256.854 77.978 219.872 93.335L284.686 158.149L224.149 218.686L159.335 153.872C143.978 190.854 152.044 235.513 182.188 265.657C207.173 290.642 243.463 298.715 276.916 290.262L402.262 415.608C417.729 431.075 442.271 431.075 457.738 415.608L481.608 391.738C497.075 376.271 497.075 351.729 481.608 336.262Z"
                    fill="#0B2595"
                  />
                </svg>
              </div>

              <div
                className="text-center font-poppins font-semibold text-[20px]"
                style={{ color: "#073C9E" }}
              >
                New / Update Maintenance
              </div>
            </button>

            {/* Card: Add Guest */}
            <button
              aria-label="Add Guest"
              onClick={() => setIsAddGuestOpen(true)}
              className="group w-[220px] h-[171px] rounded-[25px] bg-white shadow-[6px_6px_6px_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 transition-transform duration-200 hover:-translate-y-2"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[1px] rounded-[25px] border-[0.7px] border-transparent pointer-events-none group-hover:border-[#FF8F6B]"
              />
              <div className="w-[47px] h-[47px] flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="47"
                  height="47"
                  viewBox="0 0 42 42"
                  fill="none"
                >
                  <path
                    d="M7 6C5.34315 6 4 7.34315 4 9V27C4 28.6569 5.34315 30 7 30H14L21 36V30H35C36.6569 30 38 28.6569 38 27V9C38 7.34315 36.6569 6 35 6H7Z"
                    fill="#0B2595"
                  />
                  <rect
                    x="12"
                    y="14"
                    width="18"
                    height="2.5"
                    rx="1.25"
                    fill="white"
                  />
                  <rect
                    x="12"
                    y="20"
                    width="12"
                    height="2.5"
                    rx="1.25"
                    fill="white"
                  />
                </svg>
              </div>

              <div
                className="text-center font-poppins font-semibold text-[20px]"
                style={{ color: "#073C9E" }}
              >
                Broadcast <br />
                Message
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ----------------------
          MODALS
        ---------------------- */}
      <AddManagerModal
        open={isAddManagerOpen}
        onClose={() => setIsAddManagerOpen(false)}
        onSubmit={(payload) => {
          console.log("Add Manager payload:", payload);
          setIsAddManagerOpen(false);
        }}
      />

      <DownloadReportModal
        open={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        onSubmit={async (payload) => {
          console.log("Download payload:", payload);
        }}
      />

      <SendAnnouncementModal
        open={isSendOpen}
        onClose={() => setIsSendOpen(false)}
        onSubmit={async (payload) => {
          console.log("Send announcement payload:", payload);
          setIsSendOpen(false);
          setAnnouncementSuccess(true);
        }}
      />

      {/* Small success dialog */}
      {announcementSuccess && (
        <div className="fixed inset-0 z-60 grid place-items-center bg-black/30 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Announcement Sent
              </h3>
              <button
                type="button"
                onClick={() => setAnnouncementSuccess(false)}
                className="h-9 w-9 grid place-items-center rounded-full hover:bg-gray-100"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5">
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-gray-700">
                Your announcement was sent successfully to the selected
                audience.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
              <button
                onClick={() => setAnnouncementSuccess(false)}
                className="px-4 py-2 rounded-lg bg-[#605BFF] text-white hover:bg-[#5048e6]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <AddNewPGModal
        open={isAddNewPGOpen}
        onClose={() => setIsAddNewPGOpen(false)}
        onSubmit={async (payload) => {
          console.log("Create PG payload:", payload);
          setIsAddNewPGOpen(false);
        }}
      />

      <AddGuestModal
        open={isAddGuestOpen}
        onClose={() => setIsAddGuestOpen(false)}
        onSubmit={async (payload) => {
          console.log("Create guest payload:", payload);
          setIsAddGuestOpen(false);
        }}
      />
    </>
  );
}