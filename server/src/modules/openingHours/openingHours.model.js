import mongoose from "mongoose";

const openingHoursSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      unique: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    openTime: {
      type: String,
      required: true,
    },
    closeTime: {
      type: String,
      required: true,
    },
    slotDuration: {
      type: Number,
      default: 60,
    },
  },
  {
    timestamps: true,
  },
);

const OpeningHours = mongoose.model("OpeningHours", openingHoursSchema);
export default OpeningHours;
