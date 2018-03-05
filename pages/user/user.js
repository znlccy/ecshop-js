/* 获取应用主键 */
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    orderInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    userListInfo: [ {
      icon: '../../images/iconfont-dingdan.png',
      text: '我的订单',
      isunread: true,
      unreadNum:2
    },
    {
      icon: '../../images/iconfont-card.png',
      text: '我的代金券',
      isunread: false,
      unreadNum: 2
    },
    {
      icon: '../../images/iconfont-icontuan.png',
      text: '我的拼团',
      isunread: true,
      unreadNum: 1
    },
    {
      icon: '../../images/iconfont-shouhuodizhi.png',
      text: '收获地址管理'
    },
    {
      icon: '../../images/iconfont-kefu.png',
      text: '联系客服'
    },
    {
      icon: '../../images/iconfont-help.png',
      text: '常见问题'
    }
    ],
    loadingText: '加载中...',
    loadingHidden: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /*调用应用实例的方法获取全局数据*/
    app.getUserInfo(function(userInfo) {
      // 更新数据
      that.setData({
        userInfo:userInfo,
        loadingHidden: true
      })
    });

    this.loadOrderStatus();
  },

  /*
   * 加载订单状态
   */
  loadOrderStatus: function() {
    // 获取用户订单数据
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + 'Api/User/getorder',
      method: 'post',
      data: {
        userId: app.d.userId,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status;
        if (status==1) {
          var orderInfo = res.data.orderInfo;
          this.setData({
            orderInfo:orderInfo
          });
        } else {
          wx.showToast({
            title: '非法操作',
            duration: 2000
          });
        }
      },
      error: function(e) {
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
    this.loadOrderStatus();
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
    return {
      title: 'znlccy公司电子商务小程序',
      path: 'pages/index/index',
      success: function(res) {
        //分享成功
        wx.showToast({
          title: '分享成功',
          duration: 2000
        });
      },
      fail: function (res) {
        //分享失败
        wx.showToast({
          title: '分享失败',
          duration: 2000
        });
      }
    }
  }
})