import { model, Schema } from "mongoose";
import { IAuth } from "../../types/auth";

const authSchema = new Schema<IAuth>(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

const Auth = model<IAuth>("Auth", authSchema);
export default Auth;
