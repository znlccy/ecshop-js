const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shengArr: [], //省级数组
    shengId: [], //省级Id数组
    shiArr: [], //城市数组
    shiId: [], //城市Id数组
    quArr: [], //区数组
    shengIndex: 0,
    quIndex: 0,
    mid: 0,
    sheng: 0,
    city: 0,
    area: 0,
    code: 0,
    cartId: 0
  },

  /**
   * 表单提交
   */
  formSubmit: function(e) {
    var adds = e.detail.value;
    var cardId = this.data.cartId;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/add_adds',
      data: {
        user_id: app.d.userId,
        receiver: adds.name,
        tel: adds.phone,
        sheng: this.data.sheng,
        city: this.data.area,
        quyu: this.data.area,
        adds: adds.address,
        code: this.data.code,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        var status = res.data.status;
        if (status == 1) {
          wx.showToast({
            title: '保存成功!',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
        wx.redirectTo({
          url: 'user-address/user-address?cardId='+cardId
        });
      },
      fail: function() {
        wx.showToast({
          title: '网络异常!',
          duration: 2000
        });
      }
    })
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      cardId: options.cardId
    });
    //获取省级城市
    wx.request({
      url: app.d.ceshiUrl + '/Api/Address/get_province',
      data: {},
      method: 'POST',
      success: function(res) {
        var status = res.data.status;
        var province = res.data.list;
        var sArr = [];
        var sId = [];
        sArr.push('请选择');
        sId.push('0');
        for (var i=0; i < province.length; i++) {
          sArr.push(province[i].name);
          sId.push(province[i].id);
        }
        that.setData({
          shengArr: sArr,
          shengId: sId
        });
      },
      fail: function() {
        wx.showToast({
          title: '网络异常!',
          duration: 2000
        });
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
   * 绑定省选择器改变函数
   */
  bindPickerChangeshengArr: function() {

  },

  /** */
})