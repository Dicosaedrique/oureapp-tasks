import { TaskPriority } from 'model/Task/Priority';

/* --- STATE --- */
export interface PreferencesSliceState {
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
    // theme
    // language
}
