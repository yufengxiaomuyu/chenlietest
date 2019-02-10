//app.js

App({
  onLaunch: function(options) {
    // 展示本地存储能力
    // console.log(options.scene)
    this.globalData.scene = options.scene
  },
  globalData: {
    userInfo: null,
    apiBase: 'http://47.105.192.141',
    chenlieBase: 'https://ceshi.chenliegonghe.cn',
    rap2Base: 'http://rap2api.taobao.org/app/mock/121162',
    mockBase: 'https://chenlietest.cn'
  }
})

//模拟数据
let app = getApp()
// console.log(app)
// const Mock = require('./utils/WxMock.js')
var Mock = require("./utils/WxMock.js")

//获取陈列等级
Mock.mock(app.globalData.mockBase + '/tour/level/list.do', {
  "code": 200,
  "data": [{
      "id": 1,
      "name": "初级"
    },
    {
      "id": 2,
      "name": "中级"
    },
    {
      "id": 3,
      "name": "高级"
    }
  ]
})

//获取测试题目
Mock.mock(app.globalData.mockBase + '/tour/question/list.do', {
  "code": 200,
  "data": [{
      id: "001",
      content: '下面对陈列推广长期效益描述错误的是',
      img: '',
      type: 1,
      optionList: [{
          id: "1",
          content: "快速吸引1"
        },
        {
          id: "2",
          content: "快速推荐1"
        },
        {
          id: "3",
          content: "快速试穿1"
        },
        {
          id: "4",
          content: "展示快鱼1风格定位"
        }
      ]
    },
    {
      id: "002",
      content: '下面对陈列推广短期效益描述错误的是',
      img: 'http://img5.imgtn.bdimg.com/it/u=2198542653,2425149708&fm=26&gp=0.jpg',
      type: 1,
      optionList: [{
          id: "1",
          content: "快速吸引2"
        },
        {
          id: "2",
          content: "快速推荐2"
        },
        {
          id: "3",
          content: "快速试穿2"
        },
        {
          id: "4",
          content: "展示快鱼2风格定位"
        }
      ]
    },
    {
      id: "003",
      content: '下面对陈列推广中期效益描述错误的是',
      img: '',
      type: 2,
      optionList: [{
          id: "1",
          content: "快速吸引3"
        },
        {
          id: "2",
          content: "快速推荐3"
        },
        {
          id: "3",
          content: "快速试穿3"
        },
        {
          id: "4",
          content: "展示快鱼3风格定位"
        }
      ]
    },
    {
      id: "004",
      content: '下面对陈列推广中期效益描述错误的是',
      img: 'http://img5.imgtn.bdimg.com/it/u=2198542653,2425149708&fm=26&gp=0.jpg',
      type: 2,
      optionList: [{
        id: "1",
        content: "快速吸引4"
      },
      {
        id: "2",
        content: "快速推荐4"
      },
      {
        id: "3",
        content: "快速试穿4"
      },
      {
        id: "4",
        content: "展示快鱼4风格定位"
      }
      ]
    },
  ]
})

//获取测评分数
Mock.mock(app.globalData.mockBase + '/tour/result/selResultUserId.do', {
  "code": 200,
  "data": {
    id: '000001',
    levelId: 3,
    score: 90,
    rate: 90
  }
})