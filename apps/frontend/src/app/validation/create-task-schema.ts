import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Field is required"),
  description: z
    .string()
    .transform((val) => (val === "" ? null : val))
    .optional()
    .nullable(),
  dueDate: z.date().optional().nullable(),
  priority: z.number().min(1).max(10),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
