import { ValidationTargets } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodSchema } from "zod";
import { zValidator as zv } from "@hono/zod-validator";

export const zValidatorWrapper = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets
>(
  target: Target,
  schema: T
) =>
  zv(target, schema, (result, c) => {
    if (!result.success) {
      throw new HTTPException(422, {
        message: "Unprocessable entity",
        cause: result.error,
      });
    }
  });
