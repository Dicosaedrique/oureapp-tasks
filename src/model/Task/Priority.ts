export enum TaskPriority {
    NONE = -1, // must not be 0 because it'll break sorting by priority
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
}

export const DEFAULT_TASK_PRIORITY = TaskPriority.NONE;

// todo put that in a language config file
export const DEFAULT_TASK_PRIORITIES_NAMES: Record<TaskPriority, string> = {
    [TaskPriority.NONE]: 'None',
    [TaskPriority.LOW]: 'Low',
    [TaskPriority.MEDIUM]: 'Medium',
    [TaskPriority.HIGH]: 'High',
};
