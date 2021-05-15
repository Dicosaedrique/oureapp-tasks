import { PayloadAction } from '@reduxjs/toolkit';
import {
    createTask,
    setTaskState,
    TaskInputProps,
    TaskState,
} from 'model/Task';
import {
    DEFAULT_TASK_PRIORITIES_COLORS,
    DEFAULT_TASK_PRIORITIES_NAMES,
} from 'model/Task/Priority';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';

import { TasksSliceState } from './types';

// initial state of tasks (define a set of tasks)
export const initialState: TasksSliceState = {
    list: [
        createTask({ title: 'Example 1', priority: 0 }),
        createTask({ title: 'Example 2', priority: 1 }),
        createTask({ title: 'Example 3', priority: 2 }),
        createTask({ title: 'Example 4', priority: 3 }),
        createTask({ title: 'Example 5', priority: 4 }),
    ],
    preferences: {
        priority: {
            displayPriorityFullName: true,
            prioritiesNames: DEFAULT_TASK_PRIORITIES_NAMES,
            prioritiesColors: DEFAULT_TASK_PRIORITIES_COLORS,
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
    },
});

export const { actions: tasksActions } = slice;

// create the slice hook for component
export const useTasksSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useTasksSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
