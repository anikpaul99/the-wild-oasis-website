import { getCountries } from "@/app/_lib/data-service";

/**
 * A select element, which contains option of all the different countries. A form to update the guest profile, is to be displayed when visited to '/account/profile' URL. There is this select options of different countries, from where the user will be able to chose their own country.
 * @returns {JSX.Element}
 * @author Anik Paul
 */
async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();
  const flag =
    countries.find((country) => country.name === defaultCountry)?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
