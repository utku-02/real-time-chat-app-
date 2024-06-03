(async () => {
    const { GraphQLClient, gql } = await import('graphql-request');

    const client = new GraphQLClient(process.env.GRAPHQL_URL);

    exports.createMessage = async (messageData) => {
        const mutation = gql`
        mutation($input: CreateMessageInput!) {
            createMessage(input: $input) {
                id
                content
                sender {
                    id
                    username
                }
                chatRoom {
                    id
                    name
                }
            }
        }
    `;
        const variables = { input: messageData };
        const data = await client.request(mutation, variables);
        return data.createMessage;
    };

    exports.getMessage = async (id) => {
        const query = gql`
        query($id: ID!) {
            message(id: $id) {
                id
                content
                sender {
                    id
                    username
                }
                chatRoom {
                    id
                    name
                }
            }
        }
    `;
        const variables = { id };
        const data = await client.request(query, variables);
        return data.message;
    };

    exports.getMessagesByChatId = async (chatId) => {
        const query = gql`
        query($chatId: ID!) {
            messagesByChatId(chatId: $chatId) {
                id
                content
                sender {
                    id
                    username
                }
                chatRoom {
                    id
                    name
                }
            }
        }
    `;
        const variables = { chatId };
        const data = await client.request(query, variables);
        return data.messagesByChatId;
    };
})();