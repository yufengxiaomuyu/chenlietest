// pages/circle/circle.js
Page({
  data: {
    count: 0, // 设置 计数器 初始为0
    countTimer: '', // 设置 定时器 初始为null
    width: 104,
    r: 98,
    score: 8,
  },
  onLoad: function (options) {
    let circumference = 2 * this.data.r * Math.PI
    let offset = (1 - this.data.score / 100) * circumference
    this.setData({
      circumference: circumference,
      offset: offset
    })
    this.drawProgressbg()
    this.countInterval(offset)
  },
  drawProgressbg: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.arc(this.data.width, this.data.width, this.data.r, 0, 2 * Math.PI, false);
    ctx.setLineWidth(8);// 设置圆环的宽度
    ctx.setStrokeStyle('#fbedb8'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (offset) {
    var context = wx.createCanvasContext('canvasProgress');
    context.setLineWidth(12);
    context.setStrokeStyle('#fbda43');
    context.setLineCap('round')
    context.arc(this.data.width, this.data.width, this.data.r, - (Math.PI / 2), - (Math.PI / 2) + (2 * Math.PI), false);
    context.setLineDash([this.data.circumference, this.data.circumference], offset)
    context.stroke()
    context.draw()
  },
  countInterval: function (offset) {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    console.log(offset)
    let curOffset = this.data.circumference
    let step = (curOffset - offset) * 16 / 1000
    let count = 0 //计数器
    let interval//定时器
    interval = setInterval(() => {
      curOffset = curOffset - step
      console.log(curOffset)
      this.drawCircle(curOffset)
      count++
      console.log(count)
      if (count >= Math.floor(1000/16)) {
        curOffset = offset
        console.log(curOffset)
        this.drawCircle(curOffset)
        clearInterval(interval);
      }
    }, 16);
  },
})