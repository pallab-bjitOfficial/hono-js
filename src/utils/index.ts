import bcrypt from "bcrypt";
import { sign } from "hono/jwt";

import env from "../configs/environment";
import { IJWTPayload } from "../types/auth";
import { IAllCommentResponse, IComment } from "../types/comment";

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(env.SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
    password: string,
    hashedPassword: string
) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateAccessToken = async (data: IJWTPayload) => {
    return await sign(data, env.JWT_SECRET);
};

export const structureComments = (data: IComment[]) => {
    const commentsById: any = {};

    // Ensure all comments are in plain object form and initialize 'replies' array
    data.forEach((comment: any) => {
        commentsById[comment._id] = {
            ...comment,
            replies: [],
            ...(comment.isDeleted && { text: undefined }), // Remove text if isDeleted is true
        };
    });

    const rootComments: IAllCommentResponse[] = [];

    data.forEach((comment: any) => {
        if (comment.parent?._id) {
            // Check if there's a parent ID
            if (commentsById[comment.parent._id]) {
                // Ensure the parent exists in the map
                commentsById[comment.parent._id].replies.push(
                    commentsById[comment._id]
                );
            }
        } else {
            rootComments.push(commentsById[comment._id]);
        }
    });

    return rootComments;
};
