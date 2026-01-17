import { SortBy } from "@/const";
import { SortOrder } from "@/const";

export type GetTasksQuery = {
  page?: number;
  pageSize?: number;
  search?: string;
  isCompleted?: boolean;
  isOverdue?: boolean;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
};
