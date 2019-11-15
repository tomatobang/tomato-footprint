'use strict';
import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/api/ping', controller.home.index);
  /** TEST: unregister consul */
  // router.get('/api/unregister', controller.home.unregister);

  /**
   * 足迹
   */
  router.get('/api/footprint', controller.footprint.list);
  router.post('/api/footprint/statistics', controller.footprint.statistics);
  router.get('/api/footprint/:id', controller.footprint.findById);
  router.post('/api/footprint', controller.footprint.create);
  router.del('/api/footprint/:id', controller.footprint.deleteById);
  router.post('/api/footprint/:id', controller.footprint.updateById);

  /**
  * 标签
  */
  router.get('/api/tag', controller.tag.list);
  router.get('/api/tag/:id', controller.tag.findById);
  router.post('/api/tag', controller.tag.create);
  router.del('/api/tag/:id', controller.tag.deleteById);
  router.post('/api/tag/:id', controller.tag.updateById);

};
