function httpGet(url,callBack,params) {
  wx.request({
    url: url,
    data: params,
    header: {
      "Content-Type": "json"
    },
    method: "GET",
    success(res) {
      callBack(res.data)
    },
    fail(err) {
      console.log(err.errMsg);
    },
  })
};
function httpPost(url, params,callback) {
  wx.request({
    url: url,
    data: params,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",
    success(res) {
      // console.log('post success')
      // console.log(res)
      callback(res.data)
    },
    fail(err) {
      console.log(err.errMsg);
    },
  })
};
module.exports = {
  httpGet,
  httpPost
}