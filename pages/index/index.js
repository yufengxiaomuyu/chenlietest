// pages/index/index.js
let utils = require('../../utils/utils.js');
let app = getApp();

Page({
  data: {
    levelId: '',
    levelTitle: '',
    checked: false,
    warrant: false,
    userId: '',
    warrant: '',
    baseUrl: app.globalData.chenlieBase
  },
  onLoad(options) {
    let url = this.data.baseUrl + '/tour/level/list.do'
    utils.httpGet(url, this.processData)
    wx.showNavigationBarLoading()
    this.onLogin()
  },
  //登录
  onLogin() {
    wx.login({
      success: (res) => {
        //微信js_code
        // console.log(res)
        this.setData({
          wxcode1: res.code
        })
        //通过微信登录,获取userID
        utils.httpPost(this.data.baseUrl + '/tour/weiXin/loginByWeixin.do', {
          code: res.code,
        }, (data) => {
          // console.log(data)
          this.setData({
            userId: data[0].id,
            warrant: (data[0].wxUnionid) ? true : false
          })
        })
      },
      fail: (res) => {
        console.log('登录失败！' + res.errMsg)
      }
    })
  },
  processData(data) {
    // console.log(data)
    wx.hideNavigationBarLoading()
    // for (var i in data) {
    //   data[i].name = data[i].name.slice(0,2)
    // }
    this.setData({
      testLevel: data
    })
    // console.log(this.data.testLevel)
  },
  startTest() {
    if (this.data.checked === false) {
      return;
    }
    wx.navigateTo({
      url: '../test/test?levelId=' + this.data.levelId,
    })
  },
  radioChange(e) {
    // console.log(e)
    let levelId = parseInt(e.detail.value)
    let levelTitle = this.data.testLevel[levelId-1].name
    this.setData({
      checked: true,
      levelId: levelId,
      levelTitle: levelTitle,
    })
  },
  //生成随机题
  generateRandomQues () {
    // console.log(this.data.userId)
    let params = {
      levelId: this.data.levelId,
      userId: this.data.userId
    }
    let url = this.data.baseUrl + '/tour/user/getRandomAnswers.do'
    utils.httpGet(url, (res) => {
      // console.log(res)
      wx.hideNavigationBarLoading()
      wx.navigateTo({
        url: '../test/test?levelId=' + this.data.levelId + '&levelTitle=' + this.data.levelTitle + '&userId=' + this.data.userId,
      })
    }, params)
  },
  //获取用户unionId
  onGotUserInfo(e) {
    // console.log(e)
    if (e.detail.iv) {
      // console.log(e.detail.errMsg)
      this.setData({
        // authorize: true,
        warrant: true,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      })
      // 获取code,后台处理UnionID
      wx.login({
        success: (res) => {
          this.setData({
            wxcode2: res.code
          })
          // console.log(this.data.userId)
          // 发送获取UnionID所用数据
          wx.showNavigationBarLoading()
          utils.httpPost(this.data.baseUrl + '/tour/weiXin/decrypt.do', {
            code: this.data.wxcode2,
            encryptedData: this.data.encryptedData,
            iv: this.data.iv,
            userId: this.data.userId
          }, (res) => {
            // console.log(res)
            if (res[0].result === 1) {
              //生成随机题库
              this.generateRandomQues()
            }
          })
        },
        fail: (res) => {
          console.log('二次登录失败！' + res.errMsg)
        }
      })
    } else {
      console.log(e.detail.errMsg)
    }
  },
  onTest() {
    //生成随机题
    wx.showNavigationBarLoading()
    this.generateRandomQues()
    
  },
  onShareAppMessage(res) {
    // console.log(res)
    return {
      title: '陈列测评',
      path: '/pages/index/index'
    }
  }
})