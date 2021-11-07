export type Id = string;

/**
 * Defines the order of sorting (true = ascending and false = descending)
 */
export type SortingOrder = boolean;

export type Comparer<T> = (a: T, b: T) => number;

export type Filter<T> = (t: T) => boolean;

export type EnumDictionnary<Enum extends string | number | symbol, Type> = { [key in Enum]: Type };

export type Dictionary<KeyType extends string | number | symbol, ValueType> = Partial<
    Record<KeyType, ValueType>
>;
