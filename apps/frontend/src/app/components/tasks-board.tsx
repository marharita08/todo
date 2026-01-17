import { BoardSection } from "./board-section";

export const TasksBoard = () => {
  return (
    <div className="py-4 flex gap-6">
      <BoardSection isCompleted={false} />
      <BoardSection isCompleted={true} />
    </div>
  );
};
