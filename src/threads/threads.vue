<template>
  <div className="container mt-4">
    <h1>Threads</h1>
    <keep-alive>
      <div>
        <pre>{{ error }}</pre>
        <div class="accordion" id="threads" v-if="data">
          <div
            class="accordion-item"
            :key="thread.thread_id"
            v-for="thread in data.thread"
          >
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                :data-bs-target="`#thread_${thread.thread_id}`"
                data-bs-toggle="collapse"
              >
                {{ thread.title }}
              </button>
            </h2>
            <div
              class="accordion-collapse collapse"
              data-bs-parent="#threads"
              :id="`thread_${thread.thread_id}`"
            >
              <div class="accordion-body">
                <p :key="message.message_id" v-for="message in thread.messages">
                  {{ message.content }}
                  <br />
                  <small class="text-muted">
                    {{ message.contact.name }} @
                    {{ message.created_at }}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
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
        created_at
        message_id
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
