import cron from "node-cron";
import { TaskModel } from "../models/Task";

export const startOverdueCron = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("[CRON] Running overdue task update...");

    try {
      const now = new Date();

      const result = await TaskModel.updateMany(
        {
          status: { $ne: "completed" },
          dueDate: { $lt: now }
        },
        { $set: { status: "overdue" } }
      );

      console.log(`[CRON] Overdue update completed → ${result.modifiedCount} tasks marked as overdue`);

    } catch (err) {
      console.error("[CRON] Error updating overdue tasks:", err);
    }
  });
};
