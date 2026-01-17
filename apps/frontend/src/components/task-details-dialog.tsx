import { TaskResponse } from "@/types/task";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { getDateFormatted } from "@/utils/date-format";
import { CalendarDaysIcon, CheckCircleIcon } from "lucide-react";
import { getClassNameByPriority } from "@/utils/get-class-name-by-priority";
import { cn } from "@/utils/cn";

interface TaskDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  task: TaskResponse;
}

export const TaskDetailsDialog: React.FC<TaskDetailsDialogProps> = ({
  open,
  onClose,
  task,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">{task.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 px-4 py-3">
          <div>{task.description}</div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-4 h-4">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    getClassNameByPriority(task.priority),
                  )}
                />
              </div>
              Priority:
            </div>
            <div>{task.priority}</div>
            {task.dueDate && (
              <>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-4 h-4" />
                  Due Date:
                </div>
                <div>{getDateFormatted(task.dueDate)}</div>
              </>
            )}
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4" />
              Created At:
            </div>
            <div>{getDateFormatted(task.createdAt)}</div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4" />
              Completion Status:
            </div>
            <div>{task.isCompleted ? "Completed" : "Incomplete"}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
