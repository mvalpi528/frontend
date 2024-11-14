import App from "../../App";
// this is what allows us to do html with JS inserted - kinda like html and php
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import ServiceAPI from "../../ServiceAPI";
import Toast from "../../Toast";

class servicesView {
  init() {
    document.title = "Services";
    // this is where the services will be stored when they come in from the backend
    this.services == null;
    this.render();
    Utils.pageIntroAnim();
    this.getServices();
    console.log(this.services);
  }

  // apparently it is important to not go straight to the API
  // function because there are some important preprocessing steps
  // the API function simply just returns the data
  async getServices() {
    try {
      // returns a json object of all out services and store in variable
      // this takes some time so we need to do this asynchronously
      this.services = await ServiceAPI.getServiceTypes();
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
                (service) => html`
                  <va-service-type
                    id="${service._id}"
                    class="service-card"
                    serviceType="${service.serviceType}"
                    description="${service.description}"
                    image="${App.apiBase}/images/${service.image}"
                  >
                  </va-service-type>
                `
              )}`}
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new servicesView();
