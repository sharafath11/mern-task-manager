"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IAddTaskModalProps } from "@/types/propsType";



const AddTaskModal: React.FC<IAddTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" placeholder="Task Title" required />

          <Input name="dueDate" type="date" required />

          <select
            name="status"
            className="w-full border rounded-xl p-2"
            defaultValue="todo"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <Input name="attachment" type="file" accept="image/*,application/pdf" />

          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl"
            >
              Cancel
            </Button>

            <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700">
              Create Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
