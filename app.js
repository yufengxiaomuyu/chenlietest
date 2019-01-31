//app.js
App({
  onLaunch: function (options) {
    // 展示本地存储能力
    // console.log(options.scene)
    this.globalData.scene = options.scene
  },
  globalData: {
    userInfo: null,
    apiBase: 'http://47.105.192.141',
    chenlieBase: 'https://ceshi.chenliegonghe.cn',
    rap2Base: 'http://rap2api.taobao.org/app/mock/121162',
  }
})