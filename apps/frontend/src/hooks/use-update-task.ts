import { MutationKey } from "@/const/mutation-key";
import { useAppMutation } from "./use-app-mutation";
import { taskService } from "@/services/task.service";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/const";
import { toast } from "./use-toast";
import { UpdateTask } from "@/types/update-task";

export const useUpdateTask = (id: string, defaultToast: boolean = true) => {
  const queryClient = useQueryClient();

  return useAppMutation([MutationKey.UPDATE_TASK], {
    mutationFn: (task: UpdateTask) => taskService.updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.TASKS] });
      if (defaultToast) {
        toast({
          title: "Task updated successfully",
          variant: "success",
        });
      }
    },
  });
};
