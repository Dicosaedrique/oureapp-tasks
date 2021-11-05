import { FilterItems, GenericFilterComponent } from 'app/components/Menus/Filtering';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFilteringSlice } from 'store/slices/taskFiltering';
import { selectFilteringLimitDate } from 'store/slices/taskFiltering/selectors';

/**
 * Items to display in the filter
 */
const ITEMS: FilterItems<boolean> = [
    ['With limit date', true],
    ['Without limit date', false],
];

export function TaskLimitDateFilterComponent() {
    const dispatch = useDispatch();
    const { actions } = useFilteringSlice();

    const filteringLimitDateValues = useSelector(selectFilteringLimitDate);

    const toggleValue = (limitDate: boolean) => {
        dispatch(actions.toggleFilteringSettings({ limitDate: [limitDate] }));
    };

    const toggleAll = () => {
        dispatch(actions.resetFilteringSetting('limitDate'));
    };

    return (
        <GenericFilterComponent
            id="filter-task-limit-date"
            title="Limit date"
            onItemClick={toggleValue}
            items={ITEMS}
            values={filteringLimitDateValues}
            onAllClick={toggleAll}
        />
    );
}
