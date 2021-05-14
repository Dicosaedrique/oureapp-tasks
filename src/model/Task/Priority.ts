/**
 * enum that defines possibles priority of a task
 */
export enum TaskPriority {
    NONE = 0,
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    EXTREME = 4,
}

/**
 * Default task priority
 */
export const DEFAULT_TASK_PRIORITY = TaskPriority.NONE;

/**
 * Default task priorities names
 */
export const DEFAULT_TASK_PRIORITIES_NAMES: Record<TaskPriority, string> = {
    [TaskPriority.NONE]: 'None',
    [TaskPriority.LOW]: 'Low',
    [TaskPriority.MEDIUM]: 'Medium',
    [TaskPriority.HIGH]: 'High',
    [TaskPriority.EXTREME]: 'Extreme',
};

/**
 * Default tasks priorities colors
 */
export const DEFAULT_TASK_PRIORITIES_COLORS: Record<TaskPriority, string> = {
    [TaskPriority.NONE]: '#d4d4d4',
    [TaskPriority.LOW]: '#fff349',
    [TaskPriority.MEDIUM]: '#ffaa49',
    [TaskPriority.HIGH]: '#ff4949',
    [TaskPriority.EXTREME]: '#ff0000',
};
