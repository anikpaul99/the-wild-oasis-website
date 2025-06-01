"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

/**
 * Component to remind user about the reservation date, to complete the reservation.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="w-full sm:w-fit fixed bottom-6 left-1/2 -translate-x-1/2 py-2 px-4 sm:px-8 sm:py-5 rounded-full bg-accent-500 text-primary-800 text-sm sm:text-base font-semibold shadow-xl shadow-slate-900 flex gap-4 sm:gap-8 items-center justify-center">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
        onClick={resetRange}
      >
        <XMarkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
