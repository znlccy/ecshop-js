var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    radioindex: '',
    pro_id: 0,
    num: 0,
    cardId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //页面初始化options为页面跳转所带来的参数
    var cardId = options.cardId;
    console.log(app.d.userId);
    wx.request({
      url: app.d.ceshUrl + '/Api/Address/index',
      data: {
        user_id: app.d.userId,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //success
        var address = res.data.adds;
        console.log(address);
        if (address == '')
        {
          var address = [];
        } 

        that.setData({
          address: address,
          cardId: cardId,
        });
      },
      fail: function() {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  /**
   * 设置默认值
   */
  setDefault: function(e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/set_default',
      data: {
        uid: app.d.userId,
        addr_id: addrId
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      success: function(res) {
        //success
        var status = res.data.status;
        var cardId = that.data.cardId;
        if (status ==1) {
          if (cardId) {
            wx.redirectTo({
              url: '../../order/pay?cartId=' + cardId,
            });

            return false;
          }
          
          wx.showToast({
            title: '操作成功!',
            duration: 2000
          });
          
          that.DataonLoad();
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function() {
        //fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        })
      }
    })
  },

  /**
   * 删除地址
   */
  delAddress: function(e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '你确认要删除吗?',
      success: function(res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/Address/del_adds',
          data: {
            user_id:app.d.userId,
            id_arr: addrId
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function(res) {
            //success
            var status = res.data.status;
            if (status == 1) {
              that.Dataonload();
            } else {
              wx.showToast({
                title: res.data.err,
                duration: 2000
              });
            }
          },
          fail: function() {
            //fail
            wx.showToast({
              title: '网络异常!',
              duration: 2000
            });
          }
        });
      },
    });
  },

  /**
   * 数据初始化
   */
  Dataonload: function() {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/index',
      data: {
        user_id: app.d.userId
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var address = res.data.adds;
        if (address == '') {
          var address = [];
        }
        that.setData({
          address: address,
        });
      },
      fail: function() {
        wx.showToast({
          title: '网络异常!',
          duration: 2000
        })
      }
    })
  }
})