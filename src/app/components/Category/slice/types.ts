import { Category, CategoryID } from 'model/TaskList';

/* --- STATE --- */
export type CategoriesSliceState = Partial<Record<CategoryID, Category>>;
