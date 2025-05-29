export default class UserInfo {
  constructor({ name, about, avatar, id }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this.id = id;
    this._profileNameElement = document.querySelector("#profile-name");
    this._profileDescriptionElement = document.querySelector(
      "#profile-description"
    );
    this._profileAvatarElement = document.querySelector(".profile__image");
  }

  setUserInfo() {
    this._profileNameElement.textContent = this._name;
    this._profileDescriptionElement.textContent = this._about;
    this._profileAvatarElement.src = this._avatar;
  }

  editUserInfo({ name, about }) {
    this._name = name;
    this._about = about;
    this.setUserInfo();
  }

  editAvatarInfo({ avatar }) {
    this._avatar = avatar;
    this._profileAvatarElement.src = this._avatar;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
    };
  }
}
