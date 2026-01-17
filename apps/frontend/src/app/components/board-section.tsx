import { TaskCard } from "@/components/task-card";
import { Loading } from "@/components/ui/loading";
import { useTasks } from "@/hooks/use-tasks";

interface BoardSectionProps {
  isCompleted: boolean;
}

export const BoardSection: React.FC<BoardSectionProps> = ({ isCompleted }) => {
  const { data, isLoading, status, isError, isFetchingNextPage } = useTasks({
    isCompleted,
  });

  return (
    <div className="flex flex-col gap-4 border rounded-md p-4 border-primary w-[300px]">
      <h2 className="text-lg font-semibold text-primary">
        {isCompleted ? "Completed" : "Incomplete"}
      </h2>
      <div className="overflow-y-auto flex flex-col gap-2">
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
