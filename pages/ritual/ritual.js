var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vou: [],
  },

  /**
   * 获取优惠券
   */
  getvou: function (e) {
      var vid = e.currentTarget.dataset.vid;
      var uid = app.d.userId;
      wx.request({
        url: app.d.ceshiUrl + '/Api/',
        method: 'post',
        data: {

        },
        header: {
          'Content-Type': ''
        },
        success: function(res) {

        },
        fail: function() {
          wx.showToast({
            title: '网络异常!',
            duration: 2000
          });
        },
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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