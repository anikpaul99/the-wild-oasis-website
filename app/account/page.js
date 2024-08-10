import { auth } from "@/app/_lib/auth";

export const metadata = {
  title: "Guest area",
};

/**
 * The page to be responsible for users account. It is to be displayed when visited to '/account' URL.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
export default async function Page() {
  const session = await auth();
  const firstName = session.user.name.split(" ").at(0);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}
