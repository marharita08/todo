import { TaskCard } from "@/components/task-card";
import { Loading } from "@/components/ui/loading";
import { SortBy, SortOrder } from "@/const";
import { useTasks } from "@/hooks/use-tasks";

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
  const { data, isLoading, status, isError, isFetchingNextPage } = useTasks({
    isCompleted,
    search,
    sortBy,
    sortOrder,
  });

  return (
    <div className="flex flex-col border rounded-md border-primary w-full max-w-[300px] h-[calc(100vh-230px)]">
      <h2 className="text-lg font-semibold text-primary p-4">
        {isCompleted ? "Completed" : "Incomplete"}
      </h2>
      <div className="overflow-y-auto flex flex-col gap-2 px-2 pb-2">
        {data?.pages.map((page) =>
          page.items.map((task) => <TaskCard key={task.id} task={task} />),
        )}
      </div>
      {(isLoading || status === "pending" || isFetchingNextPage) && <Loading />}
      {isError && (
        <div className="text-center text-muted-foreground">
          Error loading tasks
        </div>
      )}
    </div>
  );
};
