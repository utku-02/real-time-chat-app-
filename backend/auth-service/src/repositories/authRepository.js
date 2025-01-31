(async () => {
    const { GraphQLClient, gql } = await import('graphql-request');
    const { Headers } = await import('cross-fetch');
  
    global.Headers = global.Headers || Headers;
  
    const client = new GraphQLClient(process.env.GRAPHQL_URL, {
      headers: {
        Authorization: `Bearer ${process.env.JWT_TOKEN}`,
      },
    });

    exports.createUser = async (userData) => {
        const mutation = gql`
        mutation($input: CreateUserInput!) {
            createUser(input: $input) {
                id
                email
                username
                password
            }
        }
    `;
        const variables = { input: userData };
        const data = await client.request(mutation, variables);
        return data.createUser;
    };

    exports.getUserByEmail = async (email) => {
        const query = gql`
        query($email: String!) {
            userByEmail(email: $email) {
                id
                email
                username
                password
            }
        }
    `;
        const variables = { email };
        const data = await client.request(query, variables);
        return data.userByEmail;
    };

    exports.updateUserPassword = async (id, password) => {
        const mutation = gql`
        mutation($id: ID!, $password: String!) {
            updateUserPassword(id: $id, password: $password) {
                id
            }
        }
    `;
        const variables = { id, password };
        await client.request(mutation, variables);
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
