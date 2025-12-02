export const TYPES = {
    IAuthController: Symbol("IAuthController"),
    IAuthServices: Symbol("IAuthServices"),
    IAuthRepository: Symbol("IAuthRepository"),
    ITaskController: Symbol("ITaskController"),
    ITaskRepository: Symbol.for("ITaskRepository"),
  ITaskService: Symbol.for("ITaskService"),
} as const
