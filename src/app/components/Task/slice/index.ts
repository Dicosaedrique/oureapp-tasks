import { PayloadAction } from '@reduxjs/toolkit';
import {
    createTask,
    setTaskState,
    TaskInputProps,
    TaskState,
} from 'model/Task';
import { TASK_DEMO } from 'model/Task/__test__';
import {
    DEFAULT_TASK_PRIORITIES_COLORS,
    DEFAULT_TASK_PRIORITIES_NAMES,
} from 'model/Task/Priority';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';

import { TasksSliceState } from './types';

// initial state of tasks (define a set of tasks)
export const initialState: TasksSliceState = {
    list: TASK_DEMO,
    preferences: {
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
    },
};

// create a redux slice for tasks
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<TaskInputProps>) {
            state.list.push(createTask(action.payload));
        },

        removeTask(state, action: PayloadAction<string>) {
            const taskIndex = state.list.findIndex(
                task => task.id === action.payload,
            );
            if (taskIndex !== -1) state.list.splice(taskIndex, 1);
        },

        setTaskState(
            state,
            action: PayloadAction<{ id: string; taskState: TaskState }>,
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

        toggleDisplayPriorityFullName(state) {
            state.preferences.priority.displayPriorityFullName = !state
                .preferences.priority.displayPriorityFullName;
        },

        toggleDisplayRelativeTime(state) {
            state.preferences.limitDate.displayRelativeTime = !state.preferences
                .limitDate.displayRelativeTime;
        },
    },
});

export const { actions: tasksActions } = slice;

// create the slice hook for component
export const useTasksSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
