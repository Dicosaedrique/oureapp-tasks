import { useTasksSlice } from 'app/components/Task/slice';
import { selectTaskPriorityFilteringPreferences } from 'app/components/Task/slice/selectors';
import {
    DEFAULT_TASK_PRIORITIES_NAMES,
    TaskPriority,
} from 'model/Task/Priority';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FilterItems, GenericFilterComponent } from '.';

/**
 * Items to display in the filter
 */
const ITEMS: FilterItems<TaskPriority> = [
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.NONE], TaskPriority.NONE],
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.LOW], TaskPriority.LOW],
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.MEDIUM], TaskPriority.MEDIUM],
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.HIGH], TaskPriority.HIGH],
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.EXTREME], TaskPriority.EXTREME],
];

export function TaskPriorityFilterComponent() {
    const dispatch = useDispatch();
    const { actions } = useTasksSlice();

    const taskPriorityValues = useSelector(
        selectTaskPriorityFilteringPreferences,
    );

    const toggleValue = (priority: TaskPriority) => {
        dispatch(
            actions.toggleFilteringPreferenceValues({ priority: [priority] }),
        );
    };

    const toggleAll = () => {
        dispatch(actions.resetFilteringPreferenceValue('priority'));
    };

    return (
        <GenericFilterComponent
            id="filter-task-priority"
            title="Priority"
            onItemClick={toggleValue}
            items={ITEMS}
            values={taskPriorityValues}
            onAllClick={toggleAll}
        />
    );
}
