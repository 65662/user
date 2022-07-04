// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

Page({
  data: {
    userinfo:''
  },
  getUserInfo:function(){
    wx.cloud.callFunction({
      name:'getAiMiYa',

    }).then(res=>{
      this.setData({
        userinfo:res.result
      })
    })
  },
});
