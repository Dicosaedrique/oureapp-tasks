export enum TaskPriority {
    NONE = -1, // must not be 0 because it'll break sorting by priority
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    EXTREME = 4,
}

export const DEFAULT_TASK_PRIORITY = TaskPriority.NONE;

// todo put that in a language config file
export const DEFAULT_TASK_PRIORITIES_NAMES: Record<TaskPriority, string> = {
    [TaskPriority.NONE]: 'None',
    [TaskPriority.LOW]: 'Low',
    [TaskPriority.MEDIUM]: 'Medium',
    [TaskPriority.HIGH]: 'High',
    [TaskPriority.EXTREME]: 'Extreme',
};

// todo : make that customizable
export const DEFAULT_TASK_PRIORITIES_COLORS: Record<TaskPriority, string> = {
    [TaskPriority.NONE]: '#d4d4d4',
    [TaskPriority.LOW]: '#fff349',
    [TaskPriority.MEDIUM]: '#ffaa49',
    [TaskPriority.HIGH]: '#ff4949',
    [TaskPriority.EXTREME]: '#ff0000',
};
