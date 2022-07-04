// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userlist: [],
    pageid: 1
  },
  showDetail: function (e) {
    var uid = e.currentTarget.dataset.uid
    wx.navigateTo({
      url: '../userDetail/userDetail?id=' + uid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://hpy.yh.kaishuokj.top/huangpeiyue/auserlist.php',
      success: res => {
        var userlist = new Array()
        for (let i = 0; i < res.data.length; i++) {
          userlist.push(res.data[i])
        }
        this.setData({
          userlist: userlist
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '"数据加载中"',
      icon: 'loading'
    })
    wx.request({
      url: 'https://hpy.yh.kaishuokj.top/huangpeiyue/cuserlist.php',
      data: {
        pid: this.data.pageid + 1
      },
      success: res => {
        var oldData = this.data.userlist
        var pid = this.data.pageid
        wx.hideToast({
          success: (res) => {
          },
        })
        oldData = oldData.concat(res.data)
        this.setData({
          userlist: oldData,
          pageid: pid + 1
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})