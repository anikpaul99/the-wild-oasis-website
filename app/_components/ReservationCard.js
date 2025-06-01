import Image from "next/image";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";

import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

/**
 * Each 'past' / 'upcoming' reservation/booking of the guest. Will display which cabin was reserved, also how many nights the guest stayed or want to stay. Will display the time of when the cabin was reserved. Will display the number of guest and also the price of the cabin. Only the 'upcoming' reservation will have the option to be edited or deleted.
 * @prop {Object} booking The object contains the 'id', 'created_at', 'startDate', 'endDate', 'numNights', 'totalPrice', 'guestId', 'cabinId', 'cabins' - related to the particular reservation/booking.
 * @prop {function} onDelete the function to be responsible for the delete operation of a reservation.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex md:flex-row flex-col border border-primary-800">
      <div className="relative min-h-32 max-h-40 aspect-square">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow md:px-6 px-3 md:py-3 py-2 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="md:text-xl text-base font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 md:h-7 h-5 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 md:h-7 h-5 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="md:text-lg text-base text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-wrap md:gap-5 gap-3 mt-auto items-baseline">
          <p className="md:text-xl text-base font-semibold text-accent-400">
            ${totalPrice}
          </p>
          <p className="text-primary-300">&bull;</p>
          <p className="md:text-xl text-base text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>

        {!isPast(startDate) && (
          <div className=" md:hidden flex items-center h-full self-end">
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300  px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </div>
        )}
      </div>

      {!isPast(startDate) && (
        <div className="hidden md:flex flex-col border-l border-primary-800 w-[100px]">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Edit</span>
          </Link>
          <DeleteReservation bookingId={id} onDelete={onDelete} />
        </div>
      )}
    </div>
  );
}

export default ReservationCard;
