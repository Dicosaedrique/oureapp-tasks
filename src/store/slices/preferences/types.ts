import { TaskPriority } from 'model/Task/Priority';

export interface PreferencesSliceState {
    priority: {
        displayPriorityFullName: boolean;
        prioritiesNames: Record<TaskPriority, string>;
    };
    limitDate: {
        displayRelativeTime: boolean;
        thresholdWarning: number;
        thresholdDanger: number;
    };
    // theme
    // language
}
