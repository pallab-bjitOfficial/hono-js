import { z, ZodIssueCode } from "zod";

import AuthRepository from "../../repository/auth";
import { comparePassword, hashPassword } from "../../utils";

export const registerUserSchema = z
    .object({
        confirmPassword: z
            .string()
            .min(8)
            .max(20)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
            ),
        email: z
            .string()
            .email()
            .superRefine(async (val, ctx) => {
                const user = await AuthRepository.findAuthByEmail(val);
                if (user) {
                    ctx.addIssue({
                        code: ZodIssueCode.custom,
                        message: "Email already exists",
                    });
                }
                return true;
            }),
        firstName: z.string().min(2).max(20),
        lastName: z.string().min(2).max(20),
        password: z
            .string()
            .min(8)
            .max(20)
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
            ),
        userName: z.string().superRefine(async (val, ctx) => {
            const user = await AuthRepository.findAuthByUserName(val);
            if (user) {
                ctx.addIssue({
                    code: ZodIssueCode.custom,
                    message: "Username already exists",
                });
            }
            return true;
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })
    .transform(async (data) => {
        const hashedPassword = await hashPassword(data.password);
        const { confirmPassword, ...newData } = data;
        return {
            ...newData,
            password: hashedPassword,
        };
    });

export const loginUserSchema = z
    .object({
        email: z.string().email(),
        password: z.string(),
    })
    .superRefine(async (data, ctx) => {
        const { email, password } = data;
        try {
            const user = await AuthRepository.findAuthByEmail(email);
            if (!user) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "User not found",
                    path: ["email"],
                });
                return false;
            }

            const isPasswordValid = await comparePassword(
                password,
                user.password
            );
            if (!isPasswordValid) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Invalid username or password",
                    path: ["password"],
                });
                return false;
            }
            return true;
        } catch (error) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Authentication error",
                path: [],
            });
            return false;
        }
    });
