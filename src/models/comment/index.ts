import { model, Schema } from "mongoose";

import { IComment } from "../../types/comment";

const commentSchema = new Schema<IComment>(
    {
        dislikes: [
            {
                user: {
                    ref: "Auth",
                    required: true,
                    type: Schema.Types.ObjectId,
                },
            },
        ],
        isDeleted: {
            default: false,
            type: Boolean,
        },
        likes: [
            {
                user: {
                    ref: "Auth",
                    required: true,
                    type: Schema.Types.ObjectId,
                },
            },
        ],
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
        text: {
            required: true,
            type: String,
        },
        user: {
            ref: "Auth",
            required: true,
            type: Schema.Types.ObjectId,
        },
    },
    { timestamps: true }
);

const Comment = model<IComment>("Comment", commentSchema);
export default Comment;
