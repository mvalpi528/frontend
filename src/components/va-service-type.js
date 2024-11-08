import { LitElement, html, css } from "@polymer/lit-element";
import { render } from "lit-html";
import { anchorRoute, gotoRoute } from "../Router";
import Auth from "../Auth";
import App from "../App";
import UserAPI from "../UserAPI";
import ServiceAPI from "../ServiceAPI";
import Toast from "../Toast";

// creating a custom web component
// import this component in index.js
customElements.define(
  "va-service-type",
  class ServiceType extends LitElement {
    constructor() {
      // runs the lit element constructor
      super();
    }

    // defining the html attributes e.g. title="hello"
    // we can use this to pass in data from the db
    static get properties() {
      return {
        id: {
          type: String,
        },
        serviceType: {
          type: String,
        },
        description: {
          type: String,
        },
        image: {
          type: String,
        },
      };
    }

    firstUpdated() {
      super.firstUpdated();
    }

    // because this function has been called by an event listener on a button
    // it thinks that the 'this' keyword refers to 'this button' which is why we added .bind(this)
    bookServiceHandler() {
      // dialogs need to be added to the bottom of a html page so you should create it inside this method
      const dialogEl = document.createElement("sl-dialog");
      dialogEl.noHeader = true;
      // add class name so we can style it later on
      dialogEl.className = "service-dialog";
      // add some content to the dialog
      // style the dialog itself in _base.scss
      const dialogContent = html`<style>
          .wrap {
            display: flex;
          }
          .image {
            width: 50%;
          }
          .image img {
            width: 100%;
          }
          .content {
            padding-left: 1em;
          }
          .gender span,
          .length span {
            text-transform: uppercase;
            font-weight: bold;
          }
          .price {
            font-size: 1.5em;
            color: var(--brand-color);
          }
        </style>
        <div class="wrap">
          <div class="image">
            <img src="${this.image}" alt="${this.serviceType}" />
          </div>
          <div class="content">
            <h1>${this.serviceType}</h1>
            <p>${this.description}</p>

            <sl-button @click=${this.addFavHandler.bind(this)}>
              <sl-icon slot="prefix" name="heart-fill"></sl-icon>
              Add to Favourites
            </sl-button>

            <!-- Booking form -->

            <h1>New Booking</h1>
            <!-- when the form is submitted it will run the newHaircutSubmitHandler form -->
            <sl-form
              class="page-form"
              @sl-submit=${this.newBookingSubmitHandler}
            >
              <!-- user is submitted in hidden field -->
              <input
                type="hidden"
                name="user"
                value="${Auth.currentUser._id}"
              />
              <input
                type="hidden"
                name="serviceType"
                value="${this.serviceType}"
              />
              <input
                type="hidden"
                name="image"
                value="${this.serviceType}.jpg"
              />
              <div class="input-group">
                <sl-input
                  name="startDate"
                  type="date"
                  placeholder="Date"
                  label="Preferred date: "
                  required
                ></sl-input>
              </div>
              <div class="input-group">
                <sl-textarea
                  name="agentNotes"
                  rows="3"
                  placeholder="notes"
                ></sl-textarea>
              </div>
              <sl-button type="primary" class="submit-btn" submit
                >Book Now</sl-button
              >
            </sl-form>
          </div>
        </div>`;
      render(dialogContent, dialogEl);
      // append to document.body - remember that this needs to occur at the bottom of the document
      document.body.append(dialogEl);
      // show sl-dialog
      dialogEl.show();
      // by default, dialog elements are not deleted from the DOM on hide
      // we need to specify that the dialog should be deleted on hide
      dialogEl.addEventListener("sl-after-hide", () => {
        dialogEl.remove();
      });
    }

    // TODO - convert this from making a new haircut to making a new service booking
    async newBookingSubmitHandler(e) {
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
        console.log(formData);
        await ServiceAPI.newBooking(formData);
        Toast.show("Booking added!");
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

    // communicates to the backend via the API
    // async because the UserAPI has to talk to the backend which uses await
    async addFavHandler() {
      try {
        await UserAPI.addFavHaircut(this.id);
        Toast.show("Haircut added to favourites");
      } catch (err) {
        Toast.show(err, "error");
      }
    }

    // custom components use the 'shadow DOM' so anything defined in here
    // does not interfere with the outside document
    // you can think of it as being locally scoped or isolated from the rest of the project
    render() {
      return html` <style>
          .author {
            font-size: 0.9em;
            font-style: italic;
            opacity: 0.8;
          }

          img {
            max-width: 100%; /* Image will not exceed card width */
            max-height: 200px; /* Restricts image height */
            width: 100%; /* Scales image to fit card width */
            object-fit: cover; /* Ensures the image scales nicely within the card */
            display: block; /* Removes any extra spacing below the image */
          }
        </style>
        <sl-card>
          <img slot="image" src="${this.image}" />
          <h2>${this.serviceType}</h2>
          <p>${this.description}</p>
          <!-- styling happens inside the web component -->

          <!-- event listener being added inline -->
          <sl-button @click=${this.bookServiceHandler.bind(this)}
            >More Info</sl-button
          >
        </sl-card>`;
    }
  }
);
