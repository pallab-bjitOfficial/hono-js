import { Schema } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}
