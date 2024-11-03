import App from "../../App";
import { html, render } from "lit-html";
import { gotoRoute, anchorRoute } from "../../Router";
import Auth from "../../Auth";
import Utils from "../../Utils";
import HaircutAPI from "../../HaircutAPI";
import Toast from "../../Toast";

class newHaircutView {
  init() {
    document.title = "Template";
    this.render();
    Utils.pageIntroAnim();
  }

  async newHaircutSubmitHandler(e) {
    // sl form still behaves like a normal form in that its default
    // behaviour is to refresh the page on submit
    e.preventDefault();
    // Send form data to HaircutAPI.newHaircut() to pass on to the db
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.setAttribute("loading", "");
    const formData = e.detail.formData;
    // the rest of the logic will be handled in the HaircutAPI which we have to import
    // to get access to. because it needs to happen async put in a try catch
    try {
      await HaircutAPI.newHaircut(formData);
      Toast.show("Haircut added!");
      // remove loading attribute
      submitBtn.removeAttribute("loading");
      // reset form - with a normal html form you can do this in one line
      // because this is a custom form we have to do everything manually
      // reset text inputs
      const textInputs = document.querySelectorAll("sl-input");
      if (textInputs)
        textInputs.forEach((textInput) => (textInput.value = null));
      // reset textarea input
      const textAreaInput = document.querySelector("sl-textarea");
      textAreaInput.value = "";
      // reset radio inputs
      const radioInputs = document.querySelectorAll("sl-radio");
      if (radioInputs)
        radioInputs.forEach((radioInput) =>
          radioInput.removeAttribute("checked")
        );
      // reset file input
      const fileInput = document.querySelector("input[type=file]");
      if (fileInput) fileInput.value = null;
    } catch (err) {
      Toast.show(err, "error");
      submitBtn.removeAttribute("loading");
    }
  }

  render() {
    const template = html`
      <va-app-header
        title="New Haircut"
        user="${JSON.stringify(Auth.currentUser)}"
      ></va-app-header>
      <div class="page-content">
        <h1>New Haircut</h1>
        <!-- when the form is submitted it will run the newHaircutSubmitHandler form -->
        <sl-form class="page-form" @sl-submit=${this.newHaircutSubmitHandler}>
          <!-- user is submitted in hidden field -->
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <div class="input-group">
            <sl-input
              name="name"
              type="text"
              placeholder="Haircut Name"
              required
            ></sl-input>
          </div>
          <div class="input-group">
            <sl-input name="price" type="text" placeholder="Price" required>
              <span slot="prefix">$</span>
            </sl-input>
          </div>
          <div class="input-group">
            <sl-textarea
              name="description"
              rows="3"
              placeholder="Description"
            ></sl-textarea>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br />
            <input type="file" name="image" />
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Gender</label><br />
            <sl-radio-group label="Select gender" no-fieldset>
              <sl-radio name="gender" value="m">Male</sl-radio>
              <sl-radio name="gender" value="f">Female</sl-radio>
              <sl-radio name="gender" value="u">Unisex</sl-radio>
            </sl-radio-group>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Length</label><br />
            <sl-radio-group label="Select length" no-fieldset>
              <sl-radio name="length" value="s">Short</sl-radio>
              <sl-radio name="length" value="m">Medium</sl-radio>
              <sl-radio name="length" value="l">Long</sl-radio>
            </sl-radio-group>
          </div>
          <sl-button type="primary" class="submit-btn" submit
            >Add Haircut</sl-button
          >
        </sl-form>
      </div>
    `;
    render(template, App.rootEl);
  }
}

export default new newHaircutView();
