import * as reservationService from "../../services/admin/admin.Reservation.js";

export const getSlots = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const slots = await reservationService.getAvailableSlots(date);

    res.json({ success: true, data: slots });
  } catch (error) {
    next(error);
  }
};

export const createReservation = async (req, res, next) => {
  try {
    const reservation = await reservationService.createReservation(req.body);

    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

export const getReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getAllReservations();

    res.json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};
