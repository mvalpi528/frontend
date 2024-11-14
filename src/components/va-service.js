import { LitElement, html, css } from "@polymer/lit-element";
import { render } from "lit-html";
import { anchorRoute, gotoRoute } from "../Router";
import Auth from "../Auth";
import App from "../App";
import UserAPI from "../UserAPI";
import Toast from "../Toast";
import Utils from "../Utils";
import ServiceAPI from "../ServiceAPI";
import services from "../views/pages/services";
import myServices from "../views/pages/myServices";

// creating a custom web component
// import this component in index.js
customElements.define(
  "va-service",
  class Service extends LitElement {
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
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        endOfServiceReason: {
          type: String,
        },
        agentNotes: {
          type: String,
        },
        user: {
          type: Object,
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
    moreInfoHandler() {
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
            <!-- <h1>${this.serviceType}</h1>
            <p>${this.description}</p>
            <p>${this.startDate}</p>
            <p>${this.endDate}</p>
            <p>${this.agentNotes}</p> -->

            <h1 class="title">Edit Booking</h1>
            <!-- when the form is submitted it will run the SubmitHandler form -->

            <h3 class="title">Current booking details</h3>

            <p>Service Type: ${this.serviceType}</p>
            <p>Description: ${this.description}</p>
            <p>Start Date: ${Utils.formatDate(this.startDate)}</p>
            <p>Service Completed: ${Utils.formatDate(this.endDate)}</p>
            <p>Agent Notes: ${this.agentNotes}</p>

            <sl-form
              class="page-form"
              @sl-submit=${this.editBookingSubmitHandler}
            >
              <!-- user is submitted in hidden field -->
              <input
                type="hidden"
                name="user"
                value="${Auth.currentUser._id}"
              />
              <input type="hidden" name="id" value="${this.id}" />

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
                  value=""
                  required
                ></sl-input>
              </div>
              <div class="input-group">
                <sl-input
                  name="endDate"
                  type="date"
                  placeholder="Date"
                  label="end date: "
                  value=""
                ></sl-input>
              </div>
              <div class="input-group">
                <sl-textarea
                  name="agentNotes"
                  rows="3"
                  placeholder="notes"
                  value="${this.agentNotes}"
                ></sl-textarea>
              </div>
              <sl-button type="primary" class="submit-btn" submit
                >Edit Booking</sl-button
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

    async editBookingSubmitHandler(e) {
      // sl form still behaves like a normal form in that its default
      // behaviour is to refresh the page on submit
      e.preventDefault();
      // Send form data to ServiceAPI to pass on to the db
      const submitBtn = document.querySelector(".submit-btn");
      submitBtn.setAttribute("loading", "");
      const formData = e.detail.formData;
      // the rest of the logic will be handled in the SericeAPI which we have to import
      // to get access to. because it needs to happen async put in a try catch
      try {
        await ServiceAPI.editBooking(formData);
        Toast.show("Booking updated!");
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
        myServices.getServices();
      } catch (err) {
        Toast.show(err, "error");
        submitBtn.removeAttribute("loading");
      }
    }

    async deleteBookingHandler(e) {
      e.preventDefault();
      try {
        await ServiceAPI.deleteBooking(this.id);
        console.log("reached");
        Toast.show("Booking deleted!");
        myServices.getServices();
      } catch (err) {
        Toast.show(err, "error");
      }
    }

    // custom components use the 'shadow DOM' so anything defined in here
    // does not interfere with the outside document
    // you can think of it as being locally scoped or isolated from the rest of the project
    render() {
      return html` <style>
          h2 {
            font-family: "Libre Baskerville", serif;
            color: #293a4c;
          }
          img {
            width: 300px;
            height: 200px; /* Set a fixed height */
            object-fit: cover;
          }
        </style>
        <sl-card>
          <img slot="image" src="${this.image}" />
          <h2>${this.serviceType}</h2>
          <p>${this.description}</p>
          <p><b>Booking start date: </b>${Utils.formatDate(this.startDate)}</p>
          <p><b>Service completed: </b>${Utils.formatDate(this.endDate)}</p>
          <p><b>Agent notes: </b>${this.agentNotes}</p>
          <!-- this reference to the user obj should work because we have stringified when passing in home.js -->
          <!-- styling happens inside the web component -->

          <!-- event listener being added inline -->
          <sl-button @click=${this.moreInfoHandler.bind(this)}
            >Edit booking</sl-button
          >
          <sl-button @click=${this.deleteBookingHandler.bind(this)}
            >Delete booking</sl-button
          >
        </sl-card>`;
    }
  }
);
