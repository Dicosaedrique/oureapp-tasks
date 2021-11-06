import uniqid from 'uniqid';
import { Id } from 'utils/types';

export default interface IElementId {
    readonly id: Id;
}

/**
 * Generates a unique Id
 */
export function generateId(): Id {
    return uniqid();
}
