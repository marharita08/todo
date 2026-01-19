import { CompletionStatus, SortBy, SortOrder } from "@/const";
import { useState } from "react";
import { BoardSection } from "./board-section";
import { SearchAndSort } from "./search-and-sort";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
} from "@dnd-kit/core";
import { useUpdateTask } from "@/hooks/use-update-task";
import { TaskResponse } from "@/types/task";
import { TaskCard } from "@/components/task-card";
import { useBoardUIStore } from "@/store/board-ui-store";

export const TasksBoard = () => {
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.CREATED_AT);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);

  const updateTaskStatus = useUpdateTask(false);

  const [activeTask, setActiveTask] = useState<TaskResponse | null>(null);

  const { setOverride } = useBoardUIStore();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTask(event.active.data.current?.task ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const targetColumn = over.id as
      | CompletionStatus.COMPLETED
      | CompletionStatus.INCOMPLETE;

    const targetCompleted = targetColumn === CompletionStatus.COMPLETED;

    setOverride(taskId, targetCompleted);

    updateTaskStatus.mutate({
      id: taskId,
      task: {
        isCompleted: targetCompleted,
      },
    });
  };

  return (
    <div className="pt-1">
      <div className="grid grid-cols-[300px_200px_200px] gap-4">
        <SearchAndSort
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <div className="py-4 flex gap-6">
          <BoardSection
            isCompleted={false}
            search={search}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
          <BoardSection
            isCompleted={true}
            search={search}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </div>
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isOverlay={true} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
