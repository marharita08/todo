import { TaskResponse } from "@/types/task";
import { create } from "zustand";

type State = {
  selectedTask: TaskResponse | null;
  isTaskDetailsDialogOpen: boolean;
  isUpdateTaskDialogOpen: boolean;
  isConfirmTaskDeletionDialogOpen: boolean;
  openTaskDetailsDialog: (task: TaskResponse) => void;
  closeTaskDetailsDialog: () => void;
  openUpdateTaskDialog: (task: TaskResponse) => void;
  closeUpdateTaskDialog: () => void;
  openConfirmTaskDeletionDialog: (task: TaskResponse) => void;
  closeConfirmTaskDeletionDialog: () => void;
};

export const useTasksStore = create<State>((set) => ({
  selectedTask: null,
  isTaskDetailsDialogOpen: false,
  isUpdateTaskDialogOpen: false,
  isConfirmTaskDeletionDialogOpen: false,
  openTaskDetailsDialog: (task: TaskResponse) =>
    set({ selectedTask: task, isTaskDetailsDialogOpen: true }),
  closeTaskDetailsDialog: () =>
    set({ selectedTask: null, isTaskDetailsDialogOpen: false }),
  openUpdateTaskDialog: (task: TaskResponse) =>
    set({ selectedTask: task, isUpdateTaskDialogOpen: true }),
  closeUpdateTaskDialog: () =>
    set({ selectedTask: null, isUpdateTaskDialogOpen: false }),
  openConfirmTaskDeletionDialog: (task: TaskResponse) =>
    set({ selectedTask: task, isConfirmTaskDeletionDialogOpen: true }),
  closeConfirmTaskDeletionDialog: () =>
    set({ selectedTask: null, isConfirmTaskDeletionDialogOpen: false }),
}));
