import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username requerido",
  }),
  email: z
    .string({
      required_error: "Email requerido",
    })
    .email({
      message: "Email invalido",
    }),
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(8, {
      message: "La contraseña debe tener minimo 8 caracteres",
    }),   
});
export const updateUserSchema = z.object({
  
  password: z
    .string({

    })
    .min(1, {
      message: "Minimo de caracteres para la contraseña 8",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email requerido",
    })
    .email({
      message: "Email no valido",
    }),
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(1, {
     message: "Minimo de caracteres para la contraseña 8",
    }),
});

