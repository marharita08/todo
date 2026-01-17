import { SortBy, SortOrder } from "@/const";
import { useState } from "react";
import { BoardSection } from "./board-section";
import { SearchAndSort } from "./search-and-sort";

export const TasksBoard = () => {
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.CREATED_AT);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);

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
    </div>
  );
};
