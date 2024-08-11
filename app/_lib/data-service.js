import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";

/////////////
// GET

/**
 * Will return the single cabin data with the coresponding id from the database.
 * @param {string} id The id (from the URL) of the cabin  which data will be fetched from the database.
 * @returns {Object} The cabins data including 'id', 'name', 'maxCapacity', 'regularPrice', 'discount', 'image'.
 * @author Anik Paul
 */
export async function getCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

/**
 * Will return the cabins data from our database
 * @returns {Object []} The cabins data including 'id', 'name', 'maxCapacity', 'regularPrice', 'discount', 'image'.
 * @author Anik Paul
 */
export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

/**
 * Will get the guest with the coresponding 'email' from the 'guests' table in the database. Guests are uniquely identified by their email address.
 * @param {string} email the email of the guest of which data we want to retrieve from the 'guests' table in the database.
 * @returns {Object} Object containing the 'id', 'created_at', 'fullName', 'email', 'nationalId', 'nationality', 'countryFlag' of the guest.
 * @author Anik Paul
 */
export async function getGuest(email) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

/**
 * Will get all the dates that have been booked already. First it will get all the bookings from supabase. Then it will convert them to actual dates to be displayed in the date picker.
 * @param {string} cabinId the cabin id from the url.
 * @returns {Object []} Each date will be in 'ISO 8601 date string' type. e.g  [ 024-08-10T18:00:00.000Z, 2024-08-11T18:00:00.000Z, 2024-08-12T18:00:00.000Z]
 * @author Anik Paul
 */
export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

/**
 * Will return the settings data from our database
 * @returns {Object} Object contains 'id', 'created_at', 'minBookingLength', 'maxBookingLength', 'maxGuestsPerBooking', 'breakfastPrice'.
 * @author Anik Paul
 */
export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

/**
 * Will return the countries data.
 * @returns {Object[]} An array objects, where each object represent a country. Each country object contains the 'name', 'flag', 'independent'.
 * @author Anik Paul
 */
export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

/////////////
// CREATE

/**
 * Will create a new guest in the 'guests' table in the database.
 * @param {object} newGuest Object containing 'email' and 'fullName' that we want to set for the newly created guest in the 'guests' table in the database.
 * @author Anik Paul
 */
export async function createGuest(newGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}
