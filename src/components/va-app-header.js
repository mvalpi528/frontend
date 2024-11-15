import { LitElement, html, css } from "@polymer/lit-element";
import { anchorRoute, gotoRoute } from "./../Router";
import Auth from "./../Auth";
import App from "./../App";

customElements.define(
  "va-app-header",
  class AppHeader extends LitElement {
    constructor() {
      super();
    }

    static get properties() {
      return {
        title: {
          type: String,
        },
        user: {
          type: Object,
        },
      };
    }

    firstUpdated() {
      super.firstUpdated();
      this.navActiveLinks();
    }

    navActiveLinks() {
      const currentPath = window.location.pathname;
      const navLinks = this.shadowRoot.querySelectorAll(
        ".app-top-nav a, .app-side-menu-items a"
      );
      navLinks.forEach((navLink) => {
        if (navLink.href.slice(-1) == "#") return;
        if (navLink.pathname === currentPath) {
          navLink.classList.add("active");
        }
      });
    }

    hamburgerClick() {
      const appMenu = this.shadowRoot.querySelector(".app-side-menu");
      appMenu.show();
    }

    menuClick(e) {
      e.preventDefault();
      const pathname = e.target.closest("a").pathname;
      const appSideMenu = this.shadowRoot.querySelector(".app-side-menu");
      // hide appMenu
      appSideMenu.hide();
      appSideMenu.addEventListener("sl-after-hide", () => {
        // goto route after menu is hidden
        gotoRoute(pathname);
      });
    }

    render() {
      return html`
        <style>
          * {
            box-sizing: border-box;
          }
          .app-header {
            background: var(--brand-color);
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            height: var(--app-header-height);
            color: #fff;
            display: flex;
            z-index: 9;
            box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.2);
            align-items: center;
          }

          .app-header-main {
            flex-grow: 1;
            display: flex;
            align-items: center;
          }

          .app-header-main::slotted(h1) {
            color: #fff;
          }

          .app-logo a {
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            font-size: 1.2em;
            padding: 0.6em;
            display: inline-block;
          }

          .app-logo img {
            width: 90px;
          }

          .hamburger-btn::part(base) {
            color: #fff;
          }

          .app-top-nav {
            display: flex;
            height: 100%;
            align-items: center;
          }

          .app-top-nav a {
            display: inline-block;
            padding: 0.8em;
            text-decoration: none;
            color: #fff;
          }

          .app-side-menu-items a {
            display: block;
            padding: 0.5em;
            text-decoration: none;
            font-size: 1.3em;
            color: #333;
          }

          .app-side-menu-logo {
            width: 120px;
            margin-bottom: 1em;
            position: absolute;
            top: 2em;
            left: 1.5em;
          }

          .page-title {
            color: var(--app-header-txt-color);
            margin-right: 0.5em;
            font-size: var(--app-header-title-font-size);
            font-family: var(--secondary-font-family);
          }

          /* active nav links */
          .app-top-nav a.active,
          .app-side-menu-items a.active {
            font-weight: bold;
          }

          /* RESPONSIVE - MOBILE ------------------- */
          @media all and (max-width: 768px) {
            .app-top-nav {
              display: none;
            }
          }

          .title {
            font-family: var(--secondary-font-family);
            color: var(--sl-color-primary-500);
          }
        </style>

        <header class="app-header">
          <sl-icon-button
            class="hamburger-btn"
            name="list"
            @click="${this.hamburgerClick}"
            style="font-size: 1.5em;"
          ></sl-icon-button>

          <div class="app-header-main">
            ${this.title
              ? html` <h1 class="page-title">${this.title}</h1> `
              : ``}
            <slot></slot>
          </div>

          <nav class="app-top-nav">
            <a href="/" @click="${anchorRoute}">Home</a>

            <!-- can access a user becuase they are passed into components as a property -->
            ${this.user.accessLevel == 2
              ? html`<a href="/users" @click="${anchorRoute}">See users</a>`
              : html``}
            <sl-dropdown>
              <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
                <sl-avatar
                  style="--size: 24px;"
                  image=${this.user && this.user.avatar
                    ? `${App.apiBase}/images/${this.user.avatar}`
                    : ""}
                ></sl-avatar>
                ${this.user && this.user.firstName}
              </a>
              <sl-menu>
                <sl-menu-item @click="${() => gotoRoute("/profile")}"
                  >Profile</sl-menu-item
                >
                <sl-menu-item @click="${() => gotoRoute("/editProfile")}"
                  >Edit Profile</sl-menu-item
                >
                <sl-menu-item @click="${() => Auth.signOut()}"
                  >Sign Out</sl-menu-item
                >
              </sl-menu>
            </sl-dropdown>
          </nav>
        </header>

        <sl-drawer class="app-side-menu" placement="left">
          <h2 class="title">Platinum Property</h2>
          <nav class="app-side-menu-items">
            <a href="/" @click="${this.menuClick}">Home</a>
            ${this.user.accessLevel == 2
              ? html`<a href="/users" @click="${this.menuClick}"
                  >View clients</a
                >`
              : html``}
            <a href="/services" @click="${this.menuClick}">Book a service</a>
            <a href="/myServices" @click="${this.menuClick}">My Services</a>
            <a href="/profile" @click="${this.menuClick}">Profile</a>
            <a href="#" @click="${() => Auth.signOut()}">Sign Out</a>
          </nav>
        </sl-drawer>
      `;
    }
  }
);
