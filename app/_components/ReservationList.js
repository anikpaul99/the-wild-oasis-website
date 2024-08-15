"use client";

import ReservationCard from "./ReservationCard";
import { deleteReservation } from "@/app/_lib/actions";
import { useOptimistic } from "react";

/**
 * The list of all reservations that the user has made. It is to be displayed when visited to '/account/reservations' URL.
 * @prop {Object[]} bookings An array containing an object which holds the data about the guests all bookings. The object contains the 'id', 'created_at', 'startDate', 'endDate', 'numNights', 'totalPrice', 'guestId', 'cabinId', 'cabins' - related to the particular reservation/booking.. The 'name' and 'image' is also fetched from the 'cabins'.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
