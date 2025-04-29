import type { Context } from "hono";

import { ContentfulStatusCode } from "hono/utils/http-status";

import { IError } from "../types";
export const errorHandler = (err: IError, c: Context) => {
    const status = err.status ?? 500;
    return c.json(
        {
            cause: err.cause ?? null,
            errorName:
                status === 500
                    ? "InternalServerError"
                    : (err.name ?? "InternalServerError"),
            message:
                status === 500
                    ? "Something went wrong"
                    : (err.message ?? "Something went wrong"),
        },
        status as ContentfulStatusCode
    );
};
