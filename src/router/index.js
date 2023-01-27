import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Authentication from "../views/Authentication.vue";
import Registration from "../views/Registration.vue";
import TopSecret from "../views/TopSecret.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Authentication,
  },
  {
    path: "/register",
    component: Registration,
  },
  {
    path: "/topsecret",
    component: TopSecret,
    props: {
      authenticated: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
