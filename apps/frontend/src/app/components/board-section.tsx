import { TaskCard } from "@/components/task-card";
import { TasksEmpty } from "@/components/tasks-empty";
import { Loading } from "@/components/ui/loading";
import { CompletionStatus, SortBy, SortOrder } from "@/const";
import { useTasks } from "@/hooks/use-tasks";
import { useBoardUIStore } from "@/store/board-ui-store";
import { useDroppable } from "@dnd-kit/core";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface BoardSectionProps {
  isCompleted: boolean;
  search: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

export const BoardSection: React.FC<BoardSectionProps> = ({
  isCompleted,
  search,
  sortBy,
  sortOrder,
}) => {
  const { data, isLoading, status, isError, isFetchingNextPage, hasNextPage, fetchNextPage } = useTasks({
    isCompleted,
    search,
    sortBy,
    sortOrder,
  });
  const { setNodeRef } = useDroppable({
    id: isCompleted ? CompletionStatus.COMPLETED : CompletionStatus.INCOMPLETE,
  });

  const { ref: observerTarget, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  const overrides = useBoardUIStore((s) => s.overrides);

  const visibleTasks = data?.pages
    .flatMap((p) => p.items)
    .filter((task) => {
      const override = overrides[task.id];
      const completed = override?.isCompleted ?? task.isCompleted;

      return completed === isCompleted;
    });

    const isEmpty =
    !isError &&
    !isLoading &&
    (!data || data?.pages.every((page) => page.items.length === 0));

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col border rounded-md border-primary w-full max-w-[350px] h-[calc(100vh-230px)]"
    >
      <h2 className="text-lg font-semibold text-primary p-4">
        {isCompleted ? "Completed" : "Incomplete"}
      </h2>
      <div className="overflow-x-hidden overflow-y-auto flex flex-col gap-2 px-2 pb-2">
        {visibleTasks?.map((task) => (
          <TaskCard key={task.id} task={task} isDragable={true} />
        ))}
        <div ref={observerTarget} />
      </div>
      {(isLoading || status === "pending" || isFetchingNextPage) && <Loading />}
      {isEmpty && <TasksEmpty />}
      {isError && (
        <div className="text-center text-muted-foreground">
          Error loading tasks
        </div>
      )}
    </div>
  );
};
