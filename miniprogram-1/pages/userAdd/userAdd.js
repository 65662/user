// pages/userAdd/userAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headpic:false,    //头像
    userInfo:'[]'       //用户信息
  },
  // 头像选择
  selectHeadpic:function(){
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed','original'],
      success:res=>{
        //上传服务器
        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: 'headpic',
          url: 'https://hpy.yh.kaishuokj.top/api/uploadHeadPic.php',
          success:res=>{
            this.setData({
              headpic:res.data
            })
          }
        })
      }
    })
  },
  //保存用户信息数据
  saveUserInfo:function(e){
    var user = e.detail.value
    user.headPic = this.data.headpic
    console.log(user)
    wx.request({
      url: 'https://hpy.yh.kaishuokj.top/api/saveUserInfo.php',
      data:{
        uname:user.uname,
        usex:user.usex,
        department:user.department,
        uage:user.uage,
        headPic:user.headPic
      },
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:res=>{
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 5000
        }),
        wx.navigateTo({
          url: '../user/user',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})