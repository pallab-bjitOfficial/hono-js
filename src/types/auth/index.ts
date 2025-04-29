import { Document } from "mongoose";

export interface IAuth extends Document {
    createdAt: Date;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    updatedAt: Date;
    userName: string;
}

export interface IJWTPayload {
    [key: string]: unknown;
    email: string;
    id: string;
    userName: string;
}
