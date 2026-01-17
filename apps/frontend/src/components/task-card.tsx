import { TaskResponse } from "@/types/task";
import { cn } from "@/utils/cn";
import { getDateFormatted } from "@/utils/date-format";
import { getClassNameByPriority } from "@/utils/get-class-name-by-priority";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  CopyIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTasksStore } from "@/store/task-dialogs.store";
import { useCreateTask } from "@/hooks/use-create-task";
import { toast } from "@/hooks/use-toast";
import { useUpdateTask } from "@/hooks/use-update-task";

interface TaskCardProps {
  task: TaskResponse;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const {
    openTaskDetailsDialog,
    openUpdateTaskDialog,
    openConfirmTaskDeletionDialog,
  } = useTasksStore();

  const createTaskMutation = useCreateTask(false);
  const updateTaskMutation = useUpdateTask(task.id, false);

  const handleDuplicateTask = () => {
    createTaskMutation.mutate(
      {
        title: task.title,
        priority: task.priority,
        description: task.description,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
      },
      {
        onSuccess: () => {
          toast({
            title: "Task duplicated successfully",
            variant: "success",
          });
        },
      },
    );
  };

  const markAsCompleted = () => {
    updateTaskMutation.mutate(
      {
        isCompleted: true,
      },
      {
        onSuccess: () => {
          toast({
            title: "Task marked as completed",
            variant: "success",
          });
        },
      },
    );
  };

  const markAsIncomplete = () => {
    updateTaskMutation.mutate(
      {
        isCompleted: false,
      },
      {
        onSuccess: () => {
          toast({
            title: "Task marked as incomplete",
            variant: "success",
          });
        },
      },
    );
  };

  const toggleTaskCompletion = () => {
    if (task.isCompleted) {
      markAsIncomplete();
    } else {
      markAsCompleted();
    }
  };

  return (
    <div className="border rounded-md px-4 py-3 border-primary/10 bg-primary/5 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div
              className={cn(
                "w-2 h-2 rounded-full shrink-0",
                getClassNameByPriority(task.priority),
              )}
            />
            <div className="text-lg font-semibold truncate min-w-0">
              {task.title}
            </div>
          </div>
          {task.isCompleted && (
            <div className="flex items-center gap-2 text-sm text-success">
              <CheckCircleIcon className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVerticalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => openTaskDetailsDialog(task)}>
              <div className="flex items-center gap-2">
                <EyeIcon className="w-4 h-4" />
                View details
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openUpdateTaskDialog(task)}>
              <div className="flex items-center gap-2">
                <PencilIcon className="w-4 h-4" />
                Edit
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicateTask}>
              <div className="flex items-center gap-2">
                <CopyIcon className="w-4 h-4" />
                Duplicate
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleTaskCompletion}>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-4 h-4" />
                Mark as {task.isCompleted ? "incomplete" : "completed"}
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => openConfirmTaskDeletionDialog(task)}
            >
              <div className="flex items-center gap-2 text-error">
                <TrashIcon className="w-4 h-4" />
                Delete
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {task.description && (
        <div className="text-sm line-clamp-2">{task.description}</div>
      )}
      {task.dueDate && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDaysIcon className="w-4 h-4" />
          {getDateFormatted(task.dueDate)}
        </div>
      )}
    </div>
  );
};
