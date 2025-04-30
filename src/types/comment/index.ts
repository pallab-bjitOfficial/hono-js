import { Schema } from "mongoose";

export interface IAddComment {
    parent?: string;
    post: string;
    text: string;
    user: string;
}

export interface IAllCommentResponse {
    __v: number;
    _id: string;
    createdAt: Date;
    post: string;
    replies: IAllCommentResponse[];
    text: string;
    updatedAt: Date;
    user: string;
}

export interface IComment {
    createdAt: Date;
    isDeleted?: boolean;
    parent: Schema.Types.ObjectId;
    post: Schema.Types.ObjectId;
    text: string;
    updatedAt: Date;
    user: Schema.Types.ObjectId;
}
