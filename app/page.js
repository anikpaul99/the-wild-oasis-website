import Image from "next/image";
import Link from "next/link";

import bg from "@/public/bg.png";

/**
 * The home page of the wild oasis website. Will be rendered when visited to '/' URL.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
export default function Page() {
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="md:text-8xl sm:text-6xl text-5xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 md:px-8 md:py-6 px-6 py-4 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
