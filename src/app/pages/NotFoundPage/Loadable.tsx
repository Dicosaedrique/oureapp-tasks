/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export default lazyLoad(
    () => import('./index'),
    module => module.NotFoundPage,
);
