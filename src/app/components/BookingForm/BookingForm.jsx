'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createBookingSchema } from '../../schemas/bookingSchema';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './BookingForm.module.css';

export default function BookingForm() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: fetch available time slots from `/api/time-slots` and store them via `setTimeSlots`.
    // Guard against state updates after unmount, and clear `isLoading` (via `setIsLoading`) once done.
  }, []);

  // TODO: build the Zod resolver from `createBookingSchema(timeSlots)`, recomputed when `timeSlots` changes.
  const resolver = undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const onSubmit = (data) => {
    // TODO: on successful submit, show `alert('Booking successful!')` as described in README.md → "Components".
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputGroup}>
        <label htmlFor="bookerName" className={styles.label}>
          Booker Name
        </label>
        {/* TODO: register this field with `register('bookerName')` */}
        <input id="bookerName" className={styles.input} />
        {/* TODO: render <ErrorMessage message={errors.bookerName?.message?.toString()} /> */}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="bookerEmail" className={styles.label}>
          Booker Email
        </label>
        {/* TODO: register this field with `register('bookerEmail')` */}
        <input id="bookerEmail" className={styles.input} type="email" />
        {/* TODO: render <ErrorMessage message={errors.bookerEmail?.message?.toString()} /> */}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventName" className={styles.label}>
          Event Name
        </label>
        {/* TODO: register this field with `register('eventName')` */}
        <input id="eventName" className={styles.input} />
        {/* TODO: render <ErrorMessage message={errors.eventName?.message?.toString()} /> */}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventDate" className={styles.label}>
          Event Date
        </label>
        {/* TODO: register this field with `register('eventDate')` */}
        <input id="eventDate" className={styles.input} type="date" />
        {/* TODO: render <ErrorMessage message={errors.eventDate?.message?.toString()} /> */}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="numberOfGuests" className={styles.label}>
          Number of Guests
        </label>
        {/* TODO: register this field with `register('numberOfGuests')` */}
        <input id="numberOfGuests" className={styles.input} type="number" />
        {/* TODO: render <ErrorMessage message={errors.numberOfGuests?.message?.toString()} /> */}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="timeSlot" className={styles.label}>
          Time Slot
        </label>
        {/* TODO: register this field with `register('timeSlot')` */}
        <select id="timeSlot" className={styles.input}>
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        {isLoading && <p>Loading time slots...</p>}
        {!isLoading && timeSlots.length === 0 && <p>No time slots available.</p>}
        {/* TODO: render <ErrorMessage message={errors.timeSlot?.message?.toString()} /> */}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="eventLink" className={styles.label}>
          Event Link (Online)
        </label>
        {/* TODO: register this field with `register('eventLink')` */}
        <input id="eventLink" className={styles.input} type="url" />
        {/* TODO: render <ErrorMessage message={errors.eventLink?.message?.toString()} /> */}
      </div>

      <button className={styles.button} type="submit">
        Book Event
      </button>
    </form>
  );
}
