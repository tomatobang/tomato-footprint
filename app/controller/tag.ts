'use strict';
import BaseController from './base';
import { tagValidationRule } from '../validate/tag';

export default class TagController extends BaseController {
    constructor(ctx) {
        super(ctx);
        this.service = ctx.service.tag;
        this.validateRule = tagValidationRule;
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
        conditions.userid = ctx.request['currentUser']._id;
        if (query.type) {
            conditions.type = query.type;
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
}
