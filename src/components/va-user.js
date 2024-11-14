import { LitElement, html, css } from "@polymer/lit-element";
import { render } from "lit-html";
import { anchorRoute, gotoRoute } from "../Router";
import Auth from "../Auth";
import App from "../App";
import UserAPI from "../UserAPI";
import Toast from "../Toast";
import Utils from "../Utils";

// creating a custom web component
// import this component in index.js
customElements.define(
  "va-user",
  class User extends LitElement {
    constructor() {
      // runs the lit element constructor
      super();
    }

    // defining the html attributes e.g. title="hello"
    // we can use this to pass in data from the db
    static get properties() {
      return {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        email: {
          type: String,
        },
        password: {
          type: String,
        },
        avatar: {
          type: String,
        },
        bio: {
          type: String,
        },
        accessLevel: {
          type: Number,
        },
      };
    }

    firstUpdated() {
      super.firstUpdated();
    }

    // custom components use the 'shadow DOM' so anything defined in here
    // does not interfere with the outside document
    // you can think of it as being locally scoped or isolated from the rest of the project
    render() {
      return html` <style>
          .title {
            font-family: var(--secondary-font-family);
            color: var(--sl-color-primary-500);
          }
        </style>

        <sl-card>
          <img slot="image" src="${this.avatar}" />
          <h2 class="title">${this.firstName} ${this.lastName}</h2>
          <p>Email: ${this.email}</p>
          <p>Bio: ${this.bio}</p>
          <p>User type: ${Utils.convertAccessLevelToText(this.accessLevel)}</p>
        </sl-card>`;
    }
  }
);
