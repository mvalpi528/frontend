import App from "./App.js";

// components (custom web components)
// by importing these components in the index.js file they become available in all
// of the other files
import "./components/va-app-header";
import "./components/va-haircut";
import "./components/va-service";
import "./components/va-service-type";

// styles
import "./scss/master.scss";

// app.init
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
