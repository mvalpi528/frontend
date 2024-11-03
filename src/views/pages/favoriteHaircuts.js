import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import Toast from "../../Toast";
import UserAPI from "../../UserAPI";

class FavoriteHaircutsView {
  init() {
    document.title = "Favorite Haircuts";
    this.favHaircuts = null;
    this.render();
    Utils.pageIntroAnim();
    this.getFavHaircuts();
  }

  // this has to be called from within the init function
  async getFavHaircuts() {
    try {
      // the user contains the favourite haircuts
      const currentUser = await UserAPI.getUser(Auth.currentUser._id);
      this.favHaircuts = currentUser.favouriteHaircuts;
      console.log(this.favHaircuts);
      this.render();
    } catch (err) {
      Toast.show(err, "error");
    }
  }

  render() {
    const template = html`
      <va-app-header
        title=Favorite Haircuts"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content">
        <h1>Page title</h1>
        <div class="haircuts-grid">
        ${
          this.favHaircuts == null
            ? html` <sl-spinner></sl-spinner> `
            : html`
                ${this.favHaircuts.map(
                  (haircut) => html`
                    <va-haircut
                      class="haircut-card"
                      id="${haircut._id}"
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
                )}
              `
        }
        </div>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new FavoriteHaircutsView();
