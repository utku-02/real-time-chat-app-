const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Real-Time Chat API',
            version: '1.0.0',
            description: 'API Gateway for Real-Time Chat Application',
            servers: [
                {
                    url: 'http://localhost:3000/api',
                },
            ],
        },
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
