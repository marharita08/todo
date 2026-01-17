"use client";
import { TaskCard } from "@/components/task-card";
import { Loading } from "@/components/ui/loading";
import { useTasks } from "@/hooks/use-tasks";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SortOrder, SortBy, CompletionStatus } from "@/const";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { TaskResponse } from "@/types/task";
import { TaskDetailsDialog } from "@/components/task-details-dialog";

const getSortOrderToLabelMap = {
  [SortOrder.ASC]: "Ascending",
  [SortOrder.DESC]: "Descending",
} as const;

const getSortByToLabelMap = {
  [SortBy.CREATED_AT]: "Created At",
  [SortBy.DUE_DATE]: "Due Date",
  [SortBy.PRIORITY]: "Priority",
  [SortBy.TITLE]: "Title",
} as const;

const getIsCompleted = (status: CompletionStatus) => {
  switch (status) {
    case CompletionStatus.ALL:
      return undefined;
    case CompletionStatus.COMPLETED:
      return true;
    case CompletionStatus.INCOMPLETED:
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
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, status, isError, isFetchingNextPage } = useTasks({
    isCompleted: getIsCompleted(completionStatus),
    isOverdue: completionStatus === CompletionStatus.OVERDUE,
    sortBy,
    sortOrder,
    search,
  });

  const [openTaskDetailsDialog, setOpenTaskDetailsDialog] =
    useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<TaskResponse | null>(null);

  const isEmpty =
    !isError &&
    !isLoading &&
    (!data || data?.pages.every((page) => page.items.length === 0));

  return (
    <div className="py-4 flex flex-col gap-6">
      {selectedTask && (
        <TaskDetailsDialog
          open={openTaskDetailsDialog}
          onOpenChange={setOpenTaskDetailsDialog}
          task={selectedTask}
        />
      )}
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
            <TabsTrigger value={CompletionStatus.INCOMPLETED}>
              Incompleted
            </TabsTrigger>
            <TabsTrigger value={CompletionStatus.OVERDUE}>Overdue</TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Search"
          isEmpty={!search}
          startIcon={<SearchIcon className="w-4 h-4" />}
        />
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortBy)}
        >
          <SelectTrigger label="Sort By" value={sortBy} />
          <SelectContent>
            {Object.values(SortBy).map((sortBy) => (
              <SelectItem key={sortBy} value={sortBy}>
                {getSortByToLabelMap[sortBy]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value as SortOrder)}
        >
          <SelectTrigger label="Sort Order" value={sortOrder} />
          <SelectContent>
            {Object.values(SortOrder).map((sortOrder) => (
              <SelectItem key={sortOrder} value={sortOrder}>
                {getSortOrderToLabelMap[sortOrder]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.pages.map((page) =>
          page.items.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onCardClick={(task) => {
                setSelectedTask(task);
                setOpenTaskDetailsDialog(true);
              }}
            />
          )),
        )}
      </div>
      {isEmpty && (
        <div className="text-center text-muted-foreground">No tasks found</div>
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
