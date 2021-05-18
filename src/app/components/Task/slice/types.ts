import { Category, CategoryID } from 'model/Category';
import { Task } from 'model/Task';
import { FilteringSettings } from 'model/Task/Filter';
import { TaskPriority } from 'model/Task/Priority';
import { TaskSortMode } from 'model/Task/Sort';
import { SortingOrder } from 'utils/types/types';

/* --- STATE --- */
export interface TasksSliceState {
    list: Array<Task>;
    categories: Record<CategoryID, Category>;
    preferences: {
        sorting: {
            mode: TaskSortMode;
            order: SortingOrder;
        };
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
        filtering: FilteringSettings;
    };
}
