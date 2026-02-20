import Reservation from "../../modules/reservation/reservation.module.js";

const generateTimeSlots = (openTime, closeTime, duration) => {
  const slots = [];

  let [openHour, openMinute] = openTime.split(":").map(Number);
  let [closeHour, closeMinute] = closeTime.split(":").map(Number);

  let start = new Date();
  start.setHours(openHour, openMinute, 0);

  let end = new Date();
  end.setHours(closeHour, closeMinute, 0);

  while (start < end) {
    const hours = start.getHours().toString().padStart(2, "0");
    const minutes = start.getMinutes().toString().padStart(2, "0");

    slots.push(`${hours}:${minutes}`);

    start = new Date(start.getTime() + duration * 60000);
  }

  return slots;
};

export const createReservation = async (data) => {
  return await Reservation.create(data);
};
