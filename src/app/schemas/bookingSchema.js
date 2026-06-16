import { z } from 'zod';

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
    // TODO: define field validations here
  });
