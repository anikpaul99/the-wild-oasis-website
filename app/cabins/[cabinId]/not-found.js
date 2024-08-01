import Link from "next/link";

/**
 * To be rendered when visited to a single cabin that does not exist.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This cabin could not be found :(
      </h1>
      <Link
        href="/cabins"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Back to all cabins
      </Link>
    </main>
  );
}

export default NotFound;
