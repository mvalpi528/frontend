import { LitElement, html, css } from "@polymer/lit-element";
import { render } from "lit-html";
import { anchorRoute, gotoRoute } from "../Router";
import Auth from "../Auth";
import App from "../App";
import UserAPI from "../UserAPI";
import Toast from "../Toast";

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
            <h1>${this.serviceType}</h1>
            <!-- <p>${this.description}</p> -->
            <!-- <p class="price">$${this.price}</p>
            <p class="gender">Gender: <span>${this.gender}</span></p>
            <p class="length">Length: <span>${this.length}</span></p> -->

            <sl-button @click=${this.addFavHandler.bind(this)}>
              <sl-icon slot="prefix" name="heart-fill"></sl-icon>
              Add to Favourites
            </sl-button>
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
        </style>
        <sl-card>
          <img slot="image" src="${this.image}" />
          <h2>${this.serviceType}</h2>
          <h3>$${this.serviceType}</h3>
          <!-- this reference to the user obj should work because we have stringified when passing in home.js -->
          <!-- styling happens inside the web component -->

          <!-- event listener being added inline -->
          <sl-button @click=${this.moreInfoHandler.bind(this)}
            >More Info</sl-button
          >
          <!-- shoelace has a number of different icons to use in the button -->
          <!-- the .bind is so that the favHandler method this keyword refers to the class not the button that clicked -->
          <sl-icon-button
            name="heart-fill"
            label="Add to favorites"
            @click=${this.addFavHandler.bind(this)}
          ></sl-icon-button>
        </sl-card>`;
    }
  }
);
