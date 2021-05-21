<template>
  <div className="container mb-4 mt-4">
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
                :data-bs-target="`#thread_${thread.thread_id}`"
                data-bs-toggle="collapse"
                type="button"
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
                <div class="input-group mb-3">
                  <input
                    class="form-control"
                    placeholder="Say something..."
                    type="text"
                    v-model="messageInput"
                  />
                  <button class="btn btn-outline-secondary" @click="sendMessage({ thread_id: thread.thread_id })" type="button">
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
import gql from "graphql-tag";
import { ref } from "vue";

const threadsQuery = gql`
  subscription {
    thread(order_by: { updated_at: desc }) {
      messages(order_by: { created_at: asc }) {
        contact {
          contact_id
          name
        }
        content
        created_at
        message_id
      }
      subtitle
      thread_contacts {
        contact {
          contact_id
          name
        }
      }
      thread_id
      title
    }
  }
`;

const sendMessageMutation = gql`
  mutation($contact_id: String, $content: String, $thread_id: Int) {
    insert_message_one(
      object: {
        contact_id: $contact_id
        content: $content
        thread_id: $thread_id
      }
    ) {
      created_at
      updated_at
    }
  }
`;

export default {
  setup() {
    const messageInput = ref("");

    const { data, error, fetching } = useSubscription({
      query: threadsQuery,
    });

    const { executeMutation: executeSendMessageMutation } = useMutation(sendMessageMutation);

    const sendMessage = async ({ thread_id }) => {
      const contact_id = "609d948d0b6c656d5b143e19";
      const { error } = await executeSendMessageMutation({ contact_id, content: messageInput.value, thread_id });
      console.log(error);
    };

    return {
      data,
      error,
      fetching,
      messageInput,
      sendMessage,
    };
  },
};
</script>
