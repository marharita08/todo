import z from "zod";

export const updateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  priority: z.number().min(1).max(10),
  isCompleted: z.boolean().optional(),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
