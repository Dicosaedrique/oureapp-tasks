import { PayloadAction } from '@reduxjs/toolkit';
import { FilteringSettings } from 'model/Task/Filter';
import { FilteringSliceState } from 'store/slices/taskFiltering/types';
import { useInjectReducer } from 'utils/redux-injectors';
import { createSlice } from 'utils/redux-toolkit';

/**
 * Initial state of filtering (accepts everything)
 */
export const initialState: FilteringSliceState = {
    state: [],
    priority: [],
    limitDate: [],
};

// create a redux slice for filtering
const slice = createSlice({
    name: 'taskFiltering',
    initialState,
    reducers: {
        /**
         * toggles filtering settings (remove if present or add if absent)
         */
        toggleFilteringSettings(state, action: PayloadAction<Partial<FilteringSettings>>) {
            const settingsToToggle = action.payload;

            for (const key in settingsToToggle) {
                if (key in state) {
                    const currentSettings: any[] = state[key];

                    for (const setting of settingsToToggle[key]) {
                        const index = currentSettings.indexOf(setting);
                        if (index !== -1) currentSettings.splice(index, 1);
                        else currentSettings.push(setting);
                    }
                }
            }
        },

        /**
         * Reset the filter setting for the given key (eg. 'taskState')
         */
        resetFilteringSetting(state, action: PayloadAction<keyof FilteringSettings>) {
            state[action.payload] = [];
        },
    },
});

// create the slice hook for component
export const useFilteringSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    return { actions: slice.actions };
};
