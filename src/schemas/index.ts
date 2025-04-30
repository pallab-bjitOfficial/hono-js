import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const mongoIdSchema = z.string().superRefine((val, ctx) => {
    if (!isValidObjectId(val)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid ID",
        });
        return true;
    }
});

export type getPostByIdSchemaParams = z.infer<typeof mongoIdSchema>;
