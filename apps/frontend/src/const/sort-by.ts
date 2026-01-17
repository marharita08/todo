export enum SortBy {
  CREATED_AT = "createdAt",
  DUE_DATE = "dueDate",
  PRIORITY = "priority",
  TITLE = "title",
}

export const SortByToLabelMap = {
  [SortBy.CREATED_AT]: "Created At",
  [SortBy.DUE_DATE]: "Due Date",
  [SortBy.PRIORITY]: "Priority",
  [SortBy.TITLE]: "Title",
} as const;
