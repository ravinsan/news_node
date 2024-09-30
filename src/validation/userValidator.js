import { z } from "zod";

export const userValidator = z.object({
  // name
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),

  // email
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100),

  // password
  password: z
    .string({ required_error: "password  is required" })
    .min(6)
    .max(100),
});


export const userUpdateValidator = z.object({
  // name
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must be at most 50 characters" }),

  // email
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100),

  // password
  password: z
    .string({ required_error: "password  is required" })
    .min(6)
    .max(100),
});
