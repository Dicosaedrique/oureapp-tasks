import { useTasksSlice } from 'app/components/Task/slice';
import { selectTaskStateFilteringPreferences } from 'app/components/Task/slice/selectors';
import { TASK_STATE_NAMES, TaskState } from 'model/Task';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FilterItems, GenericFilterComponent } from '.';

/**
 * Items to display in the filter
 */
const ITEMS: FilterItems<TaskState> = [
    [TASK_STATE_NAMES[TaskState.TODO], TaskState.TODO],
    [TASK_STATE_NAMES[TaskState.DONE], TaskState.DONE],
];

export function TaskStateFilterComponent() {
    const dispatch = useDispatch();
    const { actions } = useTasksSlice();

    const taskStateValues = useSelector(selectTaskStateFilteringPreferences);

    const toggleValue = (state: TaskState) => {
        dispatch(actions.toggleFilteringPreferenceValues({ state: [state] }));
    };

    const toggleAll = () => {
        dispatch(actions.resetFilteringPreferenceValue('state'));
    };

    return (
        <GenericFilterComponent
            id="filter-task-state"
            title="State"
            onItemClick={toggleValue}
            items={ITEMS}
            values={taskStateValues}
            onAllClick={toggleAll}
        />
    );
}
