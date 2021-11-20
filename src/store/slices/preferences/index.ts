import { DEFAULT_TASK_PRIORITIES_NAMES } from 'model/Task/Priority';
import { useInjectReducer } from 'utils/redux-injectors';
import { createSlice } from 'utils/redux-toolkit';

import { PreferencesSliceState } from './types';

/**
 * Initial state of preferences
 */
export const initialState: PreferencesSliceState = {
    priority: {
        displayPriorityFullName: true,
        prioritiesNames: DEFAULT_TASK_PRIORITIES_NAMES,
    },
    limitDate: {
        displayRelativeTime: false,
        thresholdWarning: 60,
        thresholdDanger: 80,
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
    },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePreferencesSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
