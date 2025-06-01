import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/actions";

/**
 * The button to be responsible for the signout operation. When clicked the user will be redirected to '/' route. It is to be displayed when visited to '/account' URL.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="lg:py-3 lg:px-5 md:px-2 py-2 px-3 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-2 md:gap-4 font-semibold text-primary-200 w-full">
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
        <span className="max-sm:hidden">Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
