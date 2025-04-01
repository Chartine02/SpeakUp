import { z } from "zod";
// import libphonenumber from "google-libphonenumber";

// const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Names must be have at least 3 characters" })
    .max(50, { message: "Name can't exceed 50 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be have at least 6 characters" }),
  phoneNumber: z
    .string()
    .nonempty({ message: "Phone number is required" })
    // .refine((number) => {
    //   try {
    //     const phoneNumber = phoneUtil.parse(number);
    //     return phoneUtil.isValidNumber(phoneNumber);
    //   } catch {
    //     return false;
    //   }
    // }),
});

export const loginSchema = registerSchema.pick({ email: true, password: true });

export type RegiserFormData = z.infer<typeof registerSchema>;

export type LoginFormData = Pick<RegiserFormData, "email" | "password">;
