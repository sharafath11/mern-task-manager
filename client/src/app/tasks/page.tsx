"use client";

import React, { useEffect, useState } from "react";
import TaskCard from "@/components/tasks/TaskCard";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import EditTaskModal from "@/components/tasks/EditTaskModal";
import { taskService } from "@/services/taskService";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { ITask } from "@/types/taskType";
import { confirmAction } from "@/utils/confirm";
import { validateTaskForm } from "@/validation/taskValidation";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";



const TasksPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const router=useRouter()
  const { user } = useUser()
 useEffect(() => {
  if (!user) {
    router.push("/login");
  }
}, [user]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const loadTasks = async () => {
    setLoading(true);
    const res = await taskService.getTasks();

    if (!res?.ok) {
      setLoading(false);
      return showErrorToast("Failed to load tasks");
    }

    setTasks(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);
    const handleAddTask = async (formData: FormData) => {
        const error = validateTaskForm(formData);
      if (error) return showErrorToast(error);
      const ok = await confirmAction(
         "Create Task?",
         "Are you sure you want to add this task?"
       );
         if (!ok) return;
    const res = await taskService.createTask(formData);
   
    if (!res?.ok) return showErrorToast("Failed to create task");

    showSuccessToast("Task created successfully");
    setIsAddOpen(false);
    loadTasks();
  };
    const handleUpdateTask = async (id: string, formData: FormData) => {
          const error = validateTaskForm(formData);
  if (error) return showErrorToast(error);
        const ok = await confirmAction(
         "Update Task?",
         "Do you want to save these changes?"
         );
         if (!ok) return;
    const res = await taskService.updateTask(id, formData);

    if (!res?.ok) return showErrorToast("Failed to update task");

    showSuccessToast("Task updated successfully");
    setIsEditOpen(false);
    loadTasks();
  };
    const handleDeleteTask = async (id: string) => {
      const ok = await confirmAction(
    "Delete Task?",
    "This action cannot be undone."
  );

  if (!ok) return;
    const res = await taskService.deleteTask(id);

    if (!res?.ok) return showErrorToast("Failed to delete task");

    showSuccessToast("Task deleted");
    loadTasks();
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.length === 0 && (
          <p className="text-gray-500 text-center">No tasks yet.</p>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.taskId}
            title={task.title}
            dueDate={task.dueDate}
            status={task.status}
            attachment={task.attachment || ""}
            onEdit={() => {
              setSelectedTask(task);
              setIsEditOpen(true);
            }}
            onDelete={() => handleDeleteTask(task.taskId)}
          />
        ))}
      </div>

      {/* Add Modal */}
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
          onSubmit={(formData) => handleUpdateTask(selectedTask.taskId, formData)}
        />
      )}
    </div>
  );
};

export default TasksPage;
