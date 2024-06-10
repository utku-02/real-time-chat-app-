const axios = require('axios');
  
    exports.healthCheck = async () => {
        const query = gql`
          query {
            healthCheck
          }
        `;
        const data = await client.request(query);
        return data.healthCheck;
      };