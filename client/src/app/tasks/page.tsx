"use client";

import React, { useEffect, useState } from "react";
import TaskCard from "@/components/tasks/TaskCard";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskModal from "@/components/tasks/EditTaskModal";
import TaskFilters from "@/components/tasks/TaskFilters";
import { taskService } from "@/services/taskService";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { ITask } from "@/types/taskType";
import { confirmAction } from "@/utils/confirm";
import { validateTaskForm } from "@/validation/taskValidation";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { ITaskQueryParams } from "@/types/taskQuery";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle,  Calendar, ListTodo } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TasksPage = () => {
  const router = useRouter();
  const { user } = useUser();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ITaskQueryParams["status"]>("all");
  const [sortBy, setSortBy] = useState<ITaskQueryParams["sort"]>("date_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const limit = 6;
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  const loadTasks = async () => {
    setLoading(true);

    const res = await taskService.getTasks({
      search,
      status,
      sort: sortBy,
      page,
      limit,
    });

    if (!res?.ok) {
      setLoading(false);
      return showErrorToast(res?.msg);
    }

    setTasks(res.data.tasks);
    setTotalPages(res.data.totalPages);
    setTotalTasks(res.data.totalTasks || 0);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, [search, status, sortBy, page]);

  const handleAddTask = async (formData: FormData) => {
    const error = validateTaskForm(formData);
    if (error) return showErrorToast(error);

    const ok = await confirmAction("Create Task?", "Are you sure?");
    if (!ok) return;

    const res = await taskService.createTask(formData);
    if (!res?.ok) return showErrorToast(res?.msg);

    showSuccessToast(res.msg);
    setIsAddOpen(false);
    loadTasks();
  };

  const handleUpdateTask = async (id: string, formData: FormData) => {
    const error = validateTaskForm(formData);
    if (error) return showErrorToast(error);

    const ok = await confirmAction("Update Task?", "Save changes?");
    if (!ok) return;

    const res = await taskService.updateTask(id, formData);
    if (!res?.ok) return showErrorToast(res?.msg);

    showSuccessToast("Task updated successfully!");
    setIsEditOpen(false);
    loadTasks();
  };

  const handleDeleteTask = async (id: string) => {
    const ok = await confirmAction("Delete Task?", "This action cannot be undone.");
    if (!ok) return;

    const res = await taskService.deleteTask(id);
    if (!res?.ok) return showErrorToast(res?.msg);

    showSuccessToast("Task deleted successfully!");
    loadTasks();
  };
  const taskStats = {
    total: totalTasks,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <ListTodo className="h-8 w-8 text-blue-600" />
                Task Manager
              </h1>
              <p className="text-gray-600 mt-2">
                Organize, track, and manage your tasks efficiently
              </p>
            </div>
            
            <div className="flex items-center gap-3">
             
              
              <Button
                onClick={() => setIsAddOpen(true)}
                className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <PlusCircle className="h-5 w-5" />
                Add New Task
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Tasks</p>
                    <p className="text-2xl font-bold">{taskStats.total}</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    All
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">To Do</p>
                    <p className="text-2xl font-bold">{taskStats.todo}</p>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    Todo
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">In Progress</p>
                    <p className="text-2xl font-bold">{taskStats.inProgress}</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold">{taskStats.completed}</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Done
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-6">
          <TaskFilters
            search={search}
            onSearch={setSearch}
            status={status}
            onStatus={setStatus}
            sortBy={sortBy}
            onSort={setSortBy}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>

        {/* Tasks Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Tasks <span className="text-gray-500">({tasks.length})</span>
            </h2>
            <div className="text-sm text-gray-500">
              Showing {tasks.length} of {totalTasks} tasks
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(limit)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-500 mb-6">
                  {search || status !== "all" 
                    ? "Try adjusting your search or filters" 
                    : "Get started by creating your first task"}
                </p>
                <Button onClick={() => setIsAddOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.taskId}
                  title={task.title}
                  dueDate={task.dueDate}
                  attachment={task.attachment||""}
                  status={task.status}
                  onEdit={() => {
                    setSelectedTask(task);
                    setIsEditOpen(true);
                  }}
                  onDelete={() => handleDeleteTask(task.taskId)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modals */}
        <AddTaskModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onSubmit={handleAddTask}
        />

        {selectedTask && (
          <EditTaskModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            task={selectedTask}
            onSubmit={(formData) =>
              handleUpdateTask(selectedTask.taskId, formData)
            }
          />
        )}
      </div>
    </div>
  );
};

export default TasksPage;