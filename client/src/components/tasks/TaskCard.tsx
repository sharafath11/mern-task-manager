"use client";

import React from "react";
import StatusBadge from "./StatusBadge";
import { ITaskCardProps } from "@/types/propsType";
import { formatTaskDate } from "@/utils/formatDate";


const TaskCard: React.FC<ITaskCardProps> = ({
  title,
  dueDate,
  status,
  attachment,
  onEdit,
  onDelete,
}) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; 
  


  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>

        <p className="text-sm text-gray-500 mt-1">Due: {formatTaskDate(dueDate)}</p>

        <div className="mt-2">
          <StatusBadge status={status} />
        </div>

        {attachment && (
          <a
            href={`${backendUrl}${attachment}`} 
            target="_blank"
            className="text-blue-600 text-sm mt-2 block underline hover:text-blue-700"
          >
            View Attachment
          </a>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="text-blue-600 text-sm hover:underline"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="text-red-600 text-sm hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
