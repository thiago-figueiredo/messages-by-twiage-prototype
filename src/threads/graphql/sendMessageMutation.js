import gql from "graphql-tag";

export const sendMessageMutation = gql`
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
