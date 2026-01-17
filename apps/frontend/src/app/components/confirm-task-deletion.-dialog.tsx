import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteTask } from "@/hooks/use-delete-task";
import { TaskResponse } from "@/types/task";

interface ConfirmTaskDeletionDialogProps {
  open: boolean;
  onClose: () => void;
  task: TaskResponse;
}

export const ConfirmTaskDeletionDialog: React.FC<
  ConfirmTaskDeletionDialogProps
> = ({ open, onClose, task }) => {
  const deleteTaskMutation = useDeleteTask();

  const handleDeleteTask = () => {
    deleteTaskMutation.mutate(task.id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Task Deletion</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 px-4 py-3">
          <div>
            Are you sure you want to delete the task{" "}
            <span className="font-bold">{task.title}</span>?
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTask}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
