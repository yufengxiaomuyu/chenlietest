//app.js

App({
  onLaunch: function(options) {
    // 展示本地存储能力
    // console.log(options.scene)
    this.globalData.scene = options.scene
  },
  globalData: {
    userInfo: null,
    chenlieBase: 'https://ceshi.chenliegonghe.cn',
    rap2Base: 'http://rap2api.taobao.org/app/mock/121162',
    easymockBase: 'https://www.easy-mock.com/project/5c61413c893b434a6b721cde',
    mockBase: 'https://chenlietest.cn',
    baseUrl: ''
  }
})


let app = getApp()

//设置baseUrl
app.globalData.baseUrl = app.globalData.mockBase
console.log(app)

//模拟数据
const Mock = require('./utils/WxMock.js')

//陈列师等级
Mock.mock(app.globalData.mockBase + '/tour/level/list.do', {
  "code": 200,
  "data|3": [{
    "grade|+1": 1,
    "id|+1": 1,
    "name|+1": [
      "初级",
      "中级",
      "高级"
    ]
  }]
})

//题目列表
Mock.mock(app.globalData.mockBase + '/tour/question/list.do', {
  "code": 200,
  "data|4": [{
    "content": "@ctitle(18,45)",
    "id|+1": 5,
    "img|+1": [
      "",
      "http://dummyimage.com/300x200",
      "",
      "http://dummyimage.com/300x200"
    ],
    "levelId|1-3": 1,
    "optionList|4": [{
      "content": "@ctitle(4,25)",
      "id|+1": 17
    }],
    "type|+1": [
      1,
      2,
      1,
      2
    ]
  }]
})

//测评分数
Mock.mock(app.globalData.mockBase + '/tour/result/selResultUserId.do', {
  "code": 200,
  "data": {
    "score|0-100": 1,
    "rate|0-100": 1,
    "userId": "CP004d1ff3c6ee4acab5f55306e6dc57f4",
    "levelId|1-3": 1,
    "id|1-99": 1
  }
})

//测评报告
Mock.mock(app.globalData.mockBase + '/tour/result/selResultDetail.do', {
  "code": 200,
  "data": {
    "result": {
      "questAnswer": "{\"1\":\"2\",\"2\":\"3\",\"3\":\"1,2,3\",\"4\":\"1,2\"}",
      "rightAnswer": "{\"1\":\"2\",\"2\":\"2\",\"3\":\"1,3,4\",\"4\":\"1,2,3,4\"}"
    },
    "questions|4": [{
      "content": "@ctitle(18,45):",
      "id|+1": 5,
      "levelId|1": 1,
      "optionList|4": [{
        "content": "@ctitle(4,25)",
        "id|+1": 17
      }],
      "answer|+1": [
        "2",
        "2",
        "1,3,4",
        "1,2,3,4"
      ],
      "img|+1": [
        "",
        "http://dummyimage.com/300x200",
        "",
        "http://dummyimage.com/300x200"
      ],
      "type|+1": [
        1,
        1,
        2,
        2
      ]
    }]
  }
})