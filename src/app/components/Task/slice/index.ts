import { PayloadAction } from '@reduxjs/toolkit';
import {
    createTask,
    setTaskState,
    TaskInputProps,
    TaskState,
} from 'model/Task';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';

import { TasksState } from './types';

// initial state of tasks (define a set of tasks)
export const initialState: TasksState = {
    list: [
        createTask({ title: 'Todo 1', priority: 1 }),
        createTask({ title: 'Todo 2', priority: 1 }),
        createTask({ title: 'Todo 3', priority: 1 }),
        createTask({ title: 'Todo 4', priority: 1 }),
    ],
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
