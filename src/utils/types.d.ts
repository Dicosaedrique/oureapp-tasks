/**
 * Defines Ids as string in the application
 */
export type Id = string;

/**
 * Defines the order of sorting (true = ascending and false = descending)
 */
export type SortingOrder = boolean;

/**
 * Defines a comparison function (template)
 */
export type Comparer<T> = (a: T, b: T) => number;

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

export type EnumDictionnary<Enum, Type> = { [key in Enum]: Type };

export type Dictionary<KeyType, ValueType> = Partial<Record<KeyType, ValueType>>;
