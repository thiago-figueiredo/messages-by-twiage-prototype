import { createWebHistory, createRouter } from "vue-router";

import About from "../about/about.vue";
import Contacts from "../contacts/contacts.vue";
import Home from "../home/home.vue";
import Threads from "../threads/threads.vue";

const routes = [
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: Contacts,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/threads",
    name: "Threads",
    component: Threads,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
