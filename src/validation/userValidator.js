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
  // mobile
  mobile: z
    .string({ required_error: "mobile is required" })
    .min(10, { message: "mobile must be at least 10 characters" })
    .max(10, { message: "mobile must be at most 10 characters" }),
	
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
  password: z.string()
    .optional(),
  
  // status
  status: z.number({ required_error: "status is required" }),

  // mobile
  mobile: z
    .string({ required_error: "mobile is required" })
    .min(10, { message: "mobile must be at least 10 characters" })
    .max(10, { message: "mobile must be at most 10 characters" }),
});
