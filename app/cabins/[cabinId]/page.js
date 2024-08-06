import { Suspense } from "react";

import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";

import { getCabin, getCabins } from "@/app/_lib/data-service";

/**
 * Will generate a dynamic title for each specific cabin. (e.g. Cabin 001)
 * @prop {Object} params The param, which is the object that will hold the 'cabinId' from the URL.
 * @returns {Object}
 * @author Anik Paul
 */
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);

  return { title: `Cabin ${name}` };
}

/**
 * Transform the dynamic cabin page '/ccabins/cabinId' to static page.
 * @returns {Object[]}
 * @author Anik Paul
 */
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

/**
 * Information about specific cabin with the coresponding id. Will also be responsible for 'reservation' and will be rendered when visited to '/cabin/cabinId'.
 * @prop {Object} params The param, which is the object that will hold the 'cabinId' from the URL.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name}. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
