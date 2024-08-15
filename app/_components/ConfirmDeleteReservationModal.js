"use client";

/**
 * A confirmation modal, to make sure whether the guest really wants to delete the reservation.
 * @prop {boolean} isOpen wehther the modal is open or not. 'true' indicates it is opened and 'false' means it is closed.
 * @prop {function} onClose the function responsible to close the modal. will set the 'isModalOpen' back to 'false'
 * @prop {function} onConfirm will delete the reservation and close the modal.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function ConfirmDeleteReservationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-65 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-primary-950 p-8 rounded-lg shadow-lg w-[32rem] max-w-full">
        <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6 text-xl">
          Are you sure you want to delete this reservation?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 uppercase text-sm font-bold text-primary-300 hover:bg-accent-600 transition-colors hover:text-primary-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-3 uppercase text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteReservationModal;
