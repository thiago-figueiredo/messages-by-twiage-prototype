import {
  createClient,
  defaultExchanges,
  provideClient,
  subscriptionExchange,
} from "@urql/vue";
import { SubscriptionClient } from "subscriptions-transport-ws";

export const setupGraphQL = ({ token }) => {
  const accessToken = token;
  const urqlOptionsURL = import.meta.env.VITE_URQL_OPTIONS_URL;
  const subscriptionClientURL = import.meta.env.VITE_SUBSCRIPTION_CLIENT_URL;

  const subscriptionClient = new SubscriptionClient(subscriptionClientURL, {
    connectionParams: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    reconnect: true,
  });

  const urqlOptions = {
    exchanges: [
      ...defaultExchanges,
      subscriptionExchange({
        forwardSubscription(operation) {
          return subscriptionClient.request(operation);
        },
      }),
    ],
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    url: urqlOptionsURL,
  };

  provideClient(createClient(urqlOptions));
};
