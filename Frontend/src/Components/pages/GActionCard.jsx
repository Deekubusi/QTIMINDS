import { useState } from "react";

// NOTE: These are placeholder imports. Replace them with your actual modal components.
// import PayRentModal from "./PayRentModal";
// import RaiseTicketModal from "./RaiseTicketModal";
// import ViewAnnouncementsModal from "./ViewAnnouncementsModal";
// import ContactManagerModal from "./ContactManagerModal";
// import ExtendStayModal from "./ExtendStayModal";

export default function GActionCard() {
  // Modal states for each action button
  const [isPayRentOpen, setIsPayRentOpen] = useState(false);
  const [isRaiseTicketOpen, setIsRaiseTicketOpen] = useState(false);
  const [isViewAnnouncementsOpen, setIsViewAnnouncementsOpen] = useState(false);
  const [isContactManagerOpen, setIsContactManagerOpen] = useState(false);
  const [isExtendStayOpen, setIsExtendStayOpen] = useState(false);

  return (
    <>
      {/* ACTION BUTTONS GRID */}
      <div className="w-full px-4 py-6">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            
            {/* Card: Payments */}
            <button
              aria-label="Pay Rent or View Invoice"
              onClick={() => setIsPayRentOpen(true)}
              className="group w-[220px] h-[171px] rounded-[25px] bg-white shadow-[6px_6px_6px_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 p-2 transition-transform duration-200 hover:-translate-y-2"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[1px] rounded-[25px] border-[0.7px] border-transparent pointer-events-none group-hover:border-[#4F6BE3]"
              />
              <div className="w-[42px] h-[42px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 30" fill="none">
                  <path d="M12.0003 0.833496L12.1661 0.843413C12.4823 0.880705 12.7767 1.02344 13.0019 1.2486C13.227 1.47375 13.3698 1.76819 13.4071 2.08441L13.417 2.25016V7.91683L13.4241 8.12933C13.4748 8.80391 13.7651 9.43808 14.2427 9.91721C14.7203 10.3963 15.3535 10.6888 16.0279 10.7417L16.2503 10.7502H21.917L22.0827 10.7601C22.399 10.7974 22.6934 10.9401 22.9186 11.1653C23.1437 11.3904 23.2865 11.6849 23.3237 12.0011L23.3337 12.1668V24.9168C23.3337 26.0009 22.9195 27.044 22.1758 27.8327C21.4322 28.6214 20.4152 29.0961 19.333 29.1597L19.0837 29.1668H4.91699C3.83294 29.1669 2.78985 28.7527 2.00112 28.009C1.2124 27.2653 0.737673 26.2483 0.674076 25.1662L0.666992 24.9168V5.0835C0.666932 3.99945 1.08112 2.95635 1.82481 2.16763C2.5685 1.3789 3.58548 0.904177 4.66766 0.84058L4.91699 0.833496H12.0003ZM17.667 22.0835H14.8337C14.4579 22.0835 14.0976 22.2327 13.8319 22.4984C13.5662 22.7641 13.417 23.1244 13.417 23.5002C13.417 23.8759 13.5662 24.2362 13.8319 24.5019C14.0976 24.7676 14.4579 24.9168 14.8337 24.9168H17.667C18.0427 24.9168 18.4031 24.7676 18.6687 24.5019C18.9344 24.2362 19.0837 23.8759 19.0837 23.5002C19.0837 23.1244 18.9344 22.7641 18.6687 22.4984C18.4031 22.2327 18.0427 22.0835 17.667 22.0835ZM17.667 16.4168H6.33366C5.95794 16.4168 5.5976 16.5661 5.33192 16.8318C5.06625 17.0974 4.91699 17.4578 4.91699 17.8335C4.91699 18.2092 5.06625 18.5696 5.33192 18.8352C5.5976 19.1009 5.95794 19.2502 6.33366 19.2502H17.667C18.0427 19.2502 18.4031 19.1009 18.6687 18.8352C18.9344 18.5696 19.0837 18.2092 19.0837 17.8335C19.0837 17.4578 18.9344 17.0974 18.6687 16.8318C18.4031 16.5661 18.0427 16.4168 17.667 16.4168ZM7.75033 6.50016H6.33366C5.95794 6.50016 5.5976 6.64942 5.33192 6.91509C5.06625 7.18077 4.91699 7.54111 4.91699 7.91683C4.91699 8.29255 5.06625 8.65289 5.33192 8.91856C5.5976 9.18424 5.95794 9.3335 6.33366 9.3335H7.75033C8.12605 9.3335 8.48638 9.18424 8.75206 8.91856C9.01774 8.65289 9.16699 8.29255 9.16699 7.91683C9.16699 7.54111 9.01774 7.18077 8.75206 6.91509C8.48638 6.64942 8.12605 6.50016 7.75033 6.50016Z" fill="#043163"/>
                  <path d="M21.9171 7.91662H16.2504L16.249 2.24854L21.9171 7.91662Z" fill="#043163"/>
                </svg>
              </div>
              <div className="text-center font-poppins font-semibold text-[20px]" style={{ color: "#073C9E" }}>
                Payments
              </div>
            </button>

            {/* Card: Services */}
            <button
              aria-label="Raise Services or Maintenance Ticket"
              onClick={() => setIsRaiseTicketOpen(true)}
              className="group w-[220px] h-[171px] rounded-[25px] bg-white shadow-[6px_6px_6px_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 p-2 transition-transform duration-200 hover:-translate-y-2"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[1px] rounded-[25px] border-[0.7px] border-transparent pointer-events-none group-hover:border-[#4F6BE3]"
              />
              <div className="w-[42px] h-[42px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.4288 9.23791L10.8749 4.90429L6.49347 0.525955C7.38763 0.240746 8.34347 0.0834965 9.33322 0.0834965C10.778 0.0830751 12.2028 0.421105 13.4935 1.0705C14.7841 1.71989 15.9047 2.66258 16.7654 3.82303C17.6261 4.98348 18.203 6.32942 18.4499 7.75297C18.6968 9.17653 18.6067 10.6381 18.187 12.0206L27.8332 21.6668C28.2381 22.0717 28.5593 22.5524 28.7785 23.0815C28.9976 23.6105 29.1104 24.1775 29.1104 24.7502C29.1104 25.3228 28.9976 25.8898 28.7785 26.4188C28.5593 26.9479 28.2381 27.4286 27.8332 27.8335C27.4283 28.2384 26.9476 28.5596 26.4186 28.7787C25.8895 28.9979 25.3225 29.1107 24.7499 29.1107C24.1773 29.1107 23.6102 28.9979 23.0812 28.7787C22.5522 28.5596 22.0715 28.2384 21.6666 27.8335L12.0203 18.1873C10.4049 18.6785 8.68583 18.7183 7.04943 18.3021C5.41304 17.886 3.92176 17.0299 2.73723 15.8266C1.5527 14.6234 0.720125 13.1188 0.329736 11.4761C-0.0606524 9.83339 0.00604311 8.11514 0.522593 6.50762L4.89938 10.8752L9.23609 9.43062L9.4288 9.23791Z" fill="#043163"/>
                </svg>
              </div>
              <div className="text-center font-poppins font-semibold text-[20px] leading-tight" style={{ color: "#073C9E" }}>
                Services
              </div>
            </button>

            {/* Card: Feedback */}
            <button
              aria-label="View Announcements"
              onClick={() => setIsViewAnnouncementsOpen(true)}
              className="group w-[220px] h-[171px] rounded-[25px] bg-white shadow-[6px_6px_6px_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 p-2 transition-transform duration-200 hover:-translate-y-2"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[1px] rounded-[25px] border-[0.7px] border-transparent pointer-events-none group-hover:border-[#4F6BE3]"
              />
              <div className="w-[42px] h-[42px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
<path d="M2.75 30.25V5.5C2.75 4.74375 3.0195 4.09658 3.5585 3.5585C4.0975 3.02042 4.74467 2.75092 5.5 2.75H27.5C28.2563 2.75 28.9039 3.0195 29.4429 3.5585C29.9819 4.0975 30.2509 4.74467 30.25 5.5V22C30.25 22.7563 29.981 23.4039 29.4429 23.9429C28.9048 24.4819 28.2572 24.7509 27.5 24.75H8.25L2.75 30.25ZM16.5 20.625C16.8896 20.625 17.2164 20.493 17.4804 20.229C17.7444 19.965 17.8759 19.6387 17.875 19.25C17.8741 18.8613 17.7421 18.535 17.479 18.271C17.2159 18.007 16.8896 17.875 16.5 17.875C16.1104 17.875 15.7841 18.007 15.521 18.271C15.2579 18.535 15.1259 18.8613 15.125 19.25C15.1241 19.6387 15.2561 19.9655 15.521 20.2304C15.7859 20.4953 16.1123 20.6268 16.5 20.625ZM15.125 15.125H17.875V6.875H15.125V15.125Z" fill="#043163"/>
</svg>
              </div>
              <div className="text-center font-poppins font-semibold text-[20px]" style={{ color: "#073C9E" }}>
                Feedback
              </div>
            </button>

            {/* Card: PG Contacts */}
            <button
              aria-label="Contact PG Manager"
              onClick={() => setIsContactManagerOpen(true)}
              className="group w-[220px] h-[171px] rounded-[25px] bg-white shadow-[6px_6px_6px_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 p-2 transition-transform duration-200 hover:-translate-y-2"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[1px] rounded-[25px] border-[0.7px] border-transparent pointer-events-none group-hover:border-[#4F6BE3]"
              />
              <div className="w-[42px] h-[42px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                  <path d="M9.25 26.2083C9.25 23.125 15.4167 21.4292 18.5 21.4292C21.5833 21.4292 27.75 23.125 27.75 26.2083V27.75H9.25M23.125 13.875C23.125 15.1016 22.6377 16.278 21.7704 17.1454C20.903 18.0127 19.7266 18.5 18.5 18.5C17.2734 18.5 16.097 18.0127 15.2296 17.1454C14.3623 16.278 13.875 15.1016 13.875 13.875C13.875 12.6484 14.3623 11.472 15.2296 10.6046C16.097 9.73728 17.2734 9.25 18.5 9.25C19.7266 9.25 20.903 9.73728 21.7704 10.6046C22.6377 11.472 23.125 12.6484 23.125 13.875ZM4.625 7.70833V29.2917C4.625 30.1094 4.94985 30.8937 5.52809 31.4719C6.10632 32.0501 6.89058 32.375 7.70833 32.375H29.2917C30.1094 32.375 30.8937 32.0501 31.4719 31.4719C32.0501 30.8937 32.375 30.1094 32.375 29.2917V7.70833C32.375 6.89058 32.0501 6.10632 31.4719 5.52809C30.8937 4.94985 30.1094 4.625 29.2917 4.625H7.70833C6.89058 4.625 6.10632 4.94985 5.52809 5.52809C4.94985 6.10632 4.625 6.89058 4.625 7.70833Z" fill="#043163"/>
                </svg>
              </div>
              <div className="text-center font-poppins font-semibold text-[20px]" style={{ color: "#073C9E" }}>
                PG Contacts
              </div>
            </button>

            {/* Card: Stay */}
            <button
              aria-label="Extend or End Stay Request"
              onClick={() => setIsExtendStayOpen(true)}
              className="group w-[220px] h-[171px] rounded-[25px] bg-white shadow-[6px_6px_6px_rgba(0,0,0,0.25)] relative flex flex-col items-center justify-center gap-4 p-2 transition-transform duration-200 hover:-translate-y-2"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[1px] rounded-[25px] border-[0.7px] border-transparent pointer-events-none group-hover:border-[#4F6BE3]"
              />
              <div className="w-[42px] h-[42px] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path d="M2.8335 26.9168C2.8335 29.3252 4.67516 31.1668 7.0835 31.1668H26.9168C29.3252 31.1668 31.1668 29.3252 31.1668 26.9168V15.5835H2.8335V26.9168ZM26.9168 5.66683H24.0835V4.25016C24.0835 3.40016 23.5168 2.8335 22.6668 2.8335C21.8168 2.8335 21.2502 3.40016 21.2502 4.25016V5.66683H12.7502V4.25016C12.7502 3.40016 12.1835 2.8335 11.3335 2.8335C10.4835 2.8335 9.91683 3.40016 9.91683 4.25016V5.66683H7.0835C4.67516 5.66683 2.8335 7.5085 2.8335 9.91683V12.7502H31.1668V9.91683C31.1668 7.5085 29.3252 5.66683 26.9168 5.66683Z" fill="#043163"/>
                </svg>
              </div>
              <div className="text-center font-poppins font-semibold text-[20px]" style={{ color: "#073C9E" }}>
                Stay
              </div>
            </button>

          </div>
        </div>
      </div>


    </>
  );
}