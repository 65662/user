// pages/addUser/addUser.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headpic: false,
    uid:'',           //用户id，编辑
    userinfo:''       //用户信息，编辑
  },
  // 头像选择、上传函数
  selectHeadpic: function () {
    var that = this  //复制当前页面对象
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed', 'original'],
      sourceType: ['album', 'camera'],
      success(res) {
        var pic = res.tempFilePaths[0]    //获取临时文件路径
        var afterfix = pic.split(".")[1]; //提取文件的后缀名
        var fileName = new Date().getTime() + "." + afterfix    //拼接云端文件名
        // 上传图片到云端
        wx.showLoading({
          title: '头像上传中',
        })
        wx.cloud.uploadFile({
          cloudPath: './image/' + fileName,  //云端中路径
          filePath: pic,                    //要上传的文件路径（临时）
          success: res => {
            that.setData({
              headpic: res.fileID            //显示所上传的图片
            })
            wx.hideLoading()                //隐藏进度条
          },
          fail: err => { console.log(err) }
        })
      }
    })
  },
  /**保存用户信息到云端 */
  saveUserInfo: function (e) {
    //提取表单各项用户信息以及头像路径
    var uname = e.detail.value.uname
    var uage = e.detail.value.uage
    var usex = e.detail.value.usex
    var dep = e.detail.value.department
    var headpic = this.data.headpic
    //保存到云端数据库
    //如果uid不存在，是新增加用户
    if(this.data.uid == ''){
      db.collection("users").add({
        data: {
          userName: uname,
          userAge: uage,
          userSex: usex,
          userDep: dep,
          headImg: headpic
        },
        success: res => {
          wx.showToast({
            title: '用户添加成功',
            duration: 2000,
            success: res => {
              //清空表单数据
              wx.redirectTo({
                url: '../addUser/addUser',
              })
            }
          })
  
        },
        fail: res => {
          wx.showToast({
            title: '用户添加失败',
            duration: 2000
          })
        }
      })
    }else{
      var uid = this.data.uid
      db.collection("users").doc(uid).update({
        data:{
          userName: uname,
          userAge: uage,
          userSex: usex,
          userDep: dep,
          headImg: headpic
        },
        success:res=>{
          wx.showToast({
            title: '用户添加成功',
            duration: 2000,
            success: res => {
              //清空表单数据
              wx.redirectTo({
                url: '../userDetail/userDetail?uid=' + uid,
              })
            }
          })
        },
        fail:res=>{
          wx.showToast({
            title: '用户信息修改失败',
            duration: 2000
          })
        }
      })
    }
    
  },
  getUserInfo:function(){
    var that = this
    db.collection("users").doc(this.data.uid).get({
      success:res=>{
        that.setData({
          userinfo:res.data,
          headpic:res.data.headImg
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.uid == undefined){
      //增加用户
    }else{  //编辑用户
      this.setData({
        uid:options.uid
      })
      this.getUserInfo();
    }
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