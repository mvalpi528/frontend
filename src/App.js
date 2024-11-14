// Generally the only thing that should need to be changed in this file
// is the apiBase

import Router from "./Router";
import Auth from "./Auth";
import Toast from "./Toast";

class App {
  // Sets some properties for the app
  constructor() {
    this.name = "frontend";
    this.version = "1.0.0";
    this.apiBase =
      "https://mvalpiani-assignment3-backend-469178981192.herokuapp.com";
    // because everything is inserted in the 'root' element we need
    // to specify what the root element is
    this.rootEl = document.getElementById("root");
    this.version = "1.0.0";
  }

  init() {
    console.log("App.init");

    // Toast init
    Toast.init();

    // Authentication check
    // check to see if the user is logged in
    Auth.check(() => {
      // authenticated! init Router
      // if they are logged in then run the router
      Router.init();
    });
  }
}

export default new App();
