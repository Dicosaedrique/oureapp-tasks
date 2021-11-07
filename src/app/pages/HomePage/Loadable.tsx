import { lazyLoad } from 'utils/loadable';

export default lazyLoad(
    () => import('./index'),
    module => module.HomePage,
);
