import Spinner from "@/app/_components/Spinner";

/**
 * A loader that will apply to '/cabins' route.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
