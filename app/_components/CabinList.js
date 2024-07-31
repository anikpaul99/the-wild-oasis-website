import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

/**
 * Each cabin card will display the image of the cabin, the name of the cabin, maximum capacity for each cabin, price of the cabin per night, and a link to know more detail and reservation.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
async function CabinList() {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
