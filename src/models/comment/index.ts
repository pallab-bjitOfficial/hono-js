import { model, Schema } from "mongoose";

import { IComment } from "../../types/comment";

const commentSchema = new Schema<IComment>(
    {
        parent: {
            ref: "Comment",
            required: false,
            type: Schema.Types.ObjectId,
        },
        post: {
            ref: "Post",
            required: true,
            type: Schema.Types.ObjectId,
        },
        user: {
            ref: "Auth",
            required: true,
            type: Schema.Types.ObjectId,
        },
        text: {
            required: true,
            type: String,
        },
        isDeleted: {
            default: false,
            type: Boolean,
        },
    },
    { timestamps: true }
);

const Comment = model<IComment>("Comment", commentSchema);
export default Comment;
