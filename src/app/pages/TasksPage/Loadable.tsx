/**
 * Asynchronously loads the component for Tasks Page
 */

import { lazyLoad } from 'utils/loadable';

export default lazyLoad(
    () => import('./index'),
    module => module.default,
);
