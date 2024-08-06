import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";

export const metadata = {
  title: "Update profile",
};

/**
 * The users profile page, where the users will be able to update their profile. It is to be displayed when visited to '/account/profile' URL.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
export default function Page() {
  // CHANGE
  const countryFlag = "bd.jpg";
  const nationality = "bangladeshi";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
