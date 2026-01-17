import { QueryKey } from "@/const/query-key";
import { taskService } from "@/services/task.service";
import { GetTasksQuery } from "@/types/get-tasks-query";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useTasks = (query: GetTasksQuery) =>
  useInfiniteQuery({
    queryKey: [QueryKey.TASKS, query],
    queryFn: ({ pageParam = 1 }) =>
      taskService.getTasks({ page: pageParam as number, ...query }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.totalPages > pages.length ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });
