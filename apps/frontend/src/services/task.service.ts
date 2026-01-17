import { GetTasksQuery } from "@/types/get-tasks-query";
import { httpService } from "./http.service";
import { BackendRoute } from "@/const/backend-route";
import { TaskResponse } from "@/types/task";
import { PaginatedResponse } from "@/types/paginated-response";
import { UpdateTask } from "@/types/update-task";
import { CreateTaskSchema } from "@/app/validation/create-task-schema";

class TaskService {
  async getTasks(
    query: GetTasksQuery,
  ): Promise<PaginatedResponse<TaskResponse>> {
    const response = await httpService.get<PaginatedResponse<TaskResponse>>(
      BackendRoute.TASKS,
      query,
    );
    return response;
  }

  async createTask(task: CreateTaskSchema): Promise<TaskResponse> {
    const response = await httpService.post<TaskResponse, CreateTaskSchema>(
      BackendRoute.TASKS,
      task,
    );
    return response;
  }

  async updateTask(id: string, task: UpdateTask): Promise<TaskResponse> {
    const response = await httpService.patch<TaskResponse, UpdateTask>(
      `${BackendRoute.TASKS}/${id}`,
      task,
    );
    return response;
  }

  async deleteTask(id: string): Promise<void> {
    await httpService.delete<void>(`${BackendRoute.TASKS}/${id}`);
  }
}

export const taskService = new TaskService();
