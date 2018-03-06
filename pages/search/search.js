// pages/search/search.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: true,
    hotKeyShow: true,
    historyKeyShow: true,
    searchValue: '',
    page: 0,
    productData: [],
    historyKeyList: [],
    hotKeyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Search/index',
      method: 'post',
      data: {uid:app.d.userId},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        var remen = res.data.remen;
        var history = res.data.history;

        that.setData({
          historyKeyList: history,
          hotKeyList: remen,
        }); 
      },
      fail: function() {
        wx.showToast({
          title: '网络异常!',
          duration: 2000
        })
      },
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
    //下拉加载更多
    this.setData({
      page:(this.data.page+10)
    })

    this.searchProductData();
  },

  /** 
   * 热门搜索
   */
  doKeySearch: function(e) {
    var key = e.currentTarget.dataset.key;
    this.setData({
      searchValue: key,
      hotKeyShow: false,
      historyKeyShow: false,
    });

    this.data.productData.length = 0;
    this.searchProductData();
  },

  /**
   * 直接搜索
   */
  doSearch: function() {
    var searchKey = this.data.searchValue;
    if (!searchKey) {
      this.setData({
        focus: true,
        hotKeyShow: true,
        historyKeyShow: true,
      });
      return;
    }

    this.setData({
      hotKeyShow: false,
      historyKeyShow: false,
    });

    this.data.productData.length = 0;
    this.searchProductData();

    this.getOrSetSearchHistory(searchKey);
  },

  /**
   * 获取和设置搜索历史
   */
  getOrSetSearchHistory: function(key) {
    var that = this;
    wx.getStorage({
      key: 'historyKeyList',
      success: function(res) {
        console.log(res, data);
        if (res.data.indexOf(key) > 0) {
          return;
        }

        res.data.push(key);
        wx.setStorage({
          key: 'historyKeyList',
          data: res.data,
        });

        that.setData({
          historyKeyList: res.data,
        });
      },
    });
  },

  /**
   * 搜索输入的值
   */
  searchValueInput: function(e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });

    if(!value && this.data.productData.length ==0) {
      this.setData({
        hotKeyShow: true,
        historyKeyShow: true,
      });
    }
  },

  /**
   * 搜索产品数据
   */
  searchProductData: function() {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Search/searches',
      method: 'post',
      data: {
        keyword: that.data.searchValue,
        uid: app.d.userId,
        page: that.data.page,
      },
      header: {
        "Content-Type":"x-www-form-urlencoded"
      },
      success: function(res) {
        var data = res.data.pro;
        that.setData({
          productData: that.data.productData.concat(data),
        });
      },
      fail: function(e) {
        wx.showToast({
          title: '网络异常!',
          duration: 2000
        });
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showToast({
      title: '分享成功!',
      duration: 2000
    })
  }
})