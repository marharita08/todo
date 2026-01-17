"use client";
import { Header } from "@/components/header";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TasksGrid } from "./components/tasks-grid";
import { TasksBoard } from "./components/tasks-board";
import { CreateTaskDialog } from "./components/create-task-dialog";
import { UpdateTaskDialog } from "./components/update-task-dialog";
import { useTasksStore } from "@/store/task-dialogs.store";
import { TaskDetailsDialog } from "@/components/task-details-dialog";
import { ConfirmTaskDeletionDialog } from "./components/confirm-task-deletion.-dialog";

enum View {
  GRID = "grid",
  BOARD = "board",
}

export default function Home() {
  const [view, setView] = useState<View>(View.GRID);
  const {
    selectedTask,
    isTaskDetailsDialogOpen,
    isUpdateTaskDialogOpen,
    isConfirmTaskDeletionDialogOpen,
    closeUpdateTaskDialog,
    closeTaskDetailsDialog,
    closeConfirmTaskDeletionDialog,
  } = useTasksStore();

  return (
    <div>
      <Header />
      {selectedTask && (
        <UpdateTaskDialog
          task={selectedTask}
          open={isUpdateTaskDialogOpen}
          onClose={closeUpdateTaskDialog}
        />
      )}
      {selectedTask && (
        <TaskDetailsDialog
          task={selectedTask}
          open={isTaskDetailsDialogOpen}
          onClose={closeTaskDetailsDialog}
        />
      )}
      {selectedTask && (
        <ConfirmTaskDeletionDialog
          task={selectedTask}
          open={isConfirmTaskDeletionDialogOpen}
          onClose={closeConfirmTaskDeletionDialog}
        />
      )}
      <div className="px-6 py-4 gap-6">
        <Tabs value={view} onValueChange={(value) => setView(value as View)}>
          <div className="flex justify-between items-center">
            <CreateTaskDialog />
            <TabsList>
              <TabsTrigger value={View.GRID}>Grid</TabsTrigger>
              <TabsTrigger value={View.BOARD}>Board</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value={View.GRID}>
            <TasksGrid />
          </TabsContent>
          <TabsContent value={View.BOARD}>
            <TasksBoard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
