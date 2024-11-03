// import views
import homeView from "./views/pages/home";
import fourOFourView from "./views/pages/404";
import signinView from "./views/pages/signin";
import signupView from "./views/pages/signup";
import profileView from "./views/pages/profile";
import editProfileView from "./views/pages/editProfile";
import guideView from "./views/pages/guide";
import hairdressersView from "./views/pages/hairdressers";
import haircutsView from "./views/pages/haircuts";
import favoriteHaircutsView from "./views/pages/favoriteHaircuts";
import newHaircutView from "./views/pages/newHaircut";

// define routes
// these are the pages within our SPA
// it maps the following routes to the views
// if a user arrives at one of the following routes
// then the corresponding view will be run
const routes = {
  "/": homeView,
  "/guide": guideView,
  "/hairdressers": hairdressersView,
  "/haircuts": haircutsView,
  "/favoriteHaircuts": favoriteHaircutsView,
  404: fourOFourView,
  "/signin": signinView,
  "/signup": signupView,
  "/profile": profileView,
  "/editProfile": editProfileView,
  "/newHaircut": newHaircutView,
};

class Router {
  constructor() {
    this.routes = routes;
  }

  init() {
    // initial call
    this.route(window.location.pathname);

    // on back/forward
    window.addEventListener("popstate", () => {
      this.route(window.location.pathname);
    });
  }

  route(fullPathname) {
    // extract path without params
    const pathname = fullPathname.split("?")[0];
    const route = this.routes[pathname];

    if (route) {
      // if route exists, run init() of the view
      // loads the view if the route exists
      this.routes[window.location.pathname].init();
    } else {
      // show 404 view instead
      this.routes["404"].init();
    }
  }

  gotoRoute(pathname) {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    this.route(pathname);
  }
}

// create appRouter instance and export
const AppRouter = new Router();
export default AppRouter;

// programmatically load any route
export function gotoRoute(pathname) {
  AppRouter.gotoRoute(pathname);
}

// allows anchor <a> links to load routes
export function anchorRoute(e) {
  e.preventDefault();
  const pathname = e.target.closest("a").pathname;
  AppRouter.gotoRoute(pathname);
}
