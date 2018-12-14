// pages/test/test.js
let localData = require("../../data/questions.js");
console.log(localData);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      localData: localData.localData,
    })
    console.log(localData.localData.questions[0].question)
  },
  onPre() {
    let newIndex = this.data.curIndex - 1;
    // console.log(newIndex);
    this.setData({
      curIndex: newIndex
    });
    console.log(this.data.curIndex);
  },
  onNext() {
    let newIndex = this.data.curIndex + 1;
    // console.log(newIndex);
    this.setData({
      curIndex: newIndex
    });
    console.log(this.data.curIndex);
  }
})