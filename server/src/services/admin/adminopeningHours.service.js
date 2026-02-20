import OpeningHours from "../../modules/openingHours/openingHours.model.js";

export const createOpeningHoursService = async (data) => {
  return await OpeningHours.create(data);
};

export const getAllOpeningHoursService = async () => {
  return await OpeningHours.find();
};

export const getOpeningByDayService = async (day) => {
  return await OpeningHours.findOne({ day });
};

export const UpsertOpeningHourService = async (day, date) => {
  return await OpeningHours.findOneAndUpdate({ day }, date, {
    new: true,
    upsert: true,
  });
};
