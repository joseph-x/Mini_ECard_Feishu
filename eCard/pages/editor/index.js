import i18n from '../../i18n/index.js'
const iEditor = i18n.editor

const app = getApp()

Page({
  data: {
    nickname: '',
    photoURL: '',
    hasPhoto: false,
    hasNickName: false,
    ...iEditor
  },

  onLoad: function (options) {
    if(this.hasCard == true) {
      //TODO: load data
    }
  },

  onAddPhoto(e){
    tt.chooseImage({
      sourceType: ['album', 'camera'], // PC端无效
      count: 1,
      sizeType:['original','compressed'],
      cameraDevice: 'front',
      isSaveToAlbum: '0',
      success:res => {
        console.log(res.tempFilePaths, res.tempFiles);
        console.log(res)
        if(res.tempFilePaths.count != 0)
        {
          this.setData({
            hasPhoto: true,
            photoURL: res.tempFilePaths[0]
          })
        }
      },
      fail:res  => {
        console.log(`chooseImage 调用失败`);
      }
    });
  },

  onAddNickName(e){
    tt.showPrompt({
      "title": "我的昵称",
      "placeholder": "中文4个内，英文10字母",
      "maxLength": 10,
      "confirmText": "确定",
      "cancelText": "取消",
      success: res => {
        if(res.inputValue != '' && res.confirm == true){
          var str =res.inputValue.trim()

          this.setData({
            hasNickName: true,
            nickname: str
          })
        }
      },
      fail:res => {
        console.log(`showPrompt fail: ${JSON.stringify(res)}`);
      }
    })
  },

  onPreview(e){
    console.log("preview")
    
  },

  onSubmit(e){
    if(this.data.hasPhoto == false){
      this.showError(this.data.no_photo)
      return
    }

    if(this.data.hasNickName == false)
    {
      this.showError(this.data.no_nickname)
      return
    }

    app.globalData.hasPhoto = this.data.hasPhoto;
    app.globalData.hasNickName = this.data.hasNickName;
    app.globalData.photoURL = this.data.photoURL;
    app.globalData.nickname = this.data.nickname;

    tt.navigateBack({
      delta: 1,
      success(res) {
        console.log(JSON.stringify(res));
      },
      fail(res) {
        console.log(`navigateBack fail: ${JSON.stringify(res)}`);
      }
    });  
  },

  showError: function(msg){
    tt.showToast({
      "title": msg,
      "duration": 3000,
      "icon": "error",
      "mask": false,
      success(res) {
      },
      fail(res) {
        console.log(`showToast fail: ${JSON.stringify(res)}`);
      }
  });
  }
})
