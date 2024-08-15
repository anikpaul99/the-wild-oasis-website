"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition, useState } from "react";
import SpinnerMini from "./SpinnerMini";
import ConfirmDeleteReservationModal from "./ConfirmDeleteReservationModal";

/**
 * To be responsible to delete the 'upcoming' reservation.
 * @prop {string} bookingId The 'id' - related to the particular reservation/booking which should be deleted.
 * @prop {function} onDelete the function to be responsible for the delete operation of a reservation.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDelete() {
    setIsModalOpen(true);
  }

  function handleConfirmDelete() {
    setIsModalOpen(false);
    startTransition(() => onDelete(bookingId));
  }

  function handleCancelDelete() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button
        onClick={handleDelete}
        className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
      >
        {!isPending ? (
          <>
            <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Delete</span>
          </>
        ) : (
          <span className="mx-auto">
            <SpinnerMini />
          </span>
        )}
      </button>

      <ConfirmDeleteReservationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default DeleteReservation;
