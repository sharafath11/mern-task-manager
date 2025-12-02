import React from "react";

interface StatusBadgeProps {
  status: "todo" | "in-progress" | "completed" | "overdue";
}

const statusStyles: Record<string, string> = {
  "todo": "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  "completed": "bg-green-100 text-green-700",
  "overdue": "bg-red-100 text-red-700",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status.replace("-", " ").toUpperCase()}
    </span>
  );
};

export default StatusBadge;
