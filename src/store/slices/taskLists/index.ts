import { PayloadAction } from '@reduxjs/toolkit';
import TASK_LISTS_DEMO from 'model/demo.data';
import { createTask, setTaskState } from 'model/Task';
import { createTaskList } from 'model/TaskList';
import {
    PayloadArchiveTask,
    PayloadCreateList,
    PayloadCreateTask,
    PayloadDeleteList,
    PayloadDeleteTask,
    PayloadEditList,
    PayloadEditTask,
    PayloadUpdateTaskState,
    TaskListsSliceState,
} from 'store/slices/taskLists/types';
import { useInjectReducer } from 'utils/redux-injectors';
import { createSlice } from 'utils/redux-toolkit';

export const initialState: TaskListsSliceState = TASK_LISTS_DEMO;

const slice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {
        addTask(state, { payload }: PayloadAction<PayloadCreateTask>) {
            const taskList = state[payload.listId];

            if (taskList !== undefined) {
                taskList.tasks.push(createTask(payload.taskProps));
            }
        },

        editTask(state, { payload }: PayloadAction<PayloadEditTask>) {
            const taskList = state[payload.listId];

            if (taskList !== undefined) {
                const taskIndex = taskList.tasks.findIndex(task => task.id === payload.taskId);
                if (taskIndex !== -1) {
                    taskList.tasks[taskIndex] = {
                        ...taskList.tasks[taskIndex],
                        ...payload.taskProps,
                    };
                }
            }
        },

        deleteTask(state, { payload }: PayloadAction<PayloadDeleteTask>) {
            const taskList = state[payload.listId];

            if (taskList !== undefined) {
                const taskIndex = taskList.tasks.findIndex(task => task.id === payload.taskId);
                if (taskIndex !== -1) taskList.tasks.splice(taskIndex, 1);
            }
        },

        setTaskState(state, { payload }: PayloadAction<PayloadUpdateTaskState>) {
            const taskList = state[payload.listId];

            if (taskList !== undefined) {
                const taskIndex = taskList.tasks.findIndex(task => task.id === payload.taskId);
                if (taskIndex !== -1) {
                    taskList.tasks[taskIndex] = setTaskState(
                        taskList.tasks[taskIndex],
                        payload.newTaskState,
                    );
                }
            }
        },

        archiveTask(state, { payload }: PayloadAction<PayloadArchiveTask>) {
            const taskList = state[payload.listId];

            if (taskList !== undefined) {
                const taskIndex = taskList.tasks.findIndex(task => task.id === payload.taskId);
                if (taskIndex !== -1) {
                    const [taskToArchive] = taskList.tasks.splice(taskIndex, 1);
                    taskList.archivedTasks.push(taskToArchive);
                }
            }
        },

        createList(state, { payload }: PayloadAction<PayloadCreateList>) {
            const newList = createTaskList(payload.listProps);

            if (state[newList.id] === undefined) {
                state[newList.id] = newList;
            }
        },

        editList(state, { payload }: PayloadAction<PayloadEditList>) {
            const list = state[payload.id];

            if (list !== undefined) {
                list.title = payload.listProps.title;
            }
        },

        deleteList(state, { payload }: PayloadAction<PayloadDeleteList>) {
            if (payload.id in state) {
                delete state[payload.id];
            }
        },
    },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useTaskListsSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
