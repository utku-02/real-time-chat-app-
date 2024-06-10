const apiGatewayRepository = require('../repositories/apiGatewayRepository');

exports.healthCheck = async () => {
    return await apiGatewayRepository.healthCheck();
  };