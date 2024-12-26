import i18n from '../../i18n/index.js'
const iStart = i18n.start

const app = getApp()

Page({
  data: {
    isLogin: false,//当前用户是否登录
    userInfo: {},//用户个人信息
    realname:'',
    photoURL: '',
    nickname: '',
    hasCard: false,
    inProgress: true,
    ...iStart
  },

  onLoad: function () {
    this.initUser();
    
    //TODO: Load data from Server
  },

  onShow: function() {
    if(app.globalData.hasPhoto == true && app.globalData.hasNickName == true) {
      this.setData({
        hasCard: true,
        photoURL: app.globalData.photoURL,
        nickname: app.globalData.nickname
      });
    }
  },

  onNext(e){
    tt.navigateTo({
      "url": "../editor/index",
      success(res){
        // console.log(JSON.stringify(res));
      },
      fail(res){
        // console.log(`navigateTo fail: ${JSON.stringify(res)}`);
      }
    })
  },

  onReEdit(e) {
    //TODO: bring data to editor
    //TODO: set flag to edit
    tt.navigateTo({
      "url": "../editor/index",
      success(res){
        // console.log(JSON.stringify(res));
      },
      fail(res){
        // console.log(`navigateTo fail: ${JSON.stringify(res)}`);
      }
    })
  },

  // 获取用户个人信息
  initUser: function() {
    tt.getUserInfo({
      success: (res) => {
        console.log(res)
        app.globalData.userInfo = JSON.parse(res.rawData)
        app.globalData.isLogin = true;
        app.globalData.realName = app.globalData.userInfo['nickName'];

        this.setData({
          realname: app.globalData.userInfo['nickName']
        })
        
        /*
        this.setData({
          userInfo: JSON.parse(res.rawData),
          isLogin: true
        })
        */

        this.getAppAccessToken();
      },
      fail:(res)=>{
        // console.log(res)
        this.toLogin()
      }
    })
  },

  // 用户登录
  toLogin() {
    tt.login({
        success:(res) =>{
          this.initUser()
            tt.showToast({
              title: 'login',
              icon: 'success',
              success:() => {
                console.log("login success")
              }
            })
        },
        fail (res) {
            console.log(`login fail`);
        }
    });
  },

  getAppAccessToken(){
    var requestTask = tt.request({
      "url": "https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal",
      "data": {
        "app_id": 'cli_a7b4386b9977100c',
        "app_secret": 'VjRXKAtk7OfE2UUBXuh1aeYQtYRKU8pL'
      },
      "header": {
        "content-type": "application/json"
      },
      "method": "POST",
      "dataType": "json",
      "responseType": "json",
      success(res){
        console.log(JSON.stringify(res));
        app.globalData.app_access_token = JSON.stringify(res);
      },
      fail(res){
        console.log(`request fail: ${JSON.stringify(res)}`);
      }
    })
  }

})
