import { createWebHistory, createRouter } from "vue-router";

import About from "../about/about.vue";
import Contacts from "../contacts/contacts.vue";
import Home from "../home/home.vue";
import Messages from "../messages/messages.vue";

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
    path: "/messages",
    name: "Messages",
    component: Messages,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
