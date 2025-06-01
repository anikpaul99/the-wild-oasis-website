"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createReservation } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

/**
 * A form where the user will be able to put in the 'number of guests', 'some additional details' that they want for the reservation. Will be rendered when visited to '/cabin/cabinId'.
 * @prop {Object} cabin The cabins data including 'id', 'name', 'maxCapacity', 'regularPrice', 'discount', 'image'.
 * @prop {Object} user Object containing the logged in users 'name', 'email', 'image'.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * regularPrice - discount;

  const reservationData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createReservationWithData = createReservation.bind(
    null,
    reservationData
  );

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-10 py-[6px] md:px-16 md:py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex md:gap-4 gap-3  items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-5 rounded-full sm:h-8"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 md:py-10 md:px-16 sm:py-8 sm:px-12 py-6 px-8 sm:text-lg text-base flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-3 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm sm:px-5 sm:py-3"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-3 py-2 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm sm:px-5 sm:py-3"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
