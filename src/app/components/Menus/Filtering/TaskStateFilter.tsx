import { TASK_STATE_NAMES, TaskState } from 'model/Task';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FilterItems, GenericFilterComponent } from '.';
import { useFilteringSlice } from './slice';
import { selectFilteringState } from './slice/selectors';

/**
 * Items to display in the filter
 */
const ITEMS: FilterItems<TaskState> = [
    [TASK_STATE_NAMES[TaskState.TODO], TaskState.TODO],
    [TASK_STATE_NAMES[TaskState.DONE], TaskState.DONE],
];

export function TaskStateFilterComponent() {
    const dispatch = useDispatch();
    const { actions } = useFilteringSlice();

    const filteringStateValues = useSelector(selectFilteringState);

    const toggleValue = (state: TaskState) => {
        dispatch(actions.toggleFilteringSettings({ state: [state] }));
    };

    const toggleAll = () => {
        dispatch(actions.resetFilteringSetting('state'));
    };

    return (
        <GenericFilterComponent
            id="filter-task-state"
            title="State"
            onItemClick={toggleValue}
            items={ITEMS}
            values={filteringStateValues}
            onAllClick={toggleAll}
        />
    );
}
