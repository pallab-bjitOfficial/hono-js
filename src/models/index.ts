import { model, Schema } from "mongoose";
import { IPost } from "../types/posts";

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "Auth", required: true },
    tags: [{ type: String, required: false }],
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);
export default Post;
