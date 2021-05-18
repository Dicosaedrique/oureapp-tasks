/**
 * Defines the order of sorting (true = ascending and false = descending)
 */
export type SortingOrder = boolean;

/**
 * Defines a comparison function (template)
 */
export type Comparer<T> = (a: T, b: T) => number;

/**
 * Generate a function that returns a comparer based on the order
 * @param order the order of the returned comparison function (either ascendent or descendent)
 */
export type ComparerOrder<T> = (order: SortingOrder) => Comparer<T>;

/**
 * Special type that filters keys of Passed object based on the condition
 */
type FilteredKeys<Base extends Object, Condition> = keyof Pick<
    Base,
    {
        [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
    }[keyof Base]
>;

export type Filter<T> = (t: T) => boolean;
