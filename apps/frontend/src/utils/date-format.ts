import { format } from "date-fns";

export const getDateFormatted = (date: string) => {
  return format(new Date(date), "dd MMM yyyy");
};
