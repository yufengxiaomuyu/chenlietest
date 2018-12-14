// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  startTest() {
    wx.redirectTo({
      url: '../test/test',
    })
  },
  captureScreen() {
    wx.captureScreen();
    console.log(1);
  }
})