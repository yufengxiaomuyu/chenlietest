// pages/test/test.js
let app = getApp();
let utils = require('../../utils/utils.js');

Page({
  data: {
    curIndex: 1,
    checkedIndex: 0,
    totalQuestions: '',
    levelId: '',
    levelTitle: '',
    userId: app.globalData.userId,
    baseUrl: app.globalData.chenlieBase,
    isSubmit: false,
  },
  onLoad: function(options) {
    // console.log(options)
    let levelId = options.levelId
    let levelTitle = options.levelTitle
    let userId = options.userId
    this.setData({
      levelId: levelId,
      levelTitle: levelTitle,
      userId: userId,
    })
    console.log()
    wx.setNavigationBarTitle({
      title: levelTitle
    })
    //获取题目列表
    let url = this.data.baseUrl + '/tour/question/list.do';
    utils.httpGet(url, this.processData, {
      userId: userId
    })
    wx.showNavigationBarLoading()
  },
  processData(data) {
    wx.hideNavigationBarLoading()
    this.setData({
      questions: data,
      totalQuestions: data.length
    })
  },
  radioChange(e) {
    if (this.data.checkedIndex === this.data.curIndex - 1) {
      let checkedIndex = this.data.checkedIndex + 1;
      this.setData({
        checkedIndex: checkedIndex
      })
    }
    // console.log(e.detail.value)
  },
  checkboxChange(e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    if (this.data.checkedIndex === this.data.curIndex - 1) {
      let checkedIndex = this.data.checkedIndex + 1;
      this.setData({
        checkedIndex: checkedIndex
      })
    }
  },
  //点击上一题
  onPre() {
    if (this.curIndex <= 1) {
      return;
    }
    let newIndex = this.data.curIndex - 1;
    this.setData({
      curIndex: newIndex,
    });
  },
  //点击下一题
  onNext() {
    let checkedIndex = this.data.checkedIndex;
    let curIndex = this.data.curIndex;
    if (checkedIndex < curIndex) {
      return;
    };
    let newIndex = curIndex + 1;
    this.setData({
      curIndex: newIndex,
    });
  },
  //提交表单
  testSubmit(e) {
    if (this.data.checkedIndex < this.data.curIndex) {
      return;
    };
    if (this.data.isSubmit === true) {
      return;
    };
    this.setData({
      isSubmit: true,
    });
    //提交测试结果
    let url = this.data.baseUrl + '/tour/result/add.do';
    var value = e.detail.value
    // console.log(value)
    for (var key in value) {
      if ((typeof value[key]) === 'object') {
        value[key] = value[key].join(',')
      }
    }
    // console.log(value)
    let answer = JSON.stringify(value)
    // console.log(answer)
    let params = {
      levelId: parseInt(this.data.levelId),
      userId: this.data.userId,
      questAnswer: answer
    }
    utils.httpPost(url, params, function() {})
    // console.log('sucess')
    //跳转路由
    wx.redirectTo({
      url: '../result/result'
    })
  },
  onShareAppMessage(res) {
    // console.log(res)
    return {
      title: '陈列测评',
      path: '/pages/index/index',
    }
  },
})