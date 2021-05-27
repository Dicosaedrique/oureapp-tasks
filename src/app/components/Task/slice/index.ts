import { PayloadAction } from '@reduxjs/toolkit';
import { CATEGORIES_DEMO, TASKS_DEMO } from 'model/demo.data';
import {
    createTask,
    setTaskState,
    TaskID,
    TaskInputProps,
    TaskState,
} from 'model/Task';
import { FilteringSettings } from 'model/Task/Filter';
import {
    DEFAULT_TASK_PRIORITIES_COLORS,
    DEFAULT_TASK_PRIORITIES_NAMES,
} from 'model/Task/Priority';
import { TaskSortMode } from 'model/Task/Sort';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';

import { TasksSliceState } from './types';

// initial state of tasks (define a set of tasks)
export const initialState: TasksSliceState = {
    list: TASKS_DEMO,
    categories: CATEGORIES_DEMO,
    preferences: {
        sorting: {
            mode: 'creationDate',
            order: false,
        },
        priority: {
            displayPriorityFullName: true,
            prioritiesNames: DEFAULT_TASK_PRIORITIES_NAMES,
            prioritiesColors: DEFAULT_TASK_PRIORITIES_COLORS,
        },
        limitDate: {
            displayRelativeTime: false,
            thresholdWarning: 60,
            thresholdDanger: 80,
        },
        categories: {
            enableCategoriesSeparation: true,
        },
        filtering: {
            state: [],
            priority: [],
            limitDate: [],
            category: [],
        },
    },
};

// create a redux slice for tasks
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // add a task to the state (based in the tasks inputs)
        addTask(state, action: PayloadAction<TaskInputProps>) {
            state.list.push(createTask(action.payload));
        },

        // remove a task from the slice (based in the task id)
        removeTask(state, action: PayloadAction<TaskID>) {
            const taskIndex = state.list.findIndex(
                task => task.id === action.payload,
            );
            if (taskIndex !== -1) state.list.splice(taskIndex, 1);
        },

        // set the task state based on the payload
        setTaskState(
            state,
            action: PayloadAction<{ id: TaskID; taskState: TaskState }>,
        ) {
            const taskIndex = state.list.findIndex(
                task => task.id === action.payload.id,
            );
            if (taskIndex !== -1)
                state.list[taskIndex] = setTaskState(
                    state.list[taskIndex],
                    action.payload.taskState,
                );
        },

        // toggle the display of priority full names (eg : "1" => "Low")
        toggleDisplayPriorityFullName(state) {
            state.preferences.priority.displayPriorityFullName = !state
                .preferences.priority.displayPriorityFullName;
        },

        // toggle the display of relative time for the tasks limit date
        toggleDisplayRelativeTime(state) {
            state.preferences.limitDate.displayRelativeTime = !state.preferences
                .limitDate.displayRelativeTime;
        },

        // toggle the separation by categories (if not fallback to task state separation)
        toggleCategoriesSeparation(state) {
            state.preferences.categories.enableCategoriesSeparation = !state
                .preferences.categories.enableCategoriesSeparation;
        },

        toggleFilteringPreferenceValues(
            state,
            action: PayloadAction<Partial<FilteringSettings>>,
        ) {
            const settingsToToggle = action.payload;

            for (const key in settingsToToggle) {
                if (key in state.preferences.filtering) {
                    const currentSettings: any[] =
                        state.preferences.filtering[key];

                    for (const setting of settingsToToggle[key]) {
                        if (setting in settingsToToggle[key]) {
                            const index = currentSettings.indexOf(setting);
                            if (index !== -1) currentSettings.splice(index, 1);
                            else currentSettings.push(setting);
                        }
                    }
                }
            }
        },

        resetFilteringPreferenceValue(
            state,
            action: PayloadAction<keyof FilteringSettings>,
        ) {
            state.preferences.filtering[action.payload] = [];
        },

        setSortingMode(state, action: PayloadAction<TaskSortMode>) {
            state.preferences.sorting.mode = action.payload;
        },

        toggleSortingOrder(state) {
            state.preferences.sorting.order = !state.preferences.sorting.order;
        },
    },
});

export const { actions: tasksActions } = slice;

// create the slice hook for component
export const useTasksSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
