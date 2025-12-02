"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IEditTaskModalProps } from "@/types/propsType";
import { getFileUrl } from "@/utils/url";

const EditTaskModal: React.FC<IEditTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    onSubmit(form);
  };

  if (!isOpen) return null;


  const attachmentUrl = getFileUrl(task?.attachment??"");

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input name="title" defaultValue={task.title} required />

          <Input
            name="dueDate"
            type="date"
            defaultValue={new Date(task.dueDate).toISOString().slice(0, 10)}
            required
          />

          <select
            name="status"
            className="w-full border rounded-xl p-2"
            defaultValue={task.status}
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Attachment Preview */}
          {task.attachment && (
  <div className="max-h-64 overflow-y-auto border rounded-lg p-2">
    <p className="text-gray-600 mb-2">Current Attachment:</p>

    {attachmentUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
      <img
        src={attachmentUrl}
        alt="Attachment"
        className="w-full rounded-lg border"
      />
    ) : attachmentUrl.match(/\.pdf$/i) ? (
      <a
        href={attachmentUrl}
        target="_blank"
        className="text-blue-600 underline"
      >
        View PDF
      </a>
    ) : (
      <a
        href={attachmentUrl}
        target="_blank"
        className="text-blue-600 underline"
      >
        Open Attachment
      </a>
    )}
  </div>
)}


          <Input
            name="attachment"
            type="file"
            accept="image/*,application/pdf"
          />

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-xl">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
