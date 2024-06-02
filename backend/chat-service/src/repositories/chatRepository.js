(async () => {
    const { GraphQLClient, gql } = await import('graphql-request');


    const client = new GraphQLClient(process.env.GRAPHQL_URL);

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
})();
