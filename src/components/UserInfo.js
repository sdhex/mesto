export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    }
  }

  setUserInfo(userInfo) {
    this._name.textContent = userInfo.name;
    this._about.textContent = userInfo.about;
    this._avatar.src = userInfo.avatar;
  }
}
