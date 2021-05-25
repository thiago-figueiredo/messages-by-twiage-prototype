import gql from "graphql-tag";

export const sendMessageMutation = gql`
  mutation($content: String, $thread_id: Int) {
    insert_message_one(
      object: {
        content: $content
        thread_id: $thread_id
      }
    ) {
      created_at
      updated_at
    }
  }
`;
