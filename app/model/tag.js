'use strict';

module.exports = app => {
  /**
   * 标签
   */
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.ObjectId;

  const tag = new mongoose.Schema({
    // 用户编号
    userid: { type: ObjectId, ref: 'user' },
    // 名称
    name: String,
    // 图标
    icon: String,
    // 类型[ 账单、足迹、TODO、番茄钟]
    type: String,
    // 备注
    note: String,
    // 排序
    sort: { type: Number, default: 0 },
    // 时间 
    create_at: { type: Date, default: Date.now },
    // 是否已删除
    deleted: { type: Boolean, default: false },
  });
  return mongoose.model('tag', tag);
};
