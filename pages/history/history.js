// pages/history/history.js
let utils = require('../../utils/utils.js')
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: app.globalData.rap2Base, 
    questions: [],
    optionHead: ['A', 'B', 'C', 'D', 'E', 'F'],
    rightIcon: '/imgs/right-icon.png',
    wrongIcon: '/imgs/wrong-icon.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = this.data.baseUrl + '/tour/result/selResultDetail.do'
    let params = {
      id: options.reportId,
    }
    utils.httpGet(url,this.processData,params)
  },

  //处理获取的数据
  processData(data) {
    console.log(data)
    let rightAnswer = JSON.parse(data.result.rightAnswer)
    let questAnswer = JSON.parse(data.result.questAnswer)
    // console.log(rightAnswer)
    // console.log(questAnswer)
    var newRightAnswer = this.strToArr(rightAnswer)
    var newQuestAnswer = this.strToArr(questAnswer)
    let questions = data.questions
    for (var i in questions) {
      // console.log(i)
      let optionList = questions[i].optionList
      // console.log(optionList)
      let index = questions[i].id
      // console.log(index)
      console.log(questions[i].answer)
      questions[i].answer = this.numToLetter(questions[i].answer)
      for (var l in optionList) {
        optionList[l].condition = 0
        optionList[l].idx = l
        for (var key in newQuestAnswer[index]) {
          console.log(newQuestAnswer[index][key])
          if ((newRightAnswer[index].indexOf(newQuestAnswer[index][key]) === -1)) {
            optionList[(newQuestAnswer[index][key] - 1)].condition = 2
          } else {
            optionList[(newQuestAnswer[index][key] - 1)].condition = 1
          }
        }
      }
      console.log(questions)
    }
    this.setData({
      questions: questions,
    })
  },

  // 字符串转数组  
  strToArr(object1) {
    for (var key in object1) {
      object1[key] = object1[key].split(',')
    }
    return object1
  },

  // 数字转字母
  numToLetter(str) {
    var str1 = str.replace(/1/g, 'A')
    var str2 = str1.replace(/2/g, 'B')
    var str3 = str2.replace(/3/g, 'C')
    var str4 = str3.replace(/4/g, 'D')
    var str5 = str4.replace(/5/g, 'E')
    return str5
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})