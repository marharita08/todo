"use client";
import { TaskCard } from "@/components/task-card";
import { Loading } from "@/components/ui/loading";
import { useTasks } from "@/hooks/use-tasks";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SortOrder, SortBy, CompletionStatus } from "@/const";
import { SearchAndSort } from "./search-and-sort";
import { TasksEmpty } from "@/components/tasks-empty";
import { useInView } from 'react-intersection-observer';

const getIsCompleted = (status: CompletionStatus) => {
  switch (status) {
    case CompletionStatus.ALL:
      return undefined;
    case CompletionStatus.COMPLETED:
      return true;
    case CompletionStatus.INCOMPLETE:
      return false;
    case CompletionStatus.OVERDUE:
      return false;
  }
};

export const TasksGrid = () => {
  const [completionStatus, setCompletionStatus] = useState<CompletionStatus>(
    CompletionStatus.ALL,
  );
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.CREATED_AT);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, status, isError, isFetchingNextPage, hasNextPage, fetchNextPage } = useTasks({
    isCompleted: getIsCompleted(completionStatus),
    isOverdue: completionStatus === CompletionStatus.OVERDUE,
    sortBy,
    sortOrder,
    search,
  });

  const { ref: observerTarget, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  const isEmpty =
    !isError &&
    !isLoading &&
    (!data || data?.pages.every((page) => page.items.length === 0));

  return (
    <div className="py-4 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Tabs
          value={completionStatus}
          onValueChange={(value) =>
            setCompletionStatus(value as CompletionStatus)
          }
        >
          <TabsList>
            <TabsTrigger value={CompletionStatus.ALL}>All</TabsTrigger>
            <TabsTrigger value={CompletionStatus.COMPLETED}>
              Completed
            </TabsTrigger>
            <TabsTrigger value={CompletionStatus.INCOMPLETE}>
              Incomplete
            </TabsTrigger>
            <TabsTrigger value={CompletionStatus.OVERDUE}>Overdue</TabsTrigger>
          </TabsList>
        </Tabs>
        <SearchAndSort
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.pages.map((page) =>
          page.items.map((task) => <TaskCard key={task.id} task={task} />),
        )}
        <div ref={observerTarget} className="col-span-full" />
      </div>
      {isEmpty && (
        <TasksEmpty />
      )}
      {(isLoading || status === "pending" || isFetchingNextPage) && <Loading />}
      {isError && (
        <div className="text-center text-muted-foreground">
          Error loading tasks
        </div>
      )}
    </div>
  );
};
