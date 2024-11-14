import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import UserAPI from "../../UserAPI";

class GuideView {
  init() {
    document.title = "Guide";
    this.render();
    Utils.pageIntroAnim();
    this.updateCurrentUser();
  }

  // after the user views the guide page then they are no longer a new user
  async updateCurrentUser() {
    try {
      const updatedUser = await UserAPI.updateUser(
        Auth.currentUser._id,
        {
          newUser: false,
        },
        "json"
      );
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render() {
    const template = html`
      <va-app-header
        title="Guide"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content calign">
        <h3 class="brand-color">Hello ${Auth.currentUser.firstName}!</h3>
        <p>
          Welcome to Platinum Property - Here's a quick tour of what you can do
          on the site
        </p>

        <div class="guide-step">
          <h4>Book Services</h4>
          <p>
            Visit the services page to view and book one of our many property
            services
          </p>
          <img src="${App.apiBase}/images/guide-img-1.jpg" />
        </div>

        <div class="guide-step">
          <h4>Manage services</h4>
          <p>Visit the My Services page to view, edit or delete a booking</p>
          <img src="${App.apiBase}/images/guide-img-2.jpg" />
        </div>

        <div class="guide-step">
          <h4>Agents can view clients</h4>
          <p>Agents can view all clients who have made an account with us</p>
          <img src="${App.apiBase}/images/guide-img-3.jpg" />
        </div>

        <sl-button type="primary" @click=${() => gotoRoute("/")}
          >Okay got it!</sl-button
        >
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new GuideView();
