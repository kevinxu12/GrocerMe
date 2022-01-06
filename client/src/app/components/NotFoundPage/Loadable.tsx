/**
 * @file Asynchronously loads component for NotFoundPage
 * @author Kevin Xu
 */

import { lazyLoad } from 'utils/loadable';

export const NotFoundPage = lazyLoad(
  () => import('./index'),
  module => module.NotFoundPage,
);
