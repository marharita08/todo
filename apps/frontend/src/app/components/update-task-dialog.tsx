import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/ui/date-picker";
import { Slider } from "@/components/ui/slider";
import {
  updateTaskSchema,
  UpdateTaskSchema,
} from "../validation/update-task-schema";
import { TaskResponse } from "@/types/task";
import { useUpdateTask } from "@/hooks/use-update-task";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type UpdateTaskDialogProps = {
  task: TaskResponse;
  open: boolean;
  onClose: () => void;
};

export const UpdateTaskDialog: React.FC<UpdateTaskDialogProps> = ({
  task,
  open,
  onClose,
}) => {
  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description ?? "",
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
      priority: task.priority,
      isCompleted: task.isCompleted,
    },
  });

  const updateTaskMutation = useUpdateTask(task.id);

  const onSubmit = (data: UpdateTaskSchema) => {
    updateTaskMutation.mutate(data, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-4 py-3"
        >
          <div>
            <Input
              {...form.register("title")}
              error={!!form.formState.errors.title?.message}
              label="Title"
              isEmpty={!form.watch("title")}
            />
            <InputError error={form.formState.errors.title?.message} />
          </div>
          <div>
            <Textarea
              className="max-h-40"
              label="Description"
              {...form.register("description")}
              error={!!form.formState.errors.description?.message}
              isEmpty={!form.watch("description")}
            />
            <InputError error={form.formState.errors.description?.message} />
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <div>Priority: {form.watch("priority")}</div>
              <Slider
                onValueChange={(value) => form.setValue("priority", value[0])}
                value={[form.watch("priority")]}
                max={10}
                min={1}
                step={1}
              />
            </div>
            <InputError error={form.formState.errors.priority?.message} />
          </div>
          <div>
            <DatePicker
              label="Due date"
              initialValue={form.getValues("dueDate") ?? undefined}
              onChange={(date) => form.setValue("dueDate", date ?? null)}
              className="w-full"
            />
            <InputError error={form.formState.errors.dueDate?.message} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={(value) =>
                  form.setValue("isCompleted", value as unknown as boolean)
                }
                checked={form.watch("isCompleted")}
                id="isCompleted"
              />
              <Label htmlFor="isCompleted" className="cursor-pointer">
                Completed
              </Label>
            </div>
            <InputError error={form.formState.errors.isCompleted?.message} />
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={updateTaskMutation.isPending}
            >
              Update Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
