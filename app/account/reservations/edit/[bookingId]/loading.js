import Spinner from "@/app/_components/Spinner";

/**
 * A loader. Will apply to '/account/reservations/edit/[bookingId]' route.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
export default function Loading() {
  return <Spinner />;
}
