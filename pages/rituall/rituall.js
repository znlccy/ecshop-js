var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vou: []
  },

  /**
   * 类似函数
   */
  like: function(e) {
    console.log(e.currentTarget.dataset.title);
    wx:wx.navigateTo({
      url: '../index/detail?title='+e.currentTarget.dataset.title,
      success: function(res) {
        wx.showToast({
          title: '成功',
          duration: 2000
        });
      },
      fail: function(res) {
        wx.showToast({
          title: '网络异常!',
          duration: 2000
        });
      },
      complete: function(res) {
        //完成
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/User/voucher',
      method: 'post',
      data: {uid:app.d.userId},
      header: {
        "Content-Type":"x-www-form-urlencoded"
      },
      success: function(res) {
        var vou = res.data.nouses;
        var status = res.data.status;
        if(status==1) {
          that.setData({
            vou:vou,
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      error: function() {
        wx.showToast({
          title: '网络异常!',
          duration: 2000
        });
      }
    });
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})