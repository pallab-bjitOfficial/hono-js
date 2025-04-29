import { model, Schema } from "mongoose";

import { IPost } from "../../types/posts";

const postSchema = new Schema<IPost>(
    {
        content: { required: true, type: String },
        tags: [{ required: false, type: String }],
        title: { required: true, type: String },
        user: { ref: "Auth", required: true, type: Schema.Types.ObjectId },
    },
    { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);
export default Post;
