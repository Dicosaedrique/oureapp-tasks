import uniqid from 'uniqid';
import { ID } from 'utils/types/types';

export default interface IElementID {
    readonly id: ID;
}

/**
 * Generates a unique ID
 */
export function generateId(): ID {
    return uniqid();
}
