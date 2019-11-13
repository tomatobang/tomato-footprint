'use strict';

import BaseService from './base';
export default class FootprintService extends BaseService {
    constructor(ctx) {
        super(ctx);
        this.model = this.ctx.model.Footprint;
    }

    /**
     * 日历统计数据
     * @param { Number } userid 用户编号
     * @param { Date } startTime 开始时间
     * @param { Date } endTime 结束时间
     * @param { string } range 范围
     * @return { Object } 查询结果
     */
    async statistics(userid, startTime, endTime, range?) {
        const Footprint = this.model;
        let rangeType = range || 'day';
        let $projectObj;
        let $groupID;
        $projectObj = {
            // 校准日期并格式化
            create_at: { $substr: [{ $add: ['$create_at', 28800000] }, 0, 10] },
        };
        $groupID = '$create_at';
        if (rangeType === 'month') {
            $groupID = '$yearMonth';
            $projectObj = {
                yearMonth: { $dateToString: { format: "%Y-%m", date: "$create_at" } },
            }
        }
        if (rangeType === 'year') {
            $groupID = '$year';
            $projectObj = {
                year: { $dateToString: { format: "%Y", date: "$create_at" } },
            }
        }

        const res = await Footprint.aggregate([
            {
                $match: {
                    userid: userid,
                    deleted: false,
                    create_at: { $gte: new Date(startTime), $lte: new Date(endTime) },
                },
            },
            {
                $project: $projectObj,
            },
            {
                $group: {
                    _id: $groupID,
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);
        return res;
    }
}
