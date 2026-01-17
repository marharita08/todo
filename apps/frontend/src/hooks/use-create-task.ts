import { CreateTaskSchema } from "@/app/validation/create-task-schema";
import { useAppMutation } from "./use-app-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { MutationKey } from "@/const/mutation-key";
import { QueryKey } from "@/const";
import { taskService } from "@/services/task.service";
import { toast } from "./use-toast";

export const useCreateTask = (defaultToast: boolean = true) => {
  const queryClient = useQueryClient();

  return useAppMutation([MutationKey.CREATE_TASK], {
    mutationFn: (task: CreateTaskSchema) => taskService.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.TASKS] });
      if (defaultToast) {
        toast({
          title: "Task created successfully",
          variant: "success",
        });
      }
    },
  });
};
