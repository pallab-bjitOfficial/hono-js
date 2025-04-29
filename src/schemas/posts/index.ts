import { isValidObjectId, Schema } from "mongoose";
import { z } from "zod";

export const createPostSchema = z.object({
    content: z.string().min(1).max(5000),
    tags: z.array(z.string()).optional(),
    title: z.string().min(1).max(100),
});

export const postByIdSchema = z.string().superRefine((val, ctx) => {
    if (!isValidObjectId(val)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid post ID",
        });
        return true;
    }
});

export const updatePostSchema = z.object({
    content: z.string().min(1).max(5000).optional(),
    tags: z.array(z.string()).optional(),
    title: z.string().min(1).max(100).optional(),
});

export type getPostByIdSchemaParams = z.infer<typeof postByIdSchema>;
