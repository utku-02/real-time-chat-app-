(async () => {
    const { GraphQLClient } = await import('graphql-request');

    const client = new GraphQLClient(process.env.GRAPHQL_URL);

    const resolvers = {
        Query: {
            user: async (_, { id }) => {
                const query = `query ($id: ID!) { user(id: $id) { id email username } }`;
                const variables = { id };
                const data = await client.request(query, variables);
                return data.user;
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
            createChatRoom: async (_, { input }) => {
                const mutation = `mutation ($input: CreateChatRoomInput!) { createChatRoom(input: $input) { id name members { id email username } } }`;
                const variables = { input };
                const data = await client.request(mutation, variables);
                return data.createChatRoom;
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

module.exports = resolvers;
