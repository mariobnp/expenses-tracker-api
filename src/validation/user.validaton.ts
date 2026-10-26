import { z } from "zod";

// Aturan Validasi Username
const usernameSchema = z
  .string()
  .min(3, { message: "username minimal terdiri dari 3 karakter." })
  .max(20, { message: "username maksimal terdiri dari 20 karakter." })
  .refine((value) => value === value.toLowerCase(), {
    message: "username harus terdiri dari huruf kecil semua.",
  })
  .regex(
    /^[a-z0-9._]+$/,
    "Hanya boleh berisi huruf kecil (a-z), angka (0-9), titik (.), dan underscore (_)",
  );

// Aturan Validasi Name
const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "Nama minimal terdiri dari 2 karakter." })
  .max(50, { message: "Nama maksimal terdiri dari 50 karekter." })
  .regex(
    /^[a-zA-Z\s'.-]+$/,
    "Nama hanya boleh berisi huruf, spasi, tanda petik ('), titik (.), dan tanda hubung (-)",
  );

//Aturan Validasi Password
const passwordSchema = z
  .string()
  .min(8, { message: "Password minimal terdiri dari 8 karakter." });

export const RegisterUserValidation = z.object({
  username: usernameSchema,
  name: nameSchema,
  password: passwordSchema,
});

export const LoginUserValidation = z.object({
  username: usernameSchema,
  password: passwordSchema,
});
