let app = getApp();
Page({
  data: {
    scene: app.globalData.scene,
    officialAble: false
  },
  onLoad: function(){
    this.processScene()
  },
  processScene() {
    var officialAble
    switch (this.data.scene) {
      case 1011:
        officialAble = true;
        break;
      case 1047:
        officialAble = true;
        break;
      // case 1038:
      //   pageUrl = '../result/result';
      //   break;
      // case 1089:
      //   pageUrl = '../result/result';
      //   break;
      default:
        officialAble = false;
    }
    this.setData({
      officialAble: officialAble
    })
  },
  onShareAppMessage(res) {
    return {
      title: '陈列测评',
      path: '/pages/index/index'
    }
  }
  // subscribeAccount() {
  //   // wx.previewImage({
  //   //   urls: ['https://cdc.tencent.com/wp-content/uploads/2017/09/19.png'],
  //   // })
  //   wx.redirectTo({
  //     url: '../official-account/official-account',
  //   })
  // },
})