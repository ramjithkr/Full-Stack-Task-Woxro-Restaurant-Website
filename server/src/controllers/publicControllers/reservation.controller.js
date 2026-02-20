import OpeningHours from "../../modules/openingHours/openingHours.model.js";
import Reservation from "../../modules/reservation/reservation.module.js";

export const getAvailableSlots = async (date) => {
  const selectedDate = new Date(date);

  const dayName = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const opening = await OpeningHours.findOne({ day: dayName });

  if (!opening || !opening.isOpen) {
    return [];
  }

  const allSlots = generateTimeSlots(
    opening.openTime,
    opening.closeTime,
    opening.slotDuration,
  );

  const existingReservations = await Reservation.find({
    date: selectedDate,
    status: "confirmed",
  });

  const bookedSlots = existingReservations.map((r) => r.slotTime);

  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  return availableSlots;
};

export const createReservation = async (data) => {
  return await Reservation.create(data);
};
