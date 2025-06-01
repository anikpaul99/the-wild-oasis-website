"use client";

import { useFormStatus } from "react-dom";

/**
 * A submmit button.
 * @prop {Object} padningLabel Text to be shown in the button, when an operation is happening in the background. e.g. it can be 'Updating...', when a reservation is being updated in the background.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
export default function SubmitButton({ pendingLabel, children }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 md:px-8 md:py-4 px-5 py-2 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
