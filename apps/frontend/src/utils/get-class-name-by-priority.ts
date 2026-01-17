export const getClassNameByPriority = (priority: number) => {
  if (priority < 4) {
    return "bg-success";
  }
  if (priority < 8) {
    return "bg-warning";
  }
  return "bg-error";
};
