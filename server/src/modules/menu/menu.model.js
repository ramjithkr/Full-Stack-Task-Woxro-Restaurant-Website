import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: { type: String, required: true },
    image: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
