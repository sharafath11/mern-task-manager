export function validateTaskForm(formData: FormData): string | null {
  const title = formData.get("title")?.toString().trim();
  const dueDate = formData.get("dueDate")?.toString().trim();
  const status = formData.get("status")?.toString().trim();
  const file = formData.get("attachment") as File | null;
  if (!title) return "Title is required.";
  if (title.length < 3) return "Title must be at least 3 characters.";
  if (!dueDate) return "Due date is required.";

  const today = new Date();
  const selected = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  selected.setHours(0, 0, 0, 0);
  if (selected < today) return "Due date cannot be in the past.";
  if (!status) return "Status is required.";

  const validStatus = ["todo", "in-progress", "completed", "overdue"];
  if (!validStatus.includes(status)) return "Invalid status selected.";
  if (file && file.size !== 0) {
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      return "Only PNG, JPG, JPEG or PDF files are allowed.";
    }

    const maxSize = 5 * 1024 * 1024; 
    if (file.size > maxSize) {
      return "File size must not exceed 5 MB.";
    }
  }

  return null; 
}
