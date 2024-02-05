import mongoose from "mongoose";
import { USERS_COLLECTION, USERS_MODEL } from "./constants.js";
import { hashPassword } from "./hooks/index.js";
import * as methods from "./methods/index.js";
import UserSchema from "./schema.js";

// ======================== Attach Hooks ====================================
const preSaveHooks = [hashPassword];
preSaveHooks.forEach((hook) => {
  UserSchema.pre("save", hook);
});

// ======================== Attach methods ========================
UserSchema.methods = { ...methods };

const Users = mongoose.model(USERS_MODEL, UserSchema, USERS_COLLECTION);

export default Users;
