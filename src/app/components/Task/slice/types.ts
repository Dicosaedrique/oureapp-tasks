import { Category } from 'model/Category';
import { Task } from 'model/Task';
import { TaskPriority } from 'model/Task/Priority';

/* --- STATE --- */
export interface TasksSliceState {
    list: Array<Task>;
    categories: Record<string, Category>;
    preferences: {
        priority: {
            displayPriorityFullName: boolean;
            prioritiesNames: Record<TaskPriority, string>;
            prioritiesColors: Record<TaskPriority, string>;
        };
        limitDate: {
            displayRelativeTime: boolean;
            thresholdWarning: number;
            thresholdDanger: number;
        };
        categories: {
            enableCategoriesSeparation: boolean;
        };
    };
}
