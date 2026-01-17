export type TaskResponse = {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: number;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
};
