let resolvers;

(async () => {
    const { GraphQLClient } = await import('graphql-request');

    const client = new GraphQLClient(process.env.GRAPHQL_URL);

    resolvers = {
        Query: {
            user: async (_, { id }) => {
                const query = `query ($id: ID!) { user(id: $id) { id email username } }`;
                const variables = { id };
                const data = await client.request(query, variables);
                return data.user;
            },
            userSettings: async (_, { id }) => {
                const query = `query ($id: ID!) { userSettings(id: $id) { notifications privacy theme } }`;
                const variables = { id };
                const data = await client.request(query, variables);
                return data.userSettings;
            },
            chatRoom: async (_, { id }) => {
                const query = `query ($id: ID!) { chatRoom(id: $id) { id name members { id email username } } }`;
                const variables = { id };
                const data = await client.request(query, variables);
                return data.chatRoom;
            },
            message: async (_, { id }) => {
                const query = `query ($id: ID!) { message(id: $id) { id content sender { id email username } chatRoom { id name } } }`;
                const variables = { id };
                const data = await client.request(query, variables);
                return data.message;
            },
            messagesByChatId: async (_, { chatId }) => {
                const query = `query ($chatId: ID!) { messagesByChatId(chatId: $chatId) { id content sender { id email username } chatRoom { id name } } }`;
                const variables = { chatId };
                const data = await client.request(query, variables);
                return data.messagesByChatId;
            }
        },
        Mutation: {
            createUser: async (_, { input }) => {
                const mutation = `mutation ($input: CreateUserInput!) { createUser(input: $input) { id email username } }`;
                const variables = { input };
                const data = await client.request(mutation, variables);
                return data.createUser;
            },
            updateUser: async (_, { id, input }) => {
                const mutation = `mutation ($id: ID!, $input: UpdateUserInput!) { updateUser(id: $id, input: $input) { id email username } }`;
                const variables = { id, input };
                const data = await client.request(mutation, variables);
                return data.updateUser;
            },
            updateUserSettings: async (_, { id, settings }) => {
                const mutation = `mutation ($id: ID!, $settings: UpdateUserSettingsInput!) { updateUserSettings(id: $id, settings: $settings) { notifications privacy theme } }`;
                const variables = { id, settings };
                const data = await client.request(mutation, variables);
                return data.updateUserSettings;
            },
            createChatRoom: async (_, { input }) => {
                const mutation = `mutation ($input: CreateChatRoomInput!) { createChatRoom(input: $input) { id name members { id email username } } }`;
                const variables = { input };
                const data = await client.request(mutation, variables);
                return data.createChatRoom;
            },
            updateChatRoom: async (_, { id, input }) => {
                const mutation = `mutation ($id: ID!, $input: UpdateChatRoomInput!) { updateChatRoom(id: $id, input: $input) { id name members { id email username } } }`;
                const variables = { id, input };
                const data = await client.request(mutation, variables);
                return data.updateChatRoom;
            },
            deleteChatRoom: async (_, { id }) => {
                const mutation = `mutation ($id: ID!) { deleteChatRoom(id: $id) { id } }`;
                const variables = { id };
                const data = await client.request(mutation, variables);
                return data.deleteChatRoom;
            },
            inviteUsersToChatRoom: async (_, { id, users }) => {
                const mutation = `mutation ($id: ID!, $users: [ID!]!) { inviteUsersToChatRoom(id: $id, users: $users) { id name members { id email username } } }`;
                const variables = { id, users };
                const data = await client.request(mutation, variables);
                return data.inviteUsersToChatRoom;
            },
            createMessage: async (_, { input }) => {
                const mutation = `mutation ($input: CreateMessageInput!) { createMessage(input: $input) { id content sender { id email username } chatRoom { id name } } }`;
                const variables = { input };
                const data = await client.request(mutation, variables);
                return data.createMessage;
            }
        }
    };
})();

module.exports = { getResolvers: () => resolvers };
