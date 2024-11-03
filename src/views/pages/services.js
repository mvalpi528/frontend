import App from "../../App";
// this is what allows us to do html with JS inserted - kinda like html and php
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
// import HaircutAPI from "../../HaircutAPI";
import ServiceAPI from "../../ServiceAPI";
import Toast from "../../Toast";

class ServicesView {
  init() {
    document.title = "Services";
    // this is where the haircuts will be stored when they come in from the backend
    // this.haircuts = null;
    this.services == null;
    this.render();
    Utils.pageIntroAnim();
    // calls the getHaircuts method on page load
    this.getHaircuts();
  }

  // apparently it is important to not go straight to the API
  // function because there are some important preprocessing steps
  // the API function simply just returns the data
  async getHaircuts() {
    try {
      // returns a json object of all out haircuts and store in variable
      // this takes some time so we need to do this asynchronously
      this.haircuts = await HaircutAPI.getHaircuts();
      console.log(this.haircuts);
      // re renders the page now that we have loaded the haircuts in
      this.render();
    } catch (err) {
      // the second argument makes the toast display red
      Toast.show(err, "error");
    }
  }

  // apparently it is important to not go straight to the API
  // function because there are some important preprocessing steps
  // the API function simply just returns the data
  async getServices() {
    try {
      // returns a json object of all out haircuts and store in variable
      // this takes some time so we need to do this asynchronously
      this.services = await ServiceAPI.getServices();
      console.log(this.services);
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
        title="Services"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content">
        <!-- this will be styled in _base.scss -->
        <div class="services-grid">
          ${this.services == null
            ? html` <sl-spinner></sl-spinner> `
            : // map is basically like a for each
              // remember using apiBase is like writing http://localhost:3000
              html` ${this.services.map(
                (haircut) => html`
                  <va-haircut
                    id="${haircut._id}"
                    class="haircut-card"
                    name="${haircut.name}"
                    description="${haircut.description}"
                    price="${haircut.price}"
                    user="${JSON.stringify(haircut.user)}"
                    image="${App.apiBase}/images/${haircut.image}"
                    gender="${haircut.gender}"
                    length="${haircut.length}"
                  >
                  </va-haircut>
                `
              )}`}
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new ServicesView();
