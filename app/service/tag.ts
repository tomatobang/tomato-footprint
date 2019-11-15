'use strict';
import BaseService from './base';
export default class TagService extends BaseService {

    constructor(ctx) {
        super(ctx);
        this.model = this.ctx.model.Tag;
    }
}
