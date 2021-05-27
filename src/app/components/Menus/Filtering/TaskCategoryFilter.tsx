import { useTasksSlice } from 'app/components/Task/slice';
import {
    selectCategories,
    selectTaskCategoryFilteringPreferences,
} from 'app/components/Task/slice/selectors';
import { DEFAULT_CATEGORY } from 'model/Category';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FilterItems, GenericFilterComponent } from '.';

export function TaskCategoryFilterComponent() {
    const dispatch = useDispatch();
    const { actions } = useTasksSlice();

    const taskCategoryValues = useSelector(
        selectTaskCategoryFilteringPreferences,
    );

    const categories = useSelector(selectCategories);

    const items: FilterItems<string | undefined> = [
        [DEFAULT_CATEGORY.title, undefined],
    ];

    for (const id in categories) {
        if (id in categories) items.push([categories[id].title, id]);
    }

    const toggleValue = (categoryId: string | undefined) => {
        dispatch(
            actions.toggleFilteringPreferenceValues({ category: [categoryId] }),
        );
    };

    const toggleAll = () => {
        dispatch(actions.resetFilteringPreferenceValue('category'));
    };

    return (
        <GenericFilterComponent
            id="filter-task-category"
            title="Category"
            onItemClick={toggleValue}
            items={items}
            values={taskCategoryValues}
            onAllClick={toggleAll}
        />
    );
}
