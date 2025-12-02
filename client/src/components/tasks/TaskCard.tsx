"use client";

import React from "react";
import StatusBadge from "./StatusBadge";
import { ITaskCardProps } from "@/types/propsType";
import { formatTaskDate } from "@/utils/formatDate";
import { getFileUrl } from "@/utils/url";

const TaskCard: React.FC<ITaskCardProps> = ({
  title,
  dueDate,
  status,
  attachment,
  onEdit,
  onDelete,
}) => {
  const fileUrl = getFileUrl(attachment||"");

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm flex justify-between items-start">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>

        <p className="text-sm text-gray-500 mt-1">
          Due: {formatTaskDate(dueDate)}
        </p>

        <div className="mt-2">
          <StatusBadge status={status} />
        </div>

        {/* Scrollable Attachment Preview */}
        {attachment && (
          <div className="mt-3 max-h-40 overflow-y-auto border rounded-lg p-2">
            <p className="text-gray-600 text-sm mb-2">Attachment:</p>

            {/* Image Preview */}
            {fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
              <img
                src={fileUrl}
                alt="Attachment"
                className="w-full rounded-md border"
              />
            ) : 
            /* PDF Preview Link */
            fileUrl.match(/\.pdf$/i) ? (
              <a
                href={fileUrl}
                target="_blank"
                className="text-blue-600 underline text-sm"
              >
                View PDF
              </a>
            ) : (
              /* Fallback */
              <a
                href={fileUrl}
                target="_blank"
                className="text-blue-600 underline text-sm"
              >
                Open Attachment
              </a>
            )}

            {/* View Full Content Button */}
            <button
              onClick={() => window.open(fileUrl, "_blank")}
              className="mt-3 text-blue-600 underline text-sm hover:text-blue-700"
            >
              View Full Content
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 ml-4">
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
