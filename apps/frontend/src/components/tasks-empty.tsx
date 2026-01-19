import { SearchXIcon } from "lucide-react"

export const TasksEmpty = () => {

  return (
    <div className="text-center opacity-80 text-muted-foreground text-lg font-bold flex flex-col items-center justify-center gap-2">
      <SearchXIcon className="w-10 h-10" />
      <div>Task list is empty</div>
    </div>
  )
}

