export default class UserInfo {
  constructor({ name: profileName, about: profileDescription }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
    this._profileNameElement = document.querySelector("#profile-name");
    this._profileDescriptionElement = document.querySelector(
      "#profile-description"
    );
  }

  getUserInfo() {
    return {
      name: this._profileName,
      about: this._profileDescription,
    };
  }

  setUserInfo() {
    this._profileNameElement.textContent = this._profileName;
    this._profileDescriptionElement.textContent = this._profileDescription;
  }
}
