"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isWithinInterval } from "date-fns";

import { getBookings, getGuest } from "./data-service";

/**
 * Update the guests profile.
 * @param {Object} formData all the form data that have been passed from the UpdateProfileForm. 'formData' contains updated 'nationality', 'country flag', 'natinoalID' of the guest.
 * @author Anik Paul
 */
export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const {
    nationality: nationalityCurrent,
    countryFlag: countryFlagCurrent,
    nationalID: nationalIDCurrent,
  } = await getGuest(session.user.email);

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  if (
    nationalityCurrent === nationality &&
    countryFlagCurrent === countryFlag &&
    nationalIDCurrent === nationalID
  )
    return;

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

/**
 * Create a new reservation.
 * @param {Object} reservationData object containing all the necessary data for the reservation. it contains: 'startDate', 'endDate', 'numNights', 'cabinPrice', 'cabinId'.
 * @param {Object} formData all the form data that have been passed from the ReservationForm. 'formData' contains 'numGuests', 'observations' from the input field.
 * @author Anik Paul
 */
export async function createReservation(reservationData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { startDate, endDate, cabinId } = reservationData;

  // Ensure startDate and endDate are in ISO 8601 format
  const startDateISO = new Date(startDate).toISOString();
  const endDateISO = new Date(endDate).toISOString();

  // Step 1: Check if the dates overlap with any existing bookings
  const { data: existingBookings, error: fetchError } = await supabase
    .from("bookings")
    .select("startDate, endDate")
    .eq("cabinId", cabinId)
    .filter("startDate", "lte", endDateISO)
    .filter("endDate", "gte", startDateISO); // Use multiple filters for date range overlap

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Error checking existing bookings");
  }

  // Step 2: Check if any of the existing bookings overlap with the requested dates
  const isOverlap = existingBookings.some((booking) => {
    const bookingInterval = {
      start: new Date(booking.startDate),
      end: new Date(booking.endDate),
    };
    const requestedInterval = {
      start: new Date(startDate),
      end: new Date(endDate),
    };
    return (
      isWithinInterval(requestedInterval.start, bookingInterval) ||
      isWithinInterval(requestedInterval.end, bookingInterval) ||
      isWithinInterval(bookingInterval.start, requestedInterval) ||
      isWithinInterval(bookingInterval.end, requestedInterval)
    );
  });

  if (isOverlap) {
    throw new Error("Selected dates are already booked");
  }

  // Step 3: If no overlap, proceed with creating the reservation
  const newReservation = {
    ...reservationData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: reservationData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newReservation]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${reservationData.cabinId}`);

  redirect("/cabins/thankyou");
}

/**
 * To be responsible to delete the 'upcoming' reservation.
 * @param {string} bookingId The 'id' - related to the particular reservation/booking which should be deleted.
 * @author Anik Paul
 */
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

/**
 * Update a reservation.
 * @param {Object} formData all the form data that have been passed from the '[bookingId]/page.js'. 'formData' contains updated reservations 'id', 'numGuests', 'observations'.
 * @author Anik Paul
 */
export async function updateReservation(formData) {
  const bookingId = Number(formData.get("bookingId"));

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
