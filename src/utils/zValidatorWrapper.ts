import { zValidator as zv } from "@hono/zod-validator";
import { ValidationTargets } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodSchema } from "zod";

export const zValidatorWrapper = <
    T extends ZodSchema,
    Target extends keyof ValidationTargets,
>(
    target: Target,
    schema: T
) =>
    zv(target, schema, (result) => {
        if (!result.success) {
            throw new HTTPException(422, {
                cause: result.error,
                message: "Unprocessable entity",
            });
        }
    });
