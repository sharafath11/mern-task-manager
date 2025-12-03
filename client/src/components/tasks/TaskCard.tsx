"use client";

import React from "react";
import StatusBadge from "./StatusBadge";
import { ITaskCardProps } from "@/types/propsType";
import { formatTaskDate } from "@/utils/formatDate";
import { getFileUrl } from "@/utils/url";
import { FileText, Image, File, ExternalLink } from "lucide-react";

const TaskCard: React.FC<ITaskCardProps> = ({
  title,
  dueDate,
  status,
  attachment,
  onEdit,
  onDelete,
}) => {
  const fileUrl = getFileUrl(attachment || "");

  const getAttachmentIcon = () => {
    if (fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return <Image className="h-4 w-4" />;
    } else if (fileUrl.match(/\.pdf$/i)) {
      return <FileText className="h-4 w-4" />;
    }
    return <File className="h-4 w-4" />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition-shadow">
      <div className="flex justify-between items-start">
        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Due: {formatTaskDate(dueDate)}
              </p>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Attachment */}
          {attachment && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  {getAttachmentIcon()}
                  <span>Attachment</span>
                </div>
                <button
                  onClick={() => window.open(fileUrl, "_blank")}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open
                </button>
              </div>

              {fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <div className="rounded border overflow-hidden">
                  <img
                    src={fileUrl}
                    alt="Attachment"
                    className="w-full h-32 object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm text-gray-600 truncate">
                    {fileUrl.split('/').pop()}
                  </span>
                  <a
                    href={fileUrl}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    View
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 ml-4 pt-1">
          <button
            onClick={onEdit}
            className="px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;