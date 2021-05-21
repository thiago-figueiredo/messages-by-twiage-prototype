<template>
  <div className="container mt-4">
    <h1>Threads</h1>
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
import { defineComponent } from "vue";

const threadsQuery = gql`
  subscription {
    thread {
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
`;

export default defineComponent({
  setup() {
    const { data, error, fetching } = useSubscription({
      query: threadsQuery,
    });

    return {
      data,
      error,
      fetching,
    };
  },
});
</script>
