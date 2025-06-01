"use client";

import Link from "next/link";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

import SignOutButton from "./SignOutButton";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

/**
 * Side navigation for the guest area. (Navigate to 'Guest Area', 'Reservations', 'Profile' pages)
 * @returns {JSX.Element}
 * @author Anik Paul
 */
function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r border-primary-900 lg:min-w-[225px] sm:min-w-[195px]">
      <ul className="flex flex-col gap-2 h-full text-base sm:text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`lg:py-3 lg:px-5 md:px-2 py-2 px-3  hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center md:gap-3 gap-2 font-semibold text-primary-200 rounded-l-full w-full ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span className="max-sm:hidden">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
