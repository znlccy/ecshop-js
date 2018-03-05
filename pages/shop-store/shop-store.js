var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo: {},
    proList: [],
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    current: 0, 
  },

  /**
   * 获取出发事件组件的点击事件
   */
  tabFun: function(e) {
    var _datasetId = e.target.dataset.id;
    var _obj ={};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },

  /**
   * 显示遮罩层
   */
  showModal: function() {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData: animation.export(),
      showModalStauts: true
    });
    setTimeout(function() {
      animation.translateY(0).step();
      this.setData({
        animationData: animation.export()
      });
    }.bind(this), 200);
  },

  /**
   * 隐藏遮罩层
   */
  hideModal: function() {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      animationData: animation.export(),
    });
    setTimeout(function() {
      animation.translateY(0).step();
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      });
    }.bind(this), 200);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sid = options.shopId;
    console.log(sid);
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Shangchang/shop_details',
      method: 'POST',
      data: {shop_id:sid},
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var shop_info = res.data.shop_info;
        var content = res.data.shop_info.content;
        var pro = res.data.pro;
        var status = res.data.status;
        if (status==1) {
          WxParse.wxParse('content', 'html', content, that, 3);
          that.setData({
            shopInfo: shop_info,
            proList: pro,
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          })
        }
      },
      error: function(e) {
          wx.showToast({
            title: '网络异常!',
            duration: 2000
          })
      }
    });
  },

  /**
   * 详情页跳转
   */
  lookdetail: function() {
    console.log(e);
    var lookid = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '../index/detail?id=' + lookid,
    })
  },

  /**
   * 轮播滑动
   */
  switchSlider: function(e) {
    this.setData({
      current: e.target.dataset.index
    });
  },

  /**
   * 改变滑动
   */
  changeSlider: function(e) {
    this.setData({
      current: e.detail.current
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
    console.log('onPullDownRefresh')
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