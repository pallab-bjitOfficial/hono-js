import { z } from "zod";

import { Reaction } from "../../constant";

export const createCommentSchema = z.object({
    text: z.string().min(1),
});

export const reactToCommentSchema = z.object({
    reaction: z.enum([Reaction.LIKE, Reaction.DISLIKE]),
});
