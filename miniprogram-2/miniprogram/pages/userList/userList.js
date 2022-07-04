// pages/userList/userList.js
const { envList } = require('../../envList.js');
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlist:[],
    pageId:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    this.getUserList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getUserList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  /**获取用户列表 */
  getUserList:function(){
    wx.showLoading({
      title: '数据载入中...',
    })
    var olist = this.data.userlist    //旧的用户列表
    var pageNum = this.data.pageId    //先提取页码
    var offset = (pageNum - 1) * 10   //计算开始查询的位置
    var that = this
    db.collection("users").skip(offset).limit(10).get()
    .then(res=>{
      wx.hideLoading()
      olist = olist.concat(res.data)  //把返回的新列表接到旧列表后面
      that.setData({
        userlist:olist,
        pageId:pageNum + 1
      })
    })
  },
})