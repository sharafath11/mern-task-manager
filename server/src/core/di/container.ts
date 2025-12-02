import { AuthController } from "../../controller/auth.controller";
import { TaskController } from "../../controller/task.controller";
import { AuthRepository } from "../../repository/authRepository";
import { TaskRepository } from "../../repository/TaskRepository";
import { AuthService } from "../../services/auth.Service";
import { TaskService } from "../../services/task.service";
import { ITaskController } from "../interfaces/controllers/ ITask.Controller";
import { IAuthController } from "../interfaces/controllers/IAuth.Controller";
import { IAuthRepository } from "../interfaces/repository/IAuthRepository";
import { ITaskRepository } from "../interfaces/repository/ITaskRepository";
import { ITaskService } from "../interfaces/services/ ITask.Service";
import { IAuthService } from "../interfaces/services/IAuth.Service";
import { TYPES } from "../types";
import { container } from "tsyringe";

container.registerSingleton<IAuthService>(TYPES.IAuthServices, AuthService);
container.registerSingleton<IAuthController>(TYPES.IAuthController, AuthController);
container.registerSingleton<IAuthRepository>(TYPES.IAuthRepository, AuthRepository);

container.registerSingleton<ITaskService>(TYPES.ITaskService, TaskService);
container.registerSingleton<ITaskController>(TYPES.ITaskController, TaskController);
container.registerSingleton<ITaskRepository>(TYPES.ITaskRepository, TaskRepository);
export { container };
