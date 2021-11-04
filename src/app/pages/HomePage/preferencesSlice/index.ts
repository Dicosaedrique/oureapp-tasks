import { DEFAULT_TASK_PRIORITIES_COLORS, DEFAULT_TASK_PRIORITIES_NAMES } from 'model/Task/Priority';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';

import { PreferencesSliceState } from './types';

/**
 * Initial state of preferences
 */
export const initialState: PreferencesSliceState = {
    priority: {
        displayPriorityFullName: true,
        prioritiesNames: DEFAULT_TASK_PRIORITIES_NAMES,
        prioritiesColors: DEFAULT_TASK_PRIORITIES_COLORS,
    },
    limitDate: {
        displayRelativeTime: false,
        thresholdWarning: 60,
        thresholdDanger: 80,
    },
    categories: {
        enableCategoriesSeparation: true,
    },
};

// create a redux slice for preferences
const slice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        /**
         * toggle the display of priority full names (eg : "1" => "Low")
         */
        toggleDisplayPriorityFullName(state) {
            state.priority.displayPriorityFullName = !state.priority.displayPriorityFullName;
        },

        /**
         * toggle the display of relative time for the tasks limit date
         */
        toggleDisplayRelativeTime(state) {
            state.limitDate.displayRelativeTime = !state.limitDate.displayRelativeTime;
        },

        /**
         * toggle the separation by categories (if not fallback to task state separation)
         */
        toggleCategoriesSeparation(state) {
            state.categories.enableCategoriesSeparation = !state.categories
                .enableCategoriesSeparation;
        },
    },
});

export const { actions: preferencesActions } = slice;

// create the slice hook for component
export const usePreferencesSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
