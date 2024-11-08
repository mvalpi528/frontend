import App from "../../App";
// this is what allows us to do html with JS inserted - kinda like html and php
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import UserAPI from "../../UserAPI";
import Toast from "../../Toast";

class usersView {
  init() {
    document.title = "Users";
    // this is where the haircuts will be stored when they come in from the backend
    this.users == null;
    this.render();
    Utils.pageIntroAnim();
    this.getUsers();
    console.log(this.users);
  }

  // apparently it is important to not go straight to the API
  // function because there are some important preprocessing steps
  // the API function simply just returns the data
  async getUsers() {
    try {
      // returns a json object of all out haircuts and store in variable
      // this takes some time so we need to do this asynchronously
      this.users = await UserAPI.getUsers();
      console.log(this.users);
      // re renders the page now that we have loaded the services in
      this.render();
    } catch (err) {
      // the second argument makes the toast display red
      Toast.show(err, "error");
    }
  }

  render() {
    const template = html`
      <va-app-header
        title="Users"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content">
        <!-- this will be styled in _base.scss -->
        <div class="services-grid">
          ${this.users == null
            ? html` <sl-spinner></sl-spinner> `
            : // map is basically like a for each
              // remember using apiBase is like writing http://localhost:3000
              html` ${this.users.map(
                (user) => html`
                  <va-user
                    id="${user._id}"
                    class="service-card"
                    firstName="${user.firstName}"
                    lastName="${user.lastName}"
                    email="${user.email}"
                    bio="${user.bio}"
                    accessLevel="${user.accessLevel}"
                    avatar="${App.apiBase}/images/${user.avatar}"
                  >
                  </va-user>
                `
              )}`}
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new usersView();
