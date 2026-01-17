import z from "zod";

export const updateTaskSchema = z.object({
  title: z.string().min(1),
  description: z
    .string()
    .transform((val) => (val === "" ? null : val))
    .optional()
    .nullable(),
  dueDate: z.date().optional().nullable(),
  priority: z.number().min(1).max(10),
  isCompleted: z.boolean().optional(),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
