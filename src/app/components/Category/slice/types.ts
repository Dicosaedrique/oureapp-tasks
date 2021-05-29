import { Category, CategoryID } from 'model/Category';

/* --- STATE --- */
export type CategoriesSliceState = Record<CategoryID, Category>;
