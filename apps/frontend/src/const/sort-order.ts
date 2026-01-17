export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export const SortOrderToLabelMap = {
  [SortOrder.ASC]: "Ascending",
  [SortOrder.DESC]: "Descending",
} as const;
