export const getAllReservations = async () => {
  return await Reservation.find().sort({ date: 1 });
};
