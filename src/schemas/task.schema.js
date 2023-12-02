import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Titulo requerido",
  }),
  description: z
    .string({
      required_error: "Descripcion requerida",
    }),
  date: z.string().datetime().optional(),
  time: z.string({
    required_error: "Hora requerida",
  }).optional(),
  
});
