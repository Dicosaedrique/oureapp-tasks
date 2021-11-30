import { PayloadAction } from '@reduxjs/toolkit';
import TASK_LISTS_DEMO from 'model/demo.data';
import { createTask, setTaskState, TaskState } from 'model/Task';
import { createTaskList, DEFAULT_LIST_ID } from 'model/TaskList';
import {
    PayloadArchiveList,
    PayloadArchiveListDoneTasks,
    PayloadArchiveTask,
    PayloadCreateList,
    PayloadCreateTask,
    PayloadDeleteArchivedTask,
    PayloadDeleteList,
    PayloadDeleteTask,
    PayloadEditList,
    PayloadEditTask,
    PayloadUnarchiveList,
    PayloadUnarchiveTask,
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

        deleteArchivedTask(state, { payload }: PayloadAction<PayloadDeleteArchivedTask>) {
            const taskList = state[payload.listId];

            if (taskList !== undefined) {
                const taskIndex = taskList.archivedTasks.findIndex(
                    task => task.id === payload.taskId,
                );
                if (taskIndex !== -1) taskList.archivedTasks.splice(taskIndex, 1);
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

        unarchiveTask(state, { payload }: PayloadAction<PayloadUnarchiveTask>) {
            const taskList = state[payload.listId];

            if (taskList !== undefined) {
                const taskIndex = taskList.archivedTasks.findIndex(
                    task => task.id === payload.taskId,
                );
                if (taskIndex !== -1) {
                    const [taskToUnarchive] = taskList.archivedTasks.splice(taskIndex, 1);
                    taskList.tasks.push(taskToUnarchive);
                    taskList.isArchived = false;
                }
            }
        },

        archiveListDoneTasks(state, { payload }: PayloadAction<PayloadArchiveListDoneTasks>) {
            const list = state[payload.id];

            if (list !== undefined) {
                const tasksDone = list.tasks.filter(task => task.state === TaskState.DONE);
                const tasksNotDone = list.tasks.filter(task => task.state !== TaskState.DONE);

                list.tasks = tasksNotDone;
                list.archivedTasks.push(...tasksDone);
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
            if (payload.id in state && payload.id !== DEFAULT_LIST_ID) {
                delete state[payload.id];
            }
        },

        archiveList(state, { payload }: PayloadAction<PayloadArchiveList>) {
            const list = state[payload.id];

            if (list !== undefined && payload.id !== DEFAULT_LIST_ID) {
                list.archivedTasks.push(...list.tasks);
                list.tasks = [];
                list.isArchived = true;
            }
        },

        unarchiveList(state, { payload }: PayloadAction<PayloadUnarchiveList>) {
            const list = state[payload.id];

            if (list !== undefined && payload.id !== DEFAULT_LIST_ID) {
                list.tasks.push(...list.archivedTasks);
                list.archivedTasks = [];
                list.isArchived = false;
            }
            console.log('ALLO !!!');
        },
    },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useTaskListsSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
