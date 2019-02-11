// pages/score/score.js
let app = getApp()
let utils = require('../../utils/utils.js')
Page({
  data: {
    baseUrl: app.globalData.baseUrl,
    count: 0, // 设置 计数器 
    countTimer: '', // 设置 定时器
    width: 104,
    r: 98,
    circumference: '',
    offset: '',
    score: 0,
    rate: '',
    reportId: 0,
    levelContent: ['初级','中级','高级']
  },
  onLoad: function(options) {
    // console.log(utils.httpGet)
    let circumference = 2 * this.data.r * Math.PI
    let offset = (1 - this.data.score / 100) * circumference
    this.setData({
      circumference: circumference,
      offset: offset
    })
    this.drawProgressbg()
    this.getData()
  },
  getData: function() {
    let url = this.data.baseUrl + '/tour/result/selResultUserId.do'
    let params = {
      userId: 'CP004d1ff3c6ee4acab5f55306e6dc57f4'
    }
    utils.httpGet(url, this.processData, params)
  },
  processData: function(data) {
    // console.log(data)
    if (data) {
      let score = data.score
      let rate = data.rate
      let levelId = data.levelId
      let reportId = data.id
      let levelContent = this.data.levelContent[levelId-1]
      this.setData({
        score: score,
        rate: rate + '%',
        levelId: levelId,
        reportId: reportId,
        levelContent: levelContent
      })
      this.countInterval(score)
    } else {
      console.log('数据获取出错了')
    }
  },
  drawProgressbg: function() {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.arc(this.data.width, this.data.width, this.data.r, 0, 2 * Math.PI, false);
    ctx.setLineWidth(8); // 设置圆环的宽度
    ctx.setStrokeStyle('#fbedb8'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.stroke(); //对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function(offset) {
    var context = wx.createCanvasContext('canvasProgress');
    context.setLineWidth(12);
    context.setStrokeStyle('#fbda43');
    context.setLineCap('round')
    context.arc(this.data.width, this.data.width, this.data.r, -(Math.PI / 2), -(Math.PI / 2) + (2 * Math.PI), false);
    context.setLineDash([this.data.circumference, this.data.circumference], offset)
    context.stroke()
    context.draw()
  },
  countInterval: function(score) {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    // console.log(offset)
    let offset = (1 - score / 100) * this.data.circumference
    if (offset === this.data.circumference) {
      return
    }
    let curOffset = this.data.circumference
    let step = (curOffset - offset) * 16 / 1000
    let count = 0 //计数器
    let interval //定时器
    interval = setInterval(() => {
      curOffset = curOffset - step
      // console.log(curOffset)
      this.drawCircle(curOffset)
      count++
      // console.log(count)
      if (count >= Math.floor(1000 / 16)) {
        curOffset = offset
        // console.log(curOffset)
        this.drawCircle(curOffset)
        clearInterval(interval);
      }
    }, 16);
  },
  onHistory: function() {
    console.log('onhistory')
    wx.navigateTo({
      url: '../history/history?reportId=' + this.data.reportId,
    })
  },
  onShareAppMessage: function(res) {
    return {
      title: '陈列测评',
      path: '/pages/index/index'
    }
  }
})