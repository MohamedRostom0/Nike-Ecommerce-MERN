import mongoose from "mongoose";
import { PHONE_NUMBER_REGEX } from "../../../common/constants/regex.js";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, trim: true, required: true },

    password: {
      type: String,
      minlength: 6,
      required: true,
    },

    profile: {
      name: { type: String, required: true },
      phone: { type: String, match: PHONE_NUMBER_REGEX, default: "" },
      address: {
        type: {
          street: String,
          city: String,
          state: String,
          country: String,
          postalCode: String,
        },
        required: true,
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default UserSchema;
