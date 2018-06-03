var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    minusStatuses: ['disabled','disaled','normal','normal','disabled'],
    total: 0,
    carts: []
  },

  bindMinus: function(e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.carts[index].num;
    // 如果只有1件了,就不允许再减了
    if(num > 1) {
      num --;
    }
    console.log(num);
    var cart_id = e.currentTarget.dataset.cartid;
    wx.request({
        url:app.d.ceshiUrl + '/Api/Shopping/up_cart',
        method: 'post',
        data:{
          user_id: app.d.userId,
          num: num,
          card_id: cart_id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var status = res.data.status;
          if(status==1) {
            //只有大于一件的时候，才能normal状态，否则disable状态
            var minusStatus = num <= 1 ? 'disabled':'normal';
            //购物车数据
            var carts = that.data.carts;
            carts[index].num = num;
            //按钮可用状态
            var minusStatuses = that.data.minusStatuses;
            minusStatuses[index] = minusStatus;
            //将数值与状态写回
            that.setData({
                minusStatuses: minusStatuses
            });
            that.sum();
          } else {
            wx.showToast({
                title: '操作失败!',
                duration: 2000
            });
          }
        },
        fail: function () {
          // 失败
          wx.showToast({
              title: '网络异常!',
              duration: 2000
          });
        }
    });
  },

  bindPlus: function(e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.carts[index].num;
    //自增
    console.log(num);
    var cart_id = e.currentTarget.dataset.cartid;
    wx.request({
        url: app.d.ceshiUrl + '/Api/Shopping/up_cart',
        method: 'post',
        data: {
          user_id: app.d.userId,
          num: num,
          cart_id: cart_id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var status = res.data.status;
          if (status == 1) {
            //只有大于一件的时候，才能normal状态,否则disable状态
            var minusStatus = num <= 1? 'disabled':'normal';
            //购物车数据
            var carts = that.data.carts;
            carts[index].num = num;
            //按钮可用状态
            var minusStatuses = that.data.minusStatuses;
            minusStatuses[index] = minusStatuses;
            //将数值与状态写回
            that.setData({
                minusStatuses: minusStatuses
            });
            that.sum();
          } else {
            wx.showToast({
                title: '操作失败!',
                duration: 2000
            });
          }
        },
        fail: function () {
          wx.showToast({
              title: '网络异常!',
              duration: 2000
          });
        }
    });
  },

  bindCheckbox: function(e) {
    // 绑定点击事件，将checkbox样式改变为选中与非选中
    //拿到下指标，以在carts做遍历指示用
    var index =  parseInt(e.currentTarget.dataset.index);
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;

    //对勾选状态取反
    carts[index].selected = !selected;
    //写回经点击修改的数组
    this.setData({
      carts: carts
    });
    this.sum()
  },

  bindSelectAll: function() {
    
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