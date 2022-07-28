import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

registerApplication({
  name: "@turbo/react-layout",
  app: () => System.import("@turbo/react-layout"),
  activeWhen: isActive.reactLayout,
});

registerApplication({
  name: "@turbo/react-dashboard",
  app: () => System.import("@turbo/react-dashboard"),
  activeWhen: isActive.reactDashboard,
});

registerApplication({
  name: "@turbo/auth",
  app: () => System.import("@turbo/auth"),
  activeWhen: isActive.auth,
});

registerApplication({
  name: "@turbo/vue-career",
  app: () => System.import("@turbo/vue-career"),
  activeWhen: isActive.vueCareer,
});


start();
