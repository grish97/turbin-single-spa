import { createRouter, createWebHistory } from "vue-router";
import Career from "../components/Career";

const routes = [
  {
    path: "/career",
    name: "Career",
    component: Career
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
export default router;