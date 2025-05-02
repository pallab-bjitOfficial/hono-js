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
    dislikes: {
        user: Schema.Types.ObjectId;
    }[];
    isDeleted?: boolean;
    likes: {
        user: Schema.Types.ObjectId;
    }[];
    parent: Schema.Types.ObjectId;
    post: Schema.Types.ObjectId;
    text: string;
    updatedAt: Date;
    user: Schema.Types.ObjectId;
}
