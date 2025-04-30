import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { z, ZodString } from "zod";

export const validateParams = (
    schema: z.ZodEffects<ZodString>,
    idName?: string
) => {
    return async (ctx: Context, next: Next) => {
        const result = schema.safeParse(ctx.req.param(idName ?? "id"));
        if (!result.success) {
            throw new HTTPException(422, {
                cause: result.error,
                message: "Unprocessable entity",
            });
        }
        await next();
    };
};
