export type UpdateTask = {
  title?: string;
  description?: string | null;
  dueDate?: Date | null;
  priority?: number;
  isCompleted?: boolean;
};
