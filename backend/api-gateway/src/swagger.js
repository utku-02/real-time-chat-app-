const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Real-Time Chat App API',
            version: '1.0.0',
            description: 'API documentation for the Real-Time Chat App',
        },
        servers: [
            {
                url: 'http://swwao.courses.orbit.au.dk/grp-6',
                description: 'API Gateway',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs,
};
