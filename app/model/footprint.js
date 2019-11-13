'use strict';

module.exports = app => {
  /**
   * 足迹
   */
  const mongoose = app.mongoose;
  const ObjectId = mongoose.Schema.ObjectId;

  const footprint = new mongoose.Schema({
    // 用户编号
    userid: { type: ObjectId, ref: 'user' },
    // 标签
    tag: { type: String, default: '' },
    // tag: { type: ObjectId, ref: 'tag' },
    // 关联支付记录
    bill: { type: String, default: '' },
    // bill: { type: ObjectId, ref: 'bill' },
    // 心情 (1-5)
    mode: { type: Number, default: 3 },
    // 位置
    position: { type: String, default: '' },
    // 备注
    notes: String,
    // 音频
    voices: { type: mongoose.Schema.Types.Mixed, default: [] },
    // 图片
    pictures: { type: mongoose.Schema.Types.Mixed, default: [] },
    // 视频
    videos: { type: mongoose.Schema.Types.Mixed, default: [] },
    // 时间 
    create_at: { type: Date, default: Date.now },
    // 是否已删除
    deleted: { type: Boolean, default: false },

  });
  return mongoose.model('footprint', footprint);
};
