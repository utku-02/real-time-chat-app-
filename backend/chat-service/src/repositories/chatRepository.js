(async () => {
    const { GraphQLClient, gql } = await import('graphql-request');
    const { Headers } = await import('cross-fetch');
  
    global.Headers = global.Headers || Headers;
  
    const client = new GraphQLClient(process.env.GRAPHQL_URL, {
      headers: {
        Authorization: `Bearer ${process.env.JWT_TOKEN}`,
      },
    });

    exports.createChatRoom = async (chatRoomData) => {
        const mutation = gql`
        mutation($input: CreateChatRoomInput!) {
            createChatRoom(input: $input) {
                id
                name
                members {
                    id
                    email
                    username
                }
            }
        }
    `;
        const variables = { input: chatRoomData };
        const data = await client.request(mutation, variables);
        return data.createChatRoom;
    };

    exports.getChatRoom = async (id) => {
        const query = gql`
        query($id: ID!) {
            chatRoom(id: $id) {
                id
                name
                members {
                    id
                    email
                    username
                }
            }
        }
    `;
        const variables = { id };
        const data = await client.request(query, variables);
        return data.chatRoom;
    };

    exports.updateChatRoom = async (id, chatRoomData) => {
        const mutation = gql`
        mutation($id: ID!, $input: UpdateChatRoomInput!) {
            updateChatRoom(id: $id, input: $input) {
                id
                name
                members {
                    id
                    email
                    username
                }
            }
        }
    `;
        const variables = { id, input: chatRoomData };
        const data = await client.request(mutation, variables);
        return data.updateChatRoom;
    };

    exports.deleteChatRoom = async (id) => {
        const mutation = gql`
        mutation($id: ID!) {
            deleteChatRoom(id: $id) {
                id
            }
        }
    `;
        const variables = { id };
        await client.request(mutation, variables);
    };

    exports.inviteUsers = async (id, users) => {
        const mutation = gql`
        mutation($id: ID!, $users: [ID!]!) {
            inviteUsersToChatRoom(id: $id, users: $users) {
                id
                name
                members {
                    id
                    email
                    username
                }
            }
        }
    `;
        const variables = { id, users };
        const data = await client.request(mutation, variables);
        return data.inviteUsersToChatRoom;
    };
  
    exports.healthCheck = async () => {
      const query = gql`
        query {
          healthCheck
        }
      `;
      const data = await client.request(query);
      return data.healthCheck;
    };
})();