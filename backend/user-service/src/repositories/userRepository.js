(async () => {
    const { GraphQLClient, gql } = await import('graphql-request');


    const client = new GraphQLClient(process.env.GRAPHQL_URL);

    exports.createUser = async (userData) => {
        const mutation = gql`
        mutation($input: CreateUserInput!) {
            createUser(input: $input) {
                id
                email
                username
            }
        }
    `;
        const variables = { input: userData };
        const data = await client.request(mutation, variables);
        return data.createUser;
    };

    exports.updateUser = async (id, userData) => {
        const mutation = gql`
        mutation($id: ID!, $input: UpdateUserInput!) {
            updateUser(id: $id, input: $input) {
                id
                email
                username
            }
        }
    `;
        const variables = { id, input: userData };
        const data = await client.request(mutation, variables);
        return data.updateUser;
    };

    exports.getUser = async (id) => {
        const query = gql`
        query($id: ID!) {
            user(id: $id) {
                id
                email
                username
            }
        }
    `;
        const variables = { id };
        const data = await client.request(query, variables);
        return data.user;
    };
})();
