import { Task } from 'model/Task';
import { TaskPriority } from 'model/Task/Priority';

/* --- STATE --- */
export interface TasksSliceState {
    list: Array<Task>;
    preferences: {
        priority: {
            displayPriorityFullName: boolean;
            prioritiesNames: Record<TaskPriority, string>;
            prioritiesColors: Record<TaskPriority, string>;
        };
    };
}
