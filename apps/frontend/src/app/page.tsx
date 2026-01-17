"use client";
import { Header } from "@/components/header";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TasksGrid } from "./components/tasks-grid";
import { TasksBoard } from "./components/tasks-board";
import { CreateTaskDialog } from "./components/create-task-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

enum View {
  GRID = "grid",
  BOARD = "board",
}

export default function Home() {
  const [view, setView] = useState<View>(View.GRID);

  return (
    <div>
      <Header />
      <div className="px-6 py-4 gap-6">
        <Tabs value={view} onValueChange={(value) => setView(value as View)}>
          <div className="flex justify-between items-center">
            <CreateTaskDialog />
            <TabsList>
              <TabsTrigger value={View.GRID}>Grid</TabsTrigger>
              <TabsTrigger value={View.BOARD}>Board</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value={View.GRID}>
            <TasksGrid />
          </TabsContent>
          <TabsContent value={View.BOARD}>
            <TasksBoard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
