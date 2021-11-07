import { PreferencesSliceState } from 'store/slices/preferences/types';
import { FilteringSliceState } from 'store/slices/taskFiltering/types';
import { TaskListsSliceState } from 'store/slices/taskLists/types';
import { SortingSliceState } from 'store/slices/taskSorting/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
    taskLists?: TaskListsSliceState;
    taskFiltering?: FilteringSliceState;
    taskSorting?: SortingSliceState;
    preferences?: PreferencesSliceState;
    // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
