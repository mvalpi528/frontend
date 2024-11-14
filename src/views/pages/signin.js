import App from "./../../App";
import { html, render } from "lit-html";
import { anchorRoute, gotoRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";

class SignInView {
  init() {
    console.log("SignInView.init");
    // this is what appears in the browser tab title
    document.title = "Sign In";
    // inserts the html found in the render function
    // its in the form of a template literal string that contains
    // the html and javascript
    // we are able to do this because we have imported lit-html
    this.render();
    Utils.pageIntroAnim();
  }

  // this is called when a submit event is detected
  signInSubmitHandler(e) {
    e.preventDefault();
    const formData = e.detail.formData;
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.setAttribute("loading", "");

    // sign in using Auth
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute("loading");
    });
  }

  // the @ is a shorthand for adding an event listener
  render() {
    const template = html`
      <style>
        h1 {
          font-family: "Libre Baskerville", serif;
          color: #293a4c;
        }
      </style>
      <div class="page-content page-centered">
        <div class="signinup-box">
          <h1>Platinum Property</h1>
          <!-- <img class="signinup-logo" src="/images/logo.svg" /> -->
          <sl-form
            class="form-signup dark-theme"
            @sl-submit=${this.signInSubmitHandler}
          >
            <div class="input-group">
              <sl-input
                name="email"
                type="email"
                placeholder="Email"
                required
              ></sl-input>
            </div>
            <div class="input-group">
              <sl-input
                name="password"
                type="password"
                placeholder="Password"
                required
                toggle-password
              ></sl-input>
            </div>
            <sl-button
              class="submit-btn"
              type="primary"
              submit
              style="width: 100%;"
              >Sign In</sl-button
            >
          </sl-form>
          <p>No Account? <a href="/signup" @click=${anchorRoute}>Sign Up</a></p>
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new SignInView();
