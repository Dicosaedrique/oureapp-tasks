import { Category, CategoryID } from 'model/Category';

/* --- STATE --- */
export type CategoriesSliceState = Partial<Record<CategoryID, Category>>;
