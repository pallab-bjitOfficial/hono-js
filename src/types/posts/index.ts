import { Schema } from "mongoose";

export interface IPost {
    content: string;
    createdAt: Date;
    tags: string[];
    title: string;
    updatedAt: Date;
    user: Schema.Types.ObjectId;
}
