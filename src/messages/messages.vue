<template>
  <div className="container mt-4">
    <h1>Messages</h1>
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
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const { data, error, fetching } = useSubscription({
      query: `
        subscription {
          thread(where: {thread_contacts: {contact: {contact_id: {_eq: "609d948d0b6c656d5b143e19"}}}}) {
            thread_id
            title
            subtitle
            messages {
              content
              contact {
                contact_id
                name
              }
            }
            thread_contacts {
              contact {
                contact_id
                name
              }
            }
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
});
</script>
