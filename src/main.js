import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.esm.min";

import { createApp } from "vue";

import "./root/components/lo-table/lo-table.css";

import root from "./root/root.vue";
import router from "./root/router";

createApp(root).use(router).mount("#root");
