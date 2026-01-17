import { TaskResponse } from "@/types/task";
import { cn } from "@/utils/cn";
import { getDateFormatted } from "@/utils/date-format";
import { getClassNameByPriority } from "@/utils/get-class-name-by-priority";
import { CalendarDaysIcon, CheckCircleIcon } from "lucide-react";

interface TaskCardProps {
  task: TaskResponse;
  onCardClick?: (task: TaskResponse) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onCardClick }) => {
  return (
    <div
      className="border rounded-md px-4 py-3 border-primary/10 bg-primary/5 flex flex-col gap-1 cursor-pointer"
      onClick={() => onCardClick?.(task)}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              getClassNameByPriority(task.priority),
            )}
          />
          <div className="text-lg font-semibold">{task.title}</div>
        </div>
        {task.isCompleted && (
          <div className="flex items-center gap-2 text-sm text-success">
            <CheckCircleIcon className="w-4 h-4" />
            Completed
          </div>
        )}
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
