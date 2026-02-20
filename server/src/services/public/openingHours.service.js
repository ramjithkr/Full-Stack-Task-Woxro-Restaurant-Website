import OpeningHours from "../../modules/openingHours/openingHours.model.js";

export const getAllOpeningHours = async () => {
  return await OpeningHours.find();
};

export const getOpeningByDay = async (day) => {
  return await OpeningHours.findOne({ day });
};

// export const UpsertOpeningHour = async (day, date) => {
//   return await OpeningHours.findOneAndUpdate({ day }, date, {
//     new: true,
//     upsert: true,
//   });
// };
