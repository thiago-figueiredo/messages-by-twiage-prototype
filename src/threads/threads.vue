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
                <pre class="text-danger" v-if="sendMessageError.show">{{ `${sendMessageError.name}: ${sendMessageError.message}` }}</pre>
                <div class="input-group mb-3">
                  <input
                    class="form-control"
                    placeholder="Say something..."
                    type="text"
                    v-model="messageInput"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    @click="sendMessage({ thread_id: thread.thread_id })"
                    type="button"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import { useMutation, useSubscription } from "@urql/vue";
import { reactive, ref } from "vue";

import { sendMessageMutation } from "./graphql/sendMessageMutation";
import { threadsSubscription } from "./graphql/threadsSubscription";

export default {
  setup() {
    const messageInput = ref("");

    const { data, error, fetching } = useSubscription({
      query: threadsSubscription,
    });

    const { executeMutation: executeSendMessageMutation } = useMutation(
      sendMessageMutation,
    );

    let sendMessageError = reactive({ message: '', name: '', show: false });

    const sendMessage = async ({ thread_id }) => {
      const { error } = await executeSendMessageMutation({
        content: messageInput.value,
        thread_id,
      });

      if (error) {
        sendMessageError.message = error.message;
        sendMessageError.name = error.name;
        sendMessageError.show = true;
      } else {
        sendMessageError.show = false;
      }
    };

    return {
      data,
      error,
      fetching,
      messageInput,
      sendMessage,
      sendMessageError,
    };
  },
};
</script>
