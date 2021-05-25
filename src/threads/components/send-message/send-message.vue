<template>
  <div>
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
        @click="sendMessage({ thread_id: threadId })"
        type="button"
      >
        Send (thread_id:{{ threadId }})
      </button>
    </div>
  </div>
</template>

<script>
import { useMutation } from "@urql/vue";
import { reactive, ref } from "vue";

import { sendMessageMutation } from "../../graphql/send-message-mutation";

export default {
  props: {
    threadId: Number,
  },

  setup: () => {
    const messageInput = ref("");

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
      messageInput,
      sendMessage,
      sendMessageError
    }
  }
}
</script>
