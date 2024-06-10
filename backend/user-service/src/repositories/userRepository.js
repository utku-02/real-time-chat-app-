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
        mutation($input: CreateUserInput) {
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
        mutation($id: ID, $input: UpdateUserInput) {
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
        query($id: ID) {
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
  
    exports.getUsers = async () => {
      const query = gql`
        query {
          users {
            id
            email
            username
          }
        }
      `;
      const data = await client.request(query);
      return data.users;
    };
  
    exports.getUserSettings = async (id) => {
      const query = gql`
        query($id: ID) {
          userSettings(id: $id) {
            notifications
            privacy
            theme
          }
        }
      `;
      const variables = { id };
      const data = await client.request(query, variables);
      return data.userSettings;
    };
  
    exports.updateUserSettings = async (id, settings) => {
      const mutation = gql`
        mutation($id: ID, $settings: UpdateUserSettingsInput) {
          updateUserSettings(id: $id, settings: $settings) {
            notifications
            privacy
            theme
          }
        }
      `;
      const variables = { id, settings };
      const data = await client.request(mutation, variables);
      return data.updateUserSettings;
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
  