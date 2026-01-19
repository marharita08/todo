import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CreateTaskSchema,
  createTaskSchema,
} from "../validation/create-task-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "@/components/ui/date-picker";
import { Slider } from "@/components/ui/slider";
import { useCreateTask } from "@/hooks/use-create-task";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

export const CreateTaskDialog = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: null,
      priority: 1,
    },
  });

  const createTaskMutation = useCreateTask();

  const onSubmit = (data: CreateTaskSchema) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="flex items-center gap-1">
          <PlusIcon className="w-4 h-4" />
          Create Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 px-4 py-3"
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
              onChange={(date) => form.setValue("dueDate", date ?? null)}
              className="w-full"
            />
            <InputError error={form.formState.errors.dueDate?.message} />
          </div>
          <div className="mt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={createTaskMutation.isPending}
            >
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
