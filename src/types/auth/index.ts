import { Document } from "mongoose";

export interface IAuth extends Document {
  userName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJWTPayload {
  id: string;
  email: string;
  userName: string;
  [key: string]: unknown;
}
