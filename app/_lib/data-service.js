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
