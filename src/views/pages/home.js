import App from "./../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "./../../Router";
import Auth from "./../../Auth";
import Utils from "./../../Utils";

class HomeView {
  init() {
    console.log("HomeView.init");
    document.title = "Home";
    this.render();
    Utils.pageIntroAnim();
  }

  render() {
    const template = html`
      <va-app-header
        title="Home"
        user=${JSON.stringify(Auth.currentUser)}
      ></va-app-header>

      <div class="page-content">
        <h1 class="anim-in">Hey ${Auth.currentUser.firstName}</h1>

        <h3>Button example:</h3>
        <sl-button class="anim-in" @click=${() => gotoRoute("/profile")}
          >View Profile</sl-button
        >
        <p>&nbsp;</p>
        <h3>Link example</h3>
        <a href="/profile" @click=${anchorRoute}>View Profile</a>
        <p></p>
        <!-- if you pass in an object you have to stringify it -->
        <!-- recommended to begin developing custom components using static content first -->
        <!-- <va-haircut
          name="Ace Ventura"
          description="This is the description"
          price="30"
          user="${JSON.stringify({ firstName: "Marc", lastName: "Valpiani" })}"
          image="https://keithandthemovies.com/wp-content/uploads/2012/08/ace-ventura.jpg"
          gender="m"
          length="m"
        >
        </va-haircut> -->
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new HomeView();
