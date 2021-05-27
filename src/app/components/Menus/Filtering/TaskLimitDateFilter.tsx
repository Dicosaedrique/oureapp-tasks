import { useTasksSlice } from 'app/components/Task/slice';
import { selectTaskLimitDateFilteringPreferences } from 'app/components/Task/slice/selectors';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FilterItems, GenericFilterComponent } from '.';

/**
 * Items to display in the filter
 */
const ITEMS: FilterItems<boolean> = [
    ['With limit date', true],
    ['Without limit date', false],
];

export function TaskLimitDateFilterComponent() {
    const dispatch = useDispatch();
    const { actions } = useTasksSlice();

    const taskLimitDateValues = useSelector(
        selectTaskLimitDateFilteringPreferences,
    );

    const toggleValue = (limitDate: boolean) => {
        dispatch(
            actions.toggleFilteringPreferenceValues({ limitDate: [limitDate] }),
        );
    };

    const toggleAll = () => {
        dispatch(actions.resetFilteringPreferenceValue('limitDate'));
    };

    return (
        <GenericFilterComponent
            id="filter-task-limit-date"
            title="Limit date"
            onItemClick={toggleValue}
            items={ITEMS}
            values={taskLimitDateValues}
            onAllClick={toggleAll}
        />
    );
}
