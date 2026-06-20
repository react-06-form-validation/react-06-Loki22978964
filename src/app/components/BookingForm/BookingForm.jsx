"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createBookingSchema } from "../../schemas/bookingSchema";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./BookingForm.module.css";

export default function BookingForm() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: fetch available time slots from `/api/time-slots` and store them via `setTimeSlots`.
    // Guard against state updates after unmount, and clear `isLoading` (via `setIsLoading`) once done.

    let isMounted = true;

    fetch("/api/time-slots")
      .then((res) => res.json())
      .then((date) => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid API response format");
        }

        if (isMounted) {
          setTimeSlots(date);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("Failed to fetch time slots:", error);
          setIsLoading(false);
          setError("Failed to load time slots. Please try again.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // TODO: build the Zod resolver from `createBookingSchema(timeSlots)`, recomputed when `timeSlots` changes.
  const resolver = useMemo(
    () => zodResolver(createBookingSchema(timeSlots)),
    [timeSlots],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const onSubmit = (data) => {
    // TODO: on successful submit, show `alert('Booking successful!')` as described in README.md → "Components".
    console.log("Booking data:", data);
    alert("Booking successful!");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputGroup}>
        <label htmlFor="bookerName" className={styles.label}>
          Booker Name
        </label>
        <input
          id="bookerName"
          className={styles.input}
          {...register("bookerName")}
        />
        <ErrorMessage message={errors.bookerName?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="bookerEmail" className={styles.label}>
          Booker Email
        </label>

        <input
          id="bookerEmail"
          className={styles.input}
          type="email"
          {...register("bookerEmail")}
        />
        <ErrorMessage message={errors.bookerEmail?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventName" className={styles.label}>
          Event Name
        </label>
        <input
          id="eventName"
          className={styles.input}
          {...register("eventName")}
        />
        <ErrorMessage message={errors.eventName?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventDate" className={styles.label}>
          Event Date
        </label>
        <input
          id="eventDate"
          className={styles.input}
          type="date"
          {...register("eventDate")}
        />
        <ErrorMessage message={errors.eventDate?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="numberOfGuests" className={styles.label}>
          Number of Guests
        </label>
        <input
          id="numberOfGuests"
          className={styles.input}
          type="number"
          {...register("numberOfGuests")}
        />
        <ErrorMessage message={errors.numberOfGuests?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="timeSlot" className={styles.label}>
          Time Slot
        </label>
        <select
          id="timeSlot"
          className={styles.input}
          {...register("timeSlot")}
        >
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        {isLoading && <p>Loading time slots...</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
        {!isLoading && !error && timeSlots.length === 0 && (
          <p>No time slots available.</p>
        )}

        <ErrorMessage message={errors.timeSlot?.message} />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventLink" className={styles.label}>
          Event Link (Online)
        </label>
        <input
          id="eventLink"
          className={styles.input}
          type="url"
          {...register("eventLink")}
        />
        <ErrorMessage message={errors.eventLink?.message} />
      </div>

      <button className={styles.button} type="submit" disabled={isLoading}>
        Book Event
      </button>
    </form>
  );
}
