import { MutationKey } from "@/const/mutation-key";
import { useAppMutation } from "./use-app-mutation";
import { UpdateTaskSchema } from "@/app/validation/update-task-schema";
import { taskService } from "@/services/task.service";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/const";
import { toast } from "./use-toast";

export const useUpdateTask = (id: string) => {
  const queryClient = useQueryClient();

  return useAppMutation([MutationKey.UPDATE_TASK], {
    mutationFn: (task: UpdateTaskSchema) => taskService.updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.TASKS] });
      toast({
        title: "Task updated successfully",
        variant: "success",
      });
    },
  });
};
