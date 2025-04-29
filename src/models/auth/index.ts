import { model, Schema } from "mongoose";

import { IAuth } from "../../types/auth";

const authSchema = new Schema<IAuth>(
    {
        email: { required: true, type: String, unique: true },
        firstName: { required: true, type: String },
        lastName: { required: true, type: String },
        password: { required: true, type: String },
        userName: { required: true, type: String, unique: true },
    },
    { timestamps: true }
);

const Auth = model<IAuth>("Auth", authSchema);
export default Auth;
