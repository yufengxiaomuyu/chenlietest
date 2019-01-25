// pages/circle/circle.js
Page({
  data: {
    progress_txt: '正在匹配中...',
    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null
    score: 0
  },
  onLoad: function (options) {
    let step = (this.data.score / 100) * 2
    this.drawProgressbg()
    this.drawCircle(step)
    // this.countInterval()
  },
  // onReady: function () {
  //   this.drawProgressbg()
  // },
  drawProgressbg: function () {
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.arc(104, 104, 98, 0, 2 * Math.PI, false);
    ctx.setLineWidth(8);// 设置圆环的宽度
    ctx.setStrokeStyle('#fbedb8'); // 设置圆环的颜色
    ctx.setLineCap('round') // 设置圆环端点的形状
    // ctx.beginPath();//开始一个新的路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step) {
    let r = 104;
    let circumference = 2 * r * Math.PI
    let offset = circumference - ((this.data.score / 100) * circumference)
    var context = wx.createCanvasContext('canvasProgress');
    context.setLineWidth(12);
    context.setStrokeStyle('#fbda43');
    context.setLineCap('butt')
    // context.beginPath();
    // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
    context.arc(r, r, 98, -Math.PI / 2, 2 * Math.PI - Math.PI / 2, false);
    context.setLineDash([circumference/2, circumference/2], 10)
    context.stroke()
    context.draw()
  },
  countInterval: function () {
    // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
    this.countTimer = setInterval(() => {
      if (this.data.count <= 60) {
        /* 绘制彩色圆环进度条  
        注意此处 传参 step 取值范围是0到2，
        所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
        */
        this.drawCircle(this.data.count / (60 / 2))
        this.data.count++;
      } else {
        this.setData({
          progress_txt: "匹配成功"
        });
        clearInterval(this.countTimer);
      }
    }, 100)
  },
  onShareAppMessage: function () {

  }
})