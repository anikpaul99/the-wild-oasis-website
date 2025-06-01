import Link from "next/link";

/**
 * To be rendered when visited to a single cabin that does not exist.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="sm:text-3xl text-lg font-semibold">
        This cabin could not be found :(
      </h1>
      <Link
        href="/cabins"
        className="inline-block bg-accent-500 text-primary-800 sm:px-6 sm:py-3  px-4 py-2 sm:text-lg text-base"
      >
        Back to all cabins
      </Link>
    </main>
  );
}

export default NotFound;
