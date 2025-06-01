import Link from "next/link";
import { auth } from "@/app/_lib/auth";

/**
 * Navigation of tha app (Navigate to 'Home', 'Cabins', 'About', 'Guest area', pages)
 * @returns {JSX.Element}
 * @author Anik Paul
 */
export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 md:text-xl sm:text-lg text-base sm:mt-0 mt-3">
      <ul className="flex md:gap-16 sm:gap-12 gap-7 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center md:gap-4 gap-2"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
