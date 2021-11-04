import { selectCategories } from 'app/components/Category/slice/selectors';
import { DEFAULT_CATEGORY } from 'model/TaskList';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FilterItems, GenericFilterComponent } from '.';
import { useFilteringSlice } from './slice';
import { selectFilteringCategory } from './slice/selectors';

export function TaskCategoryFilterComponent() {
    const dispatch = useDispatch();
    const { actions } = useFilteringSlice();

    const filteringCategoryValues = useSelector(selectFilteringCategory);

    const categories = useSelector(selectCategories);

    const items: FilterItems<string | undefined> = [[DEFAULT_CATEGORY.title, undefined]];

    for (const id in categories) {
        const category = categories[id];
        if (category !== undefined) items.push([category.title, id]);
    }

    const toggleValue = (categoryId: string | undefined) => {
        dispatch(actions.toggleFilteringSettings({ category: [categoryId] }));
    };

    const toggleAll = () => {
        dispatch(actions.resetFilteringSetting('category'));
    };

    return (
        <GenericFilterComponent
            id="filter-task-category"
            title="Category"
            onItemClick={toggleValue}
            items={items}
            values={filteringCategoryValues}
            onAllClick={toggleAll}
        />
    );
}
