import { MutationKey } from "@/const/mutation-key";
import { useAppMutation } from "./use-app-mutation";
import { taskService } from "@/services/task.service";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/const";
import { toast } from "./use-toast";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useAppMutation([MutationKey.DELETE_TASK], {
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.TASKS] });
      toast({
        title: "Task deleted successfully",
        variant: "success",
      });
    },
  });
};
