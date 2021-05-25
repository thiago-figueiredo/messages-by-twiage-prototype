<template>
  <div className="container mb-4 mt-4">
    <h1>Threads</h1>
    <keep-alive>
      <div>
        <pre class="text-danger">{{ error }}</pre>
        <div class="accordion" id="threads" v-if="data">
          <div
            class="accordion-item"
            :key="thread.thread_id"
            v-for="thread in data.thread"
          >
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                :data-bs-target="`#thread_${thread.thread_id}`"
                data-bs-toggle="collapse"
                type="button"
              >
                {{ thread.title }} (thread_id:{{ thread.thread_id }})
              </button>
            </h2>
            <div
              class="accordion-collapse collapse"
              data-bs-parent="#threads"
              :id="`thread_${thread.thread_id}`"
            >
              <div class="accordion-body">
                <div class="mb-5">
                  <p
                    :key="message.message_id"
                    v-for="message in thread.messages"
                  >
                    {{ message.content }}
                    <br />
                    <small class="text-muted">
                      {{ message.contact.name }} @
                      {{ message.created_at }}
                    </small>
                  </p>
                </div>
                <send-message :thread-id="thread.thread_id"></send-message>
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

import { threadsSubscription } from "./graphql/threads-subscription";
import sendMessage from "./components/send-message/send-message.vue";

export default {
  components: {
    sendMessage,
  },

  setup() {
    const { data, error, fetching } = useSubscription({
      query: threadsSubscription,
    });

    return {
      data,
      error,
      fetching,
    };
  },
};
</script>
