import gql from "graphql-tag";

export const threadsSubscription = gql`
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
