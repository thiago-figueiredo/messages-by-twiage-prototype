<template>
  <div className="container mt-4">
    <h1>Contacts</h1>
    <keep-alive>
      <div>
        <pre>{{ error }}</pre>
        <pre>{{ data }}</pre>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import { useSubscription } from "@urql/vue";
import gql from "graphql-tag";

const contactsQuery = gql`
  subscription {
    contact {
      contact_id
      name
      initials
    }
  }
`;

export default {
  setup() {
    const { data, error, fetching } = useSubscription({
      query: contactsQuery,
    });

    return {
      data,
      error,
      fetching,
    };
  },
};
</script>
