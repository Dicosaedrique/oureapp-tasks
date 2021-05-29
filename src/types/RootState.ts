import { CategoriesSliceState } from 'app/components/Category/slice/types';
import { FilteringSliceState } from 'app/components/Menus/Filtering/slice/types';
import { SortingSliceState } from 'app/components/Menus/Sorting/slice/types';
import { TasksSliceState } from 'app/components/Task/slice/types';
import { PreferencesSliceState } from 'app/pages/HomePage/preferencesSlice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
    tasks?: TasksSliceState;
    categories?: CategoriesSliceState;
    filtering?: FilteringSliceState;
    sorting?: SortingSliceState;
    preferences?: PreferencesSliceState;
    // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
