import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";

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
