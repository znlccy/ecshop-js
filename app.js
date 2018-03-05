//app.js
App({
  // 基础数据
  d:{
    hostUrl: 'https://wxplus.paoyeda.com/index.php',
    hostImg: 'http://img.ynjmzb.net',
    hostVedio: 'http://zhubaoteng-file.oss-cn-beijing.aliyuncs.com',
    userId: 1,
    appId: "",
    appKey: "",
    ceshiUrl: 'https://wxplus.paoyeda.com/index.php',
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      // 调用登录接口
      wx.login({
        success: function(res) {
          var code = res.code;
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo);
              that.getUserSessionKey(code);
            }
          });
        }
      });
    }
  },

  /*获取用户回话钥匙*/
  getUserSessionKey: function(code) {
    // 用户订单状态
    wx.request({
      url: that.d.ceshiUrl + '/Api/Login/getsessionkey',
      method: 'post',
      data: {
        code: code 
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        // 初始化数据
        var data = res.data;
        if(data.status==0) {
          wx.showToast({
            title: data.err,
            duration: 2000
          });  
          return false;
        }

        that.globalData.userInfo['sessionId'] = data.session_key;
        that.globalData.userInfo['openid'] = data.openid;
        that.onLoginUser();
      },
      fail: function(e) {
        wx.showToast({
          title: '网络异常！ err:getsessionkeys',
          duration: 2000
        });
      }
    });
  },

  /*登录用户*/
  onLoginUser: function() {
    var that = this;
    var user = that.globalData.userInfo;
    wx.request({
      url: that.d.ceshiUrl + '/Api/Login/authlogin',
      method: 'post',
      data: {
        SessionId: user.sessionId,
        gender: user.gender,
        NickName: user.nickName,
        HeadUrl: user.avatarUrl,
        openid: user.openid
      },
      header: {
        'Content-Type': 'x-www-form-urlencoded'
      },
      success: function(res) {
        // 初始化数据
        var data = res.data.arr;
        var status = res.data.status;
        if (status!=1) {
          wx.showToast({
            title: res.data.err,
            duration: 3000
          });
          return false;
        }

        that.globalData.userInfo['id'] = data.ID;
        that.globalData.userInfo['NickName'] = data.NickName;
        that.globalData.userInfo['HeadUrl'] = data.HeadUrl;
        var userId = data.ID
        if (!userId) {
          wx.showToast({
            title: '登录失败!',
            duration: 3000
          });
          return false;
        }
        that.d.userId = userId;
      },
      fail: function(e) {
        wx.showToast({
          title: '网络异常！err:authlogin',
          duration: 2000
        });
      },
    });
  },

  /*绑定用户手机*/
  getOrBindTelPhone: function() {
    var user = this.globalData.userInfo;
    if (!user.tel) {
      wx.navigateTo({
        url: 'pages/binding/binding'
      });
    }
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh(); 
  }
})