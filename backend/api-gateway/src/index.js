const express = require('express');
const bodyParser = require('body-parser');
const apiGatewayRoutes = require('./routes/apiGatewayRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerDef');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', apiGatewayRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
