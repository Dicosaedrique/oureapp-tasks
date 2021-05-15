//
const MONTH_NAMES_SHORT = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May ',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
];

/**
 *
 * @param date date or date in ms to format
 * @returns the formatted date (eg : 14 Mar. or 18 Mar 2018) the year is only displayed if not current year
 */
export function formatDate(date: Date | number): string {
    if (!(date instanceof Date)) date = new Date(date);
    return `${date.getDate()} ${MONTH_NAMES_SHORT[date.getMonth()]}${
        date.getFullYear() !== new Date(Date.now()).getFullYear()
            ? ` ${date.getFullYear().toString()}`
            : ''
    }`;
}

/**
 * @returns number of days between two dates (take Date object or date number)
 */
export function diffInDays(start: Date | number, end: Date | number): number {
    if (start instanceof Date) start = start.getTime();
    if (end instanceof Date) end = end.getTime();
    return Math.round((end - start) / (1000 * 3600 * 24));
}

/**
 * @returns value in range min max
 */
export function range(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}
