import Image from "next/image";
import { signInAction } from "@/app/_lib/actions";

/**
 * The button to be responsible for the login operation. When clicked the user will be redirected to '/account' route. It is to be displayed when visited to '/login' URL.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
