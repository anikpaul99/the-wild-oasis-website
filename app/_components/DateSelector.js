"use client";

import "react-day-picker/dist/style.css";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";

import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  // Check if range is defined and has 'from' and 'to' properties
  if (!range || !range.from || !range.to) {
    return false;
  }

  return datesArr.some((date) =>
    isWithinInterval(date, { start: range.from, end: range.to })
  );
}

function convertToUTC(date) {
  // Convert date to UTC at midnight
  const utcDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return utcDate;
}

/**
 * A date picker, from where the user will be able to select a range of dates. Will be rendered when visited to '/cabin/cabinId'.
 * @prop {Object} settings Object contains 'id', 'created_at', 'minBookingLength', 'maxBookingLength', 'maxGuestsPerBooking', 'breakfastPrice'.
 * @prop {Object} cabin The cabins data including 'id', 'name', 'maxCapacity', 'regularPrice', 'discount', 'image'.
 * @prop {Object []} bookedDates All the dates that have been booked already. Each date will be in 'ISO 8601 date string' type. e.g  [ 024-08-10T18:00:00.000Z, 2024-08-11T18:00:00.000Z, 2024-08-12T18:00:00.000Z]
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  let numNights = 0; // Default value in case displayRange is not valid

  if (displayRange && displayRange.from && displayRange.to) {
    numNights = differenceInDays(displayRange.to, displayRange.from);
  }

  const { regularPrice, discount } = cabin;
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={(selectedRange) => {
          if (selectedRange?.from && selectedRange?.to) {
            const correctedSelectedRange = {
              from: convertToUTC(selectedRange.from),
              to: convertToUTC(selectedRange.to),
            };
            setRange(correctedSelectedRange);
          } else {
            setRange(selectedRange);
          }
        }}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range && (range.from || range.to) ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
