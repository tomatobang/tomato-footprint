'use strict';
import BaseController from './base';

import { footprintValidationRule } from '../validate/footprint';

export default class FootprintController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.service = ctx.service.footprint;
    this.validateRule = footprintValidationRule;
  }

  /**
  * search with conditions
  */
  async list() {
    const { ctx } = this;
    let conditions: any;
    conditions = {};
    const query = ctx.request.query;
    ctx.logger.info('ctx.request：', ctx.request['currentUser']);
    let datenow = new Date();
    if (query.date) {
      datenow = new Date(query.date);
    }
    datenow = new Date(datenow.getTime());
    const nextday = new Date(datenow.getTime() + 24 * 60 * 60 * 1000);
    ctx.logger.info('query.date：', query.date);
    const gtDate = new Date(datenow.setHours(0,0,0,0));
    const ltDate = new Date(nextday.setHours(0,0,0,0));
    conditions = { create_at: { $gt: gtDate, $lt: ltDate }, deleted: false };
    conditions.userid = ctx.request['currentUser']._id;
    if (query.conditions) {
      conditions = JSON.parse(query.conditions);
    }
    const result = await this.service.findAll(query, conditions);
    ctx.body = result;
    ctx.status = 200;
  }

  /**
  * create record
  */
  async create() {
    const { ctx, app } = this;
    // filter with logged userinfo
    ctx.request.body.userid = ctx.request['currentUser']._id;
    if (this.validateRule) {
      const invalid = app['validator'].validate(
        this.validateRule,
        ctx.request.body
      );
      if (invalid) {
        ctx.throw(400);
      }
    }
    const result = await this.service.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = result;
  }

  /**
   * daily statistics
   */
  async statistics() {
    const { ctx, app } = this;
    const date = ctx.request.body.date;
    let userid = '';
    userid = ctx.request['currentUser']._id;
    const starDate = ctx.helper.dateHelper.getCurrentMonthFirst(date);
    const endDate = ctx.helper.dateHelper.getNextMonthFirst(date);
    const ret = await ctx.service.footprint.statistics(
      app.mongoose.Types.ObjectId(userid),
      starDate,
      endDate,
    );
    if (ret.length) {
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: ret
      };
    } else {
      ctx.status = 200;
      ctx.body = [];
    }
  }
}
