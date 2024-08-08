import Link from "next/link";

/**
 * Will be rendered in the reservation form (/cabins/cabinId), if the user is not logged in. Will take the user to the '/login' page.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function LoginMessage() {
  return (
    <div className="grid bg-primary-800 ">
      <p className="text-center text-xl py-12 self-center">
        Please{" "}
        <Link href="/login" className="underline text-accent-500">
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
