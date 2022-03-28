import { DEFAULT_TASK_PRIORITIES_NAMES, TaskPriority } from 'model/Task/Priority';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFilteringSlice } from 'store/slices/taskFiltering';
import { selectFilteringPriority } from 'store/slices/taskFiltering/selectors';

import { FilterItems, GenericFilterComponent } from '.';

/**
 * Items to display in the filter
 */
const ITEMS: FilterItems<TaskPriority> = [
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.NONE], TaskPriority.NONE],
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.LOW], TaskPriority.LOW],
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.MEDIUM], TaskPriority.MEDIUM],
    [DEFAULT_TASK_PRIORITIES_NAMES[TaskPriority.HIGH], TaskPriority.HIGH],
];

export function TaskPriorityFilterComponent(): React.ReactElement {
    const dispatch = useDispatch();
    const { actions } = useFilteringSlice();

    const filteringPriorityValues = useSelector(selectFilteringPriority);

    const toggleValue = (priority: TaskPriority) => {
        dispatch(actions.toggleFilteringSettings({ priority: [priority] }));
    };

    const toggleAll = () => {
        dispatch(actions.resetFilteringSetting('priority'));
    };

    return (
        <GenericFilterComponent
            id="filter-task-priority"
            title="Priority"
            onItemClick={toggleValue}
            items={ITEMS}
            values={filteringPriorityValues}
            onAllClick={toggleAll}
        />
    );
}
