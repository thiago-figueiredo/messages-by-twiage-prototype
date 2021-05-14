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

export default {
  setup() {
    const { data, error, fetching } = useSubscription({
      query: `
        subscription {
          contact {
            contact_id
            name
            initials
          }
        }
      `,
    });

    return {
      data,
      error,
      fetching,
    };
  },
};
</script>
