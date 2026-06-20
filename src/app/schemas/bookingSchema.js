import { z } from "zod";

/**
 * Builds the Zod schema for the booking form.
 *
 * TODO: implement the validation rules described in README.md → "Form Fields & Validation Rules":
 *  - bookerName: string, required, min 2 characters
 *  - bookerEmail: string, optional, must be a valid email when provided (empty string is allowed)
 *  - eventName: string, required, min 2 characters
 *  - eventDate: required, must be a future date
 *  - numberOfGuests: number, required, integer, min 1, max 10
 *  - timeSlot: string, required, must be one of `availableTimeSlots`
 *  - eventLink: string, required, must be a valid URL
 *
 * @param {string[]} availableTimeSlots - time slots fetched from `/api/time-slots`
 */

export const createBookingSchema = (availableTimeSlots = []) =>
  z.object({
    bookerName: z
      .string()
      .trim()
      .min(2, "Booker name must be at least 2 characters long"),

    bookerEmail: z.preprocess(
      (x) => (x === "" ? undefined : x),
      z.string().email("Invalid email address").optional(),
    ),

    eventName: z
      .string()
      .trim()
      .min(2, "Event name must be at least 2 characters long"),

    eventDate: z.coerce
      .date()
      .min(new Date(), "Event date must be in the future"),

    numberOfGuests: z.coerce
      .number()
      .int("Must be a whole number")
      .min(1, "Minimum 1 guest required")
      .max(10, "Number of Guests must be less than or equal to 10"),

    timeSlot: z
      .string()
      .refine((e) => availableTimeSlots.includes(e), {
        message: "Selected time slot is unavailable",
      }),

    eventLink: z.string().url("Invalid URL. Please enter a valid event link"),
  });
