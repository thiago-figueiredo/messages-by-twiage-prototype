import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.esm.min";

import urql, { defaultExchanges, subscriptionExchange } from "@urql/vue";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createApp } from "vue";

import "./root/components/lo-table/lo-table.css";

import root from "./root/root.vue";
import router from "./root/router";

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
const urqlOptionsURL = import.meta.env.VITE_URQL_OPTIONS_URL;
const subscriptionClientURL = import.meta.env.VITE_SUBSCRIPTION_CLIENT_URL;

const subscriptionClient = new SubscriptionClient(
  subscriptionClientURL,
  {
    connectionParams: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    reconnect: true,
  },
);

const urqlOptions = {
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ],
  url: urqlOptionsURL,
};

createApp(root).use(router).use(urql, urqlOptions).mount("#root");
